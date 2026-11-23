/** Datos y reglas del examen: carga de bancos, armado del intento y resultado. */
import { CONFIG } from "./config.js";

const cache = new Map();

/** Carga un banco de data/ una sola vez. Cada pregunta: {id, pregunta, imagenes, alternativas:[{texto, imagenes, final?}], correcta (índice), ordenFijo?} */
export async function cargarBanco(clave) {
  if (!cache.has(clave)) {
    cache.set(clave, fetch(`data/${clave}.json`).then(r => {
      if (!r.ok) throw new Error(`No se pudo cargar ${clave}`);
      return r.json();
    }).catch(e => { cache.delete(clave); throw e; }));
  }
  return cache.get(clave);
}

/** Todos los bancos de una categoría, en orden: [{clave, nombre, preguntas}] */
export async function bancosDe(cat) {
  const c = CONFIG.categorias[cat];
  const listas = await Promise.all(c.bancos.map(cargarBanco));
  return c.bancos.map((clave, i) => ({
    clave,
    nombre: CONFIG.nombresBanco[clave] || (c.pro ? "Materias específicas" : `Preguntas de la ${cat}`),
    preguntas: listas[i],
  }));
}

export function mezclar(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

const clave = q => q.pregunta.toLowerCase().replace(/\s+/g, " ").trim() + "|" + q.imagenes.join(",");

/**
 * Mezcla las alternativas sin romper la pregunta:
 * - si alguna alternativa nombra letras («las alternativas a y c…») se respeta el orden original;
 * - «Todas / Ninguna de las alternativas» se quedan al final.
 * Guarda en `orden` el índice original de cada alternativa mostrada.
 */
function prepararPregunta(q) {
  const idx = q.alternativas.map((_, i) => i);
  let orden = idx;
  if (!q.ordenFijo) {
    const finales = idx.filter(i => q.alternativas[i].final);
    orden = [...mezclar(idx.filter(i => !q.alternativas[i].final)), ...finales];
  }
  return { ...q, orden };
}

function tomar(preguntas, n, vistas) {
  const out = [];
  for (const q of mezclar(preguntas)) {
    const k = clave(q);
    if (vistas.has(k)) continue;
    vistas.add(k); out.push(q);
    if (out.length === n) break;
  }
  return out;
}

/** Arma un intento: 40 preguntas al azar; en profesionales, 20 generales + 20 de la categoría. */
export async function armarIntento(cat) {
  const bancos = await bancosDe(cat);
  const total = CONFIG.examen.preguntas;
  const vistas = new Set();
  let elegidas;
  if (bancos.length === 1) {
    elegidas = tomar(bancos[0].preguntas, total, vistas);
  } else {
    const mitad = Math.floor(total / 2);
    const gen = tomar(bancos[0].preguntas, mitad, vistas);
    const esp = tomar(bancos[1].preguntas, total - mitad, vistas);
    elegidas = mezclar([...gen, ...esp]);
  }
  if (elegidas.length < total) throw new Error("No hay suficientes preguntas para armar el examen.");
  return elegidas.map(prepararPregunta);
}

/** respuestas[i] = índice ORIGINAL de la alternativa elegida (o null). */
export function calcularResultado(intento, respuestas) {
  let correctas = 0, sinResponder = 0;
  intento.forEach((q, i) => {
    if (respuestas[i] == null) sinResponder++;
    else if (respuestas[i] === q.correcta) correctas++;
  });
  const total = intento.length;
  return {
    total, correctas, sinResponder,
    incorrectas: total - correctas - sinResponder,
    porcentaje: Math.round((correctas / total) * 100),
    aprobado: correctas >= CONFIG.examen.minimo,
  };
}
