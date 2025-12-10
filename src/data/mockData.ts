// Types
export interface Student {
  id: string;
  correoInstitucional: string;
  nombreCompleto: string;
  semestre: string;
  grupoDivision: string;
  campusSede: string;
  correoPersonal: string;
  telefono: string;
  carreraInteres1: string;
  carreraInteres2: string;
  carreraInteres3: string;
  institucionInteres1: string;
  institucionInteres2: string;
  institucionInteres3: string;
  probabilidadElegirTec: string;
}

export interface TrackingRecord {
  id: string;
  nombreCompleto: string;
  correo: string;
  semestre: string;
  curso: string;
  estado: 'Sin comenzar' | 'En progreso' | 'Finalizado';
  avanceConocete: string;
  avanceAutoconocimiento: string;
  reporteEstudiantesUrl: string;
  reporteFamiliasUrl: string;
  interaccionCoach: 'Sin comenzar' | 'BAJA' | 'MEDIA' | 'ALTA';
}

export interface VocationalProfile {
  id: string;
  correo: string;
  nombre: string;
  apellido: string;
  institucion: string;
  anioSemestre: string;
  grupoDivision: string;
  estiloDeVida: string;
  rankingArquetiposPersonalidad: {
    tipo: string;
    nivel: string;
    descripcion: string;
  }[];
  orientacionIntereses: string[];
  rankingInteligenciasMultiples: { tipo: string; nivel: 'Alta' | 'Media' | 'Baja' }[];
  habilidadesCognitivas: { tipo: string; nivel: 'Alta' | 'Media' | 'Baja' }[];
  habilidadesBlandas: { tipo: string; nivel: 'Alta' | 'Media' | 'Baja' }[];
  rankingAreaEstudio: { area: string; porcentaje: number }[];
  carrerasRecomendadasPorIntereses: string[];
  carrerasRecomendadasPorFortalezas: string[];
}

