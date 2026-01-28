import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/ui/KPICard";
import { ProbabilityChart } from "@/components/charts/ProbabilityChart";
import { ActivityProgressChart } from "@/components/charts/ActivityProgressChart";
import { TopCarrerasChart } from "@/components/charts/TopCarrerasChart";
import { TopInstitucionesChart } from "@/components/charts/TopInstitucionesChart";
import {getStudents, getOverviewStats, getTopCarreras, getTopInstituciones } from "@/data/studentsStore";
import { Users, TrendingUp, Target, AlertCircle } from "lucide-react";
import { useFilters } from "@/contexts/FiltersContext";
import { useStudents } from "@/contexts/StudentsProvider";
import type { Student } from "@/data/studentsStore";



export default function Resumen() {
  const { students, loading, error, refresh } = useStudents();
  const { appliedFilters } = useFilters();
  const campus = appliedFilters.campus;
  
  const norm = (v: string) =>
    v.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

  const scopedStudents = campus
    ? students.filter((s) => norm(s.campusSede) === norm(campus))
    : students;

  const stats = getOverviewStats(scopedStudents);

  const topCarreras = getTopCarreras(students);
  const topInstituciones = getTopInstituciones(students);

  

  return (
    <DashboardLayout title="Resumen" showFilter={false}>
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <KPICard
          title="Estudiantes encuestados"
          value={stats.total}
          subtitle="Total de estudiantes en el programa"
          icon={<Users className="h-5 w-5" />}
          accentColor
        />
        <KPICard
          title="Tasa de respuesta"
          value={`${stats.tasaRespuesta}%`}
          subtitle="Estudiantes que completaron actividades"
          icon={<TrendingUp className="h-5 w-5" />}
        />
        <KPICard
          title="Probabilidad alta de elegir el Tec"
          value={stats.probabilidadAlta}
          subtitle="Estudiantes con alta afinidad"
          icon={<Target className="h-5 w-5" />}
          accentColor
        />
        <KPICard
          title="Falta completar actividad"
          value={stats.faltaCompletar}
          subtitle="Estudiantes pendientes"
          icon={<AlertCircle className="h-5 w-5" />}
        />
      </div>

      {/* Main Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ProbabilityChart data={stats.distribucionProbabilidad} />
        <ActivityProgressChart data={stats.avanceActividades} />
      </div>

      {/* Bottom Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopCarrerasChart data={topCarreras} />
        <TopInstitucionesChart data={topInstituciones} />
      </div>
    </DashboardLayout>
  );
}