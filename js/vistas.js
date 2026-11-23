/** Plantillas HTML de cada pantalla. Funciones puras: reciben datos y devuelven texto. */
import { CONFIG } from "./config.js";

export const esc = v => String(v ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const LETRA = "ABCD";

/* ---------- Íconos (trazo 1.9, mismo estilo en todo el sitio) ---------- */
const P = {
  moto: '<circle cx="5.5" cy="16.5" r="3"/><circle cx="18.5" cy="16.5" r="3"/><path d="M8.5 16.5h5l2.5-6h2.5M11 16.5 8.5 10h4l3 6.5M15 7.5h3"/>',
  mototaxi: '<circle cx="6" cy="17.5" r="2.5"/><circle cx="18" cy="17.5" r="2.5"/><path d="M3.5 17.5V8.5a2 2 0 0 1 2-2H14l2 6h3.5l1 5M8.5 17.5h7M14 6.5v6H3.5"/>',
  auto: '<path d="M3 16.5v-4l2.2-5.2A2 2 0 0 1 7 6h10a2 2 0 0 1 1.8 1.3L21 12.5v4"/><path d="M3 12.5h18M3 16.5h18"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  taxi: '<path d="M3 16.5v-4l2.2-5.2A2 2 0 0 1 7 6h10a2 2 0 0 1 1.8 1.3L21 12.5v4M3 12.5h18M3 16.5h18M10 3.5h4v2.5h-4z"/><circle cx="7" cy="17.5" r="1.8"/><circle cx="17" cy="17.5" r="1.8"/>',
  camion: '<path d="M2.5 5.5h11v11h-11zM13.5 9.5h4.5l3.5 4v3h-8"/><circle cx="6.5" cy="17.5" r="1.8"/><circle cx="17.5" cy="17.5" r="1.8"/>',
  bus: '<rect x="3.5" y="3.5" width="17" height="13.5" rx="2.5"/><path d="M3.5 10.5h17M8 3.5v7M16 3.5v7"/><circle cx="7.5" cy="19" r="1.5"/><circle cx="16.5" cy="19" r="1.5"/>',
  trailer: '<path d="M1.5 6.5h12v9.5h-12zM13.5 9.5H18l3.5 3.5v3h-8"/><circle cx="4.5" cy="17.5" r="1.7"/><circle cx="9" cy="17.5" r="1.7"/><circle cx="18" cy="17.5" r="1.7"/>',
  book: '<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H20v15H5.5A1.5 1.5 0 0 0 4 19.5zM4 19.5A1.5 1.5 0 0 0 5.5 21H20M8 7.5h8M8 11h6"/>',
  exam: '<rect x="4.5" y="3.5" width="15" height="17.5" rx="2"/><path d="M9 3.5h6v2.5H9zM8.5 11l1.8 1.8 3.4-3.6M8.5 16.5h7"/>',
  arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
  back: '<path d="M19 12H5M11 6l-6 6 6 6"/>',
  check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
  x: '<path d="M6 6l12 12M18 6 6 18"/>',
  clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  grid: '<rect x="4" y="4" width="6" height="6" rx="1.2"/><rect x="14" y="4" width="6" height="6" rx="1.2"/><rect x="4" y="14" width="6" height="6" rx="1.2"/><rect x="14" y="14" width="6" height="6" rx="1.2"/>',
  search: '<circle cx="11" cy="11" r="6.5"/><path d="m16 16 4.5 4.5"/>',
  eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
  pin: '<path d="M12 22s7-6.3 7-12a7 7 0 1 0-14 0c0 5.7 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
  flag: '<path d="M5 21V4M5 4h11l-2 4 2 4H5"/>',
  pdf: '<path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8z"/><path d="M14 3v5h5M12 11.5v6M9.5 15l2.5 2.5 2.5-2.5"/>',
  web: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c2.5 2.7 3.8 5.7 3.8 9s-1.3 6.3-3.8 9c-2.5-2.7-3.8-5.7-3.8-9S9.5 5.7 12 3z"/>',
};
export const ic = (n, cls = "ic") => `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[n]}</svg>`;
const B = {
  wa: '<path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.16-.17.2-.35.22-.64.08-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.21-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.06 2.88 1.21 3.07c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.18-1.41-.08-.13-.27-.2-.57-.35m-5.42 7.4h-.01a9.87 9.87 0 0 1-5.03-1.37l-.36-.22-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.16-3.48-8.41Z"/>',
  tiktok: '<path d="M12.53.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/>',
  facebook: '<path d="M9.1 23.69v-7.98H6.63v-3.67H9.1v-1.58c0-4.08 1.85-5.98 5.86-5.98.4 0 .96.04 1.47.1.38.04.76.11 1.14.2v3.32a8.6 8.6 0 0 0-.65-.03l-.73-.01c-.71 0-1.26.1-1.68.31-.29.14-.52.36-.68.62-.26.42-.37 1-.37 1.75v1.3h3.92l-.39 2.1-.29 1.57h-3.24v8.24C19.4 23.24 24 18.18 24 12.04 24 5.42 18.63.04 12 .04S0 5.42 0 12.04c0 5.63 3.87 10.35 9.1 11.65Z"/>',
};
export const brand = (n, cls = "ic") => n === "instagram"
  ? `<svg class="${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.4" cy="6.6" r="1.2" fill="currentColor" stroke="none"/></svg>`
  : `<svg class="${cls}" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">${B[n]}</svg>`;

const imgs = (lista, alt, cls) => lista && lista.length
  ? `<div class="${cls}">${lista.map((src, i) => `<img src="${esc(src)}" alt="${esc(alt)}${lista.length > 1 ? " " + (i + 1) : ""}" loading="lazy" decoding="async">`).join("")}</div>` : "";

/* ---------- Piezas compartidas ---------- */
export function cabecera(enExamen = false) {
  const r = CONFIG.redes;
  return `<header class="hd${enExamen ? " hd-ex" : ""}"><div class="wrap hd-in">
    <a class="hd-logo" href="#/" aria-label="Chapa Tu Licencia, volver al inicio del simulador"><img src="media/logo-negativo.svg" alt="Chapa Tu Licencia" width="1833" height="579"></a>
    <span class="hd-tag">Simulador del examen MTC</span>
    <nav class="hd-soc" aria-label="Redes sociales de Chapa Tu Licencia">
      <a href="${r.tiktok}" target="_blank" rel="noopener" aria-label="TikTok de Chapa Tu Licencia">${brand("tiktok")}</a>
      <a href="${r.instagram}" target="_blank" rel="noopener" aria-label="Instagram de Chapa Tu Licencia">${brand("instagram")}</a>
      <a href="${r.facebook}" target="_blank" rel="noopener" aria-label="Facebook de Chapa Tu Licencia">${brand("facebook")}</a>
    </nav>
    ${enExamen ? "" : `<a class="hd-wa" href="${CONFIG.wa("tramite", "Hola, vengo del simulador y quiero información sobre mi licencia.")}" target="_blank" rel="noopener" aria-label="Escríbenos por WhatsApp">${brand("wa")}<span>Escríbenos</span></a>`}
  </div></header>`;
}

export function anuncio(a, tipo = "") {
  return `<aside class="ad ${tipo}" aria-label="Anuncio de Chapa Tu Licencia">
    <div class="ad-ph"><img src="${a.foto}" alt="${esc(a.alt)}" loading="lazy" decoding="async"><img class="ad-mk" src="media/isotipo-negativo.svg" alt="" width="660" height="570"></div>
    <div class="ad-tx">
      <h3>${esc(a.titulo)}</h3>
      <p>${esc(a.texto)}</p>
      <div class="ad-b"><a class="b b-wa" href="${CONFIG.wa(a.wa[0], a.wa[1])}" target="_blank" rel="noopener">${brand("wa")}${esc(a.cta)}</a>
      <a class="lnk-d" href="${CONFIG.marca.web}" target="_blank" rel="noopener">Ver precios en la web</a></div>
    </div>
  </aside>`;
}

export function pie() {
  const r = CONFIG.redes;
  return `<footer class="ft"><div class="wrap ft-in">
    <a class="ft-logo" href="${CONFIG.marca.web}" target="_blank" rel="noopener"><img src="media/logo-negativo.svg" alt="Chapa Tu Licencia" width="1833" height="579" loading="lazy"></a>
    <p class="ft-t">Simulador gratuito de <b>Chapa Tu Licencia</b>, escuela de manejo en Tacna. Clases de manejo en circuito privado y trámite completo de tu licencia.</p>
    <p class="ft-a">${ic("pin")}<span>${esc(CONFIG.marca.direccion)}</span></p>
    <div class="ft-l">
      <a class="b b-wa" href="${CONFIG.wa("tramite", "Hola, vengo del simulador y quiero información.")}" target="_blank" rel="noopener">${brand("wa")}905 595 653</a>
      <a class="b b-ld" href="${CONFIG.marca.web}" target="_blank" rel="noopener">${ic("web")}Ir a la web</a>
      <span class="ft-s"><a href="${r.tiktok}" target="_blank" rel="noopener" aria-label="TikTok">${brand("tiktok")}</a><a href="${r.instagram}" target="_blank" rel="noopener" aria-label="Instagram">${brand("instagram")}</a><a href="${r.facebook}" target="_blank" rel="noopener" aria-label="Facebook">${brand("facebook")}</a></span>
    </div>
    <p class="ft-n">Preguntas del balotario oficial del MTC publicado en El Peruano. Es un simulacro de práctica y no reemplaza el examen oficial.</p>
  </div></footer>`;
}

/* ---------- Inicio: las dos opciones ---------- */
export function inicio() {
  return `<section class="hero"><div class="wrap hero-in">
    <h1>Aprueba tu examen de reglas <em>a la primera.</em></h1>
    <p class="lead">El balotario oficial del MTC y un simulacro igual al examen real. Gratis, de Chapa Tu Licencia, escuela de manejo en Tacna.</p>
    <div class="modos">
      <a class="modo" href="#/balotario">
        <span class="hx hx-n" aria-hidden="true">1</span>
        <span class="modo-h"><b>Balotarios</b><span>Material de estudio</span></span>
        <span class="modo-p">Todas las preguntas de tu categoría con la respuesta correcta y las señales de tránsito.</span>
        <span class="modo-go">Estudiar el balotario ${ic("arrow")}</span>
      </a>
      <a class="modo modo-pri" href="#/examen">
        <span class="hx hx-n" aria-hidden="true">2</span>
        <span class="modo-h"><b>Simulador de examen</b><span>Mide tu conocimiento</span></span>
        <span class="modo-p">${CONFIG.examen.preguntas} preguntas al azar en ${CONFIG.examen.minutos} minutos, como en el MTC. Apruebas con ${CONFIG.examen.minimo} y al final ves en qué fallaste.</span>
        <span class="modo-go">Dar el examen ${ic("arrow")}</span>
      </a>
    </div>
  </div></section>
  <section class="promo"><div class="wrap">
    <h2 class="ttl">Del examen de reglas <em>a tu licencia en mano.</em></h2>
    <div class="promo-g">${CONFIG.anuncios.map(a => anuncio(a)).join("")}</div>
  </div></section>`;
}

/* ---------- Elegir categoría ---------- */
export function categorias(modo) {
  const ex = modo === "examen";
  const grupos = CONFIG.grupos.map(g => `<div class="grp">
      <h2 class="grp-h">${ic(g.icono)}${esc(g.nombre)}</h2>
      <div class="cats">${g.categorias.map(k => {
        const c = CONFIG.categorias[k];
        return `<a class="cat" href="#/${modo}/${k}">
          <span class="hx hx-i" aria-hidden="true">${ic(c.icono)}</span>
          <span class="cat-t"><b>${k}</b><span>${esc(c.titulo)}</span><small>${esc(c.detalle)}</small></span>
          ${ic("arrow", "ic cat-go")}</a>`;
      }).join("")}</div></div>`).join("");
  return `<section class="pg"><div class="wrap">
    <a class="back" href="#/">${ic("back")}Inicio</a>
    <h1 class="ttl">${ex ? "¿Para qué licencia <em>das el examen?</em>" : "Elige tu <em>balotario.</em>"}</h1>
    <p class="sub">${ex
      ? `${CONFIG.examen.preguntas} preguntas al azar, ${CONFIG.examen.minutos} minutos y apruebas con ${CONFIG.examen.minimo}. En las profesionales, la mitad son de materias generales.`
      : "Elige la categoría de tu licencia y estudia cada pregunta con su respuesta correcta."}</p>
    ${grupos}
    <p class="tip">${ic("flag")}<span>${esc(CONFIG.textos.tip)}</span></p>
  </div></section>`;
}

/* ---------- Balotario ---------- */
export function balotario(cat, bancos, activo) {
  const c = CONFIG.categorias[cat];
  const total = bancos.reduce((s, b) => s + b.preguntas.length, 0);
  return `<section class="pg bal"><div class="wrap">
    <a class="back" href="#/balotario">${ic("back")}Categorías</a>
    <div class="bal-hd">
      <div><h1 class="ttl">Balotario <em>${cat}</em></h1>
      <p class="sub">${esc(c.titulo)} · ${total} preguntas oficiales del MTC con su respuesta correcta.</p></div>
      <div class="bal-acc">
        ${CONFIG.pdf[cat] ? `<a class="b b-ln" href="${CONFIG.pdf[cat]}" target="_blank" rel="noopener">${ic("pdf")}Balotario en PDF</a>` : ""}
        <a class="b b-or" href="#/examen/${cat}">${ic("exam")}Ponerme a prueba</a>
      </div>
    </div>
    <div class="tools" id="tools">
      ${bancos.length > 1 ? `<div class="seg" role="tablist" aria-label="Tipo de preguntas">${bancos.map((b, i) =>
        `<button type="button" role="tab" data-banco="${i}" aria-selected="${i === activo}">${esc(b.nombre)} <span>${b.preguntas.length}</span></button>`).join("")}</div>` : ""}
      <label class="srch">${ic("search")}<input id="q" type="search" placeholder="Buscar palabra o señal (ej. R-6)" autocomplete="off" aria-label="Buscar en el balotario"></label>
      <div class="tools-r">
        <div class="chips" role="group" aria-label="Filtro">
          <button type="button" data-f="todas" aria-pressed="true">Todas</button>
          <button type="button" data-f="senales" aria-pressed="false">Con señales</button>
        </div>
        <label class="sw"><input type="checkbox" id="ocultar"><span class="sw-t" aria-hidden="true"></span>Ocultar respuestas</label>
      </div>
    </div>
    <div class="pg-row"><p class="bal-n" id="bal-n" aria-live="polite"></p>${paginador("arriba")}</div>
    <ol class="qs" id="qs"></ol>
    <div class="pg-row pg-bot">${paginador("abajo")}</div>
  </div></section>`;
}

/* Flechas y selector de bloque: 1–30, 31–60… (las opciones se llenan desde app.js) */
const paginador = id => `<div class="pager" data-pager="${id}">
  <button type="button" class="pg-b" data-pg="-1" aria-label="Bloque anterior">${ic("back")}</button>
  <label class="pg-s"><span class="vh">Elegir bloque de preguntas</span><select data-pg-sel></select>${ic("grid")}</label>
  <button type="button" class="pg-b" data-pg="1" aria-label="Bloque siguiente">${ic("arrow")}</button>
</div>`;

/* Anuncio corto dentro del examen: no tapa la pregunta y cambia cada 5 preguntas. */
export function anuncioExamen(a) {
  return `<aside class="ex-ad" aria-label="Anuncio de Chapa Tu Licencia">
    <img src="${a.foto}" alt="" loading="lazy" decoding="async">
    <div class="ex-ad-t"><b>${esc(a.titulo)}</b><span>Chapa Tu Licencia · frente al MTC, Tacna</span></div>
    <a class="b b-wa" href="${CONFIG.wa(a.wa[0], a.wa[1])}" target="_blank" rel="noopener">${brand("wa")}<span>${esc(a.ctaCorto || a.cta)}</span></a>
  </aside>`;
}

export function itemBalotario(q) {
  const ops = q.alternativas.map((a, i) => `<li class="${i === q.correcta ? "ok" : ""}">
      <span class="hx hx-l" aria-hidden="true">${LETRA[i]}</span>
      <span class="o-t">${a.texto ? esc(a.texto) : ""}${imgs(a.imagenes, `Alternativa ${LETRA[i]}`, "o-im")}</span>
      ${i === q.correcta ? `<span class="o-ok">${ic("check")}<span class="vh">Respuesta correcta</span></span>` : ""}
    </li>`).join("");
  return `<li class="q">
    <div class="q-h"><span class="q-n">${q.id}</span><h3>${esc(q.pregunta)}</h3></div>
    ${imgs(q.imagenes, "Señal o gráfico de la pregunta " + q.id, "q-im")}
    <ol class="q-o">${ops}</ol>
    <button type="button" class="q-ver">${ic("eye")}Ver respuesta</button>
  </li>`;
}


/* ---------- Examen ---------- */
export function examen(cat, intento, i, respuestas, tiempo, vistas) {
  const q = intento[i];
  const resp = respuestas.filter(r => r != null).length;
  const ultima = i === intento.length - 1;
  const ops = q.orden.map((orig, k) => {
    const a = q.alternativas[orig];
    const sel = respuestas[i] === orig;
    return `<button type="button" class="op${sel ? " sel" : ""}" role="radio" aria-checked="${sel}" data-op="${orig}">
      <span class="hx hx-l" aria-hidden="true">${LETRA[k]}</span>
      <span class="o-t">${a.texto ? esc(a.texto) : ""}${imgs(a.imagenes, `Alternativa ${LETRA[k]}`, "o-im")}</span>
    </button>`;
  }).join("");
  return `<section class="ex">
    <div class="ex-bar"><div class="wrap ex-bar-in">
      <span class="ex-cat">Examen <b>${cat}</b></span>
      <span class="ex-t" role="timer" aria-label="Tiempo restante">${ic("clock")}<b data-timer>${tiempo}</b></span>
      <button type="button" class="ex-mapa" data-act="mapa" aria-label="Ver todas las preguntas">${ic("grid")}<span>${resp}/${intento.length}</span></button>
    </div>${barra(cat, intento, i, respuestas, vistas)}</div>
    <div class="wrap ex-in">
      <article class="exq" aria-labelledby="exq-t">
        <p class="exq-n">Pregunta <b>${i + 1}</b> de ${intento.length}</p>
        <h2 id="exq-t">${esc(q.pregunta)}</h2>
        ${imgs(q.imagenes, "Señal o gráfico de la pregunta", "q-im")}
        <div class="ops" role="radiogroup" aria-labelledby="exq-t">${ops}</div>
      </article>
      <div class="ex-nav">
        <button type="button" class="b b-ln" data-act="ant" ${i === 0 ? "disabled" : ""}>${ic("back")}Anterior</button>
        ${ultima
          ? `<button type="button" class="b b-or" data-act="terminar">${ic("flag")}Terminar examen</button>`
          : `<button type="button" class="b b-or" data-act="sig">Siguiente${ic("arrow")}</button>`}
      </div>
      ${ultima ? "" : `<button type="button" class="lnk ex-fin" data-act="terminar">Terminar examen</button>`}
      ${anuncioExamen(CONFIG.anuncios[Math.floor(i / 5) % CONFIG.anuncios.length])}
    </div>
  </section>`;
}

/* Barra de progreso: la pista del examen. Un punto por pregunta y todos se pueden tocar.
   Naranja = respondida · amarillo = la actual · claro = vista sin responder · oscuro = aún no vista. */
export const estadoTramo = (k, i, respuestas, vistas) => (respuestas[k] != null ? "r" : vistas.has(k) ? "s" : "") + (k === i ? " a" : "");
const nombreTramo = (k, respuestas, vistas) => `Ir a la pregunta ${k + 1}, ${respuestas[k] != null ? "respondida" : vistas.has(k) ? "vista sin responder" : "sin ver"}`;
export function barra(cat, intento, i, respuestas, vistas) {
  const n = intento.length, hechas = respuestas.filter(r => r != null).length;
  const cada = CONFIG.marcaCada;
  const tramos = intento.map((_, k) => `<button type="button" tabindex="-1" data-ir="${k}" class="${estadoTramo(k, i, respuestas, vistas)}${cada && (k + 1) % cada === 0 && k + 1 < n ? " m" : ""}" aria-label="${nombreTramo(k, respuestas, vistas)}"></button>`).join("");
  return `<div class="ex-pr"><div class="wrap">
    <div class="ex-road">
      <span class="ex-veh" style="--p:${(i + .5) / n}" aria-hidden="true">${ic(CONFIG.categorias[cat].icono)}</span>
      <span class="ex-bub" aria-hidden="true" hidden></span>
      <div class="ex-seg" role="group" aria-label="Preguntas del examen: toca una para ir a ella">${tramos}</div>
    </div>
    <p class="ex-leg"><span><b data-hechas>${hechas}</b> de ${n} respondidas</span><span class="ex-hint">Toca o desliza la barra para ir a una pregunta</span><span data-faltan>${n - hechas === 0 ? "¡Todas respondidas!" : `Faltan ${n - hechas}`}</span></p>
  </div></div>`;
}

/* ---------- Pregunta de marca (publicidad): en el examen y en el balotario ---------- */
const cuerpoMarca = (d, id) => `<div class="mk-o" role="group" aria-labelledby="mk-h-${id}">${d.opciones.map((o, k) => `<button type="button" class="op" data-mk="${id}" data-k="${k}"><span class="hx hx-l" aria-hidden="true">${LETRA[k]}</span><span class="o-t">${esc(o)}</span></button>`).join("")}</div>
    <div class="mk-r" hidden>
      <p class="mk-v" aria-live="polite"></p>
      <p class="mk-t">${esc(d.respuesta)}</p>
      <a class="b b-wa" href="${CONFIG.wa(d.wa[0], d.wa[1])}" target="_blank" rel="noopener">${brand("wa")}${esc(d.cta)}</a>
    </div>`;
export function marcaExamen(d, id) {
  return `<div class="mk" data-mk-box="${id}">
    <p class="mk-tag"><img src="media/isotipo.svg" alt="" width="660" height="570">Publicidad de Chapa Tu Licencia · no cuenta para tu nota</p>
    <h2 id="mk-h-${id}">${esc(d.pregunta)}</h2>
    ${cuerpoMarca(d, id)}
    <button type="button" class="b b-or b-full mk-seg" data-act="seguir-marca">Seguir con el examen${ic("arrow")}</button>
  </div>`;
}
export function marcaBalotario(d, id) {
  return `<li class="q-mk"><div class="mk" data-mk-box="${id}">
    <p class="mk-tag"><img src="media/isotipo-negativo.svg" alt="" width="660" height="570"><span><b>Publicidad de Chapa Tu Licencia</b>Esta pregunta no es del balotario</span></p>
    <h3 id="mk-h-${id}">${esc(d.pregunta)}</h3>
    ${cuerpoMarca(d, id)}
  </div></li>`;
}

export function mapa(intento, actual, respuestas) {
  return `<div class="sheet-in">
    <div class="sheet-h"><h2>Tus respuestas</h2><button type="button" class="x" data-act="cerrar" aria-label="Cerrar">${ic("x")}</button></div>
    <p class="sheet-l"><span class="dot d-ok"></span>Respondida <span class="dot"></span>Sin responder</p>
    <div class="mg">${intento.map((_, i) => `<button type="button" class="${respuestas[i] != null ? "r" : ""}${i === actual ? " a" : ""}" data-ir="${i}" aria-label="Pregunta ${i + 1}${respuestas[i] != null ? ", respondida" : ""}">${i + 1}</button>`).join("")}</div>
    <button type="button" class="b b-or b-full" data-act="terminar">${ic("flag")}Terminar examen</button>
  </div>`;
}

/* ---------- Resultado ---------- */
export function resultado(cat, r, intento, respuestas, frase) {
  const malas = intento.map((q, i) => ({ q, i, r: respuestas[i] })).filter(x => x.r !== x.q.correcta);
  const ad = CONFIG.anuncios[r.aprobado ? 0 : 1];
  const alt = (q, idx) => {
    if (idx == null) return `<p class="rv-a">Sin responder</p>`;
    const a = q.alternativas[idx];
    const k = q.orden.indexOf(idx);
    return `<p class="rv-a"><b>${LETRA[k]}.</b> ${a.texto ? esc(a.texto) : ""}</p>${imgs(a.imagenes, "Alternativa", "o-im")}`;
  };
  return `<section class="res ${r.aprobado ? "res-ok" : "res-no"}"><div class="wrap res-in">
    <div class="res-s">
      <span class="hx hx-big" aria-hidden="true"><b>${r.correctas}</b><small>de ${r.total}</small></span>
      <div><h1>${r.aprobado ? "¡Aprobaste!" : "Esta vez no aprobaste"}</h1>
      <p>Examen ${cat}: ${r.correctas} respuestas correctas de ${r.total}. Necesitas ${CONFIG.examen.minimo} para aprobar.</p></div>
    </div>
    <div class="res-bar" role="img" aria-label="${r.porcentaje}% de acierto; el mínimo es ${Math.round(CONFIG.examen.minimo / r.total * 100)}%">
      <i style="transform:scaleX(${r.correctas / r.total})"></i><span class="res-min" style="left:${CONFIG.examen.minimo / r.total * 100}%"><em>Mínimo ${CONFIG.examen.minimo}</em></span>
    </div>
    <ul class="res-st">
      <li><b>${r.correctas}</b>Correctas</li><li><b>${r.incorrectas}</b>Incorrectas</li><li><b>${r.sinResponder}</b>Sin responder</li>
    </ul>
    <p class="res-f">${esc(frase)}</p>
    <div class="res-b">
      <button type="button" class="b b-or" data-act="otra">${ic("exam")}Dar otro examen</button>
      <a class="b b-ld" href="#/balotario/${cat}">${ic("book")}Repasar el balotario</a>
    </div>
  </div></section>
  <section class="wrap res-ad">${anuncio(ad, "ad-big")}</section>
  <section class="wrap rv">
    ${malas.length ? `<h2 class="ttl">Revisa en qué <em>fallaste.</em></h2>
    <p class="sub">${malas.length} ${malas.length === 1 ? "pregunta" : "preguntas"} para repasar. Toca cada una para ver la respuesta correcta.</p>
    <div class="rv-l">${malas.map(({ q, i, r: idx }) => `<details class="rv-i">
      <summary><span class="q-n">${i + 1}</span><span class="rv-q">${esc(q.pregunta)}</span><span class="rv-e ${idx == null ? "e-n" : ""}">${idx == null ? "Sin responder" : "Incorrecta"}</span></summary>
      <div class="rv-d">
        ${imgs(q.imagenes, "Señal o gráfico de la pregunta", "q-im")}
        <div class="rv-x rv-mal"><span>Tu respuesta</span>${alt(q, idx)}</div>
        <div class="rv-x rv-bien"><span>Respuesta correcta</span>${alt(q, q.correcta)}</div>
      </div></details>`).join("")}</div>`
    : `<p class="rv-ok">${ic("check")}¡Respondiste todas bien! No tienes nada que repasar.</p>`}
  </section>`;
}

export const cargando = t => `<section class="pg"><div class="wrap"><p class="load"><span class="load-l"></span>${esc(t)}</p></div></section>`;
export const error = t => `<section class="pg"><div class="wrap"><div class="err"><h1 class="ttl">Algo <em>falló.</em></h1><p class="sub">${esc(t)}</p><button type="button" class="b b-or" data-act="recargar">Volver a intentar</button></div></div></section>`;