// Mock Students Data
export const students: Student[] = [
  {
    id: "A01665127",
    correoInstitucional: "A01665127@tec.mx",
    nombreCompleto: "Megan Abril Arroyo Hernández",
    semestre: "4",
    grupoDivision: "PTM14",
    campusSede: "Ciudad de México - Tec",
    correoPersonal: "maarroyoh07@gmail.com",
    telefono: "5539321285",
    carreraInteres1: "Derecho",
    carreraInteres2: "Relaciones Internacionales",
    carreraInteres3: "No manifiesta carrera de interés",
    institucionInteres1: "University of Oxford",
    institucionInteres2: "Columbia University",
    institucionInteres3: "Universidad Panamericana",
    probabilidadElegirTec: "3. Baja"
  },
  {
    id: "A01665505",
    correoInstitucional: "A01665505@tec.mx",
    nombreCompleto: "Santiago Martínez",
    semestre: "4",
    grupoDivision: "PBB14",
    campusSede: "Ciudad de México - Tec",
    correoPersonal: "No informa contacto",
    telefono: "No informa contacto",
    carreraInteres1: "Administración",
    carreraInteres2: "Administración de Empresas",
    carreraInteres3: "Administración de Empresas de Entretenimiento",
    institucionInteres1: "University of Alberta",
    institucionInteres2: "University of Adelaide",
    institucionInteres3: "Tecnológico de Monterrey",
    probabilidadElegirTec: "3. Baja"
  },
  {
    id: "A01665715",
    correoInstitucional: "A01665715@tec.mx",
    nombreCompleto: "André Sofía Canseco Rivera",
    semestre: "4",
    grupoDivision: "PTM14",
    campusSede: "Ciudad de México - Tec",
    correoPersonal: "andrecansecor@outlook.com",
    telefono: "5534858977",
    carreraInteres1: "Cine / Dirección Cinematográfica",
    carreraInteres2: "Teatro y Actuación",
    carreraInteres3: "Marketing",
    institucionInteres1: "New York University (NYU)",
    institucionInteres2: "New York University (NYU)",
    institucionInteres3: "New York University (NYU)",
    probabilidadElegirTec: "3. Baja"
  },
  {
    id: "A01666481",
    correoInstitucional: "A01666481@tec.mx",
    nombreCompleto: "Alonso Moragues Salgado",
    semestre: "4",
    grupoDivision: "PBB14",
    campusSede: "Ciudad de México - Tec",
    correoPersonal: "moraguessal.alonso@gmail.com",
    telefono: "5624115240",
    carreraInteres1: "Ingeniería Aeroespacial",
    carreraInteres2: "Actuaría y Finanzas",
    carreraInteres3: "Ingeniería en Mecatrónica",
    institucionInteres1: "California Institute of Technology (Caltech)",
    institucionInteres2: "Université de Montréal",
    institucionInteres3: "Stanford University",
    probabilidadElegirTec: "3. Baja"
  },
  {
    id: "A01667142",
    correoInstitucional: "A01667142@tec.mx",
    nombreCompleto: "Iker González Quintero",
    semestre: "4",
    grupoDivision: "PBB14",
    campusSede: "Ciudad de México - Tec",
    correoPersonal: "zaga8890@outlook.es",
    telefono: "5526956119",
    carreraInteres1: "Finanzas",
    carreraInteres2: "Economía Empresarial",
    carreraInteres3: "Marketing Digital",
    institucionInteres1: "University of Florida",
    institucionInteres2: "University of California, Los Angeles (UCLA)",
    institucionInteres3: "California Institute of Technology (Caltech)",
    probabilidadElegirTec: "3. Baja"
  },
  {
    id: "A01668227",
    correoInstitucional: "A01668227@tec.mx",
    nombreCompleto: "Juan Pablo Rivera Ayala",
    semestre: "4",
    grupoDivision: "PBB14",
    campusSede: "Ciudad de México - Tec",
    correoPersonal: "No informa contacto",
    telefono: "No informa contacto",
    carreraInteres1: "Derecho",
    carreraInteres2: "Contabilidad",
    carreraInteres3: "Economía",
    institucionInteres1: "Universidad Anáhuac",
    institucionInteres2: "Universidad Nacional de San Agustín de Arequipa (UNSA)",
    institucionInteres3: "Universidad Panamericana",
    probabilidadElegirTec: "3. Baja"
  },
  {
    id: "A01827153",
    correoInstitucional: "A01827153@tec.mx",
    nombreCompleto: "Alejandro Rodríguez López",
    semestre: "4",
    grupoDivision: "PBB14",
    campusSede: "Ciudad de México - Tec",
    correoPersonal: "No informa contacto",
    telefono: "No informa contacto",
    carreraInteres1: "Ingeniería Civil",
    carreraInteres2: "Arquitectura",
    carreraInteres3: "Actuaría y Finanzas",
    institucionInteres1: "University of Michigan-Ann Arbor",
    institucionInteres2: "Arizona State University",
    institucionInteres3: "Instituto TEC",
    probabilidadElegirTec: "3. Baja"
  },
  {
    id: "A01665150",
    correoInstitucional: "A01665150@tec.mx",
    nombreCompleto: "Fernanda Martínez Hernández",
    semestre: "4",
    grupoDivision: "PBB14",
    campusSede: "Ciudad de México - Tec",
    correoPersonal: "martinezf87536@gmail.com",
    telefono: "5534070609",
    carreraInteres1: "No manifiesta carrera de interés",
    carreraInteres2: "No manifiesta carrera de interés",
    carreraInteres3: "No manifiesta carrera de interés",
    institucionInteres1: "No especifica institución de interés",
    institucionInteres2: "No especifica institución de interés",
    institucionInteres3: "No especifica institución de interés",
    probabilidadElegirTec: "4. No especifica institución de interés"
  },
  {
    id: "A01665556",
    correoInstitucional: "A01665556@tec.mx",
    nombreCompleto: "Bruno Jardón Bandera",
    semestre: "4",
    grupoDivision: "PBB14",
    campusSede: "Ciudad de México - Tec",
    correoPersonal: "brujardon@gmail.com",
    telefono: "5586713621",
    carreraInteres1: "No manifiesta carrera de interés",
    carreraInteres2: "No manifiesta carrera de interés",
    carreraInteres3: "No manifiesta carrera de interés",
    institucionInteres1: "No especifica institución de interés",
    institucionInteres2: "No especifica institución de interés",
    institucionInteres3: "No especifica institución de interés",
    probabilidadElegirTec: "4. No especifica institución de interés"
  },
  {
    id: "A01826584",
    correoInstitucional: "A01826584@tec.mx",
    nombreCompleto: "Isabella Guzmán Rodríguez",
    semestre: "4",
    grupoDivision: "PBB14",
    campusSede: "Ciudad de México - Tec",
    correoPersonal: "isabella.guzman@gmail.com",
    telefono: "5512345678",
    carreraInteres1: "Psicología",
    carreraInteres2: "Comunicación",
    carreraInteres3: "Gobierno y Transformación Pública",
    institucionInteres1: "Tecnológico de Monterrey",
    institucionInteres2: "Universidad Iberoamericana",
    institucionInteres3: "ITAM",
    probabilidadElegirTec: "1. Alta"
  },
  {
    id: "A01666373",
    correoInstitucional: "A01666373@tec.mx",
    nombreCompleto: "Joaquín Montealegre Martell",
    semestre: "4",
    grupoDivision: "PBB14",
    campusSede: "Ciudad de México - Tec",
    correoPersonal: "joaquin.montealegre@gmail.com",
    telefono: "5567891234",
    carreraInteres1: "Ingeniería Industrial",
    carreraInteres2: "Administración de Empresas",
    carreraInteres3: "Finanzas",
    institucionInteres1: "Tecnológico de Monterrey",
    institucionInteres2: "UNAM",
    institucionInteres3: "IPN",
    probabilidadElegirTec: "1. Alta"
  },
  {
    id: "A01665106",
    correoInstitucional: "A01665106@tec.mx",
    nombreCompleto: "Jacobo Djaddah Meillon",
    semestre: "4",
    grupoDivision: "PTM14",
    campusSede: "Ciudad de México - Tec",
    correoPersonal: "jacobo.djaddah@gmail.com",
    telefono: "5543217890",
    carreraInteres1: "Economía",
    carreraInteres2: "Negocios Internacionales",
    carreraInteres3: "Derecho",
    institucionInteres1: "Tecnológico de Monterrey",
    institucionInteres2: "Universidad Anáhuac",
    institucionInteres3: "ITAM",
    probabilidadElegirTec: "2. Media"
  },
  {
    id: "A01665732",
    correoInstitucional: "A01665732@tec.mx",
    nombreCompleto: "Iván Alejandro Arenas Castro",
    semestre: "4",
    grupoDivision: "PBB14",
    campusSede: "Ciudad de México - Tec",
    correoPersonal: "ivan.arenas@gmail.com",
    telefono: "5598765432",
    carreraInteres1: "No manifiesta carrera de interés",
    carreraInteres2: "No manifiesta carrera de interés",
    carreraInteres3: "No manifiesta carrera de interés",
    institucionInteres1: "No especifica institución de interés",
    institucionInteres2: "No especifica institución de interés",
    institucionInteres3: "No especifica institución de interés",
    probabilidadElegirTec: "5. Falta completar actividad"
  }
];

