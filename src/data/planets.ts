export interface CelestialBody {
  id: string;
  name: string;
  type: string;
  description: string;
  /** SVG orbital radius (compressed scale, not linear) */
  orbitR: number;
  /** SVG visual radius */
  size: number;
  /** Orbital period in Earth years (0 for the Sun) */
  periodYears: number;
  colors: { light: string; base: string; dark: string };
  ring?: { inner: string; outer: string };
  stats: {
    diameterKm: number;
    distanceMkm: number; // millions of km
    distanceAU: number;
    orbitLabel: string; // human readable orbital period
    orbitDays: number;
    dayLabel: string; // rotation period
    moons: number;
    tempLabel: string;
  };
  fact: string;
}

export const EARTH_ORBIT_SECONDS = 24; // Earth's year lasts 24 s at 1× speed

export const SUN: CelestialBody = {
  id: "sol",
  name: "Sol",
  type: "Estrella · Enana amarilla",
  description:
    "La estrella que da nombre a nuestro sistema. Contiene el 99,86 % de toda su masa y su gravedad mantiene a los ocho planetas en órbita.",
  orbitR: 0,
  size: 34,
  periodYears: 0,
  colors: { light: "#FFF3C4", base: "#FFC24B", dark: "#E8720C" },
  stats: {
    diameterKm: 1392700,
    distanceMkm: 0,
    distanceAU: 0,
    orbitLabel: "—",
    orbitDays: 0,
    dayLabel: "25–35 días (rotación)",
    moons: 0,
    tempLabel: "5 505 °C (superficie)",
  },
  fact: "Dentro del Sol cabrían más de un millón de Tierras. La luz que ves salió de su superficie hace unos 8 minutos y 20 segundos.",
};

