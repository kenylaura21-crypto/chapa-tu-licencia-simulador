/** Controlador: rutas por #hash, estado del examen y eventos. */
import { CONFIG } from "./config.js";
import { bancosDe, armarIntento, calcularResultado } from "./examen.js";
import { siguienteMarca } from "./marca.js";
import * as V from "./vistas.js";

const $ = s => document.querySelector(s);
const app = $("#app"), sheet = $("#mapa"), dlg = $("#fin"), fun = $("#fun"), fab = $("#fab");
const RM = matchMedia("(prefers-reduced-motion: reduce)").matches;

/* Estado del examen en memoria (no se guarda nada del usuario). */
const ex = { cat: null, intento: [], resp: [], i: 0, fin: 0, reloj: null, resultado: null, frase: "", vistas: new Set(), bloque: 0, pausaDesde: 0, pAnt: null };
const enCurso = () => ex.intento.length && !ex.resultado;

const reloj = s => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
/* Con la publicidad abierta el reloj se detiene, pero solo hasta marcaPausaMax segundos */
const pausado = () => ex.pausaDesde ? Math.min(Date.now() - ex.pausaDesde, CONFIG.marcaPausaMax * 1000) : 0;
const restante = () => Math.max(0, Math.ceil((ex.fin + pausado() - Date.now()) / 1000));
const azar = l => l[Math.floor(Math.random() * l.length)];

function pintar(html, { examen = false } = {}) {
  app.innerHTML = V.cabecera(examen) + `<main id="main">${html}</main>` + (examen ? "" : V.pie());
  fab.hidden = examen;
}
const arriba = () => scrollTo({ top: 0, behavior: "auto" });

