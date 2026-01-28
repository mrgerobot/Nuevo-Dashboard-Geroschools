import type { Student } from "@/data/studentsStore";

export type FilterOption = { value: string; label: string };
export type FilterOptionsMap = Record<string, FilterOption[]>;

function uniq(values: Array<string | number | null | undefined>): string[] {
  return Array.from(
    new Set(
      values
        .map(v => (v === null || v === undefined ? "" : String(v).trim()))
        .filter(v => v !== "")
    )
  ).sort((a, b) => a.localeCompare(b, "es"));
}

export function buildFilterOptionsFromStudents(students: Student[]): FilterOptionsMap {
  const estado = uniq(students.map(s => s.estado));
  const mentor = uniq(students.map(s => s.mentor));
  const campus = uniq(students.map(s => s.campusSede));
  const semestre = uniq(students.map(s => s.semestre));
  const grupo = uniq(students.map(s => s.grupoDivision));
  const probabilidad = uniq(students.map(s => s.probabilidadElegirTec));

  // Interacción con coach: solo si existe el campo
  const interaccion = uniq(
    students.map((s: any) => s.interaccionCoach ?? s.interaccion ?? "")
  );

  return {
    estado: estado.map(v => ({ value: v, label: v })),
    mentor: mentor.map(v => ({ value: v, label: v })),
    campus: campus.map(v => ({ value: v, label: v })),
    semestre: semestre.map(v => ({ value: v, label: `${v}° Semestre` })),
    grupo: grupo.map(v => ({ value: v, label: v })),
    probabilidad: probabilidad.map(v => ({ value: v, label: v })),
    interaccion: interaccion.map(v => ({ value: v, label: v })),
  };
}