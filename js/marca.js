/**
 * 100 PREGUNTAS DE MARCA (publicidad de Chapa Tu Licencia)
 * Salen en el examen (al pasar 10, 20 y 30 preguntas) y una vez en cada bloque del balotario.
 * No son del balotario oficial y no cuentan para la nota.
 *
 * Formato: [pregunta, respuesta correcta, [tres opciones equivocadas], mensaje, botón, para]
 *  - Las opciones se mezclan solas cada vez: la correcta siempre se escribe primero.
 *  - botón: clave de BOTONES (abajo).
 *  - para (opcional): "moto", "auto" o "pro". Sin este dato, sale en todas las categorías.
 * Todos los datos salen de la web de la escuela. Si cambia un horario o un servicio, corrígelo aquí.
 */

const CTL = "Chapa Tu Licencia.";

/* Botón de WhatsApp de cada pregunta: [texto, a quién va, mensaje] */
export const BOTONES = {
  practica: ["Reservar mi práctica", "practicas", "Hola, vengo del simulador y quiero reservar una práctica de manejo."],
  moto: ["Practicar en moto", "practicas", "Hola, vengo del simulador y quiero practicar manejo en moto."],
  auto: ["Practicar en auto", "practicas", "Hola, vengo del simulador y quiero practicar manejo en auto."],
  cero: ["Aprender desde cero", "practicas", "Hola, vengo del simulador y quiero aprender a manejar desde cero."],
  horario: ["Elegir mi horario", "practicas", "Hola, vengo del simulador y quiero elegir un horario para practicar."],
  vehiculo: ["Vehículo para mi examen", "practicas", "Hola, vengo del simulador y quiero practicar con el vehículo de mi examen de manejo."],
  licencia: ["Sacar mi licencia", "tramite", "Hola, vengo del simulador y quiero sacar mi licencia con Chapa Tu Licencia."],
  asesor: ["Quiero que me asesoren", "tramite", "Hola, vengo del simulador y quiero que me asesoren con mi licencia."],
  recate: ["Subir de categoría", "tramite", "Hola, vengo del simulador y quiero recategorizar mi licencia."],
  revalida: ["Revalidar mi licencia", "tramite", "Hola, vengo del simulador y quiero revalidar mi licencia."],
  viaje: ["Vengo de otra ciudad", "tramite", "Hola, vengo del simulador, soy de otra ciudad y quiero dar mi examen en Tacna."],
};

