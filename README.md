# Simulador del examen MTC · Chapa Tu Licencia

Sitio estático (HTML, CSS y JavaScript con módulos), sin compilación ni base de datos.
Al entrar se ve la intro de la marca y dos opciones:

1. **Balotarios (material de estudio):** preguntas en bloques de 30 (1–30, 31–60…) con flechas, respuesta correcta marcada, buscador, filtro «Con señales», modo «Ocultar respuestas» y enlace al PDF oficial (se configura en `js/config.js`, campo `pdf`).
2. **Simulador de examen (medir el conocimiento):** 40 preguntas al azar, 40 minutos, apruebas con 35. En las profesionales: 20 de materias generales + 20 de la categoría. Al final: nota, resumen y revisión de errores.

## Estructura

| Archivo | Qué contiene |
|---|---|
| `index.html` | Página única: intro, contenedor de la app, mapa de preguntas y confirmación |
| `css/sim.css` | Estilos con el manual de marca (fuentes incluidas) |
| `js/config.js` | **Lo editable**: WhatsApp, categorías, reglas del examen, textos y anuncios |
| `js/marca.js` | **100 preguntas de marca** (publicidad) y sus botones de WhatsApp |
| `js/examen.js` | Carga de bancos, armado del examen y cálculo del resultado |
| `js/vistas.js` | Plantillas HTML de cada pantalla |
| `js/app.js` | Rutas (#/…), estado del examen y eventos |
| `data/*.json` | Bancos de preguntas ya limpios |
| `senales-1/`, `senales-2/` | Imágenes de las señales (dos carpetas porque GitHub acepta 100 archivos por subida) |

## Publicidad con preguntas

- Examen: al pasar 10, 20 y 30 preguntas (respondidas o no). No cuenta para la nota y detiene el reloj como máximo 60 segundos (`marcaPausaMax` en `js/config.js`).
- Balotario: una por cada bloque de 30, en un lugar distinto, en tarjeta azul con el aviso «Esta pregunta no es del balotario».
- A los 40 minutos el examen termina solo y muestra el resultado.

## Formato de una pregunta (`data/*.json`)

```json
{ "id": 12, "pregunta": "…", "imagenes": ["senales-1/q12-1.png"],
  "alternativas": [{ "texto": "…", "imagenes": [] }, …],
  "correcta": 2, "ordenFijo": true }
```

- `correcta` es la **posición** de la alternativa correcta (0 = A, 1 = B, 2 = C, 3 = D).
- `ordenFijo` evita mezclar las alternativas cuando una dice «las alternativas a y c son correctas».
- Las alternativas con `"final": true` («Todas…», «Ninguna…») quedan siempre al final.

## Publicar

Sube el contenido de esta carpeta a GitHub (con `index.html` en la raíz) y conéctalo a Netlify. `netlify.toml` ya está listo.
