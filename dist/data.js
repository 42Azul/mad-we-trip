// Curated Madrid guide. Source check: 23 October 2026.
const SOURCES = {
  "man": "https://www.man.es/man/visita/tarifas.html",
  "manHours": "https://www.man.es/man/visita/horarios.html",
  "prado": "https://www.museodelprado.es/visita/prepara-tu-visita",
  "reina": "https://www.museoreinasofia.es/visita/horarios-tarifas/",
  "paco": "https://todoestaenmadrid.com/es/shops/bar-casa-paco",
  "equis": "https://www.esmadrid.com/informacion-turistica/sala-equis",
  "pez": "https://peztortilla.com/contacto/",
  "camacho": "https://www.esmadrid.com/restaurantes/casa-camacho",
  "rastro": "https://www.esmadrid.com/compras/el-rastro",
  "almeria": "https://www.esmadrid.com/restaurantes/taberna-almeria",
  "tigre": "https://www.esmadrid.com/restaurantes/tigre",
  "metro": "https://www.crtm.es/comunicacion/actualidad-del-servicio/avisos/avisos-metro/",
  "trash": "https://diario.madrid.es/blog/notas-de-prensa/un-rebano-de-1-400-ovejas-y-cabras-protagoniza-la-fiesta-de-la-trashumancia-el-cambio-de-recorrido-llevara-la-recepcion-municipal-a-la-plaza-de-la-villa/"
};
const REFERENCES = {
  "man": {
    "title": "MAN: free admission",
    "url": "https://www.man.es/man/visita/tarifas.html",
    "publisher": "Museo Arqueológico Nacional",
    "scope": "Saturday free entry from 14:00",
    "checked": "23 October 2026"
  },
  "manHours": {
    "title": "MAN: opening hours",
    "url": "https://www.man.es/man/visita/horarios.html",
    "publisher": "Museo Arqueológico Nacional",
    "scope": "Saturday 09:30–20:00",
    "checked": "23 October 2026"
  },
  "prado": {
    "title": "Prado: visit information",
    "url": "https://www.museodelprado.es/visita/prepara-tu-visita",
    "publisher": "Museo del Prado",
    "scope": "Hours and admission",
    "checked": "23 October 2026"
  },
  "pradoFree": {
    "title": "Prado: free collection hours",
    "url": "https://entradas.museodelprado.es/",
    "publisher": "Museo del Prado",
    "scope": "Sunday 17:00–19:00; ticket availability is not checked",
    "checked": "23 October 2026"
  },
  "reina": {
    "title": "Reina Sofía: opening hours and admission",
    "url": "https://www.museoreinasofia.es/visita/horarios-tarifas/",
    "publisher": "Museo Reina Sofía",
    "scope": "Friday free hours",
    "checked": "23 October 2026"
  },
  "paco": {
    "title": "Bar Casa Paco, Altamirano 38",
    "url": "https://todoestaenmadrid.com/es/shops/bar-casa-paco",
    "publisher": "Todo está en Madrid · City Council",
    "scope": "Address, phone and tortilla menu",
    "checked": "23 October 2026"
  },
  "equis": {
    "title": "Sala Equis",
    "url": "https://www.esmadrid.com/informacion-turistica/sala-equis",
    "publisher": "Madrid Tourism",
    "scope": "Address and published bar opening hours",
    "checked": "23 October 2026"
  },
  "pez": {
    "title": "Pez Tortilla: locations and reservations",
    "url": "https://peztortilla.com/contacto/",
    "publisher": "Pez Tortilla",
    "scope": "Pez 36 and Pez 7; no reservations",
    "checked": "23 October 2026"
  },
  "camacho": {
    "title": "Casa Camacho",
    "url": "https://www.esmadrid.com/restaurantes/casa-camacho",
    "publisher": "Madrid Tourism",
    "scope": "Visitor information",
    "checked": "23 October 2026"
  },
  "rastro": {
    "title": "El Rastro",
    "url": "https://www.esmadrid.com/compras/el-rastro",
    "publisher": "Madrid Tourism",
    "scope": "Visitor information",
    "checked": "23 October 2026"
  },
  "almeria": {
    "title": "Taberna Almería",
    "url": "https://www.esmadrid.com/restaurantes/taberna-almeria",
    "publisher": "Madrid Tourism",
    "scope": "Visitor information",
    "checked": "23 October 2026"
  },
  "tigre": {
    "title": "Sidrería El Tigre",
    "url": "https://www.esmadrid.com/restaurantes/tigre",
    "publisher": "Madrid Tourism",
    "scope": "Visitor information",
    "checked": "23 October 2026"
  },
  "metro": {
    "title": "Metro service alerts",
    "url": "https://www.crtm.es/comunicacion/actualidad-del-servicio/avisos/avisos-metro/",
    "publisher": "CRTM",
    "scope": "L6 western section closed 24–25 October; L10 works",
    "checked": "23 October 2026"
  },
  "trash": {
    "title": "Trashumancia: 2026 route and arrival time",
    "url": "https://diario.madrid.es/blog/notas-de-prensa/un-rebano-de-1-400-ovejas-y-cabras-protagoniza-la-fiesta-de-la-trashumancia-el-cambio-de-recorrido-llevara-la-recepcion-municipal-a-la-plaza-de-la-villa/",
    "publisher": "Madrid City Council",
    "scope": "Sunday 25 October; Villa arrival approximately 11:15–11:25",
    "checked": "23 October 2026",
    "published": "22 October 2026"
  },
  "retiro": {
    "title": "El Retiro: park information",
    "url": "https://www.esmadrid.com/informacion-turistica/parque-del-retiro",
    "publisher": "Madrid Tourism",
    "scope": "Park opening hours and weather closures",
    "checked": "23 October 2026"
  },
  "cristal": {
    "title": "Palacio de Cristal: temporary closure",
    "url": "https://www.esmadrid.com/informacion-turistica/palacio-de-cristal",
    "publisher": "Madrid Tourism",
    "scope": "Interior closed for restoration",
    "checked": "23 October 2026"
  },
  "mayor": {
    "title": "Plaza Mayor: construction and fires",
    "url": "https://www.comunidad.madrid/noticias/2017/01/11/plaza-mayor-cuatrocientos-anos-historia-madrid",
    "publisher": "Comunidad de Madrid",
    "scope": "1617–19 construction; reconstruction after the 1790 fire",
    "checked": "23 October 2026"
  },
  "villa": {
    "title": "Plaza de la Villa: its three main buildings",
    "url": "https://www.esmadrid.com/informacion-turistica/plaza-de-la-villa",
    "publisher": "Madrid Tourism",
    "scope": "Lujanes, Cisneros and Casa de la Villa dates",
    "checked": "23 October 2026"
  },
  "palace": {
    "title": "Royal Palace: history",
    "url": "https://www.esmadrid.com/informacion-turistica/palacio-real",
    "publisher": "Madrid Tourism",
    "scope": "Alcázar fire and construction of the Bourbon palace",
    "checked": "23 October 2026"
  },
  "palaceVisit": {
    "title": "Royal Palace: visits and tickets",
    "url": "https://www.patrimonionacional.es/visita/palacio-real-de-madrid",
    "publisher": "Patrimonio Nacional",
    "scope": "Paid interior visit; check available times",
    "checked": "23 October 2026"
  },
  "wall": {
    "title": "Madrid’s Muslim wall",
    "url": "https://www.esmadrid.com/informacion-turistica/muralla-arabe",
    "publisher": "Madrid Tourism",
    "scope": "Origins of the fortified settlement",
    "checked": "23 October 2026"
  },
  "bridge": {
    "title": "Puente de Segovia: history and alterations",
    "url": "https://patrimonioypaisaje.madrid.es/portales/monumenta/es/Monumentos-y-Edificios-Singulares/Monumentos/Puente-de-Segovia/?vgnextchannel=8fac3cb702aa4510VgnVCM1000008a4a900aRCRD&vgnextfmt=default&vgnextoid=06e8091d1b9c4510091d1b9c45102e085a0aRCRD",
    "publisher": "Madrid City Council · Heritage",
    "scope": "Gaspar de Vega, Juan de Herrera and the 1574–84 works",
    "checked": "23 October 2026"
  },
  "river": {
    "title": "Madrid Río: the riverside transformation",
    "url": "https://www.esmadrid.com/barrios-de-madrid/madrid-rio",
    "publisher": "Madrid Tourism",
    "scope": "Park opened in April 2011",
    "checked": "23 October 2026"
  },
  "matadero": {
    "title": "Matadero: current programme",
    "url": "https://www.mataderomadrid.org/",
    "publisher": "Matadero Madrid",
    "scope": "Check individual exhibition access",
    "checked": "23 October 2026"
  },
  "debod": {
    "title": "Temple of Debod",
    "url": "https://www.esmadrid.com/informacion-turistica/templo-de-debod",
    "publisher": "Madrid Tourism",
    "scope": "Visitor information",
    "checked": "23 October 2026"
  },
  "sanisidro": {
    "title": "Museo de San Isidro: hours and free entry",
    "url": "https://www.esmadrid.com/informacion-turistica/museo-de-san-isidro-los-origenes-de-madrid",
    "publisher": "Madrid Tourism",
    "scope": "Tuesday–Sunday 10:00–20:00; free",
    "checked": "23 October 2026"
  },
  "historia": {
    "title": "Museo de Historia: hours and free entry",
    "url": "https://www.esmadrid.com/informacion-turistica/museo-de-historia",
    "publisher": "Madrid Tourism",
    "scope": "Tuesday–Sunday 10:00–20:00; free",
    "checked": "23 October 2026"
  },
  "betijai": {
    "title": "Beti Jai: 24–25 October pelota exhibitions",
    "url": "https://diario.madrid.es/blog/notas-de-prensa/el-beti-jai-reprograma-las-exhibiciones-de-pelota-mano-y-frontenis-para-los-dias-24-y-25-de-octubre/",
    "publisher": "Madrid City Council",
    "scope": "Free reserved sessions at 10:30, 12:00, 15:30 and 17:00",
    "checked": "23 October 2026",
    "published": "21 October 2026"
  },
  "ardosa": {
    "title": "Bodega de la Ardosa",
    "url": "https://www.esmadrid.com/restaurantes/bodega-ardosa",
    "publisher": "Madrid Tourism",
    "scope": "Address and published opening hours",
    "checked": "23 October 2026"
  },
  "revuelta": {
    "title": "Casa Revuelta: taberna address",
    "url": "https://www.casarevuelta.com/contacto",
    "publisher": "Casa Revuelta",
    "scope": "Latoneros 3; distinct from the restaurant at Cuchilleros 10",
    "checked": "23 October 2026"
  },
  "revueltaHours": {
    "title": "Casa Revuelta: visitor listing",
    "url": "https://www.esmadrid.com/restaurantes/casa-revuelta",
    "publisher": "Madrid Tourism",
    "scope": "Sunday lunch hours",
    "checked": "23 October 2026"
  },
  "venencia": {
    "title": "La Venencia",
    "url": "https://www.esmadrid.com/restaurantes/venencia",
    "publisher": "Madrid Tourism",
    "scope": "Sherry specialities, address and opening hours",
    "checked": "23 October 2026"
  },
  "via": {
    "title": "La Vía Láctea",
    "url": "https://www.esmadrid.com/noche/la-via-lactea",
    "publisher": "Madrid Tourism",
    "scope": "Rock bar, opened in 1979; Friday/Saturday hours",
    "checked": "23 October 2026"
  },
  "granvia": {
    "title": "Gran Vía: construction and architecture",
    "publisher": "Madrid Tourism",
    "url": "https://www.esmadrid.com/en/tourist-information/la-gran-via",
    "scope": "Construction in three sections, 1910–1931",
    "checked": "23 October 2026"
  },
  "texeira": {
    "title": "Texeira’s 1656 map: georeferenced municipal scan",
    "publisher": "Madrid City Council · Geoportal",
    "url": "https://geoportal.madrid.es/IDEAM_WBGEOPORTAL/dataset.iam?id=SPA_28079_SERVICIO_CARTOTECA_TEXEIRA",
    "scope": "Date, georeferencing and map service",
    "checked": "23 October 2026"
  },
  "texeiraPrint": {
    "title": "Texeira: 1881 facsimile catalogue record",
    "publisher": "Instituto Geográfico Nacional",
    "url": "https://contenido.ign.es/web/catalogo-cartoteca/resources/html/001488.html",
    "scope": "20 sheets; dimensions and approximate scale of this edition",
    "checked": "23 October 2026"
  },
  "austrias": {
    "title": "Madrid’s court and the Habsburg city",
    "publisher": "Museo de Historia · Madrid City Council",
    "url": "https://www.madrid.es/UnidadesDescentralizadas/MuseosMunicipales/MuseoDeHistoriaDeMadrid/Publicaciones/ficheros/mm_guiadelmuseomunicipaldemadrid.pdf",
    "scope": "1561 and the transformation of the medieval town",
    "checked": "23 October 2026"
  },
  "hispania": {
    "title": "Hispano-Roman collection",
    "publisher": "Museo Arqueológico Nacional",
    "url": "https://www.man.es/man/en/coleccion/catalogo-cronologico/hispania-romana.html",
    "scope": "Roman urban life, language, law and material culture",
    "checked": "23 October 2026"
  },
  "guarrazar": {
    "title": "The Guarrazar treasure",
    "publisher": "Museo Arqueológico Nacional",
    "url": "https://www.man.es/man/coleccion/catalogo-cronologico/edad-media/guarrazar.html",
    "scope": "Seventh-century votive crowns; Toledo and the Visigothic court",
    "checked": "23 October 2026"
  },
  "bourbons": {
    "title": "Philip V and the succession",
    "publisher": "Ministry of Culture · heritage thesaurus",
    "url": "https://tesauros.cultura.gob.es/tesauros/contextosculturales/1009603.html",
    "scope": "Bourbon succession in 1700 and the European war",
    "checked": "23 October 2026"
  },
  "dama": {
    "title": "Lady of Elche: collection record",
    "publisher": "Museo Arqueológico Nacional",
    "url": "https://www.man.es/man/en/coleccion/catalogo-cronologico/protohistoria/dama-elche.html",
    "scope": "Iberian sculpture and its context",
    "checked": "23 October 2026"
  },
  "sangines": {
    "title": "San Ginés: address, hours and weekend queue",
    "url": "https://chocolateriasangines.com/",
    "publisher": "Chocolatería San Ginés",
    "scope": "Pasadizo de San Ginés 5; founded 1894; no weekend reservations; pay at the till first",
    "checked": "23 October 2026"
  },
  "churros1902": {
    "title": "Chocolatería 1902: address and hours",
    "url": "https://chocolateria1902.com/",
    "publisher": "Chocolatería 1902",
    "scope": "Calle de San Martín 2; daily 07:00–23:00",
    "checked": "23 October 2026"
  }
};
const PLACES = {
  "fer": {
    "mapQuery": "Pacífico metro",
    "name": "Fer + Bastien · Pacífico",
    "area": "Pacífico",
    "lat": 40.4015,
    "lng": -3.6751,
    "address": "Calle de Cavanilles · meet at Pacífico metro",
    "wiki": "https://en.wikipedia.org/wiki/Pac%C3%ADfico_(Madrid_Metro)",
    "wikiLabel": "Wikipedia · station",
    "story": "Bastien stays with Fer on Calle de Cavanilles. The pin marks Pacífico metro, not the flat; arrange the last few minutes with Fer.",
    "practical": "Pacífico: L1 and L6. Use L1 to reach Sol directly. The western part of L6 is closed on 24–25 October.",
    "kind": "home",
    "refs": [
      "metro"
    ],
    "summary": "Bastien’s base with Fer. L1 goes directly to Sol.",
    "why": "Bastien drops his bags here on Friday. Saturday breakfast can stay at Fer’s neighbourhood bar."
  },
  "jose": {
    "mapQuery": "Quintana metro",
    "name": "José + Sam · Quintana",
    "area": "Quintana",
    "lat": 40.4336,
    "lng": -3.6474,
    "address": "Calle de Ezequiel Solana · meet at Quintana metro",
    "wiki": "https://en.wikipedia.org/wiki/Quintana_(Madrid_Metro)",
    "wikiLabel": "Wikipedia · station",
    "story": "Sam stays with José on Calle de Ezequiel Solana. The pin marks Quintana metro, not the flat; arrange the last few minutes with José.",
    "practical": "Quintana: L5, with direct trains to Gran Vía, Callao, Ópera and La Latina.",
    "kind": "home",
    "refs": [
      "metro"
    ],
    "summary": "Sam’s base with José. L5 goes directly to the centre.",
    "why": "A neighbourhood base with a direct line to Gran Vía, Callao and Ópera. No need to cross to Pacífico before meeting the others."
  },
  "retiro": {
    "name": "El Retiro",
    "area": "Retiro",
    "lat": 40.4118,
    "lng": -3.6818,
    "address": "Parque del Retiro · southern section",
    "wiki": "https://en.wikipedia.org/wiki/Buen_Retiro_Park",
    "story": "These gardens belonged to the Buen Retiro royal complex before becoming a public park. For Friday, use the southern entrance near Pacífico rather than crossing the whole park.",
    "practical": "Free. October park hours: 06:00–22:00, subject to weather closures. Keep the Friday walk to 45 minutes.",
    "kind": "walk",
    "refs": [
      "retiro",
      "cristal"
    ],
    "look": "The Palacio de Cristal is closed for restoration. The gardens and paths are still the reason to come.",
    "summary": "A 45-minute walk from the south side of the park. Skip it if the flight is late.",
    "mapQuery": "Puerta del Ángel Caído, Parque del Retiro",
    "why": "The simplest first walk from Pacífico, without a museum queue.",
    "photo": {
      "file": "MADRID 051116 MXALX 041.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/2/2b/MADRID_051116_MXALX_041.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
      "page": "https://commons.wikimedia.org/wiki/File:MADRID_051116_MXALX_041.jpg",
      "author": "Max Alexander / PromoMadrid",
      "license": "CC BY-SA 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
      "alt": "El Retiro",
      "caption": "El Retiro"
    }
  },
  "paco": {
    "name": "Casa Paco",
    "area": "Argüelles",
    "lat": 40.4304248,
    "lng": -3.7202933,
    "address": "Calle de Altamirano 38",
    "wiki": "https://en.wikipedia.org/wiki/Arg%C3%BCelles_(Madrid)",
    "wikiLabel": "Wikipedia · neighbourhood",
    "story": "Bar Casa Paco on Altamirano is the tortilla place Fer had in mind. It serves several fillings, croquetas and shared plates. There is another Casa Paco in the old town, so use this address.",
    "practical": "€15–22 each is a planning allowance. Allow 40–50 minutes from Retiro by metro and on foot. Call about a table and kitchen hours; no reservation has been made.",
    "phone": "+34915432821",
    "kind": "food",
    "refs": [
      "paco"
    ],
    "summary": "Tortillas and shared plates at Altamirano 38, in Argüelles.",
    "mapQuery": "Bar Casa Paco, Calle de Altamirano 38",
    "why": "It is the tortilla bar Fer chose for the first dinner."
  },
  "equis": {
    "name": "Sala Equis",
    "area": "La Latina",
    "lat": 40.4119,
    "lng": -3.7064,
    "address": "Calle del Duque de Alba 4",
    "wiki": "https://en.wikipedia.org/wiki/La_Latina",
    "wikiLabel": "Wikipedia · neighbourhood",
    "story": "A former cinema at Duque de Alba 4, now a bar and screening venue. The bar is the plan; a film needs a separate ticket and may not have suitable subtitles.",
    "practical": "Friday listing: 17:30–02:00. Entry depends on capacity. From Argüelles take L3 to Sol, then walk about 10 minutes.",
    "kind": "night",
    "refs": [
      "equis"
    ],
    "summary": "A drink in the former cinema, if there is space. No film booked.",
    "why": "A distinctive room for a drink, without needing Spanish to enjoy it."
  },
  "sol": {
    "name": "Puerta del Sol",
    "area": "Sol",
    "lat": 40.4169,
    "lng": -3.7035,
    "address": "Puerta del Sol",
    "wiki": "https://en.wikipedia.org/wiki/Puerta_del_Sol",
    "story": "Sol is the starting point, not the oldest part of the city. Walk west along Calle Mayor towards the medieval town and the royal site. The court’s move to Madrid in 1561 came much later than the Muslim settlement.",
    "practical": "Fer: L1 direct from Pacífico. José: L5 to Gran Vía, then walk. If the square is crowded, meet by the start of Calle Mayor.",
    "kind": "history",
    "refs": [],
    "look": "The kilometre-zero plaque is outside the former post office. Avoid using the middle of the square as a meeting point when it is crowded.",
    "summary": "Meet at the start of Calle Mayor, on the west side of Sol.",
    "why": "It connects both hosts’ metro routes and starts the old-town walk.",
    "photo": {
      "file": "2026-09-03 - Puerta del Sol in Madrid Spain.jpg",
      "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/f/fb/2026-09-03_-_Puerta_del_Sol_in_Madrid_Spain.jpg/1280px-2026-09-03_-_Puerta_del_Sol_in_Madrid_Spain.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
      "page": "https://commons.wikimedia.org/wiki/File:2026-09-03_-_Puerta_del_Sol_in_Madrid_Spain.jpg",
      "author": "Matt Joseph",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "alt": "Puerta del Sol",
      "caption": "Puerta del Sol"
    }
  },
  "mayor": {
    "name": "Plaza Mayor",
    "area": "Austrias",
    "lat": 40.4154,
    "lng": -3.7074,
    "address": "Plaza Mayor",
    "wiki": "https://en.wikipedia.org/wiki/Plaza_Mayor%2C_Madrid",
    "story": "Philip III commissioned Juan Gómez de Mora to finish the square in 1617; the work was complete in 1619. The square held markets, ceremonies and bullfights. Juan de Villanueva’s reconstruction after the 1790 fire shaped much of what stands today.",
    "practical": "Free exterior stop, 15–20 min. Follow the arcades, then continue west towards the Villa.",
    "kind": "history",
    "refs": [
      "mayor"
    ],
    "look": "The painted façade is the Casa de la Panadería. Its current murals are much newer than the square.",
    "summary": "Built in 1617–19; substantially rebuilt after the fire of 1790.",
    "why": "The layout makes the ceremonial life of the Habsburg capital easy to picture.",
    "photo": {
      "file": "Madrid Plaza Mayor (48733706273).jpg",
      "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/d/d2/Madrid_Plaza_Mayor_%2848733706273%29.jpg/1280px-Madrid_Plaza_Mayor_%2848733706273%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
      "page": "https://commons.wikimedia.org/wiki/File:Madrid_Plaza_Mayor_(48733706273).jpg",
      "author": "Jorge Franganillo",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "alt": "Plaza Mayor",
      "caption": "Plaza Mayor"
    }
  },
  "villa": {
    "name": "Plaza de la Villa",
    "area": "Austrias",
    "lat": 40.4153,
    "lng": -3.7108,
    "address": "Plaza de la Villa",
    "wiki": "https://en.wikipedia.org/wiki/Plaza_de_la_Villa",
    "story": "Compare the three main façades: the Lujanes buildings are 15th-century, Casa de Cisneros is 16th-century and Casa de la Villa is 17th-century. This was a centre of medieval Madrid long before the present town hall at Cibeles.",
    "practical": "Free exterior stop. Sunday’s flock reception is planned here, so this place will feel very different tomorrow.",
    "kind": "history",
    "refs": [
      "villa"
    ],
    "look": "Walk a few steps into Calle del Codo to see the narrow street plan beside the formal square.",
    "summary": "Three buildings from three centuries, beside the medieval street plan.",
    "why": "A small square where you can compare three centuries of buildings directly.",
    "photo": {
      "file": "Площадь Вилья - panoramio.jpg",
      "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/1/17/%D0%9F%D0%BB%D0%BE%D1%89%D0%B0%D0%B4%D1%8C_%D0%92%D0%B8%D0%BB%D1%8C%D1%8F_-_panoramio.jpg/1280px-%D0%9F%D0%BB%D0%BE%D1%89%D0%B0%D0%B4%D1%8C_%D0%92%D0%B8%D0%BB%D1%8C%D1%8F_-_panoramio.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
      "page": "https://commons.wikimedia.org/wiki/File:%D0%9F%D0%BB%D0%BE%D1%89%D0%B0%D0%B4%D1%8C_%D0%92%D0%B8%D0%BB%D1%8C%D1%8F_-_panoramio.jpg",
      "author": "karel291",
      "license": "CC BY 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/3.0",
      "alt": "Plaza de la Villa",
      "caption": "Plaza de la Villa"
    }
  },
  "palace": {
    "name": "Royal Palace & Oriente",
    "mapQuery": "Plaza de Oriente",
    "area": "Austrias",
    "lat": 40.418,
    "lng": -3.7143,
    "address": "Plaza de Oriente",
    "wiki": "https://en.wikipedia.org/wiki/Royal_Palace_of_Madrid",
    "story": "The Habsburg kings lived in the Alcázar that stood here before the fire of 1734. The present palace was commissioned by the Bourbon king Philip V. Charles III was the first king to live in it.",
    "practical": "Exterior visit in the main plan. An interior visit needs a separate ticket and replaces part of the morning. Do not squeeze it in as an extra.",
    "kind": "history",
    "refs": [
      "palace",
      "palaceVisit"
    ],
    "look": "The palace is an 18th-century building on an older royal site. “Madrid de los Austrias” describes the surrounding historic district, not the dynasty that built this palace.",
    "summary": "Exterior visit. The Bourbon palace replaced the Alcázar after its 1734 fire.",
    "why": "It explains the change of dynasty and gives a clear point of comparison with the older city.",
    "photo": {
      "file": "Palacio Real de Madrid Julio 2016 (cropped).jpg",
      "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/9b/Palacio_Real_de_Madrid_Julio_2016_%28cropped%29.jpg/1280px-Palacio_Real_de_Madrid_Julio_2016_%28cropped%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
      "page": "https://commons.wikimedia.org/wiki/File:Palacio_Real_de_Madrid_Julio_2016_(cropped).jpg",
      "author": "Tim Adams",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "alt": "Royal Palace & Oriente",
      "caption": "Royal Palace & Oriente"
    }
  },
  "wall": {
    "name": "Madrid’s Muslim wall",
    "mapQuery": "Cuesta de la Vega",
    "area": "Cuesta de la Vega",
    "lat": 40.4158,
    "lng": -3.7149,
    "address": "Parque del Emir Mohamed I",
    "wiki": "https://en.wikipedia.org/wiki/Muslim_Walls_of_Madrid",
    "story": "The wall belongs to the fortified settlement founded under the emir Muhammad I in the ninth century. It is the clearest surviving reminder that Madrid’s origins predate both the Habsburg court and the Bourbon palace.",
    "practical": "A short stop below the Almudena. Then head towards Bailén and Las Vistillas.",
    "kind": "history",
    "refs": [
      "wall"
    ],
    "look": "Look for the projecting towers and the different stonework. The surviving section is below the Almudena, in Parque del Emir Mohamed I.",
    "summary": "The ninth-century fortified settlement, below the Almudena.",
    "why": "It is physical evidence of Madrid before the Spanish royal court.",
    "photo": {
      "file": "Muralla árabe de Madrid 01.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/6/69/Muralla_%C3%A1rabe_de_Madrid_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
      "page": "https://commons.wikimedia.org/wiki/File:Muralla_%C3%A1rabe_de_Madrid_01.jpg",
      "author": "Luis García from Madrid (Spain).",
      "license": "CC BY-SA 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
      "alt": "Madrid’s Muslim wall",
      "caption": "Madrid’s Muslim wall"
    }
  },
  "vistillas": {
    "name": "Las Vistillas",
    "area": "La Latina",
    "lat": 40.4119,
    "lng": -3.7142,
    "address": "Jardines de Las Vistillas",
    "wiki": "https://es.wikipedia.org/wiki/Jardines_de_las_Vistillas",
    "wikiLabel": "Wikipedia · Spanish",
    "story": "From this high ground, the drop towards the Manzanares is easy to understand. The gardens are also associated with the neighbourhood’s summer festivals, especially La Paloma.",
    "practical": "Free. Stop for the view and a bench before descending towards Calle de Segovia.",
    "kind": "walk",
    "refs": [],
    "summary": "A short rest above the Manzanares valley.",
    "why": "The view shows why the old city developed above the river."
  },
  "bridge": {
    "name": "Puente de Segovia",
    "area": "Manzanares",
    "lat": 40.4135,
    "lng": -3.7222,
    "address": "Puente de Segovia",
    "wiki": "https://es.wikipedia.org/wiki/Puente_de_Segovia",
    "wikiLabel": "Wikipedia · Spanish",
    "story": "Work began under Gaspar de Vega in 1574. Juan de Herrera took over after Vega’s death in 1577, and the Renaissance bridge was largely complete in 1584. It connected the expanding capital with the road towards Segovia.",
    "practical": "Continue north along the river towards Puente del Rey. This is the shorter river option.",
    "kind": "walk",
    "refs": [
      "bridge"
    ],
    "look": "The bridge has been rebuilt and widened. Its present width is not the width of Herrera’s original bridge.",
    "summary": "A Renaissance bridge on a major route into the growing capital.",
    "why": "It links Philip II’s capital to the roads that supplied it.",
    "photo": {
      "file": "Puente de Segovia (Madrid) 10.jpg",
      "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/e/ee/Puente_de_Segovia_%28Madrid%29_10.jpg/1280px-Puente_de_Segovia_%28Madrid%29_10.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
      "page": "https://commons.wikimedia.org/wiki/File:Puente_de_Segovia_(Madrid)_10.jpg",
      "author": "Luis García (Zaqarbal)",
      "license": "CC BY-SA 3.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/3.0",
      "alt": "Puente de Segovia",
      "caption": "Puente de Segovia"
    }
  },
  "river": {
    "name": "Madrid Río · north",
    "area": "Puente del Rey",
    "lat": 40.4202,
    "lng": -3.7226,
    "address": "Puente del Rey",
    "wiki": "https://en.wikipedia.org/wiki/Madrid_R%C3%ADo",
    "story": "Madrid Río opened in April 2011 after sections of the M-30 were put underground. The riverbanks became a connected public park. Follow the Manzanares north from Puente de Segovia to Puente del Rey.",
    "practical": "The short river section is roughly 1 km. From Puente del Rey, Príncipe Pío is a short walk uphill. Skip this block if the morning runs late.",
    "kind": "walk",
    "refs": [
      "river"
    ],
    "summary": "About 1 km north along the river, ending near Príncipe Pío.",
    "why": "A recent change in city planning that you can see and walk through.",
    "photo": {
      "file": "Madrid in May 2017 64 edited.jpg",
      "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cd/Madrid_in_May_2017_64_edited.jpg/1280px-Madrid_in_May_2017_64_edited.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
      "page": "https://commons.wikimedia.org/wiki/File:Madrid_in_May_2017_64_edited.jpg",
      "author": "Nicolas Vigier",
      "license": "CC0",
      "licenseUrl": "http://creativecommons.org/publicdomain/zero/1.0/deed.en",
      "alt": "Madrid Río · north",
      "caption": "Madrid Río · north"
    }
  },
  "lunch": {
    "name": "Lunch near Príncipe Pío",
    "area": "Príncipe Pío",
    "lat": 40.4211,
    "lng": -3.7195,
    "address": "Príncipe Pío · choose a nearby bar",
    "wiki": "https://en.wikipedia.org/wiki/Pr%C3%ADncipe_P%C3%ADo_(Madrid_Metro)",
    "wikiLabel": "Wikipedia · station",
    "story": "This is an unbooked lunch break rather than a named restaurant. Check a couple of menus around Príncipe Pío before sitting down; the map pin marks the station area.",
    "practical": "Allow €12–20 each, estimated. To the MAN: L10 to Alonso Martínez, then 15–20 minutes on foot. The Cuzco closure is beyond this journey.",
    "kind": "food",
    "refs": [],
    "summary": "Lunch near Príncipe Pío, then metro to the MAN. Restaurant still to choose.",
    "mapQuery": "Príncipe Pío metro station",
    "why": "A useful break and metro connection after the river."
  },
  "man": {
    "name": "Archaeological Museum",
    "area": "Serrano",
    "lat": 40.4233,
    "lng": -3.6888,
    "address": "Calle de Serrano 13",
    "wiki": "https://en.wikipedia.org/wiki/National_Archaeological_Museum_(Madrid)",
    "story": "The National Archaeological Museum covers the Iberian Peninsula from prehistory onwards, with additional collections from Egypt, Greece and other regions. A focused two-hour visit is more realistic than every gallery.",
    "practical": "Saturday 09:30–20:00; free from 14:00. Aim for 16:00–18:00. Check the ticket page; a free slot does not guarantee immediate entry.",
    "tickets": "https://man.sacatuentrada.es/",
    "kind": "museum",
    "refs": [
      "man",
      "manHours",
      "hispania",
      "guarrazar",
      "dama"
    ],
    "look": "Start with the Lady of Elche, the Bicha of Balazote and the Visigothic Guarrazar treasure. Use the museum labels for the current interpretation and location of each object.",
    "summary": "16:00–18:00. Saturday admission is free from 14:00.",
    "why": "It supplies the wider Iberian history that the Madrid streets cannot show.",
    "photo": {
      "file": "Museo Arqueológico Nacional de España 01.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/d/dd/Museo_Arqueol%C3%B3gico_Nacional_de_Espa%C3%B1a_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
      "page": "https://commons.wikimedia.org/wiki/File:Museo_Arqueol%C3%B3gico_Nacional_de_Espa%C3%B1a_01.jpg",
      "author": "J.L. De Diego",
      "license": "Public domain",
      "licenseUrl": "",
      "alt": "Archaeological Museum",
      "caption": "Archaeological Museum"
    }
  },
  "pez": {
    "name": "Pez Tortilla",
    "area": "Malasaña",
    "lat": 40.4242,
    "lng": -3.7066,
    "address": "Calle del Pez 36 · alternative at 7",
    "wiki": "https://en.wikipedia.org/wiki/Malasa%C3%B1a",
    "wikiLabel": "Wikipedia · neighbourhood",
    "story": "Soft-set tortilla, croquetas and beer. Use the Pez 36 branch first; Pez 7 is the nearby alternative. The venue explicitly says it does not take reservations.",
    "practical": "Aim for 19:45. Allow €15–22 each, estimated. If both Pez branches are packed, use the alternatives list rather than waiting through dinner.",
    "kind": "food",
    "refs": [
      "pez"
    ],
    "summary": "Pez 36; Pez 7 is the nearby backup. No reservations.",
    "why": "A practical tortilla-and-beer start to the Malasaña evening.",
    "areaPhoto": {
      "file": "Tejiendo Malasaña 2014 (14223976313).jpg",
      "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/Tejiendo_Malasa%C3%B1a_2014_%2814223976313%29.jpg/1280px-Tejiendo_Malasa%C3%B1a_2014_%2814223976313%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
      "page": "https://commons.wikimedia.org/wiki/File:Tejiendo_Malasa%C3%B1a_2014_(14223976313).jpg",
      "author": "Tejiendo Malasaña",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "alt": "Street scene in Malasaña",
      "caption": "Malasaña · neighbourhood photograph, not this venue"
    }
  },
  "camacho": {
    "name": "Casa Camacho",
    "area": "Malasaña",
    "lat": 40.4265,
    "lng": -3.7037,
    "address": "Calle de San Andrés 4",
    "wiki": "https://en.wikipedia.org/wiki/Malasa%C3%B1a",
    "wikiLabel": "Wikipedia · neighbourhood",
    "story": "A small tavern on San Andrés, known for vermouth and the yayo, a mixed drink with vermouth, gin and soda. It is a first stop for the evening; La Vía Láctea is nearby if the group wants music afterwards.",
    "practical": "Expect standing space and a crowded bar. Madrid Tourism lists Saturday closing at 02:00; check on arrival.",
    "kind": "night",
    "refs": [
      "camacho"
    ],
    "summary": "Vermouth in a small bar, followed by a flexible evening in Malasaña.",
    "why": "A traditional tavern within a few minutes of the music bars.",
    "areaPhoto": {
      "file": "Tejiendo Malasaña 2014 (14223976313).jpg",
      "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/Tejiendo_Malasa%C3%B1a_2014_%2814223976313%29.jpg/1280px-Tejiendo_Malasa%C3%B1a_2014_%2814223976313%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
      "page": "https://commons.wikimedia.org/wiki/File:Tejiendo_Malasa%C3%B1a_2014_(14223976313).jpg",
      "author": "Tejiendo Malasaña",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "alt": "Street scene in Malasaña",
      "caption": "Malasaña · neighbourhood photograph, not this venue"
    }
  },
  "trash": {
    "name": "Fiesta de la Trashumancia",
    "area": "Plaza de la Villa",
    "lat": 40.4153,
    "lng": -3.7108,
    "address": "Plaza de la Villa · Calle Mayor approaches",
    "wiki": "https://en.wikipedia.org/wiki/Transhumance",
    "wikiLabel": "Wikipedia · transhumance",
    "story": "The Madrid festival began in 1994 to defend livestock routes and extensive grazing. The symbolic payment of maravedís recalls a 1418 agreement between the Mesta and Madrid’s council. The livestock tradition is old; this city festival is modern.",
    "practical": "Sunday 25 October. Reach the Villa area at 10:30–10:45. The council estimates the flock’s arrival at 11:15–11:25. These are approximate event times, not an appointment.",
    "kind": "event",
    "refs": [
      "trash"
    ],
    "look": "The 2026 route changes: it goes to Plaza de la Villa and Plaza Mayor, not Sol or Cibeles. Afterwards it continues towards La Cebada and San Francisco before returning to Casa de Campo.",
    "summary": "At Plaza de la Villa around 11:15–11:25. Arrive by 10:45.",
    "why": "It is a dated event this weekend, connected to land use and rural history."
  },
  "rastro": {
    "mapQuery": "Plaza de Cascorro",
    "name": "El Rastro",
    "area": "La Latina",
    "lat": 40.4096,
    "lng": -3.7075,
    "address": "Cascorro & Ribera de Curtidores",
    "wiki": "https://en.wikipedia.org/wiki/El_Rastro",
    "story": "The Sunday flea market runs down Ribera de Curtidores from Plaza de Cascorro. Smaller streets nearby have antiques, second-hand goods and shops that are easy to miss on the main slope.",
    "practical": "Sunday 09:00–15:00. Allow 90 minutes after the flock. It is crowded; use a fixed meeting spot if you split up.",
    "kind": "market",
    "refs": [
      "rastro"
    ],
    "summary": "Cascorro and Ribera de Curtidores, with time for the side streets.",
    "why": "A different side of the city after the monuments: trade, second-hand objects and busy streets.",
    "photo": {
      "file": "RastroinMadrid.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/4/46/RastroinMadrid.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
      "page": "https://commons.wikimedia.org/wiki/File:RastroinMadrid.jpg",
      "author": "Msoltanolkotabii",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "alt": "El Rastro",
      "caption": "El Rastro"
    }
  },
  "almeria": {
    "name": "Taberna Almería",
    "area": "La Latina",
    "lat": 40.4106,
    "lng": -3.7109,
    "address": "Calle de las Aguas 9",
    "wiki": "https://en.wikipedia.org/wiki/La_Latina",
    "wikiLabel": "Wikipedia · neighbourhood",
    "story": "A lunch option on Calle de las Aguas, a short walk from the Rastro. It is a candidate, not a reservation. Check space before committing the group.",
    "practical": "Published Sunday hours: 13:00–17:00. Allow €12–20 each, estimated. If full, try another nearby bar; Casa Revuelta is a quick cod-and-beer stop rather than a full vegetarian-friendly meal.",
    "phone": "+34913641571",
    "kind": "food",
    "refs": [
      "almeria"
    ],
    "summary": "An unbooked lunch option on Calle de las Aguas 9.",
    "why": "Close enough to the Rastro to avoid another long journey before lunch."
  },
  "letras": {
    "mapQuery": "Plaza de Santa Ana",
    "name": "Barrio de las Letras",
    "area": "Huertas",
    "lat": 40.4142,
    "lng": -3.7001,
    "address": "Plaza de Santa Ana & Calle de las Huertas",
    "wiki": "https://es.wikipedia.org/wiki/Barrio_de_las_Letras",
    "wikiLabel": "Wikipedia · Spanish",
    "story": "The streets around Huertas and Santa Ana are associated with Cervantes, Lope de Vega and other writers of Spain’s Golden Age. This is an easy afternoon walk, with cafés and taverns close together.",
    "practical": "Allow 45–60 minutes for a walk, longer with a café. If choosing the Prado at 17:00, leave time to walk there and queue.",
    "kind": "walk",
    "refs": [],
    "look": "Look for the literary quotations set into Calle de las Huertas. La Venencia is a sherry option nearby, but its published afternoon break means it suits an evening drink better.",
    "summary": "Coffee and a short walk; or replace this block with the Prado at 17:00.",
    "why": "A compact walk connected to the writers of the Golden Age."
  },
  "tigre": {
    "name": "El Tigre",
    "area": "Chueca",
    "lat": 40.4206,
    "lng": -3.6987,
    "address": "Calle de las Infantas 30",
    "wiki": "https://en.wikipedia.org/wiki/Chueca",
    "wikiLabel": "Wikipedia · neighbourhood",
    "story": "A crowded Chueca bar known for large tapas served with drinks. It fits the cheap, informal final meal better than a quiet sit-down dinner.",
    "practical": "Use Infantas 30. The tourism listing gives 12:00–01:00 daily. Allow €10–18 depending on drinks, estimated. Ask specifically for tapas without meat or fish if needed.",
    "kind": "food",
    "refs": [
      "tigre"
    ],
    "summary": "Drinks with tapas at Infantas 30. Eat later if choosing the Prado.",
    "why": "Large tapas with drinks suit the group’s cheap final meal."
  },
  "reina": {
    "name": "Reina Sofía",
    "area": "Atocha",
    "lat": 40.408,
    "lng": -3.6945,
    "address": "Calle de Santa Isabel 52",
    "wiki": "https://en.wikipedia.org/wiki/Museo_Nacional_Centro_de_Arte_Reina_Sof%C3%ADa",
    "story": "The Reina Sofía is the Friday museum alternative, close to Atocha. Focus on Picasso’s Guernica and the surrounding Civil War context. It is a better rain plan than crossing Retiro.",
    "practical": "Friday free hours: 19:00–21:00. Leave about 20:00 for dinner around 21:00 at Casa Paco. This replaces the park and moves dinner later.",
    "tickets": "https://www.museoreinasofia.es/visita",
    "kind": "museum",
    "refs": [
      "reina"
    ],
    "summary": "Friday rain plan: 19:00–20:00, then a later dinner.",
    "why": "A major collection near the arrival neighbourhood, with Friday free hours.",
    "photo": {
      "file": "Reina Sofía, Madrid (8618859502).jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/9/90/Reina_Sof%C3%ADa%2C_Madrid_%288618859502%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
      "page": "https://commons.wikimedia.org/wiki/File:Reina_Sof%C3%ADa,_Madrid_(8618859502).jpg",
      "author": "Ricardo Ramírez Gisbert from Barcelona, Spain",
      "license": "CC BY-SA 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
      "alt": "Reina Sofía",
      "caption": "Reina Sofía"
    }
  },
  "prado": {
    "name": "Museo del Prado",
    "area": "Paseo del Prado",
    "lat": 40.4138,
    "lng": -3.6921,
    "address": "Paseo del Prado",
    "wiki": "https://en.wikipedia.org/wiki/Museo_del_Prado",
    "story": "For a first visit, choose Velázquez’s Las Meninas, Goya’s royal portraits and later paintings, and Bosch’s Garden of Earthly Delights. Check the gallery map rather than relying on fixed room numbers.",
    "practical": "Sunday collection entry is free 17:00–19:00; queues can use part of that time. The general entry shown by the museum is €15. Choose the paid daytime visit if a queue would spoil the afternoon.",
    "tickets": "https://entradas.museodelprado.es/",
    "kind": "museum",
    "refs": [
      "prado",
      "pradoFree"
    ],
    "look": "Las Meninas was painted for the royal court. Compare the figures looking out of the painting with the king and queen reflected at the back.",
    "summary": "Sunday 17:00–19:00 free collection slot, with a possible queue.",
    "why": "The clearest classic art-museum option for a first Madrid visit.",
    "photo": {
      "file": "Museo del Prado 2016 (25185969599).jpg",
      "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/6/68/Museo_del_Prado_2016_%2825185969599%29.jpg/1280px-Museo_del_Prado_2016_%2825185969599%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
      "page": "https://commons.wikimedia.org/wiki/File:Museo_del_Prado_2016_(25185969599).jpg",
      "author": "Emilio J. Rodríguez Posada",
      "license": "CC BY-SA 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/2.0",
      "alt": "Museo del Prado",
      "caption": "Museo del Prado"
    }
  },
  "campo": {
    "name": "Casa de Campo lake",
    "area": "Casa de Campo",
    "lat": 40.4191,
    "lng": -3.7337,
    "address": "Lago de la Casa de Campo",
    "wiki": "https://en.wikipedia.org/wiki/Casa_de_Campo",
    "story": "Walk west from Puente del Rey towards the lake for a longer outdoor break. This former royal estate is much larger than Retiro; the lake loop is a manageable first visit.",
    "practical": "Allow 60–90 minutes from the river, including the approach. If keeping the MAN at 16:00, replace part of the old-town walk or have an earlier lunch.",
    "kind": "walk",
    "refs": [],
    "summary": "A longer outdoor option west of Puente del Rey.",
    "why": "More open space if the group prefers a longer walk to another museum.",
    "photo": {
      "file": "Casa de Campo Lago y vista.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/a/a6/Casa_de_Campo_Lago_y_vista.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
      "page": "https://commons.wikimedia.org/wiki/File:Casa_de_Campo_Lago_y_vista.jpg",
      "author": "Håkan Svensson Xauxa",
      "license": "CC BY 2.5",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.5",
      "alt": "Casa de Campo lake",
      "caption": "Casa de Campo lake"
    }
  },
  "matadero": {
    "name": "Madrid Río & Matadero",
    "area": "Legazpi",
    "lat": 40.3911,
    "lng": -3.6973,
    "address": "Plaza de Legazpi 8",
    "wiki": "https://en.wikipedia.org/wiki/Matadero_Madrid",
    "story": "A former municipal slaughterhouse converted into a cultural complex. The industrial architecture and courtyards make a useful southern endpoint for a walk along Madrid Río.",
    "practical": "Sunday alternative: Puente de Toledo → river → Matadero, about 60–90 minutes with pauses. Exhibitions and performances have separate schedules; check the programme.",
    "kind": "culture",
    "refs": [
      "matadero"
    ],
    "summary": "Industrial architecture and a southern stretch of Madrid Río.",
    "why": "Industrial heritage at the quieter southern end of a river walk.",
    "photo": {
      "file": "Matadero Madrid.jpg",
      "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/b/b6/Matadero_Madrid.jpg/1280px-Matadero_Madrid.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
      "page": "https://commons.wikimedia.org/wiki/File:Matadero_Madrid.jpg",
      "author": "AlesKubr2",
      "license": "Public domain",
      "licenseUrl": "",
      "alt": "Madrid Río & Matadero",
      "caption": "Madrid Río & Matadero"
    }
  },
  "debod": {
    "name": "Temple of Debod",
    "area": "Parque del Oeste",
    "lat": 40.424,
    "lng": -3.7178,
    "address": "Calle de Ferraz 1",
    "wiki": "https://en.wikipedia.org/wiki/Temple_of_Debod",
    "story": "An ancient Egyptian temple dismantled and rebuilt in Madrid. The exterior sits in Parque del Oeste, near Argüelles, so it works before Casa Paco if you reach that side of town early.",
    "practical": "The outside is the simple option. Interior access has separate hours and capacity limits; check the official listing.",
    "kind": "history",
    "refs": [
      "debod"
    ],
    "summary": "An outdoor detour near the Friday dinner neighbourhood.",
    "why": "An unusual historic site close to the Friday dinner area.",
    "photo": {
      "file": "2026-09-03 - Temple of Debod in Madrid Spain 01.jpg",
      "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/c/cc/2026-09-03_-_Temple_of_Debod_in_Madrid_Spain_01.jpg/1280px-2026-09-03_-_Temple_of_Debod_in_Madrid_Spain_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
      "page": "https://commons.wikimedia.org/wiki/File:2026-09-03_-_Temple_of_Debod_in_Madrid_Spain_01.jpg",
      "author": "Matt Joseph",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "alt": "Temple of Debod",
      "caption": "Temple of Debod"
    }
  },
  "sanisidro": {
    "name": "Museo de San Isidro",
    "area": "La Latina",
    "lat": 40.4121,
    "lng": -3.7108,
    "address": "Plaza de San Andrés 2",
    "story": "A small museum about Madrid’s origins, from early settlement to its establishment as the capital. Its courtyard and archaeological displays make it a useful continuation of the Muslim-wall stop.",
    "practical": "Free. Tuesday–Sunday 10:00–20:00 in October. Allow 45–60 minutes. Five to ten minutes from Las Vistillas; also close to the Sunday lunch area.",
    "kind": "museum",
    "wiki": "https://es.wikipedia.org/wiki/Museo_de_San_Isidro",
    "wikiLabel": "Wikipedia · Spanish",
    "summary": "Free local-history museum, close to Las Vistillas and the Rastro.",
    "refs": [
      "sanisidro"
    ],
    "why": "A free, local explanation of the city’s origins, close to the walk.",
    "photo": {
      "file": "Museo de San Isidro.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/9/98/Museo_de_San_Isidro.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
      "page": "https://commons.wikimedia.org/wiki/File:Museo_de_San_Isidro.jpg",
      "author": "J.L. de Diego",
      "license": "Public domain",
      "licenseUrl": "",
      "alt": "Museo de San Isidro",
      "caption": "Museo de San Isidro"
    }
  },
  "historia": {
    "name": "Museo de Historia de Madrid",
    "area": "Tribunal",
    "lat": 40.4258,
    "lng": -3.7007,
    "address": "Calle de Fuencarral 78",
    "story": "The city-history counterpart to the MAN: paintings, plans and objects about Madrid as the capital. It is a convenient indoor stop before the Malasaña evening.",
    "practical": "Free. Tuesday–Sunday 10:00–20:00 in October. Allow 45–60 minutes. Use instead of a second long museum visit.",
    "kind": "museum",
    "wiki": "https://en.wikipedia.org/wiki/Museum_of_History_of_Madrid",
    "summary": "A free city-history museum near Tribunal.",
    "refs": [
      "historia"
    ],
    "why": "A free continuation of the city’s story, near the Saturday evening area."
  },
  "betijai": {
    "name": "Beti Jai · pelota exhibitions",
    "area": "Chamberí",
    "lat": 40.433,
    "lng": -3.693,
    "address": "Calle del Marqués del Riscal 7",
    "story": "The historic pelota court is hosting demonstrations of frontenis and pelota mano this weekend. It combines a 19th-century sporting building with a live event.",
    "practical": "24 and 25 October: sessions at 10:30, 12:00, 15:30 and 17:00. Free reservation required; availability has not been checked. General walk-in visits are suspended these two days.",
    "kind": "event",
    "wiki": "https://en.wikipedia.org/wiki/Beti_Jai_fronton",
    "summary": "A real event this weekend: Basque pelota in the historic court.",
    "refs": [
      "betijai"
    ],
    "tickets": "https://betijai.reservaspatrimonio.es/",
    "why": "Historic architecture with an actual live sporting event this weekend.",
    "photo": {
      "file": "Fronton Beti Jai - Madrid 01.jpg",
      "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a3/Fronton_Beti_Jai_-_Madrid_01.jpg/1280px-Fronton_Beti_Jai_-_Madrid_01.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
      "page": "https://commons.wikimedia.org/wiki/File:Fronton_Beti_Jai_-_Madrid_01.jpg",
      "author": "Javier Perez Montes",
      "license": "CC BY-SA 4.0",
      "licenseUrl": "https://creativecommons.org/licenses/by-sa/4.0",
      "alt": "Beti Jai · pelota exhibitions",
      "caption": "Beti Jai · pelota exhibitions"
    }
  },
  "ardosa": {
    "name": "Bodega de la Ardosa",
    "area": "Malasaña",
    "lat": 40.4235,
    "lng": -3.7013,
    "address": "Calle de Colón 13",
    "story": "A longstanding bodega known for tortilla and vermouth. It is a five-to-ten-minute walk from the Pez bars, so it is a useful alternative if there is space.",
    "practical": "Expect crowds and limited room. Madrid Tourism lists Friday/Saturday closing at 02:30. This is an alternative based on location and food, not a claim that it is quieter or cheaper.",
    "kind": "food",
    "wiki": "https://en.wikipedia.org/wiki/Malasa%C3%B1a",
    "summary": "Tortilla and vermouth near Pez; often busy too.",
    "refs": [
      "ardosa"
    ],
    "wikiLabel": "Wikipedia · neighbourhood",
    "why": "A nearby tortilla alternative to Pez, with a traditional bodega setting.",
    "areaPhoto": {
      "file": "Tejiendo Malasaña 2014 (14223976313).jpg",
      "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/Tejiendo_Malasa%C3%B1a_2014_%2814223976313%29.jpg/1280px-Tejiendo_Malasa%C3%B1a_2014_%2814223976313%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
      "page": "https://commons.wikimedia.org/wiki/File:Tejiendo_Malasa%C3%B1a_2014_(14223976313).jpg",
      "author": "Tejiendo Malasaña",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "alt": "Street scene in Malasaña",
      "caption": "Malasaña · neighbourhood photograph, not this venue"
    }
  },
  "revuelta": {
    "name": "Casa Revuelta · taberna",
    "area": "Austrias",
    "lat": 40.4137,
    "lng": -3.7077,
    "address": "Calle de Latoneros 3",
    "story": "The small taberna specialises in battered cod. Use Latoneros 3 for the bar; its restaurant on Cuchilleros is a different setting.",
    "practical": "Sunday listing: 10:30–16:00. Good for a quick cod-and-beer stop near the Rastro. Fish-focused: a poor choice for a vegetarian meal. Prices depend on the order.",
    "kind": "food",
    "wiki": "https://en.wikipedia.org/wiki/La_Latina",
    "summary": "A quick cod-and-beer stop, not the best full-group lunch.",
    "refs": [
      "revuelta",
      "revueltaHours"
    ],
    "wikiLabel": "Wikipedia · neighbourhood",
    "why": "A short, specific food stop rather than a generic restaurant choice."
  },
  "venencia": {
    "name": "La Venencia",
    "area": "Barrio de las Letras",
    "lat": 40.4153,
    "lng": -3.6994,
    "address": "Calle de Echegaray 7",
    "story": "An old sherry tavern: fino, manzanilla and small plates such as olives, cured tuna and anchovies. Choose it for a short drink rather than an all-purpose dinner.",
    "practical": "The tourism listing gives a break from 15:30 to 19:30. It fits an evening in Letras, not the middle of Sunday afternoon. Check opening on the day.",
    "kind": "food",
    "wiki": "https://en.wikipedia.org/wiki/Barrio_de_las_Letras",
    "summary": "Sherry and a few small plates near Santa Ana.",
    "refs": [
      "venencia"
    ],
    "wikiLabel": "Wikipedia · neighbourhood",
    "why": "A chance to try sherry in a long-established tavern."
  },
  "via": {
    "name": "La Vía Láctea",
    "area": "Malasaña",
    "lat": 40.427,
    "lng": -3.7034,
    "address": "Calle de Velarde 18",
    "story": "Opened in 1979 in a former coal shop, this music bar became associated with the Movida. It is a practical next stop after Casa Camacho if you want rock music and dancing.",
    "practical": "Published Friday/Saturday hours: 18:00–03:30. Entry conditions and capacity should be checked at the door; no specific DJ or performance is promised.",
    "kind": "night",
    "wiki": "https://en.wikipedia.org/wiki/Malasa%C3%B1a",
    "wikiLabel": "Wikipedia · neighbourhood",
    "summary": "Music after Camacho, about five minutes away.",
    "refs": [
      "via"
    ],
    "why": "A music bar connected to the Movida, with no language barrier.",
    "areaPhoto": {
      "file": "Tejiendo Malasaña 2014 (14223976313).jpg",
      "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/4/49/Tejiendo_Malasa%C3%B1a_2014_%2814223976313%29.jpg/1280px-Tejiendo_Malasa%C3%B1a_2014_%2814223976313%29.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
      "page": "https://commons.wikimedia.org/wiki/File:Tejiendo_Malasa%C3%B1a_2014_(14223976313).jpg",
      "author": "Tejiendo Malasaña",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "alt": "Street scene in Malasaña",
      "caption": "Malasaña · neighbourhood photograph, not this venue"
    }
  },
  "granvia": {
    "name": "Gran Vía: Metrópolis to Callao",
    "area": "Gran Vía",
    "lat": 40.4192,
    "lng": -3.6977,
    "address": "Calle de Alcalá 39 · start by the Metrópolis building",
    "mapQuery": "Edificio Metrópolis, Calle de Alcalá 39",
    "wiki": "https://en.wikipedia.org/wiki/Gran_V%C3%ADa,_Madrid",
    "story": "Gran Vía was cut through the existing city in three stages from 1910 to 1931. Its banks, offices, cinemas and early high-rises belong to a different Madrid from the narrow Habsburg streets. Walk west from Metrópolis towards Callao, then turn north towards Pez.",
    "look": "Compare the ornate eastern buildings with Telefónica’s taller profile and the curved Capitol building at Callao. This is a street for looking above the shopfronts.",
    "practical": "From the MAN walk down Recoletos, past Cibeles, to Metrópolis; about 20–25 minutes. Metrópolis → Callao is another 15–20 minutes without stops. Callao → Pez 36 takes around 10 minutes.",
    "summary": "After the MAN: Recoletos → Cibeles → Metrópolis → Gran Vía → Callao → Pez.",
    "kind": "history",
    "refs": [
      "granvia"
    ],
    "why": "The modern avenue makes a useful contrast with the morning’s medieval streets.",
    "photo": {
      "file": "Gran Vía (Madrid) 1.jpg",
      "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/9/92/Gran_V%C3%ADa_%28Madrid%29_1.jpg/1280px-Gran_V%C3%ADa_%28Madrid%29_1.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
      "page": "https://commons.wikimedia.org/wiki/File:Gran_V%C3%ADa_(Madrid)_1.jpg",
      "author": "Felipe Gabaldón",
      "license": "CC BY 2.0",
      "licenseUrl": "https://creativecommons.org/licenses/by/2.0",
      "alt": "Gran Vía: Metrópolis to Callao",
      "caption": "Gran Vía: Metrópolis to Callao"
    }
  },
  "callao": {
    "name": "Plaza del Callao",
    "area": "Gran Vía",
    "lat": 40.4203,
    "lng": -3.7057,
    "address": "Plaza del Callao",
    "wiki": "https://en.wikipedia.org/wiki/Plaza_del_Callao",
    "story": "The square anchors the central part of Gran Vía, with cinema architecture and the Capitol building at its western edge. It is the turning point towards Malasaña on Saturday.",
    "practical": "From Callao head north towards Calle del Pez. Allow about 10 minutes to Pez 36.",
    "summary": "Gran Vía’s cinema square; turn north here for Malasaña.",
    "kind": "history",
    "refs": [
      "granvia"
    ],
    "why": "A landmark turning point between Gran Vía and Malasaña."
  },
  "sangines": {
    "name": "Chocolatería San Ginés",
    "mapQuery": "Chocolatería San Ginés, Pasadizo de San Ginés 5",
    "area": "Sol / Ópera",
    "lat": 40.4167,
    "lng": -3.7069,
    "address": "Pasadizo de San Ginés 5",
    "wiki": "https://en.wikipedia.org/wiki/Chocolater%C3%ADa_San_Gin%C3%A9s",
    "kind": "food",
    "refs": [
      "sangines"
    ],
    "summary": "Sunday breakfast together: chocolate and churros before the flock.",
    "why": "A Madrid classic since 1894, on a small passage between Sol and Ópera. It is a short walk from the Sunday event, so breakfast does not require another metro trip.",
    "story": "San Ginés opened in 1894, when this part of central Madrid was busy with theatres and late-night cafés. Its chocolate and churros became a familiar stop after a night out. It is now a famous visitor destination too; come for the tradition, with a backup for the queue.",
    "practical": "Meet 09:30; leave by 10:15. Sunday morning opening confirmed on the official site. No weekend reservations: buy the ticket at the till and hand it over when seated. Allow €6–10 per person as a budget estimate. If the queue looks longer than 15 minutes, try 1902 nearby.",
    "look": "Order chocolate con churros, or porras if you prefer thicker fried dough. Ask for the portions you want to share; not everyone needs a separate chocolate."
  },
  "churros1902": {
    "name": "Chocolatería 1902",
    "mapQuery": "Chocolatería 1902, Calle de San Martín 2",
    "area": "Sol / Ópera",
    "lat": 40.4179,
    "lng": -3.7063,
    "address": "Calle de San Martín 2",
    "wiki": "https://en.wikipedia.org/wiki/Sol_(Madrid)",
    "wikiLabel": "Wikipedia · Sol neighbourhood",
    "kind": "food",
    "refs": [
      "churros1902"
    ],
    "summary": "Nearby churros backup if San Ginés has too long a queue.",
    "why": "Roughly five minutes from San Ginés, still within walking distance of Plaza de la Villa. It keeps everyone together without a detour.",
    "story": "A family-run chocolatería whose history dates to 1902. This is another long-established address for churros, porras and chocolate in the centre, rather than a separate sightseeing stop.",
    "practical": "Official hours: daily 07:00–23:00. Check the queue here too; it is not guaranteed to be quieter. Budget €6–10 each as an estimate. Leave breakfast by 10:15 for the event."
  }
};
const DAYS = [
  {
    "id": "fri",
    "date": "23",
    "label": "Friday",
    "theme": "Friday evening",
    "subtitle": "Airport, a short walk if there is time, then dinner.",
    "range": "23 October",
    "pace": "Keep the arrival flexible",
    "budget": "€20–35",
    "note": "Bastien lands at 17:00 and goes to Fer’s. Sam stays with José. Meet directly at dinner; do not send José and Sam across to Pacífico first. If bags are not dropped by 19:00, skip Retiro.",
    "stops": [
      {
        "id": "arrival",
        "place": "fer",
        "time": "17:00–18:45",
        "at": "2026-10-23T17:00:00+02:00",
        "hint": "Arrival and bags",
        "desc": "Bastien → Fer’s in Pacífico. Sam is already with José in Quintana; they do not need to come here.",
        "fixed": true
      },
      {
        "id": "ret",
        "place": "retiro",
        "time": "18:45–19:30",
        "at": "2026-10-23T18:15:00+02:00",
        "hint": "Optional walk",
        "desc": "Fer + Bastien: optional short walk after dropping bags. José + Sam can meet you directly at dinner."
      },
      {
        "id": "paco",
        "place": "paco",
        "time": "20:30–22:00",
        "at": "2026-10-23T19:30:00+02:00",
        "hint": "Dinner",
        "desc": "All four meet here at 20:30. Fer + Bastien: allow 40–50 minutes from Retiro. José + Sam: L5 to Callao, change to L3 for Argüelles, then walk."
      },
      {
        "id": "equis",
        "place": "equis",
        "time": "22:45 onwards",
        "at": "2026-10-23T22:00:00+02:00",
        "hint": "Evening drinks",
        "desc": "L3 Argüelles → Sol, then about 10 minutes on foot."
      }
    ],
    "distance": "About 3–5 km on foot, plus metro"
  },
  {
    "id": "sat",
    "date": "24",
    "label": "Saturday",
    "theme": "Saturday: old town and archaeology",
    "subtitle": "Breakfast near each base, meet in Sol, then old town, river and the MAN.",
    "range": "24 October",
    "pace": "The long walking day",
    "budget": "€30–50",
    "note": "Old town and river: roughly 5 km including detours. With the museum and evening, expect 10–14 km across the day. Cut the river if the morning runs late.",
    "stops": [
      {
        "id": "sol",
        "place": "sol",
        "time": "10:45",
        "at": "2026-10-24T10:00:00+02:00",
        "hint": "Meet for the walk",
        "desc": "All four: west side of Sol, at the start of Calle Mayor. Fer + Bastien: L1 direct. José + Sam: L5 to Gran Vía, then about 10 minutes on foot.",
        "fixed": true
      },
      {
        "id": "mayor",
        "place": "mayor",
        "time": "11:00",
        "at": "2026-10-24T10:45:00+02:00",
        "hint": "Old-town stop 1",
        "desc": "5 minutes on foot from Sol."
      },
      {
        "id": "villa",
        "place": "villa",
        "time": "11:25",
        "at": "2026-10-24T11:10:00+02:00",
        "hint": "Old-town stop 2",
        "desc": "5 minutes on foot along Calle Mayor."
      },
      {
        "id": "palace",
        "place": "palace",
        "time": "11:50",
        "at": "2026-10-24T11:35:00+02:00",
        "hint": "Old-town stop 3",
        "desc": "10 minutes on foot via Calle Mayor and Bailén."
      },
      {
        "id": "wall",
        "place": "wall",
        "time": "12:20",
        "at": "2026-10-24T12:05:00+02:00",
        "hint": "Old-town stop 4",
        "desc": "8–10 minutes on foot past the Almudena."
      },
      {
        "id": "vistillas",
        "place": "vistillas",
        "time": "12:45",
        "at": "2026-10-24T12:30:00+02:00",
        "hint": "View and a break",
        "desc": "10 minutes on foot; then a bench break."
      },
      {
        "id": "bridge",
        "place": "bridge",
        "time": "13:15",
        "at": "2026-10-24T13:00:00+02:00",
        "hint": "Down to the river",
        "desc": "15 minutes downhill via Calle de Segovia."
      },
      {
        "id": "river",
        "place": "river",
        "time": "13:30–14:00",
        "at": "2026-10-24T13:15:00+02:00",
        "hint": "Riverside walk",
        "desc": "Walk north along the river towards Puente del Rey."
      },
      {
        "id": "lunch",
        "place": "lunch",
        "time": "14:00–15:15",
        "at": "2026-10-24T13:45:00+02:00",
        "hint": "Lunch break",
        "desc": "10 minutes from Puente del Rey; leave for the MAN by about 15:15."
      },
      {
        "id": "man",
        "place": "man",
        "time": "16:00–18:00",
        "at": "2026-10-24T15:15:00+02:00",
        "hint": "Afternoon museum",
        "desc": "L10 to Alonso Martínez, then 15–20 minutes on foot."
      },
      {
        "id": "granvia",
        "place": "granvia",
        "time": "18:20–19:15",
        "at": "2026-10-24T17:45:00+02:00",
        "hint": "Walk towards dinner",
        "desc": "MAN → Recoletos → Cibeles → Gran Vía → Callao. Around 45–60 minutes with stops."
      },
      {
        "id": "pez",
        "place": "pez",
        "time": "19:45–21:00",
        "at": "2026-10-24T18:45:00+02:00",
        "hint": "Dinner",
        "desc": "From Callao, about 10 minutes north to Pez 36."
      },
      {
        "id": "camacho",
        "place": "camacho",
        "time": "21:00 onwards",
        "at": "2026-10-24T20:30:00+02:00",
        "hint": "Evening drinks",
        "desc": "About 10 minutes on foot from Pez 36."
      }
    ],
    "distance": "About 10–14 km over the day"
  },
  {
    "id": "sun",
    "date": "25",
    "label": "Sunday",
    "theme": "Sunday: churros, the flock and the Rastro",
    "subtitle": "Breakfast together, a fixed morning event, then the market and an easy afternoon.",
    "range": "25 October",
    "pace": "Leave the afternoon open",
    "budget": "€30–50",
    "note": "The clocks go back overnight: 03:00 becomes 02:00. All times shown are Madrid time. If choosing the Prado, move El Tigre to about 19:30.",
    "stops": [
      {
        "id": "churros",
        "place": "sangines",
        "time": "09:30–10:15",
        "at": "2026-10-25T08:30:00+01:00",
        "hint": "Chocolate and churros together",
        "desc": "Meet all four at 09:30. L1 to Sol for Fer + Bastien; L5 to Ópera for José + Sam, then walk. Queue over 15 minutes? Try 1902 nearby. Leave by 10:15.",
        "fixed": true
      },
      {
        "id": "trash",
        "place": "trash",
        "time": "10:30–11:45",
        "at": "2026-10-25T09:30:00+01:00",
        "hint": "Sunday morning event",
        "desc": "Walk about 10 minutes from breakfast; allow more for street closures and crowds. Reach Plaza de la Villa by 10:30–10:45.",
        "fixed": true
      },
      {
        "id": "rastro",
        "place": "rastro",
        "time": "12:15–14:00",
        "at": "2026-10-25T11:45:00+01:00",
        "hint": "Sunday market",
        "desc": "10–15 minutes from Plaza de la Villa; allow more for the crowds."
      },
      {
        "id": "almeria",
        "place": "almeria",
        "time": "14:00–15:30",
        "at": "2026-10-25T13:30:00+01:00",
        "hint": "Lunch",
        "desc": "About 10 minutes from Cascorro. Check for a table first."
      },
      {
        "id": "letras",
        "place": "letras",
        "time": "15:30–18:30",
        "at": "2026-10-25T15:00:00+01:00",
        "hint": "Afternoon options",
        "desc": "20 minutes from the lunch area. Prado is the museum alternative."
      },
      {
        "id": "tigre",
        "place": "tigre",
        "time": "19:00–20:30",
        "at": "2026-10-25T18:15:00+01:00",
        "hint": "Final meal",
        "desc": "About 20 minutes from Santa Ana, or 25 minutes from the Prado."
      }
    ],
    "distance": "About 6–9 km, depending on the afternoon"
  }
];
const IDEAS = [
  {
    "place": "churros1902",
    "days": [
      "sun"
    ],
    "type": "food",
    "tag": "Breakfast backup",
    "when": "If San Ginés has a queue over 15 minutes",
    "replaces": "San Ginés breakfast, not the morning event",
    "cost": "€6–10 / person, estimated",
    "minutes": "30–40 min",
    "tradeoff": "Five minutes away, but may also have a queue. Keep the 10:15 departure for Plaza de la Villa."
  },
  {
    "place": "reina",
    "days": [
      "fri"
    ],
    "type": "museum",
    "tag": "Rain",
    "when": "If bags are dropped by 18:30",
    "replaces": "Retiro; move dinner to 21:00",
    "cost": "Free 19:00–21:00",
    "minutes": "60–75 min",
    "tradeoff": "Allow another 40–50 minutes to reach Casa Paco."
  },
  {
    "place": "letras",
    "days": [
      "fri"
    ],
    "type": "walk",
    "tag": "Short walk",
    "when": "After arrival, if you prefer the centre",
    "replaces": "Retiro",
    "cost": "Free",
    "minutes": "45–60 min",
    "tradeoff": "Less convenient than the park from Pacífico; do not add both."
  },
  {
    "place": "debod",
    "days": [
      "fri"
    ],
    "type": "walk",
    "tag": "Near dinner",
    "when": "If you reach Argüelles early",
    "replaces": "The longer Retiro walk",
    "cost": "Free exterior",
    "minutes": "20–30 min",
    "tradeoff": "Interior entry is a separate visit with limited capacity."
  },
  {
    "place": "sanisidro",
    "days": [
      "sat",
      "sun"
    ],
    "type": "museum",
    "tag": "Rain / shorter day",
    "when": "After Vistillas, or after Sunday lunch",
    "replaces": "The river; or the longer Sunday afternoon",
    "cost": "Free",
    "minutes": "45–60 min",
    "tradeoff": "Smaller than the MAN; useful for Madrid history rather than a major collection."
  },
  {
    "place": "campo",
    "days": [
      "sat"
    ],
    "type": "walk",
    "tag": "More outdoors",
    "when": "After Puente del Rey",
    "replaces": "Part of the old town or the MAN block",
    "cost": "Free",
    "minutes": "60–90 min",
    "tradeoff": "The lake is a detour; keep an eye on the 16:00 MAN plan."
  },
  {
    "place": "betijai",
    "days": [
      "sat",
      "sun"
    ],
    "type": "event",
    "tag": "This weekend",
    "when": "Sat 15:30/17:00 or Sun 15:30",
    "replaces": "MAN on Saturday; relaxed afternoon on Sunday",
    "cost": "Free · reserve",
    "minutes": "One booked session",
    "tradeoff": "Ticket availability not checked. Walk-in visits are suspended on 24–25 October."
  },
  {
    "place": "palace",
    "days": [
      "sat"
    ],
    "type": "museum",
    "tag": "More royal history",
    "when": "Late Saturday morning",
    "replaces": "The river and part of the old-town walk",
    "cost": "Paid · check ticket",
    "minutes": "About 2 h",
    "tradeoff": "The usual free interior hours are not at the weekend. Book before changing the day."
  },
  {
    "place": "historia",
    "days": [
      "sat"
    ],
    "type": "museum",
    "tag": "Free indoor stop",
    "when": "Before the Malasaña evening",
    "replaces": "Extra wandering after the MAN",
    "cost": "Free",
    "minutes": "45–60 min",
    "tradeoff": "Two museums in one afternoon is a lot; use it mainly if you skip the MAN."
  },
  {
    "place": "ardosa",
    "days": [
      "sat"
    ],
    "type": "food",
    "tag": "Dinner backup",
    "when": "If the Pez bars are full",
    "replaces": "Pez Tortilla",
    "cost": "Pay per order",
    "minutes": "5–10 min from Pez",
    "tradeoff": "Also popular and crowded. Check space before moving everyone."
  },
  {
    "place": "tigre",
    "days": [
      "sat"
    ],
    "type": "food",
    "tag": "Cheap dinner",
    "when": "After the MAN if you prefer Chueca",
    "replaces": "Pez; move Sunday’s final meal elsewhere",
    "cost": "€10–18 estimate",
    "minutes": "15–20 min from MAN",
    "tradeoff": "Noisy, usually standing, and tapas are not all vegetarian."
  },
  {
    "place": "via",
    "days": [
      "sat"
    ],
    "type": "night",
    "tag": "Music",
    "when": "After Casa Camacho",
    "replaces": "Another quiet bar",
    "cost": "Check at door",
    "minutes": "5 min from Camacho",
    "tradeoff": "Entry and music depend on the evening; no specific show is booked."
  },
  {
    "place": "prado",
    "days": [
      "sun"
    ],
    "type": "museum",
    "tag": "Classic first visit",
    "when": "17:00–19:00; arrive earlier for the queue",
    "replaces": "The long Letras afternoon; dinner moves later",
    "cost": "Free collection slot",
    "minutes": "Up to 2 h",
    "tradeoff": "The queue reduces looking time. Paid daytime entry is €15 according to the museum."
  },
  {
    "place": "retiro",
    "days": [
      "sun"
    ],
    "type": "walk",
    "tag": "Quiet afternoon",
    "when": "After lunch if everyone wants a park",
    "replaces": "Prado or Letras",
    "cost": "Free",
    "minutes": "60–90 min",
    "tradeoff": "Further from the lunch area. Check park weather closures."
  },
  {
    "place": "matadero",
    "days": [
      "sun"
    ],
    "type": "walk",
    "tag": "More river",
    "when": "After lunch, heading south",
    "replaces": "Prado or Letras",
    "cost": "Free exterior",
    "minutes": "60–90 min",
    "tradeoff": "Exhibitions have separate access rules; courtyard opening is not a ticket to every show."
  },
  {
    "place": "revuelta",
    "days": [
      "sun"
    ],
    "type": "food",
    "tag": "Quick food stop",
    "when": "Before 16:00, near the Rastro",
    "replaces": "A long sit-down lunch",
    "cost": "Pay per order",
    "minutes": "5–10 min from Cascorro",
    "tradeoff": "Fish-focused, with limited space. Better as a snack stop for those who want cod."
  },
  {
    "place": "venencia",
    "days": [
      "fri",
      "sun"
    ],
    "type": "food",
    "tag": "Sherry",
    "when": "Evening in the Letras area",
    "replaces": "Another drinks stop",
    "cost": "Pay per order",
    "minutes": "5 min from Santa Ana",
    "tradeoff": "Published afternoon closure until 19:30. Limited food range; not a full dinner."
  }
];
const ROUTES = [
  {
    "id": "fri-dinner",
    "day": "fri",
    "title": "Retiro → dinner",
    "places": [
      "retiro",
      "paco"
    ],
    "mode": "transit",
    "note": "Metro and walking. Allow 40–50 minutes."
  },
  {
    "id": "fri-drinks",
    "day": "fri",
    "title": "Dinner → evening drinks",
    "places": [
      "paco",
      "equis"
    ],
    "mode": "transit",
    "note": "L3 to Sol, then walk."
  },
  {
    "id": "fri-jose-dinner",
    "day": "fri",
    "title": "José + Sam → dinner",
    "places": [
      "jose",
      "paco"
    ],
    "mode": "transit",
    "note": "L5 Quintana → Callao, L3 → Argüelles, then walk. Meet the others at dinner, not in Pacífico."
  },
  {
    "id": "sat-fer-meet",
    "day": "sat",
    "title": "Fer + Bastien → Sol",
    "places": [
      "fer",
      "sol"
    ],
    "mode": "transit",
    "note": "L1 direct. Leave the neighbourhood bar around 10:10; meet at the west side of Sol at 10:45."
  },
  {
    "id": "sat-jose-meet",
    "day": "sat",
    "title": "José + Sam → Sol",
    "places": [
      "jose",
      "sol"
    ],
    "mode": "transit",
    "note": "L5 to Gran Vía, then walk about 10 minutes. Leave around 10:00; meet at 10:45."
  },
  {
    "id": "sat-oldtown",
    "day": "sat",
    "title": "Old town walk",
    "places": [
      "sol",
      "mayor",
      "villa",
      "palace",
      "wall"
    ],
    "mode": "walking",
    "note": "About 2.5 km; allow 90 minutes with stops."
  },
  {
    "id": "sat-river",
    "day": "sat",
    "title": "Wall → river → lunch",
    "places": [
      "wall",
      "vistillas",
      "bridge",
      "river",
      "lunch"
    ],
    "mode": "walking",
    "note": "Roughly 2.5–3 km including the climb to Príncipe Pío."
  },
  {
    "id": "sat-museum",
    "day": "sat",
    "title": "Lunch → museum",
    "places": [
      "lunch",
      "man"
    ],
    "mode": "transit",
    "note": "L10 to Alonso Martínez, then walk."
  },
  {
    "id": "sat-evening",
    "day": "sat",
    "title": "MAN → Gran Vía → dinner",
    "places": [
      "man",
      "granvia",
      "callao",
      "pez"
    ],
    "mode": "walking",
    "note": "Via Recoletos and Cibeles. About 3 km; allow an hour with stops."
  },
  {
    "id": "sun-market",
    "day": "sun",
    "title": "Morning event → market → lunch",
    "places": [
      "trash",
      "rastro",
      "almeria"
    ],
    "mode": "walking",
    "note": "Short distances, but allow for the flock and the market crowds."
  },
  {
    "id": "sun-afternoon",
    "day": "sun",
    "title": "Lunch → Letras → final meal",
    "places": [
      "almeria",
      "letras",
      "tigre"
    ],
    "mode": "walking",
    "note": "Around 3 km. Use individual directions if choosing the Prado instead."
  },
  {
    "id": "sat-drinks",
    "day": "sat",
    "title": "Dinner → drinks",
    "places": [
      "pez",
      "camacho"
    ],
    "mode": "walking",
    "note": "About 10 minutes on foot. La Vía Láctea is an optional next stop."
  },
  {
    "id": "sun-breakfast-event",
    "day": "sun",
    "title": "Churros → Plaza de la Villa",
    "places": [
      "sangines",
      "trash"
    ],
    "mode": "walking",
    "note": "Leave breakfast by 10:15. Around 10 minutes on foot; keep extra time for street closures and crowds."
  }
];
const HISTORY = {
  "intro": "The morning walk explains how Madrid became a capital. The afternoon museum goes further back, to the societies that existed in the peninsula before Madrid. Read these in either order.",
  "chapters": [
    {
      "date": "Before Madrid",
      "title": "The peninsula was not one country",
      "body": "Before Roman rule, the Iberian Peninsula contained different peoples and political communities. “Iberian” refers to particular cultures, especially in the east and south; it is not a name for every ancient inhabitant. At the MAN, start with Iberian sculpture before moving to Rome. The Lady of Elche is an object from that world, not a portrait of a queen of Spain.",
      "connection": "At the MAN: compare Iberian sculpture with Roman portraits and inscriptions.",
      "refs": [
        "dama"
      ],
      "wiki": "https://en.wikipedia.org/wiki/Iberians"
    },
    {
      "date": "Roman period → 711",
      "title": "Hispania, then the Visigothic kingdom",
      "body": "Roman rule brought the peninsula into a wider Mediterranean world, with Latin, Roman law, roads and urban institutions. After Roman imperial authority in the west weakened, the Visigothic kingdom came to rule much of the peninsula from Toledo. The seventh-century Guarrazar crowns were offerings to churches, not crowns made to wear. Their wealth shows the relationship between the royal court and the Church.",
      "connection": "At the MAN: everyday Roman objects → the Guarrazar treasure. Some pieces from the same treasure are in Paris.",
      "refs": [
        "hispania",
        "guarrazar"
      ],
      "wiki": "https://en.wikipedia.org/wiki/Visigothic_Kingdom"
    },
    {
      "date": "711 → 1085",
      "title": "Al-Andalus and the small fortress of Mayrit",
      "body": "From 711, Muslim powers established al-Andalus across much of the peninsula. The ninth-century fortified settlement associated with Muhammad I is the origin of Madrid’s historic core. Its position above the river mattered more than any future role as capital. Madrid passed into Christian rule in the time of Alfonso VI, in the context of the conquest of Toledo in 1085.",
      "connection": "On the walk: the wall below the Almudena is the surviving evidence. This city was much smaller than the later court town.",
      "refs": [
        "wall"
      ],
      "wiki": "https://en.wikipedia.org/wiki/History_of_Madrid"
    },
    {
      "date": "Late 1400s → 1561",
      "title": "A monarchy of several kingdoms",
      "body": "The marriage of Isabella of Castile and Ferdinand of Aragon linked their crowns; it did not instantly turn the peninsula into one uniform state. The fall of Granada in 1492 ended the last Muslim-ruled kingdom in Iberia. Their Habsburg successors inherited territories across Europe and overseas. In 1561 Philip II settled the court in Madrid, bringing officials, households and demand for housing to a town that already had a royal residence.",
      "connection": "At Sol and the old town: imagine a growing court fitted into an existing medieval street plan.",
      "refs": [
        "austrias"
      ],
      "wiki": "https://en.wikipedia.org/wiki/Catholic_Monarchs_of_Spain"
    },
    {
      "date": "1561 → 1700",
      "title": "Why this is called Madrid de los Austrias",
      "body": "“Austrias” means Spain’s Habsburg dynasty. Madrid became the administrative centre of a monarchy with far-flung territories, not simply the capital of a compact nation-state. Plaza Mayor belongs to this court city. So do the Golden Age writers linked to Letras and the royal world painted by Velázquez. The 1656 Texeira map records this Madrid under Philip IV, before the present Royal Palace or Gran Vía existed.",
      "connection": "Plaza Mayor → Plaza de la Villa → the royal site. Later, the Prado gives faces and paintings to the same court.",
      "refs": [
        "austrias",
        "mayor",
        "texeira"
      ],
      "wiki": "https://en.wikipedia.org/wiki/Habsburg_Spain"
    },
    {
      "date": "1700 → 1700s",
      "title": "The French connection: the Bourbons",
      "body": "When Charles II died without an heir in 1700, his chosen successor was Philip of Anjou, a grandson of Louis XIV. The disputed succession became a European war involving France, Austria, England and other powers. Philip V established the Spanish Bourbon dynasty. After the Alcázar burned in 1734, he commissioned the palace you see today. The older royal location stayed; the dynasty and building changed.",
      "connection": "At the palace: the surrounding “Austrias” district and this Bourbon building belong to different periods.",
      "refs": [
        "bourbons",
        "palace"
      ],
      "wiki": "https://en.wikipedia.org/wiki/War_of_the_Spanish_Succession"
    },
    {
      "date": "1910 → today",
      "title": "The city keeps being rebuilt",
      "body": "Gran Vía was cut through the old street fabric in the early twentieth century. Its offices, cinemas and high-rises are a different kind of capital from the court town. Malasaña’s later music culture adds another layer. Madrid Río is more recent still: opening in 2011, it turned space released by burying sections of the M-30 into riverside public space.",
      "connection": "Saturday: old town in the morning → the river → the MAN → Gran Vía → Malasaña.",
      "refs": [
        "granvia",
        "river",
        "via"
      ],
      "wiki": "https://en.wikipedia.org/wiki/Gran_V%C3%ADa,_Madrid"
    }
  ],
  "museum": [
    {
      "title": "1. Iberian sculpture",
      "time": "20–25 min",
      "text": "Lady of Elche and Bicha of Balazote. Look at dress, animal imagery and the influence of Mediterranean contacts. Avoid treating all pre-Roman peoples as a single culture."
    },
    {
      "title": "2. Roman Hispania",
      "time": "25–30 min",
      "text": "Choose a portrait, a Latin inscription and a domestic object. Together they show public power, written law and ordinary life better than another list of emperors."
    },
    {
      "title": "3. Visigothic Toledo",
      "time": "20–25 min",
      "text": "The Guarrazar treasure: suspended letters name royal donors. These are church offerings. Toledo, not Madrid, was the royal centre."
    },
    {
      "title": "4. Medieval worlds",
      "time": "20–25 min",
      "text": "If there is time, compare the museum’s Andalusian and Christian collections. The morning wall now has a wider context. Keep the final minutes for the object someone wants to revisit."
    }
  ],
  "map": {
    "overview": {
      "file": "Plano Teixeira 1656.jpg",
      "url": "https://upload.wikimedia.org/wikipedia/commons/e/eb/Plano_Teixeira_1656.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail_unscaled",
      "page": "https://commons.wikimedia.org/wiki/File:Plano_Teixeira_1656.jpg",
      "author": "Pedro Teixeira Albernaz",
      "license": "Public domain",
      "licenseUrl": ""
    },
    "detail": {
      "file": "Teixeira - Topographia de la Villa de Madrid 1656.jpg",
      "url": "https://thumb.wikimedia.org/wikipedia/commons/thumb/a/a5/Teixeira_-_Topographia_de_la_Villa_de_Madrid_1656.jpg/1280px-Teixeira_-_Topographia_de_la_Villa_de_Madrid_1656.jpg?utm_source=commons.wikimedia.org&utm_campaign=imageinfo&utm_content=thumbnail",
      "page": "https://commons.wikimedia.org/wiki/File:Teixeira_-_Topographia_de_la_Villa_de_Madrid_1656.jpg",
      "author": "Pedro Teixeira Albernaz",
      "license": "Public domain",
      "licenseUrl": ""
    },
    "source": "https://geoportal.madrid.es/IDEAM_WBGEOPORTAL/dataset.iam?id=SPA_28079_SERVICIO_CARTOTECA_TEXEIRA",
    "printSource": "https://contenido.ign.es/web/catalogo-cartoteca/resources/html/001488.html",
    "wms": "https://servpub.madrid.es/georaster/CARTOTECA/PLANO_1656_TEXEIRA/ows",
    "layer": "PLANO_1656_TEXEIRA",
    "bounds": [
      -3.7365940312247523,
      40.40284733119813,
      -3.6761877794016438,
      40.4339281976161
    ]
  }
};