// Mock Tracking Data
export const trackingRecords: TrackingRecord[] = [
  {
    id: "A01665732",
    nombreCompleto: "Iván Alejandro Arenas Castro",
    correo: "A01665732@tec.mx",
    semestre: "4",
    curso: "PBB14",
    estado: "Sin comenzar",
    avanceConocete: "Falta ¿Cuán preparado estás?",
    avanceAutoconocimiento: "Faltan todas las actividades",
    reporteEstudiantesUrl: "",
    reporteFamiliasUrl: "",
    interaccionCoach: "Sin comenzar"
  },
  {
    id: "A01667358",
    nombreCompleto: "Alejandro Balmaceda Cahue",
    correo: "A01667358@tec.mx",
    semestre: "4",
    curso: "PBB14",
    estado: "Finalizado",
    avanceConocete: "Finalizado",
    avanceAutoconocimiento: "Finalizado",
    reporteEstudiantesUrl: "https://drive.google.com/file/d/1So0ORz2EDFaY67SeYow5sXZlGNGRgGUa/view",
    reporteFamiliasUrl: "https://drive.google.com/file/d/1oYZxUw7zyYBKvSkWtPp9pgRfBciim29q/view",
    interaccionCoach: "MEDIA"
  },
  {
    id: "A01827153",
    nombreCompleto: "Alejandro Rodríguez López",
    correo: "A01827153@tec.mx",
    semestre: "4",
    curso: "PBB14",
    estado: "Finalizado",
    avanceConocete: "Finalizado",
    avanceAutoconocimiento: "Finalizado",
    reporteEstudiantesUrl: "https://drive.google.com/file/d/1Iuyd0gadMJbu3iiZfYZU-bAOuw2ZBlsY/view",
    reporteFamiliasUrl: "https://drive.google.com/file/d/1jE77HmG0QTYARXeu_go3QIvD9K6_C70Z/view",
    interaccionCoach: "MEDIA"
  },
  {
    id: "A01667354",
    nombreCompleto: "Alexa Itzamná Sánchez Martínez",
    correo: "A01667354@tec.mx",
    semestre: "4",
    curso: "PBB14",
    estado: "Finalizado",
    avanceConocete: "Finalizado",
    avanceAutoconocimiento: "Finalizado",
    reporteEstudiantesUrl: "https://drive.google.com/file/d/13UA3YbCEaOoFBZKycQy5MTEZ0olgKVk8/view",
    reporteFamiliasUrl: "https://drive.google.com/file/d/1e7PkaKO9-kgDrV49lOHPsJYHAW1XKeOp/view",
    interaccionCoach: "MEDIA"
  },
  {
    id: "A01666481",
    nombreCompleto: "Alonso Moragues Salgado",
    correo: "A01666481@tec.mx",
    semestre: "4",
    curso: "PBB14",
    estado: "Finalizado",
    avanceConocete: "Finalizado",
    avanceAutoconocimiento: "Finalizado",
    reporteEstudiantesUrl: "https://drive.google.com/file/d/1AwkaxhAFxcTE9iZ2iryM_koaa58pvb8y/view",
    reporteFamiliasUrl: "https://drive.google.com/file/d/1LzoU8UjS9dsGTqoB7gApoQ66ltj8s0qy/view",
    interaccionCoach: "MEDIA"
  },
  {
    id: "A01665715",
    nombreCompleto: "André Sofía Canseco Rivera",
    correo: "A01665715@tec.mx",
    semestre: "4",
    curso: "PTM14",
    estado: "Finalizado",
    avanceConocete: "Finalizado",
    avanceAutoconocimiento: "Finalizado",
    reporteEstudiantesUrl: "https://drive.google.com/file/d/1VX-DPtlm4ExLSRZm4nIZktEgU32aCzGJ/view",
    reporteFamiliasUrl: "https://drive.google.com/file/d/14YMT3et4Iaiqg3A9SwNuqbhBYuMHy5ww/view",
    interaccionCoach: "MEDIA"
  },
  {
    id: "A01665556",
    nombreCompleto: "Bruno Jardón Bandera",
    correo: "A01665556@tec.mx",
    semestre: "4",
    curso: "PBB14",
    estado: "Finalizado",
    avanceConocete: "Finalizado",
    avanceAutoconocimiento: "Finalizado",
    reporteEstudiantesUrl: "https://drive.google.com/file/d/1iWKoqJzadS4oMOD4QQHHk71ypITTWfJF/view",
    reporteFamiliasUrl: "https://drive.google.com/file/d/1bJBUsji-bRdsPJ9-5CE_GnbcMbWFyFts/view",
    interaccionCoach: "ALTA"
  },
  {
    id: "A01667558",
    nombreCompleto: "Camila Belem García López",
    correo: "A01667558@tec.mx",
    semestre: "4",
    curso: "PBB14",
    estado: "Finalizado",
    avanceConocete: "Finalizado",
    avanceAutoconocimiento: "Finalizado",
    reporteEstudiantesUrl: "https://drive.google.com/file/d/1smXgHJ5NU5KSoVF_1bmzaDVxXi_LlGsE/view",
    reporteFamiliasUrl: "https://drive.google.com/file/d/1N0EHP6kuhabmqFyU-QdH7To2REOzq1TN/view",
    interaccionCoach: "BAJA"
  },
  {
    id: "A01667153",
    nombreCompleto: "Juan Carlos Quintero Lacorte",
    correo: "A01667153@tec.mx",
    semestre: "4",
    curso: "PBB14",
    estado: "En progreso",
    avanceConocete: "Finalizado",
    avanceAutoconocimiento: "Finalizado",
    reporteEstudiantesUrl: "https://drive.google.com/file/d/19Vke7b7KrnodtFnKQKczywDfD0V3QAd0/view",
    reporteFamiliasUrl: "https://drive.google.com/file/d/16K2pZjVn7_lJv07bU0-FyNzO1VHj6_Hy/view",
    interaccionCoach: "Sin comenzar"
  },
  {
    id: "A01668227",
    nombreCompleto: "Juan Pablo Rivera Ayala",
    correo: "A01668227@tec.mx",
    semestre: "4",
    curso: "PBB14",
    estado: "En progreso",
    avanceConocete: "Finalizado",
    avanceAutoconocimiento: "Finalizado",
    reporteEstudiantesUrl: "",
    reporteFamiliasUrl: "",
    interaccionCoach: "Sin comenzar"
  },
  {
    id: "A01667478",
    nombreCompleto: "Luna Michelle Garduño López",
    correo: "A01667478@tec.mx",
    semestre: "4",
    curso: "PTM14",
    estado: "En progreso",
    avanceConocete: "Finalizado",
    avanceAutoconocimiento: "Finalizado",
    reporteEstudiantesUrl: "https://drive.google.com/file/d/1K30Kos6hwI8-uiK1HTFxAjEqfyEJ6v3P/view",
    reporteFamiliasUrl: "https://drive.google.com/file/d/19Eg5xzG8ycL-mS2hHNjJqUaBIiwos8uV/view",
    interaccionCoach: "Sin comenzar"
  },
  {
    id: "A01665505",
    nombreCompleto: "Santiago Martínez",
    correo: "A01665505@tec.mx",
    semestre: "4",
    curso: "PBB14",
    estado: "En progreso",
    avanceConocete: "Finalizado",
    avanceAutoconocimiento: "Finalizado",
    reporteEstudiantesUrl: "https://drive.google.com/file/d/1jWALl2lWHLpt2XZFFX7dlGh5GuvJDSFv/view",
    reporteFamiliasUrl: "https://drive.google.com/file/d/1rAATgh1SYxuaidqXb-ndbLRphxXaGMMW/view",
    interaccionCoach: "Sin comenzar"
  },
  {
    id: "A01826584",
    nombreCompleto: "Isabella Guzmán Rodríguez",
    correo: "A01826584@tec.mx",
    semestre: "4",
    curso: "PBB14",
    estado: "Finalizado",
    avanceConocete: "Finalizado",
    avanceAutoconocimiento: "Finalizado",
    reporteEstudiantesUrl: "https://drive.google.com/file/d/1u1iGKUkVqooJ653N8FAWVxotaltRmEsv/view",
    reporteFamiliasUrl: "https://drive.google.com/file/d/1tTw-c-rc8tNcYCgZHAVDfkqtK2m0uvHQ/view",
    interaccionCoach: "BAJA"
  }
];

