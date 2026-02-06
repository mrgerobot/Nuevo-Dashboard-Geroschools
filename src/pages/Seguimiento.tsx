import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/ui/KPICard";
import { StatusChip } from "@/components/ui/StatusChip";
import { Button } from "@/components/ui/button";
import { useStudents } from "@/contexts/StudentsProvider";
import type { Student } from "@/data/studentsStore";
import { useFilters } from "@/contexts/FiltersContext";
import { Input } from "@/components/ui/input";
import { exportAllColumnsToExcel } from "@/lib/utils";
import { Search, Download, CheckCircle, Users, AlertCircle, Eye, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 8;

export default function Seguimiento() {
  const { students, loading, error } = useStudents();

  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  const { appliedFilters } = useFilters();
  const [search, setSearch] = useState("");

  useEffect(() => {setCurrentPage(1);}, [appliedFilters]);

  console.log("VALIDATOR campus:", appliedFilters.campus);
  console.log("DATA campuses sample:", Array.from(new Set(students.map(s => s.campusSede))).slice(0, 50));

  
  const matchesFilters = (s: (typeof students)[number]) => {
  
    if (appliedFilters.semestre) {
      if (String(s.semestre) !== appliedFilters.semestre) return false;
    }
  
    if (appliedFilters.estado) {
      if (s.estado !== appliedFilters.estado) return false;
    }
  
    if (appliedFilters.grupo) {
      if(s.grupoDivision !== appliedFilters.grupo) return false;
    }

    if (appliedFilters.mentor){
      if(s.mentor !== appliedFilters.mentor) return false;
    }

    if (appliedFilters.probabilidad){
      if(s.probabilidadElegirTec !== appliedFilters.probabilidad) return false;
    }

    if (appliedFilters.campus){
      if(s.campusSede !== appliedFilters.campus) return false;
    }
  
    return true;
  };
  

  const filteredStudents = students.filter(
    (s) =>
      s.nombreCompleto.toLowerCase().includes(search.toLowerCase()) ||
      s.correoInstitucional.toLowerCase().includes(search.toLowerCase())
  ).filter(matchesFilters);

  // const coachStats = getCoachInteractionStats(filteredStudents);
  const finalizados = filteredStudents.filter(t => t.estado === "Finalizado").length;
  // const conInteraccion = filteredStudents.filter(t => t.interaccionCoach !== "Sin comenzar").length;
  const sinComenzar = filteredStudents.filter(t => t.estado === "Sin comenzar").length;

  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRecords = filteredStudents.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const handleExport = () => {
    exportAllColumnsToExcel(
      filteredStudents, // ✅ all filtered rows
      `seguimiento_${new Date().toISOString().slice(0, 10)}.xlsx`,
      {
        // optional: if you want to exclude internal keys
        excludeKeys: [], // e.g. ["id"] as any
        sheetName: "Seguimiento",
      }
    );
  };


  return (
    <DashboardLayout title="Seguimiento">
      {/* Mini KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <KPICard
          title="Actividades finalizadas"
          value={finalizados}
          subtitle="Estudiantes que completaron todo"
          icon={<CheckCircle className="h-5 w-5" />}
          accentColor
        />
        <KPICard
          title="Estudiantes sin comenzar"
          value={sinComenzar}
          subtitle="Pendientes de iniciar"
          icon={<AlertCircle className="h-5 w-5" />}
        />
        {/* <KPICard
          title="Estudiantes con interacción del coach"
          value={conInteraccion}
          subtitle="Han interactuado con el sistema"
          icon={<Users className="h-5 w-5" />}
        /> */}
      </div>

      {/* Search and Controls */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Buscar por nombre, correo o matrícula…"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
            }}
            className="pl-10"
          />
        </div>
        <Button onClick={handleExport} disabled={!filteredStudents.length} variant="outline" className="border-border">
          <Download className="h-4 w-4 mr-2" />
          Exportar datos
        </Button>
      </div>

      {/* Tracking Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th className="text-center w-[300px] min-w-[200px]">Nombre completo</th>
                <th>Correo</th>
                <th>Semestre</th>
                <th>Grupo</th>
                <th className="text-center w-[300px] min-w-[200px]">Campus</th>
                <th>Mentor</th>
                <th className="text-center w-[300px] min-w-[300px]">Carreras de interés</th>
                <th className="text-center w-[380px] min-w-[380px]">Instituciones de interés</th>
                <th>Probabilidad de elegir el TEC</th>
                <th>Estado</th> {/*si terminó todo -> finalizado, si no se marca la(s) actividad(es) que le falta(n)*/}
                <th>Reporte "¿Cuán preparado estás?"</th>
                <th>Reporte estudiantes</th>
                <th>Reporte familias</th>
                {/* <th>Interacción coach</th> */}
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRecords.map((record) => (
                <tr key={record.id}>
                  <td className="font-medium whitespace-normal break-words min-w-[200px]">{record.nombreCompleto}</td>
                  <td className="text-sm">{record.correoInstitucional}</td>
                  <td className="text-center">{record.semestre}</td>
                  <td>{record.grupoDivision}</td>
                  <td className="text-sm whitespace-normal break-words min-w-[200px]">{record.campusSede}</td>
                  <td className="text-sm">{record.mentor}</td>
                  <td className="text-sm whitespace-normal break-words min-w-[300px]" title="Carreras de interés">
                    {record.carreraInteres1 !== "No manifiesta carrera de interés" && record.carreraInteres1 !== "" && (
                      <p>1. {record.carreraInteres1}</p>
                    )}

                    {record.carreraInteres2 !== "No manifiesta carrera de interés" && record.carreraInteres2 !== "" && (
                      <p>2. {record.carreraInteres2}</p>
                    )}
                  </td>
                  <td className="text-sm whitespace-normal break-words min-w-[380px]" title="Instituciones de interés">
                    {record.institucionInteres1 !== "No especifica institución de interés" && record.institucionInteres1 !== "" && (
                      <p>1. {record.institucionInteres1}</p>
                    )}

                    {record.institucionInteres2 !== "No especifica institución de interés" && record.institucionInteres2 !== "" && (
                      <p>2. {record.institucionInteres2}</p>
                    )}
                  </td>
                  <td>
                    <StatusChip status={record.probabilidadElegirTec} />
                  </td>
                  <td>
                    <StatusChip status={record.estado} />
                  </td>
                  {/* <td className="text-sm max-w-24 truncate" title={record.avanceConocete}>
                    {record.avanceConocete}
                  </td>
                  <td className="text-sm max-w-24 truncate" title={record.avanceAutoconocimiento}>
                    {record.avanceAutoconocimiento}
                  </td> */}
                  <td>
                    {record.reportesCCR ? (
                      <a
                        href={record.reportesCCR}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span className="text-xs">Ver</span>
                      </a>
                    ) : (
                      <span className="text-muted-foreground text-xs">-</span>
                    )}
                  </td>
                  <td>
                    {record.reporteEstudiantesUrl ? (
                      <a
                        href={record.reporteEstudiantesUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span className="text-xs">Ver</span>
                      </a>
                    ) : (
                      <span className="text-muted-foreground text-xs">-</span>
                    )}
                  </td>
                  <td>
                    {record.reporteFamiliasUrl ? (
                      <a
                        href={record.reporteFamiliasUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:text-primary/80 flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        <span className="text-xs">Ver</span>
                      </a>
                    ) : (
                      <span className="text-muted-foreground text-xs">-</span>
                    )}
                  </td>
                  {/* <td>
                    <StatusChip status={record.interaccionCoach} />
                  </td> */}
                  <td>
                    {record.avanceAutoconocimiento == "Completo" ? (
                      <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/estudiante/${record.id}`)}
                      className="text-primary hover:text-primary/80 hover:bg-primary/10"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Ver Perfil
                    </Button>
                    ):(
                    <span className="text-muted-foreground text-xs">-</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-6 py-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Mostrando {startIndex + 1} a{" "}
            {Math.min(startIndex + ITEMS_PER_PAGE, filteredStudents.length)} de{" "}
            {filteredStudents.length} registros
          </p>
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              disabled={currentPage === 1}
            >
              <ChevronLeft className="h-4 w-4 mr-1" />
              Anterior
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
            >
              Siguiente
              <ChevronRight className="h-4 w-4 ml-1" />
            </Button>
          </div>
        </div>
      </div>

      {/* Coach Interaction Chart
      <CoachInteractionChart data={[]} /> */}
    </DashboardLayout>
  );
}