/**
 * CONFIGURACIÓN DEL SIMULADOR
 * Todo lo que se cambia sin tocar la lógica vive aquí: contactos, categorías,
 * reglas del examen y los anuncios de Chapa Tu Licencia.
 */

const msg = t => encodeURIComponent(t);

export const CONFIG = {
  marca: {
    nombre: "Chapa Tu Licencia",
    web: "https://chapatulicencia.netlify.app/",
    direccion: "Av. Jorge Basadre 595, Of. 1, Tacna · frente al MTC",
  },

  /* WhatsApp: licencias y trámites van a la oficina; prácticas, a Keny (igual que en la web). */
  whatsapp: {
    tramite: "51905595653",
    practicas: "51918122331",
  },
  wa(tipo, texto) {
    return `https://wa.me/${this.whatsapp[tipo]}?text=${msg(texto)}`;
  },

  redes: {
    tiktok: "https://www.tiktok.com/@circuitodemanejotacna",
    instagram: "https://www.instagram.com/chapatulicencia/",
    facebook: "https://www.facebook.com/Chapatulicencia.tacna",
  },

  /* Reglas del examen de conocimientos (MTC): 40 preguntas, 40 minutos, apruebas con 35. */
  examen: { preguntas: 40, minimo: 35, minutos: 40 },

  /* Categorías. `bancos` son los archivos de data/.
     Profesionales: 20 preguntas de materias generales + 20 de la categoría. */
  grupos: [
    { id: "moto", nombre: "Moto y mototaxi", icono: "moto",
      categorias: ["B-IIb", "B-IIc"] },
    { id: "auto", nombre: "Auto", icono: "auto",
      categorias: ["A-I"] },
    { id: "pro", nombre: "Profesionales (recategorización)", icono: "camion",
      categorias: ["A-IIa", "A-IIb", "A-IIIa", "A-IIIb", "A-IIIc"] },
  ],
  categorias: {
    "B-IIb": { titulo: "Moto lineal", detalle: "Motocicletas", icono: "moto", bancos: ["b-iib"] },
    "B-IIc": { titulo: "Mototaxi y moto", detalle: "Mototaxi y motocarga; también sirve para moto lineal", icono: "mototaxi", bancos: ["b-iic"] },
    "A-I":   { titulo: "Auto", detalle: "Auto, camioneta y station wagon particular", icono: "auto", bancos: ["a-i"] },
    "A-IIa": { titulo: "Taxi", detalle: "Taxi y transporte de personas", icono: "taxi", bancos: ["generales", "a-iia"], pro: true },
    "A-IIb": { titulo: "Camión", detalle: "Microbús, minibús y camión", icono: "camion", bancos: ["generales", "a-iib"], pro: true },
    "A-IIIa": { titulo: "Bus", detalle: "Ómnibus de pasajeros", icono: "bus", bancos: ["generales", "a-iiia"], pro: true },
    "A-IIIb": { titulo: "Carga pesada", detalle: "Camiones de carga pesada", icono: "trailer", bancos: ["generales", "a-iiib"], pro: true },
    "A-IIIc": { titulo: "Bus y tráiler", detalle: "La más completa: pasajeros y carga", icono: "trailer", bancos: ["generales", "a-iiic"], pro: true },
  },
  nombresBanco: { generales: "Materias generales" },

  /* PDF del balotario oficial de cada categoría (los mismos de la web). Si falta, no se muestra el botón. */
  pdf: {
    "A-I": "https://drive.google.com/file/d/1MiIfi4jnb7clcxFFtohk-eziIVw19r2i/view?usp=sharing",
    "A-IIa": "https://drive.google.com/file/d/10lXke1BYzJEukoBpyx3Qbv35vY3MJqk6/view?usp=sharing",
    "A-IIb": "https://drive.google.com/file/d/1wbAuOyGJTXEh-qyiRf3KkbpDI8Zg7qmc/view?usp=sharing",
    "A-IIIa": "https://drive.google.com/file/d/1YOJZZHm4EBDNB-c17zE8rGEY6mPdxBol/view?usp=sharing",
    "A-IIIb": "https://drive.google.com/file/d/1bEAMP-Te-DWwm3H4PjWAupJHi5A3iDst/view?usp=sharing",
    "A-IIIc": "https://drive.google.com/file/d/1Fog8W-I584gNYTa2eq8STvSnZaSG-pv4/view?usp=sharing",
    "B-IIb": "https://drive.google.com/file/d/1K-TXNWtj5aRQQYK4hiOKfyHQ9ee2tB-Y/view?usp=sharing",
    "B-IIc": "https://drive.google.com/file/d/1JLD3UxxwMbi_4rkCdw9Q7MeAuLZWvec4/view?usp=sharing",
  },

  textos: {
    tip: "Puedes sacar directamente la B-IIc sin pasar por la B-IIb: también te sirve para moto lineal.",
    aprobado: [
      "Ya dominas las reglas. Ahora te falta el examen de manejo: practícalo en nuestro circuito.",
    ],
    desaprobado: [
      "Cada intento te acerca a tu licencia. Repasa el balotario y vuelve a intentarlo.",
      "Equivocarte aquí es ganar seguridad para el examen real.",
      "Repasa las preguntas que fallaste y vuelve a intentarlo: la práctica hace la diferencia.",
    ],
  },

  /* Publicidad con preguntas: el banco de 100 está en js/marca.js.
     En el examen sale al pasar cada `marcaCada` preguntas, respondidas o no. Mientras está abierta el reloj
     se detiene, como máximo `marcaPausaMax` segundos; así el examen siempre termina. */
  marcaCada: 10,
  marcaPausaMax: 60,

  /* Anuncios de la escuela. Se intercalan en el balotario y aparecen en el inicio y en los resultados. */
  anuncios: [
    {
      id: "practicas",
      titulo: "¿Ya te sabes las reglas? Ahora aprende a manejar.",
      texto: "Practica en nuestro circuito privado de O'Donovan, con las mismas maniobras del examen y un instructor a tu lado. Moto desde S/ 35 y auto desde S/ 50 la clase.",
      foto: "media/auto-foto-1.jpg",
      alt: "Circuito de manejo de Chapa Tu Licencia en O'Donovan, Tacna",
      cta: "Reservar una práctica",
      ctaCorto: "Reservar práctica",
      wa: ["practicas", "Hola, vengo del simulador y quiero reservar una práctica de manejo."],
    },
    {
      id: "tramite",
      titulo: "Saca tu licencia sin perder días en colas.",
      texto: "Coordinamos tu examen médico, tus citas y tus pagos, y rindes el examen de manejo con nuestro vehículo. Estamos frente al MTC en Tacna.",
      foto: "media/moto-foto-1.jpg",
      alt: "Moto de práctica en el circuito de Chapa Tu Licencia",
      cta: "Quiero sacar mi licencia",
      ctaCorto: "Sacar mi licencia",
      wa: ["tramite", "Hola, vengo del simulador y quiero sacar mi licencia con Chapa Tu Licencia."],
    },
  ],
};