// Mock Vocational Profiles
export const vocationalProfiles: VocationalProfile[] = [
  {
    id: "A01826584",
    correo: "A01826584@tec.mx",
    nombre: "Isabella",
    apellido: "Guzmán Rodríguez",
    institucion: "Ciudad de México - Tec",
    anioSemestre: "4",
    grupoDivision: "PBB14",
    estiloDeVida: "Busca combinar rutina con flexibilidad, priorizando equilibrio entre lo personal y lo profesional. Valora la estabilidad pero también la posibilidad de innovar en su entorno laboral.",
    rankingArquetiposPersonalidad: [
      { tipo: "Emprendedor", nivel: "Alta", descripcion: "Disfruta liderar y motivar a otros. Tiene iniciativa y se enfoca en lograr resultados concretos." },
      { tipo: "Social", nivel: "Alta", descripcion: "Disfruta ayudar a otros y trabajar en equipo. Se muestra empático/a y atento/a a las necesidades de quienes lo rodean." },
      { tipo: "Investigativo", nivel: "Alta", descripcion: "Disfruta analizar información y buscar patrones. Le motiva resolver problemas complejos y entender cómo funcionan las cosas." },
      { tipo: "Convencional", nivel: "Media", descripcion: "Valora la estructura, pero también puede adaptarse a situaciones más flexibles." },
      { tipo: "Realista", nivel: "Baja", descripcion: "Prefiere actividades más conceptuales o abstractas que lo manual o repetitivo." },
      { tipo: "Artístico", nivel: "Baja", descripcion: "Prefiere entornos más concretos o lógicos que los expresivos o artísticos." }
    ],
    orientacionIntereses: [
      "El hacer práctico, el movimiento y la resolución de problemas con sus propias manos.",
      "Las relaciones humanas, la empatía y el trabajo colaborativo."
    ],
    rankingInteligenciasMultiples: [
      { tipo: "Lingüístico-verbal", nivel: "Alta" },
      { tipo: "Lógico-matemática", nivel: "Alta" },
      { tipo: "Corporal-kinestésica", nivel: "Alta" },
      { tipo: "Musical", nivel: "Alta" },
      { tipo: "Intrapersonal", nivel: "Alta" },
      { tipo: "Visual-espacial", nivel: "Alta" },
      { tipo: "Interpersonal", nivel: "Alta" },
      { tipo: "Naturalista", nivel: "Media" }
    ],
    habilidadesCognitivas: [
      { tipo: "Abstracto", nivel: "Media" },
      { tipo: "Numérico", nivel: "Alta" },
      { tipo: "Verbal", nivel: "Alta" }
    ],
    habilidadesBlandas: [
      { tipo: "Gestión del tiempo", nivel: "Media" },
      { tipo: "Estrategias y hábitos de estudio", nivel: "Media" },
      { tipo: "Inteligencia emocional", nivel: "Alta" },
      { tipo: "Perseverancia", nivel: "Media" }
    ],
    rankingAreaEstudio: [
      { area: "Negocios", porcentaje: 37.5 },
      { area: "Ciencias Sociales y Gobierno", porcentaje: 25 },
      { area: "Medicina y Ciencias de la Salud", porcentaje: 25 },
      { area: "Humanidades y Educación", porcentaje: 12.5 }
    ],
    carrerasRecomendadasPorIntereses: [
      "Licenciado en Desarrollo de Talento y Cultura Organizacional (LDO)",
      "Licenciado en Comunicación (LC)",
      "Licenciado en Psicología Clínica y de la Salud (LPS)",
      "Licenciado en Gobierno y Transformación Pública (LTP)"
    ],
    carrerasRecomendadasPorFortalezas: [
      "Licenciado en Estrategia y Transformación de Negocios (LAE/BBA)",
      "Licenciado en Contaduría Pública y Finanzas (LCPF/BFA)",
      "Ingeniero en Tecnologías Computacionales (ITC/BCT)",
      "Licenciado en Diseño (LDI)"
    ]
  },
  {
    id: "A01665669",
    correo: "A01665669@tec.mx",
    nombre: "Armando",
    apellido: "Puente Romero",
    institucion: "Ciudad de México - Tec",
    anioSemestre: "4",
    grupoDivision: "PBB14",
    estiloDeVida: "Busca combinar rutina con flexibilidad, priorizando equilibrio entre lo personal y lo profesional.",
    rankingArquetiposPersonalidad: [
      { tipo: "Convencional", nivel: "Alta", descripcion: "Se siente cómodo/a con rutinas, normas y procedimientos claros. Le gusta mantener todo ordenado y organizado." },
      { tipo: "Artístico", nivel: "Alta", descripcion: "Disfruta crear y expresar ideas de manera original. Se siente motivado/a por la imaginación y la innovación." },
      { tipo: "Emprendedor", nivel: "Alta", descripcion: "Disfruta liderar y motivar a otros. Tiene iniciativa y se enfoca en lograr resultados concretos." },
      { tipo: "Social", nivel: "Media", descripcion: "Le gusta interactuar con otros, pero también valora tener tiempo para hacer las cosas por su cuenta." },
      { tipo: "Realista", nivel: "Media", descripcion: "Se siente cómodo/a en actividades prácticas, aunque no siempre son su principal motivación." },
      { tipo: "Investigativo", nivel: "Media", descripcion: "Tiene facilidad para el análisis, pero también se involucra en otras actividades." }
    ],
    orientacionIntereses: [
      "El hacer práctico, el movimiento y la resolución de problemas con sus propias manos.",
      "La organización, la estructura y la gestión eficiente."
    ],
    rankingInteligenciasMultiples: [
      { tipo: "Lógico-matemática", nivel: "Alta" },
      { tipo: "Visual-espacial", nivel: "Alta" },
      { tipo: "Interpersonal", nivel: "Alta" },
      { tipo: "Lingüístico-verbal", nivel: "Media" },
      { tipo: "Corporal-kinestésica", nivel: "Media" },
      { tipo: "Intrapersonal", nivel: "Media" },
      { tipo: "Musical", nivel: "Media" },
      { tipo: "Naturalista", nivel: "Media" }
    ],
    habilidadesCognitivas: [
      { tipo: "Abstracto", nivel: "Media" },
      { tipo: "Numérico", nivel: "Media" },
      { tipo: "Verbal", nivel: "Media" }
    ],
    habilidadesBlandas: [
      { tipo: "Gestión del tiempo", nivel: "Media" },
      { tipo: "Estrategias y hábitos de estudio", nivel: "Alta" },
      { tipo: "Inteligencia emocional", nivel: "Media" },
      { tipo: "Perseverancia", nivel: "Alta" }
    ],
    rankingAreaEstudio: [
      { area: "Negocios", porcentaje: 42.9 },
      { area: "Ingeniería y Ciencias", porcentaje: 42.9 },
      { area: "Arquitectura, Arte y Diseño", porcentaje: 14.2 },
      { area: "Humanidades y Educación", porcentaje: 0 }
    ],
    carrerasRecomendadasPorIntereses: [
      "Licenciado en Contaduría Pública y Finanzas (LCPF/BFA)",
      "Ingeniero en Tecnologías Computacionales (ITC/BCT)",
      "Licenciado en Diseño (LDI)",
      "Licenciado en Estrategia y Transformación de Negocios (LAE/BBA)"
    ],
    carrerasRecomendadasPorFortalezas: [
      "Ingeniero Industrial y de Sistemas (IIS)",
      "Licenciado en Administración de Empresas (LAE)",
      "Ingeniero en Mecatrónica (IMT)",
      "Arquitecto (ARQ)"
    ]
  }
];

