// studentsStore.ts
export interface Student {
  id: string;
  correoInstitucional: string;
  nombreCompleto: string;
  semestre: string;
  grupoDivision: string;
  campusSede: string;
  mentor: string;
  carreraInteres1: string;
  carreraInteres2: string;
  institucionInteres1: string;
  institucionInteres2: string;
  probabilidadElegirTec: string;
  estado: 'Sin comenzar' | 'En progreso' | 'Finalizado';
  avanceConocete: string;
  avanceAutoconocimiento: string;
  estiloDeVida: string;
  reporteEstudiantesUrl: string;
  reporteFamiliasUrl: string;
  rankingArquetiposPersonalidad: {tipo: string; nivel: string; }[];
  orientacionIntereses: string[];
  rankingInteligenciasMultiples: { tipo: string; nivel: 'Alta' | 'Media' | 'Baja' }[];
  habilidadesCognitivas: { tipo: string; nivel: 'Alta' | 'Media' | 'Baja' }[];
  habilidadesBlandas: { tipo: string; nivel: 'Alta' | 'Media' | 'Baja' }[];
  rankingAreaEstudio: { area: string; porcentaje: number }[];
  carrerasRecomendadasPorIntereses: string[];
  carrerasRecomendadasPorFortalezas: string[];
}

let cache: Student[] | null = null;
let inflight: Promise<Student[]> | null = null;

async function loadStudents(): Promise<Student[]> {
  const res = await fetch("/api/students");
  if (!res.ok) throw new Error("Failed to load students");
  return res.json();
}

export async function getStudents(): Promise<Student[]> {
  if (cache) return cache;

  if (!inflight) {
    inflight = loadStudents().then(data => {
      cache = data;
      return data;
    });
  }

  return inflight;
}

// Statistics helpers
export const getOverviewStats = (rows: Student[]) => {
  const total = rows.length;
  const alta = rows.filter(s => s.probabilidadElegirTec.includes("Alta")).length;
  const media = rows.filter(s => s.probabilidadElegirTec.includes("Media")).length;
  const baja = rows.filter(s => s.probabilidadElegirTec.includes("Baja")).length;
  const noEspecifica = rows.filter(s => s.probabilidadElegirTec.includes("No especifica")).length;
  const faltaCompletar = rows.filter(s => s.probabilidadElegirTec.includes("Falta completar")).length;

  const finalizados = rows.filter(t => t.estado === "Finalizado").length;
  const enProgreso = rows.filter(t => t.estado === "En progreso").length;
  const sinComenzar = rows.filter(t => t.estado === "Sin comenzar").length;

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

export const getTopCarreras = (rows: Student[]) => {
  const carreraCount: Record<string, number> = {};
  
  rows.forEach(s => {
    [s.carreraInteres1, s.carreraInteres2].forEach(c => {
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

export const getTopInstituciones = (rows: Student[]) => {
  const instCount: Record<string, number> = {};
  
  rows.forEach(s => {
    [s.institucionInteres1, s.institucionInteres2].forEach(i => {
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

// export const getCoachInteractionStats = (records: Student[] = students) => {
//   const sinComenzar = records.filter(t => t.interaccionCoach === "Sin comenzar").length;
//   const baja = records.filter(t => t.interaccionCoach === "BAJA").length;
//   const media = records.filter(t => t.interaccionCoach === "MEDIA").length;
//   const alta = records.filter(t => t.interaccionCoach === "ALTA").length;

//   return [
//     { name: "Sin comenzar", value: sinComenzar },
//     { name: "Baja", value: baja },
//     { name: "Media", value: media },
//     { name: "Alta", value: alta },
//   ];
// };