const LISTA = [
  /* ---------- ¿Dónde practicar? ---------- */
  ["Ahora que ya estás estudiando las reglas, ¿sabes dónde practicar para tu examen de manejo?", "En " + CTL, ["En otra escuela.", "Con mi tío, en plena calle.", "Todavía no sé."], "Practicas las mismas maniobras del examen en un circuito privado, sin tráfico y con un instructor a tu lado.", "practica"],
  ["Apruebas el examen de reglas. ¿Cuál es tu siguiente parada?", "El circuito de " + CTL, ["El sofá, a celebrar un mes.", "Otra escuela cualquiera.", "La cochera de mi primo."], "Lo que sigue es el examen de manejo. Aprovecha el impulso y practica mientras lo tienes fresco.", "practica"],
  ["Te preguntan: «¿Y tú dónde aprendiste a manejar tan bien?». ¿Qué respondes?", "En " + CTL, ["En los videojuegos.", "En otra escuela.", "Nací sabiendo."], "Nadie nace sabiendo, pero todos pueden aprender. Te enseñamos paso a paso.", "cero"],
  ["¿Qué nombre guardas en tu celular para practicar antes del examen?", CTL, ["Primo que tiene carro.", "Otra escuela.", "Mecánico de confianza."], "Guárdanos: prácticas al 918 122 331 y licencias al 905 595 653.", "practica"],
  ["Un amigo va a dar su examen de manejo y está nervioso. ¿Qué le recomiendas?", "Que practique en " + CTL, ["Que tome más café.", "Que vaya sin practicar.", "Que busque cualquier escuela."], "Los nervios bajan con práctica. Mándanos a tu amigo, aquí lo calmamos.", "practica"],
  ["Buscas circuito para practicar en Tacna. ¿Cuál eliges?", "El de " + CTL, ["La avenida más transitada.", "El estacionamiento del mercado.", "Otro, el primero que aparezca."], "Nuestro circuito es privado: te equivocas, respiras y lo intentas otra vez sin que nadie te toque el claxon.", "practica"],
  ["Completa la frase: «Para mi examen de manejo, yo practico en…»", CTL, ["…mi imaginación.", "…la calle, a la suerte.", "…otra escuela."], "Así de fácil. Reserva tu clase y llega seguro a tu examen.", "practica"],
  ["¿Quién te acompaña en el asiento de al lado mientras aprendes?", "Un instructor de " + CTL, ["Tu suegra.", "Nadie, que sea sorpresa.", "Un amigo que grita."], "Si estás aprendiendo, tu instructor va a tu lado con la mano en el freno de mano.", "auto", "auto"],
  ["Tienes libre una hora antes del trabajo. ¿En qué la inviertes?", "En practicar en " + CTL, ["En dormir cinco minutos más, doce veces.", "En ver videos de choques.", "En buscar otra escuela."], "Abrimos desde las 6:00 a. m. Antes de las 8:00 a. m. la clase dura 45 minutos: practicas y llegas a tu trabajo.", "horario"],
  ["Si la práctica hace al maestro, ¿dónde se hace la práctica?", "En " + CTL, ["En sueños.", "En otra escuela.", "En la vereda."], "Circuito privado, instructor personalizado y las maniobras del examen.", "practica"],
  ["¿Qué escuela te viene a la mente cuando alguien dice «circuito de manejo en Tacna»?", CTL, ["Ninguna.", "Otra.", "Déjame pensarlo."], "¡Que sea la primera! Estamos en O'Donovan con circuitos de auto y de moto.", "practica"],
  ["Tu examen de manejo es pronto. ¿Con quién haces una simulación real?", "Con " + CTL, ["Con una silla y una tapa de olla.", "Con mi sobrino de seis años.", "Con nadie."], "Hacemos la simulación del examen para que el día de la prueba no haya sorpresas.", "practica"],
  ["Llueven consejos: «que mi vecino te enseñe», «que tu cuñado te preste». ¿Tú qué haces?", "Voy a " + CTL, ["Escucho a todos y no hago nada.", "Le rayo el carro al cuñado.", "Cierro los ojos y acelero."], "Cuida tu carro y tu familia. Practica con instructor y en circuito.", "cero"],
  ["¿Dónde está permitido que se te apague el motor sin que nadie se enoje?", "En el circuito de " + CTL, ["En plena avenida.", "Delante de una combi apurada.", "En la puerta de una clínica."], "Aquí equivocarse es parte de aprender. Te explicamos las veces que haga falta.", "cero"],
  ["Elige tu plan para este fin de semana.", "Practicar en " + CTL, ["Mirar cómo manejan los demás.", "Pedir que me lleven otra vez.", "Dejarlo para el próximo año."], "Damos clases también sábados y domingos, hasta las 5:00 p. m.", "horario"],

  ["Juntas tus ahorros para aprender a manejar. ¿Dónde los inviertes?", "En " + CTL, ["En un volante de juguete.", "En otra escuela.", "En stickers para el carro que no tengo."], "Elige la cantidad de clases que necesitas y avanza a tu ritmo.", "practica"],
  ["¿Quién te espera en el circuito cuando cierres este simulador?", CTL, ["Nadie.", "Otra escuela.", "Un cono solitario."], "Reserva tu clase por WhatsApp y empieza esta misma semana.", "practica"],

  /* ---------- Nombre y frases de la escuela ---------- */
  ["¿En qué escuela te dicen «¡Ya la chapaste!»?", "En " + CTL, ["En otra escuela.", "En ninguna.", "En la panadería."], "¡Esa frase es nuestra! Y queremos decírtela a ti.", "licencia"],
  ["«Conducir es fácil, con los mejores». ¿De quién es esta frase?", "De " + CTL, ["De mi abuelita.", "De otra escuela.", "De un sticker."], "Es nuestro lema. Ven y compruébalo en tu primera clase.", "practica"],
  ["«Maneja con tu licencia en días, no en meses». ¿Quién lo dice?", CTL, ["Un adivino.", "Otra escuela.", "Mi horóscopo."], "Nos encargamos del papeleo mientras tú aprendes.", "licencia"],
  ["¿Cómo se llama la escuela que hizo este simulador?", CTL, ["No me fijé.", "Otra escuela.", "Se hizo solo."], "Lo hicimos para que estudies gratis. Cuando apruebes, te esperamos para las prácticas.", "practica"],
  ["Arma el nombre correcto de la escuela:", CTL, ["Chapa Tu Bicicleta.", "Presta Tu Licencia.", "Espera Tu Licencia."], "Chapa Tu Licencia: escuela de manejo y trámites en Tacna.", "asesor"],
  ["Completa el nombre de la escuela: «____ Tu Licencia».", "Chapa Tu Licencia.", ["Pierde Tu Licencia.", "Sueña Tu Licencia.", "Olvida Tu Licencia."], "¡Chapa Tu Licencia! Escríbenos y empieza hoy.", "licencia"],
  ["Si «chapar» es atrapar algo, ¿qué chapas en Chapa Tu Licencia?", "Mi licencia.", ["Un resfrío.", "Una papeleta.", "El último bus."], "Te acompañamos hasta que tengas tu licencia en la mano.", "licencia"],
  ["¿Qué colores tiene el logo de Chapa Tu Licencia?", "Azul, naranja y blanco.", ["Rosado con lunares.", "Verde fosforescente.", "No tiene colores."], "Búscanos por esos colores frente al MTC.", "asesor"],
  ["¿Qué vehículos aparecen en el logo de Chapa Tu Licencia?", "Un auto y una moto.", ["Un tren y un barco.", "Un avión.", "Una bicicleta."], "Porque enseñamos a manejar los dos. ¿Con cuál empiezas?", "practica"],
  ["Ves un hexágono con un auto y una moto. ¿Qué piensas?", "Ahí está " + CTL, ["Una colmena.", "Un balón de fútbol.", "Otra escuela."], "¡Ya reconoces nuestra marca! Pasa a saludarnos.", "asesor"],

  /* ---------- Ubicación y contacto ---------- */
  ["Estás frente al MTC de Tacna y quieres tu licencia. ¿A quién buscas?", "A " + CTL, ["Al señor de los emolientes.", "A otra escuela.", "A la suerte."], "Nuestra oficina queda en la Av. Jorge Basadre 595, Of. 1, frente al MTC.", "asesor"],
  ["¿Frente a qué entidad está la oficina de Chapa Tu Licencia?", "Frente al MTC.", ["Frente al mar.", "Frente al estadio.", "Frente al aeropuerto."], "Av. Jorge Basadre 595, Of. 1, Tacna. Así de cerca de tu trámite.", "asesor"],
  ["¿En qué avenida queda la oficina de Chapa Tu Licencia?", "Av. Jorge Basadre.", ["Av. Siempre Viva.", "Av. Del Olvido.", "Av. Sin Salida."], "Av. Jorge Basadre 595, Of. 1. Te asesoramos de lunes a sábado.", "asesor"],
  ["¿En qué zona de Tacna están los circuitos de Chapa Tu Licencia?", "En O'Donovan.", ["En la Luna.", "En el centro comercial.", "En la playa."], "Al costado del colegio Nuestros Héroes de la Guerra del Pacífico.", "practica"],
  ["¿En qué ciudad te espera Chapa Tu Licencia?", "En Tacna.", ["En Narnia.", "En París.", "En Wakanda."], "Nacimos en Tacna y aquí te esperamos.", "asesor"],
  ["Quieres escribirle a Chapa Tu Licencia ahora mismo. ¿Por dónde?", "Por WhatsApp.", ["Por paloma mensajera.", "Por telegrama.", "Por señales de humo."], "Licencias y trámites al 905 595 653; prácticas al 918 122 331.", "asesor"],
  ["¿En qué red puedes ver a nuestros alumnos con su licencia?", "En el TikTok de " + CTL, ["En el Messenger de 2008.", "En una postal.", "En el periódico de ayer."], "Síguenos en TikTok, Instagram y Facebook: los logos están arriba, a la derecha.", "asesor"],
  ["Un sábado a las 10 de la mañana quieres que te asesoren. ¿A dónde vas?", "A la oficina de " + CTL, ["A ninguna parte.", "A otra escuela.", "A esperar el lunes."], "Los sábados atendemos de 7:30 a. m. a 2:00 p. m.", "asesor"],
  ["¿Desde qué hora atiende la oficina de Chapa Tu Licencia de lunes a viernes?", "Desde las 7:30 a. m.", ["Desde el mediodía.", "Desde las 9 de la noche.", "Cuando salga la luna."], "De lunes a viernes, de 7:30 a. m. a 5:00 p. m.", "asesor"],
  ["Tu amigo no sabe llegar a Chapa Tu Licencia. ¿Qué le dices?", "Está frente al MTC, en la Av. Jorge Basadre 595.", ["Sigue a las palomas.", "Pregunta en la Luna.", "Voltea hasta marearte."], "Y en la web hay un video de cómo llegar.", "asesor"],

  /* ---------- Horarios y clases ---------- */
  ["¿Qué días puedes practicar en Chapa Tu Licencia?", "De lunes a domingo.", ["Solo los lunes.", "Solo en feriados.", "Cada año bisiesto."], "Todos los días, de 6:00 a. m. a 5:00 p. m.", "horario"],
  ["¿Desde qué hora puedes empezar tu clase en Chapa Tu Licencia?", "Desde las 6:00 a. m.", ["Desde el mediodía.", "Desde la medianoche.", "Desde que cante el grillo."], "Así practicas y no pierdes tu trabajo.", "horario"],
  ["Trabajas de lunes a sábado. ¿Igual puedes practicar?", "Sí, en " + CTL, ["No, imposible.", "Solo si renuncio.", "Solo en vacaciones."], "Damos clases también los domingos y desde muy temprano.", "horario"],
  ["¿Cuánto dura una clase normal en Chapa Tu Licencia?", "60 minutos.", ["Cinco minutos.", "Todo el día.", "Lo que dure una canción."], "Una hora completa. Antes de las 8:00 a. m. son 45 minutos.", "horario"],
  ["No puedes ir a tu clase en Chapa Tu Licencia. ¿Qué haces?", "Aviso con 2 horas de anticipación.", ["Me escondo.", "Apago el celular.", "Mando a mi hermano."], "Avísanos con 2 horas y coordinamos contigo.", "horario"],
  ["¿Qué pasa cuando tomas más clases en Chapa Tu Licencia?", "Pago menos por cada una.", ["Me sale barba.", "Me cobran doble.", "Nada."], "Tenemos paquetes de varias clases. Pregúntanos cuál te conviene.", "practica"],
  ["¿Cuál es el mejor momento para empezar a practicar?", "Hoy, en " + CTL, ["Mañana, siempre mañana.", "El próximo siglo.", "Cuando sea grande."], "Cada semana que lo dejas para después es una semana más pidiendo que te lleven.", "practica"],
  ["Son las 6:00 a. m. y quieres manejar. ¿Quién ya está listo para enseñarte?", CTL, ["El gallo.", "Nadie.", "Mi almohada."], "Madrugamos contigo, todos los días.", "horario"],

  /* ---------- Aprender desde cero, con paciencia ---------- */
  ["Nunca has manejado. ¿Quién te enseña desde cero y sin burlas?", CTL, ["Un tutorial a doble velocidad.", "Mi hermano mayor.", "Otra persona con prisa."], "Cada alumno aprende a su ritmo. Te explicamos las veces que haga falta, sin gritos.", "cero"],
  ["¿Qué recibes de un instructor de Chapa Tu Licencia?", "Paciencia.", ["Gritos.", "Un pellizco.", "Silencio absoluto."], "La paciencia y la empatía son parte de nuestra forma de enseñar.", "cero"],
  ["Tienes miedo de manejar. ¿Qué te conviene?", "Empezar en el circuito de " + CTL, ["Salir directo a la carretera.", "No manejar nunca.", "Cerrar los ojos."], "Empiezas en circuito, sin tráfico y con tu instructor al lado.", "cero"],
  ["«Mi mamá grita cada vez que freno». ¿Solución?", "Aprender con " + CTL, ["Ponerme audífonos.", "No frenar.", "Dejar a mamá en la esquina."], "Con nosotros solo escucharás indicaciones claras.", "cero"],
  ["¿A qué ritmo aprendes en Chapa Tu Licencia?", "A mi propio ritmo.", ["A ritmo de ambulancia.", "Al de la tortuga del vecino.", "Al que grite más fuerte."], "Avanzas cuando te sientes listo. Nadie te apura.", "cero"],
  ["¿Qué te pide Chapa Tu Licencia para tu primera clase?", "Ganas de aprender.", ["Saber manejar ya.", "Traer un carro propio.", "No tener nervios."], "El vehículo y el equipo de protección los ponemos nosotros.", "cero"],
  ["¿Quién pone el vehículo para tus prácticas?", CTL, ["Yo, que no tengo.", "El vecino, sin saberlo.", "Mi ex."], "Practicas con nuestros vehículos. Tú solo vienes a aprender.", "practica"],
  ["¿Dónde prefieres aprender a estacionar?", "Entre los conos del circuito de " + CTL, ["Entre dos carros nuevos.", "Delante de un público.", "En la cochera del jefe."], "Los conos no cobran por el golpe. Practica aquí hasta que te salga.", "auto", "auto"],
  ["Reversa, conos y cero estrés. ¿De qué lugar hablamos?", "Del circuito de " + CTL, ["De un parque de diversiones.", "De la calle principal.", "De otra parte."], "Las mismas maniobras del examen, sin tráfico.", "practica"],

  /* ---------- Vehículo para el examen ---------- */
  ["Si practicas en Chapa Tu Licencia, ¿con qué vehículo rindes tu examen de manejo?", "Con el mismo con el que practiqué.", ["Con el que consiga prestado.", "Con uno que nunca he visto.", "Con el de mi cuñado."], "Llegas al examen conociendo tu vehículo. Esa confianza se nota.", "vehiculo"],
  ["Mañana es tu examen y no tienes vehículo. ¿A quién llamas?", "A " + CTL, ["A todos mis primos.", "A los bomberos.", "A nadie, voy caminando."], "Te ponemos el vehículo para tu examen. Coordina con tiempo.", "vehiculo"],
  ["¿Por qué conviene dar el examen con el vehículo que practicaste en Chapa Tu Licencia?", "Porque ya lo conozco.", ["Porque huele rico.", "Porque tiene nombre.", "Porque combina con mi ropa."], "En Chapa Tu Licencia practicas y rindes con el mismo vehículo.", "vehiculo"],
  ["Prestas el carro de un amigo para el examen y no sabes ni prender las luces. ¿Qué faltó?", "Practicar en " + CTL, ["Más suerte.", "Un amuleto.", "Otro amigo."], "Practica y rinde con nuestro vehículo: cero sorpresas.", "vehiculo"],
  ["No sabes usar embrague y quieres la A-I. ¿Qué auto te conviene?", "El automático secuencial de " + CTL, ["Uno sin ruedas.", "El de mi tío, que se apaga.", "Ninguno."], "Nuestro auto A-I es automático secuencial: sin embrague, menos nervios.", "auto", "auto"],
  ["Quieres aprender a manejar un auto mecánico. ¿Dónde practicas?", "En " + CTL, ["En una cabina de videojuego.", "En la bajada de mi casa.", "En otra parte."], "También tenemos clases de caja mecánica.", "auto", "auto"],
  ["¿Qué usan todos, siempre, en el auto de Chapa Tu Licencia?", "El cinturón de seguridad.", ["Lentes oscuros.", "Gorro de fiesta.", "Pantuflas."], "En Chapa Tu Licencia la seguridad va primero, aunque haya prisa.", "auto", "auto"],
  ["¿Qué lugar te da auto, instructor y circuito en una misma clase?", CTL, ["Un taller mecánico.", "Un lavadero.", "Una tienda de llantas."], "Todo incluido en tu clase. Solo trae tus ganas.", "auto", "auto"],

  /* ---------- Moto y mototaxi ---------- */
  ["¿Dónde aprendes a manejar moto con casco, rodilleras y coderas prestados?", "En " + CTL, ["En la chacra, con fe.", "En la avenida, a la suerte.", "Viendo videos."], "El equipo de protección te lo prestamos nosotros.", "moto", "moto"],
  ["Nunca usaste embrague y quieres aprender moto. ¿A dónde vas?", "A " + CTL, ["Directo a la carretera.", "A otra parte.", "A comprarme una bicicleta."], "Nuestra moto de práctica es semiautomática, sin embrague.", "moto", "moto"],
  ["Equilibrio, arranque, frenado y giros. ¿Dónde los practicas?", "En el circuito de moto de " + CTL, ["En el techo de mi casa.", "En el mercado.", "En la pista de baile."], "Con instructor a tu lado y sin tráfico.", "moto", "moto"],
  ["¿Qué nunca falta en una clase de moto de Chapa Tu Licencia?", "El casco.", ["El selfie stick.", "La capa de superhéroe.", "El parlante."], "Si empiezas desde cero, casco, rodilleras y coderas son obligatorios. Te los prestamos.", "moto", "moto"],
  ["Tu moto tiene dos ruedas. ¿Y tu plan para la licencia?", "Uno: " + CTL, ["Ninguno.", "Dos: suerte y fe.", "Pedir prestada otra."], "Te acompañamos en la práctica y en todo el trámite.", "moto", "moto"],
  ["¿Qué escuela te prepara para la licencia de moto y también para la de mototaxi?", CTL, ["Una escuela de natación.", "Una de cocina.", "Ninguna."], "Tenemos prácticas en moto lineal y en mototaxi.", "moto", "moto"],
  ["Tu mototaxi es tu trabajo. ¿Quién te ayuda a ponerlo en regla?", CTL, ["El destino.", "Un cartel de «se vende».", "La suerte."], "Coordinamos tu escuela de conductores, tus prácticas y tu trámite.", "licencia", "moto"],
  ["¿Con qué licencia de Chapa Tu Licencia manejas mototaxi y también moto lineal?", "La B-IIc.", ["La de pesca.", "La de bicicleta.", "La de matrimonio."], "Y puedes ir directo a la B-IIc, sin pasar por la B-IIb.", "licencia", "moto"],
  ["Ya manejas moto, pero sin licencia. ¿Qué haces?", "La saco con " + CTL, ["Me escondo en cada control.", "Manejo solo de noche.", "Espero la papeleta."], "Pasa tranquilo por cualquier control. Nosotros te ayudamos.", "licencia", "moto"],

  /* ---------- Trámite y asesoría ---------- */
  ["Si quieres tu licencia en días y no en meses, ¿a quién llamas?", "A " + CTL, ["A la suerte.", "A nadie: hago colas.", "A mi primo que «conoce a alguien»."], "Coordinamos tu examen médico, tus citas y tus pagos. Tú solo vienes a aprender.", "licencia"],
  ["¿Quién coordina tu examen médico, tus citas y tus pagos?", CTL, ["Mi mascota.", "El azar.", "Nadie, sufro solo."], "Tú aprendes; del resto nos encargamos nosotros.", "licencia"],
  ["Hay cola en la ventanilla, otra en el banco y otra más allá. ¿Qué prefieres?", "Que me asesore " + CTL, ["Las tres colas.", "Vender gaseosas en la cola.", "Hacer amigos en la cola."], "Te ayudamos para que no pierdas días entre ventanillas.", "licencia"],
  ["¿Hasta cuándo te acompaña Chapa Tu Licencia?", "Hasta tener mi licencia en la mano.", ["Hasta la esquina.", "Hasta que llueva.", "Hasta el primer semáforo."], "Seguimos tu trámite de principio a fin.", "licencia"],
  ["No sabes qué categoría de licencia necesitas. ¿A quién le preguntas?", "A " + CTL, ["A una moneda al aire.", "Al loro del vecino.", "A un foro de 2009."], "Cuéntanos qué vehículo quieres manejar y te decimos tu camino.", "asesor"],
  ["¿Qué escuela te enseña a manejar y además te ayuda con el trámite?", CTL, ["Ninguna, imposible.", "Una escuela de baile.", "Otra, quizás."], "Prácticas y trámite en un solo lugar, frente al MTC.", "licencia"],
  ["¿Con qué puedes separar tu cupo en Chapa Tu Licencia?", "Con Yape o Plin.", ["Con monedas de chocolate.", "Con figuritas.", "Con un abrazo."], "Separas tu cupo y el resto lo pagas en partes.", "licencia"],
  ["¿Cómo puedes pagar tu paquete en Chapa Tu Licencia?", "En partes.", ["Con una vaca.", "En piedras preciosas.", "Con promesas."], "Separas tu cupo, congelas el precio y pagas el resto en partes.", "licencia"],
  ["¿Dónde ves los precios de Chapa Tu Licencia antes de preguntar?", "En su página web.", ["En una bola de cristal.", "En las estrellas.", "En un sobre secreto."], "Precios claros y con todo lo que incluye: chapatulicencia.netlify.app.", "asesor"],
  ["¿Qué promete Chapa Tu Licencia sobre precios y plazos?", "Que son reales.", ["Que son un misterio.", "Que cambian cada hora.", "Que se adivinan."], "Nunca te prometemos lo que no depende de nosotros. Eso es honestidad.", "asesor"],
  ["¿Quién toma el examen y quién te prepara?", "Lo toma la autoridad; me prepara " + CTL, ["Los dos son mi tío.", "Nadie hace nada.", "Se toma solo."], "Nadie puede garantizarte el resultado, pero sí una buena preparación.", "practica"],
  ["Desaprobaste el examen de manejo. ¿Qué haces?", "Refuerzo con " + CTL, ["Vendo mi carro imaginario.", "Culpo al cono.", "Me rindo."], "Reprogramamos y reforzamos contigo lo que faltó.", "practica"],
  ["¿Cuántos alumnos de Chapa Tu Licencia aprueban su examen de manejo a la primera?", "9 de cada 10.", ["1 de cada 10.", "3 de cada 10.", "Nadie los contó."], "Según nuestros registros internos. Prepárate y sé el siguiente.", "practica"],
  ["Estudias con nuestro simulador y practicas en nuestro circuito. ¿Cómo llegas al examen?", "Preparado, gracias a " + CTL, ["En patineta.", "Tarde.", "Con los ojos cerrados."], "Teoría aquí y práctica en el circuito: la combinación completa.", "practica"],
  ["Tu licencia está por vencer. ¿Quién te ayuda a revalidarla?", CTL, ["El calendario.", "Nadie.", "La tía de un amigo."], "También te ayudamos con la revalidación, sin colas.", "revalida"],
  ["¿Qué trámite también hace Chapa Tu Licencia, además de licencias nuevas?", "Revalidación.", ["Pasaporte de mascota.", "Partida de ajedrez.", "Carnet de biblioteca."], "Y también recategorización. Pregúntanos por tu caso.", "revalida"],
  ["Tienes papeletas y dudas. ¿Con quién lo conversas?", "Con " + CTL, ["Con el espejo.", "Con el cobrador.", "Con nadie, me preocupo solo."], "Cuéntanos tu caso y te orientamos antes de empezar.", "asesor"],

  /* ---------- La escuela ---------- */
  ["¿Quiénes fundaron Chapa Tu Licencia?", "Dos hermanos, en Tacna.", ["Dos extraterrestres.", "Un comité de gatos.", "Nadie lo sabe."], "Dos hermanos que quisieron una escuela cercana y confiable.", "asesor"],
  ["¿Qué tipo de escuela es Chapa Tu Licencia?", "De manejo, cercana y confiable.", ["De magia.", "De surf.", "De canto."], "Hecha en Tacna, para que aprendas con confianza.", "asesor"],
  ["¿Qué va primero en Chapa Tu Licencia?", "La seguridad.", ["La velocidad.", "El selfie.", "El almuerzo."], "Ninguna práctica vale más que tu integridad.", "practica"],
  ["Conos, instructor y un cielo tacneño. ¿Dónde estás?", "En el circuito de " + CTL, ["En la televisión.", "En un sueño.", "Perdido."], "Te esperamos en O'Donovan, de lunes a domingo.", "practica"],
  ["¿Qué puedes hacer en Chapa Tu Licencia?", "Aprender, practicar y tramitar mi licencia.", ["Solo tomar café.", "Solo mirar.", "Alquilar un submarino."], "Todo en un solo equipo que conoce tu caso.", "licencia"],
  ["Cierra los ojos y piensa en «licencia». ¿Qué marca aparece?", CTL, ["Ninguna, me dormí.", "Otra.", "Un cartel borroso."], "Eso esperamos. Ahora ven a conocernos.", "licencia"],

  /* ---------- Profesionales y otras ciudades ---------- */
  ["Quieres subir de categoría para trabajar. ¿Quién te orienta?", CTL, ["El chofer de al lado.", "Nadie.", "La suerte."], "Taxi, camión, bus o tráiler: te decimos qué requisitos te tocan.", "recate", "pro"],
  ["Más categoría, más oportunidades. ¿Con quién recategorizas?", "Con " + CTL, ["Con mi grupo de fútbol.", "Con otra escuela.", "Con una app de citas."], "Escuela de conductores, práctica y trámite, todo coordinado.", "recate", "pro"],
  ["Necesitas un camión para tu examen. ¿Dónde lo consigues?", "En " + CTL, ["En una juguetería.", "En la carretera, pidiendo.", "En mi cochera de bicicletas."], "Tenemos práctica en camión y el camión para tu examen.", "vehiculo", "pro"],
  ["Bus y tráiler con una sola licencia. ¿Quién te ayuda con la A-IIIc?", CTL, ["Un mago.", "Nadie.", "Mi vecino el futbolista."], "Te acompañamos en la categoría más alta.", "recate", "pro"],
  ["Trabajas manejando y no puedes perder días. ¿Qué eliges?", "Que Chapa Tu Licencia coordine mi trámite.", ["Faltar una semana.", "Dejarlo para otro año.", "Manejar sin la categoría."], "Organizamos tus citas para que pierdas el menor tiempo posible.", "recate", "pro"],
  ["Vienes de otra ciudad a dar tu examen en Tacna. ¿Quién te recibe?", CTL, ["Nadie.", "Un taxi caro.", "Las palomas de la plaza."], "Tenemos paquetes para quienes vienen de Arequipa, Moquegua, Puno, Cusco o Lima.", "viaje"],
];

/* Para cada categoría: las preguntas generales más las de su tipo de vehículo */
const GRUPO = { "B-IIb": "moto", "B-IIc": "moto", "A-I": "auto" };

const mezclar = l => { const a = [...l]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; };

export const TOTAL = LISTA.length;
export const crudas = LISTA;

/* Reparte preguntas sin repetir hasta agotar las que tocan a la categoría (examen y balotario comparten el mazo) */
const mazos = new Map();
export function siguienteMarca(cat) {
  const grupo = GRUPO[cat] || "pro";
  if (!mazos.get(grupo)?.length) mazos.set(grupo, mezclar(LISTA.filter(q => !q[5] || q[5] === grupo)));
  const [pregunta, bien, mal, respuesta, boton] = mazos.get(grupo).pop();
  const opciones = mezclar([bien, ...mal]);
  const [cta, tipo, texto] = BOTONES[boton];
  return { pregunta, opciones, correcta: opciones.indexOf(bien), respuesta, cta, wa: [tipo, texto] };
}