export const PLANETS: CelestialBody[] = [
  {
    id: "mercurio",
    name: "Mercurio",
    type: "Planeta rocoso",
    description:
      "El más pequeño y cercano al Sol. Un año mercuriano dura menos que uno de sus días solares: allí el tiempo se retuerce.",
    orbitR: 92,
    size: 6,
    periodYears: 0.2408,
    colors: { light: "#D8CFC4", base: "#A89B8C", dark: "#5E5347" },
    stats: {
      diameterKm: 4879,
      distanceMkm: 57.9,
      distanceAU: 0.39,
      orbitLabel: "88 días",
      orbitDays: 88,
      dayLabel: "59 días terrestres",
      moons: 0,
      tempLabel: "167 °C (media)",
    },
    fact: "Su superficie oscila entre −173 °C de noche y 427 °C de día: la mayor variación térmica de todo el sistema solar.",
  },
  {
    id: "venus",
    name: "Venus",
    type: "Planeta rocoso",
    description:
      "Gemelo infernal de la Tierra. Su atmósfera de CO₂ atrapa el calor en un efecto invernadero desbocado y gira al revés que casi todos.",
    orbitR: 134,
    size: 9,
    periodYears: 0.6152,
    colors: { light: "#FBE3B0", base: "#E8B36A", dark: "#8A5A2B" },
    stats: {
      diameterKm: 12104,
      distanceMkm: 108.2,
      distanceAU: 0.72,
      orbitLabel: "225 días",
      orbitDays: 225,
      dayLabel: "243 días (retrógrado)",
      moons: 0,
      tempLabel: "464 °C",
    },
    fact: "En Venus el día dura más que el año: tarda 243 días en girar sobre sí mismo, pero solo 225 en rodear al Sol.",
  },
  {
    id: "tierra",
    name: "Tierra",
    type: "Planeta rocoso",
    description:
      "Nuestro hogar y el único mundo conocido con vida. Agua líquida, placas tectónicas y una Luna que estabiliza su eje.",
    orbitR: 178,
    size: 10,
    periodYears: 1,
    colors: { light: "#9BD8F5", base: "#3D84C6", dark: "#123C6E" },
    stats: {
      diameterKm: 12742,
      distanceMkm: 149.6,
      distanceAU: 1,
      orbitLabel: "365,25 días",
      orbitDays: 365.25,
      dayLabel: "23 h 56 min",
      moons: 1,
      tempLabel: "15 °C (media)",
    },
    fact: "El 71 % de su superficie es océano. Desde el espacio, los astronautas describen su contorno azul como «una canica».",
  },
  {
    id: "marte",
    name: "Marte",
    type: "Planeta rocoso",
    description:
      "El planeta rojo, óxido de hierro a escala planetaria. Alberga el volcán más alto del sistema solar y es el próximo destino humano.",
    orbitR: 222,
    size: 7.5,
    periodYears: 1.8809,
    colors: { light: "#F2A98B", base: "#C8603C", dark: "#6E2A14" },
    stats: {
      diameterKm: 6779,
      distanceMkm: 227.9,
      distanceAU: 1.52,
      orbitLabel: "687 días",
      orbitDays: 687,
      dayLabel: "24 h 37 min",
      moons: 2,
      tempLabel: "−63 °C (media)",
    },
    fact: "El monte Olimpo mide 21,9 km de altura: casi tres veces el Everest. Y su cañón Valles Marineris cruzaría EE. UU. de costa a costa.",
  },
  {
    id: "jupiter",
    name: "Júpiter",
    type: "Gigante gaseoso",
    description:
      "El coloso del sistema: dos veces y media más masivo que todos los planetas juntos. Su Gran Mancha Roja es una tormenta centenaria.",
    orbitR: 300,
    size: 26,
    periodYears: 11.862,
    colors: { light: "#F0D9B8", base: "#C99A6B", dark: "#7A4E2E" },
    stats: {
      diameterKm: 139820,
      distanceMkm: 778.5,
      distanceAU: 5.2,
      orbitLabel: "11,9 años",
      orbitDays: 4333,
      dayLabel: "9 h 56 min",
      moons: 95,
      tempLabel: "−108 °C",
    },
    fact: "Gira tan rápido que un día dura menos de 10 horas, y su Gran Mancha Roja lleva activa al menos 350 años.",
  },
  {
    id: "saturno",
    name: "Saturno",
    type: "Gigante gaseoso",
    description:
      "El señor de los anillos: hielo y roca bailando a su alrededor. Es tan poco denso que flotaría en una bañera suficientemente grande.",
    orbitR: 372,
    size: 22,
    periodYears: 29.457,
    colors: { light: "#F5E6C4", base: "#D9B77E", dark: "#8A6A3C" },
    ring: { inner: "#CBB489", outer: "#8F7A50" },
    stats: {
      diameterKm: 116460,
      distanceMkm: 1434,
      distanceAU: 9.58,
      orbitLabel: "29,5 años",
      orbitDays: 10759,
      dayLabel: "10 h 42 min",
      moons: 146,
      tempLabel: "−139 °C",
    },
    fact: "Sus anillos miden 280 000 km de ancho, pero en algunos puntos apenas 10 metros de grosor.",
  },
  {
    id: "urano",
    name: "Urano",
    type: "Gigante de hielo",
    description:
      "El planeta que rueda de lado: su eje está tan inclinado que cada polo pasa 42 años seguidos a la luz y otros 42 en la oscuridad.",
    orbitR: 436,
    size: 15,
    periodYears: 84.01,
    colors: { light: "#D9F5F2", base: "#8FD4CC", dark: "#3E7E7E" },
    stats: {
      diameterKm: 50724,
      distanceMkm: 2871,
      distanceAU: 19.2,
      orbitLabel: "84 años",
      orbitDays: 30687,
      dayLabel: "17 h 14 min",
      moons: 27,
      tempLabel: "−195 °C",
    },
    fact: "Fue el primer planeta descubierto con telescopio (William Herschel, 1781). Hasta entonces, la humanidad solo conocía cinco.",
  },
  {
    id: "neptuno",
    name: "Neptuno",
    type: "Gigante de hielo",
    description:
      "El mundo más lejano, encontrado con matemáticas antes que con telescopios. Sus vientos son los más veloces del sistema solar.",
    orbitR: 482,
    size: 14,
    periodYears: 164.79,
    colors: { light: "#9FC0F5", base: "#3D6BD9", dark: "#1B2E75" },
    stats: {
      diameterKm: 49244,
      distanceMkm: 4495,
      distanceAU: 30.05,
      orbitLabel: "164,8 años",
      orbitDays: 60190,
      dayLabel: "16 h 6 min",
      moons: 16,
      tempLabel: "−201 °C",
    },
    fact: "Sus vientos superan los 2 100 km/h. Desde su descubrimiento en 1846 solo ha completado una órbita al Sol: la primera fue en 2011.",
  },
];

export const ALL_BODIES: CelestialBody[] = [SUN, ...PLANETS];

export const SPEED_PRESETS = [0.5, 1, 2, 5, 10, 25];

export const FUN_FACTS: string[] = [
  "La luz del Sol tarda 8 min 20 s en llegar a la Tierra… y 4 h 10 min en alcanzar Neptuno.",
  "Si el Sol fuera una puerta, la Tierra sería una moneda y Júpiter, una pelota de baloncesto.",
  "Un año en Mercurio (88 días) es más corto que un día solar en Venus (117 días).",
  "Saturno es tan poco denso que flotaría en agua dulce.",
  "Júpiter actúa como escudo gravitatorio: desvía cometas y asteroides lejos de la Tierra.",
  "Urano gira «tumbado»: su eje está inclinado 98 grados.",
  "Los vientos de Neptuno alcanzan 2 100 km/h, los más rápidos del sistema solar.",
  "Marte tiene atardeceres de color azul por el polvo de su atmósfera.",
  "La cola de un cometa siempre apunta en dirección contraria al Sol, sin importar hacia dónde viaje.",
  "Entre Marte y Júpiter hay un cinturón de asteroides… y Ceres, su planeta enano.",
];

export function fmt(n: number): string {
  return n.toLocaleString("es-ES", { maximumFractionDigits: 1 });
}