// Helper functions
export const getStudentById = (id: string): Student | undefined => {
  return students.find(s => s.id === id);
};

export const getTrackingById = (id: string): TrackingRecord | undefined => {
  return trackingRecords.find(t => t.id === id);
};

export const getVocationalProfileById = (id: string): VocationalProfile | undefined => {
  return vocationalProfiles.find(v => v.id === id);
};

// Statistics helpers
export const getOverviewStats = () => {
  const total = students.length;
  const alta = students.filter(s => s.probabilidadElegirTec.includes("Alta")).length;
  const media = students.filter(s => s.probabilidadElegirTec.includes("Media")).length;
  const baja = students.filter(s => s.probabilidadElegirTec.includes("Baja")).length;
  const noEspecifica = students.filter(s => s.probabilidadElegirTec.includes("No especifica")).length;
  const faltaCompletar = students.filter(s => s.probabilidadElegirTec.includes("Falta completar")).length;

  const finalizados = trackingRecords.filter(t => t.estado === "Finalizado").length;
  const enProgreso = trackingRecords.filter(t => t.estado === "En progreso").length;
  const sinComenzar = trackingRecords.filter(t => t.estado === "Sin comenzar").length;

  return {
    total,
    tasaRespuesta: ((total - faltaCompletar) / total * 100).toFixed(1),
    probabilidadAlta: alta,
    faltaCompletar,
    distribucionProbabilidad: [
      { name: "Alta", value: alta, percentage: (alta / total * 100).toFixed(1) },
      { name: "Media", value: media, percentage: (media / total * 100).toFixed(1) },
      { name: "Baja", value: baja, percentage: (baja / total * 100).toFixed(1) },
      { name: "No especifica", value: noEspecifica, percentage: (noEspecifica / total * 100).toFixed(1) },
      { name: "Falta completar", value: faltaCompletar, percentage: (faltaCompletar / total * 100).toFixed(1) },
    ],
    avanceActividades: [
      { name: "Finalizado", value: finalizados },
      { name: "En progreso", value: enProgreso },
      { name: "Sin comenzar", value: sinComenzar },
    ]
  };
};