/* ---------- Rutas ---------- */
async function ruta() {
  const [, modo, cat] = location.hash.replace(/^#\/?/, "#/").split("/");
  cerrarMapa();
  if (modo !== "examen" || !cat) detenerReloj();

  if (!modo) { pintar(V.inicio()); arriba(); document.title = "Simulador del examen MTC · Chapa Tu Licencia"; return; }
  if ((modo === "balotario" || modo === "examen") && !cat) { pintar(V.categorias(modo)); arriba(); return; }
  if (cat && !CONFIG.categorias[cat]) { location.hash = "#/"; return; }

  if (modo === "balotario") return verBalotario(cat);
  if (modo === "examen") return empezarExamen(cat);
  if (modo === "resultado" && ex.resultado) { verResultado(); return; }
  location.hash = "#/";
}

/* ---------- Balotario ---------- */
const POR_PAGINA = 30;
async function verBalotario(cat) {
  pintar(V.cargando("Cargando el balotario…")); arriba();
  let bancos;
  try { bancos = await bancosDe(cat); } catch (e) { pintar(V.error("No pudimos cargar el balotario. Revisa tu conexión.")); return; }
  const st = { banco: 0, filtro: "todas", q: "", pag: 0 };
  pintar(V.balotario(cat, bancos, 0));
  document.title = `Balotario ${cat} · Chapa Tu Licencia`;
  const lista = $("#qs"), cont = $("#bal-n");
  const norm = s => s.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");

  const filtradas = () => {
    const t = norm(st.q.trim());
    return bancos[st.banco].preguntas.filter(q =>
      (st.filtro === "todas" || q.imagenes.length || q.alternativas.some(a => a.imagenes.length)) &&
      (!t || norm(q.pregunta + " " + q.alternativas.map(a => a.texto).join(" ")).includes(t) || String(q.id) === t));
  };
  /* Cada bloque recuerda su pregunta mientras se estudia; el lugar se sortea lejos del de la última vez */
  const porBloque = new Map(); let ultimoLugar = -9;
  const marcaDelBloque = largo => {
    const clave = [st.banco, st.filtro, st.q, st.pag].join("|");
    if (!porBloque.has(clave)) {
      const min = Math.min(2, largo - 1), max = Math.max(min, largo - 3);
      let lugares = Array.from({ length: max - min + 1 }, (_, k) => min + k);
      const lejos = lugares.filter(l => Math.abs(l - ultimoLugar) >= 4);
      if (lejos.length) lugares = lejos;
      const lugar = azar(lugares); ultimoLugar = lugar;
      const d = siguienteMarca(cat);
      porBloque.set(clave, { d, lugar, id: registrarMarca(d) });
    }
    return porBloque.get(clave);
  };
  /* Bloques de 30: 1–30, 31–60… con flechas y selector (arriba y abajo de la lista) */
  const dibujar = (subir = false) => {
    const f = filtradas(), paginas = Math.max(1, Math.ceil(f.length / POR_PAGINA));
    st.pag = Math.min(Math.max(0, st.pag), paginas - 1);
    const desde = st.pag * POR_PAGINA, vis = f.slice(desde, desde + POR_PAGINA);
    /* Una pregunta de marca por bloque, en un lugar distinto al del bloque anterior */
    const mk = vis.length ? marcaDelBloque(vis.length) : null;
    let html = "";
    vis.forEach((q, k) => {
      html += V.itemBalotario(q);
      if (mk && k === mk.lugar) html += V.marcaBalotario(mk.d, mk.id);
    });
    lista.innerHTML = html || `<li class="vacio">No hay preguntas con «${V.esc(st.q)}». Prueba con otra palabra.</li>`;
    if (mk) mostrarMarca(mk.id);
    cont.textContent = f.length ? `Preguntas ${desde + 1} a ${desde + vis.length} de ${f.length}` : "";
    const opciones = Array.from({ length: paginas }, (_, p) => {
      const a = p * POR_PAGINA + 1, b = Math.min(f.length, (p + 1) * POR_PAGINA);
      return `<option value="${p}"${p === st.pag ? " selected" : ""}>Preguntas ${a} – ${b}</option>`;
    }).join("");
    document.querySelectorAll(".pager").forEach(pg => {
      pg.hidden = paginas < 2;
      pg.querySelector("select").innerHTML = opciones;
      pg.querySelector('[data-pg="-1"]').disabled = st.pag === 0;
      pg.querySelector('[data-pg="1"]').disabled = st.pag >= paginas - 1;
    });
    if (subir) { const y = lista.getBoundingClientRect().top + scrollY - ($("#tools").offsetHeight + 90); if (scrollY > y) scrollTo({ top: y, behavior: RM ? "auto" : "smooth" }); }
  };
  dibujar();

  const reiniciar = () => { st.pag = 0; dibujar(); };
  $("#tools").addEventListener("click", e => {
    const b = e.target.closest("[data-banco]");
    if (b) { st.banco = +b.dataset.banco;
      document.querySelectorAll("[data-banco]").forEach(x => x.setAttribute("aria-selected", x === b)); reiniciar(); }
    const f = e.target.closest("[data-f]");
    if (f) { st.filtro = f.dataset.f;
      document.querySelectorAll("[data-f]").forEach(x => x.setAttribute("aria-pressed", x === f)); reiniciar(); }
  });
  let t; $("#q").addEventListener("input", e => { clearTimeout(t); t = setTimeout(() => { st.q = e.target.value; reiniciar(); }, 160); });
  $("#ocultar").addEventListener("change", e => { lista.classList.toggle("oculto", e.target.checked); lista.querySelectorAll(".q.rev").forEach(x => x.classList.remove("rev")); });
  lista.addEventListener("click", e => { const b = e.target.closest(".q-ver"); if (b) b.closest(".q").classList.toggle("rev"); });
  document.querySelectorAll(".pager").forEach(pg => {
    pg.addEventListener("click", e => { const b = e.target.closest("[data-pg]"); if (b && !b.disabled) { st.pag += +b.dataset.pg; dibujar(true); } });
    pg.querySelector("select").addEventListener("change", e => { st.pag = +e.target.value; dibujar(true); });
  });
}

/* ---------- Examen ---------- */
async function empezarExamen(cat) {
  if (!(enCurso() && ex.cat === cat)) {
    pintar(V.cargando("Preparando tu examen…"), { examen: true }); arriba();
    try { ex.intento = await armarIntento(cat); }
    catch (e) { pintar(V.error("No pudimos preparar el examen. Revisa tu conexión e inténtalo otra vez.")); return; }
    Object.assign(ex, { cat, resp: new Array(ex.intento.length).fill(null), i: 0, resultado: null, pAnt: null,
      fin: Date.now() + CONFIG.examen.minutos * 60 * 1000, vistas: new Set(), bloque: 0, pausaDesde: 0 });
  }
  document.title = `Examen ${cat} · Chapa Tu Licencia`;
  pintarPregunta(); arriba(); iniciarReloj();
}

function pintarPregunta(foco = false) {
  ex.vistas.add(ex.i);
  pintar(V.examen(ex.cat, ex.intento, ex.i, ex.resp, reloj(restante()), ex.vistas), { examen: true });
  /* el vehículo avanza desde la pregunta anterior hasta la actual */
  const veh = $(".ex-veh"), p = (ex.i + .5) / ex.intento.length;
  if (veh && ex.pAnt != null && !RM) { veh.style.setProperty("--p", ex.pAnt); requestAnimationFrame(() => requestAnimationFrame(() => veh.style.setProperty("--p", p))); }
  ex.pAnt = p;
  if (foco) $(".exq h2")?.focus({ preventScroll: true });
}
function ir(i) {
  if (!enCurso() || i < 0 || i >= ex.intento.length) return;
  ex.i = i; pintarPregunta(); cerrarMapa();
  /* Publicidad al pasar 10, 20 y 30 preguntas, aunque no se hayan respondido */
  const bloque = Math.floor(i / CONFIG.marcaCada);
  if (bloque > ex.bloque) { ex.bloque = bloque; setTimeout(abrirMarca, RM ? 0 : 450); }
  const top = $(".ex-in"); if (top && scrollY > top.offsetTop - 120) scrollTo({ top: 0, behavior: RM ? "auto" : "smooth" });
}
function elegir(orig) {
  if (!enCurso()) return;
  ex.resp[ex.i] = orig;
  document.querySelectorAll(".op[data-op]").forEach(b => { const s = +b.dataset.op === orig; b.classList.toggle("sel", s); b.setAttribute("aria-checked", s); });
  const n = ex.resp.filter(r => r != null).length, total = ex.intento.length;
  const m = $(".ex-mapa span"); if (m) m.textContent = `${n}/${total}`;
  const tramo = document.querySelector(`.ex-seg [data-ir="${ex.i}"]`);
  if (tramo) { tramo.classList.remove("s"); tramo.classList.add("r"); tramo.setAttribute("aria-label", `Ir a la pregunta ${ex.i + 1}, respondida`); }
  const h = $("[data-hechas]"); if (h) h.textContent = n;
  const f = $("[data-faltan]"); if (f) f.textContent = n === total ? "¡Todas respondidas!" : `Faltan ${total - n}`;
}

/* ---------- Preguntas de marca (publicidad) ---------- */
const marcas = new Map(); let nMarca = 0;
function registrarMarca(d) { const id = "m" + (++nMarca); marcas.set(id, { d, elegida: null }); return id; }
/* Pinta la respuesta: la correcta en verde, la elegida equivocada en rojo y el mensaje de la escuela */
function mostrarMarca(id) {
  const reg = marcas.get(id), box = document.querySelector(`[data-mk-box="${id}"]`);
  if (!reg || !box || reg.elegida == null) return;
  const { d, elegida } = reg, bien = elegida === d.correcta;
  box.querySelectorAll("[data-mk]").forEach(x => { const j = +x.dataset.k; x.classList.toggle("ok", j === d.correcta); x.classList.toggle("bad", j === elegida && !bien); x.disabled = true; });
  box.querySelector(".mk-v").textContent = bien ? "¡Correcto!" : `Casi. La respuesta correcta es: ${d.opciones[d.correcta]}`;
  box.querySelector(".mk-r").hidden = false;
}
function abrirMarca() {
  if (!enCurso() || fun.open || dlg.open || !location.hash.startsWith("#/examen/")) return;
  const d = siguienteMarca(ex.cat);
  fun.innerHTML = V.marcaExamen(d, registrarMarca(d));
  fun.setAttribute("aria-labelledby", fun.querySelector("h2").id);
  ex.pausaDesde = Date.now();
  fun.showModal(); fun.scrollTop = 0;
}
fun.addEventListener("close", () => { ex.fin += pausado(); ex.pausaDesde = 0; });

/* ---------- Barra de progreso: tocar o deslizar para ir a una pregunta ---------- */
let tramoActivo = null;
const tramoEn = (seg, x) => { const r = seg.getBoundingClientRect(), n = ex.intento.length; return Math.min(n - 1, Math.max(0, Math.floor((x - r.left) / r.width * n))); };
function globo(seg, k) {
  const b = $(".ex-bub"); if (!b) return;
  seg.querySelectorAll(".p").forEach(x => x.classList.remove("p"));
  if (k == null) { b.hidden = true; return; }
  seg.children[k].classList.add("p");
  b.textContent = k + 1; b.style.setProperty("--p", (k + .5) / ex.intento.length); b.hidden = false;
}
app.addEventListener("pointerdown", e => {
  const seg = e.target.closest(".ex-seg"); if (!seg || e.button > 0) return;
  tramoActivo = tramoEn(seg, e.clientX); try { seg.setPointerCapture(e.pointerId); } catch (err) {}
  globo(seg, tramoActivo);
});
app.addEventListener("pointermove", e => {
  const seg = e.target.closest(".ex-seg"); if (!seg) return;
  if (tramoActivo != null) { tramoActivo = tramoEn(seg, e.clientX); globo(seg, tramoActivo); }
  else if (e.pointerType === "mouse") globo(seg, tramoEn(seg, e.clientX));
});
app.addEventListener("pointerup", e => {
  const seg = e.target.closest(".ex-seg"); if (!seg || tramoActivo == null) return;
  const k = tramoActivo; tramoActivo = null; globo(seg, null); ir(k);
});
app.addEventListener("pointercancel", () => { tramoActivo = null; const s = $(".ex-seg"); if (s) globo(s, null); });
app.addEventListener("pointerout", e => { const s = e.target.closest(".ex-seg"); if (s && tramoActivo == null && !s.contains(e.relatedTarget)) globo(s, null); });

/* A los 40 minutos el examen termina solo y muestra el resultado, aunque haya una ventana abierta */
function revisarReloj() {
  if (!enCurso()) return;
  const s = restante(), el = $("[data-timer]");
  if (el) { el.textContent = reloj(s); el.parentElement.classList.toggle("poco", s <= 300); }
  if (s === 0) terminar(true);
}
function iniciarReloj() { detenerReloj(); ex.reloj = setInterval(revisarReloj, 500); revisarReloj(); }
document.addEventListener("visibilitychange", () => { if (!document.hidden && ex.reloj) revisarReloj(); });
addEventListener("pageshow", () => { if (ex.reloj) revisarReloj(); });
function detenerReloj() { if (ex.reloj) { clearInterval(ex.reloj); ex.reloj = null; } }

function pedirTerminar() {
  const faltan = ex.resp.filter(r => r == null).length;
  $("#fin-t").textContent = faltan
    ? `Te ${faltan === 1 ? "falta 1 pregunta" : `faltan ${faltan} preguntas`} sin responder. Las preguntas sin responder cuentan como incorrectas.`
    : "Respondiste todas las preguntas. ¿Quieres ver tu nota?";
  cerrarMapa();
  dlg.showModal();
}
function terminar(porTiempo = false) {
  if (!enCurso()) return;
  detenerReloj();
  if (dlg.open) dlg.close();
  if (fun.open) { ex.pausaDesde = 0; fun.close(); }
  ex.resultado = calcularResultado(ex.intento, ex.resp);
  ex.resultado.porTiempo = porTiempo;
  ex.frase = azar(ex.resultado.aprobado ? CONFIG.textos.aprobado : CONFIG.textos.desaprobado);
  location.hash = "#/resultado";
}
function verResultado() {
  pintar(V.resultado(ex.cat, ex.resultado, ex.intento, ex.resp, (ex.resultado.porTiempo ? "Se acabó el tiempo. " : "") + ex.frase));
  document.title = `Tu resultado · Examen ${ex.cat} · Chapa Tu Licencia`;
  arriba();
}

/* Mapa de preguntas (hoja inferior en celular, panel en PC) */
function abrirMapa() { sheet.innerHTML = V.mapa(ex.intento, ex.i, ex.resp); sheet.hidden = false; requestAnimationFrame(() => sheet.classList.add("on")); sheet.querySelector(".a")?.focus(); }
function cerrarMapa() { if (sheet.hidden) return; sheet.classList.remove("on"); setTimeout(() => { sheet.hidden = true; }, RM ? 0 : 250); }

/* ---------- Eventos ---------- */
document.addEventListener("click", e => {
  const op = e.target.closest(".op[data-op]"); if (op) { elegir(+op.dataset.op); return; }
  const mk = e.target.closest("[data-mk]"); if (mk) { const r = marcas.get(mk.dataset.mk); if (r && r.elegida == null) { r.elegida = +mk.dataset.k; mostrarMarca(mk.dataset.mk); mk.closest(".mk").querySelector(".mk-r").scrollIntoView({ block: "nearest" }); } return; }
  const irA = e.target.closest("[data-ir]");
  if (irA) { if (!(irA.closest(".ex-seg") && e.detail > 0)) ir(+irA.dataset.ir); return; } /* en la barra, el dedo o el mouse ya lo resolvió */
  const a = e.target.closest("[data-act]"); if (!a) return;
  switch (a.dataset.act) {
    case "sig": ir(ex.i + 1); break;
    case "ant": ir(ex.i - 1); break;
    case "mapa": abrirMapa(); break;
    case "cerrar": cerrarMapa(); break;
    case "terminar": pedirTerminar(); break;
    case "seguir": dlg.close(); break;
    case "seguir-marca": fun.close(); break;
    case "confirmar": terminar(false); break;
    case "otra": { const c = ex.cat; ex.intento = []; ex.resultado = null; location.hash = `#/examen/${c}`; break; }
    case "recargar": location.reload(); break;
  }
});
sheet.addEventListener("click", e => { if (e.target === sheet) cerrarMapa(); });
document.addEventListener("keydown", e => {
  if (e.key === "Escape") cerrarMapa();
  if (!enCurso() || dlg.open || fun.open || !sheet.hidden || /input|textarea/i.test(e.target.tagName)) return;
  const k = e.key.toUpperCase(), q = ex.intento[ex.i];
  const pos = "ABCD".indexOf(k) >= 0 ? "ABCD".indexOf(k) : "1234".indexOf(k);
  if (pos >= 0 && q.orden[pos] != null) { elegir(q.orden[pos]); return; }
  if (e.key === "ArrowRight") ir(ex.i + 1);
  if (e.key === "ArrowLeft") ir(ex.i - 1);
});
/* Si sale de la página en pleno examen, se le avisa. */
addEventListener("beforeunload", e => { if (enCurso()) { e.preventDefault(); e.returnValue = ""; } });
addEventListener("hashchange", () => {
  const destino = location.hash;
  if (enCurso() && !destino.startsWith(`#/examen/${ex.cat}`) && destino !== "#/resultado") {
    if (!confirm("Tienes un examen en curso. Si sales, se pierde. ¿Salir del examen?")) {
      history.pushState(null, "", `#/examen/${ex.cat}`); return;
    }
    ex.intento = []; detenerReloj();
  }
  ruta();
});

/* ---------- Intro (la misma de la web: 2,1 s; se salta al tocar) ---------- */
const intro = $("#intro");
if (intro) {
  intro.addEventListener("click", () => intro.classList.add("skip"));
  intro.addEventListener("animationend", e => { if (e.animationName === "introOut") intro.remove(); });
}

ruta();