export const getTopCarreras = () => {
  const carreraCount: Record<string, number> = {};
  
  students.forEach(s => {
    [s.carreraInteres1, s.carreraInteres2, s.carreraInteres3].forEach(c => {
      if (c && !c.includes("No manifiesta")) {
        carreraCount[c] = (carreraCount[c] || 0) + 1;
      }
    });
  });

  return Object.entries(carreraCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));
};

export const getTopInstituciones = () => {
  const instCount: Record<string, number> = {};
  
  students.forEach(s => {
    [s.institucionInteres1, s.institucionInteres2, s.institucionInteres3].forEach(i => {
      if (i && !i.includes("No especifica")) {
        instCount[i] = (instCount[i] || 0) + 1;
      }
    });
  });

  return Object.entries(instCount)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));
};

export const getCoachInteractionStats = () => {
  const sinComenzar = trackingRecords.filter(t => t.interaccionCoach === "Sin comenzar").length;
  const baja = trackingRecords.filter(t => t.interaccionCoach === "BAJA").length;
  const media = trackingRecords.filter(t => t.interaccionCoach === "MEDIA").length;
  const alta = trackingRecords.filter(t => t.interaccionCoach === "ALTA").length;

  return [
    { name: "Sin comenzar", value: sinComenzar },
    { name: "Baja", value: baja },
    { name: "Media", value: media },
    { name: "Alta", value: alta },
  ];
};