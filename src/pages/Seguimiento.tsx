import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { KPICard } from "@/components/ui/KPICard";
import { StatusChip } from "@/components/ui/StatusChip";
import { CoachInteractionChart } from "@/components/charts/CoachInteractionChart";
import { Button } from "@/components/ui/button";
import { trackingRecords, getCoachInteractionStats } from "@/data/mockData";
import { CheckCircle, Users, AlertCircle, Eye, ExternalLink, ChevronLeft, ChevronRight } from "lucide-react";

const ITEMS_PER_PAGE = 8;

export default function Seguimiento() {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState(1);
  
  const coachStats = getCoachInteractionStats();
  const finalizados = trackingRecords.filter(t => t.estado === "Finalizado").length;
  const conInteraccion = trackingRecords.filter(t => t.interaccionCoach !== "Sin comenzar").length;
  const sinComenzar = trackingRecords.filter(t => t.estado === "Sin comenzar").length;

  const totalPages = Math.ceil(trackingRecords.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedRecords = trackingRecords.slice(startIndex, startIndex + ITEMS_PER_PAGE);

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
          title="Estudiantes con interacción del coach"
          value={conInteraccion}
          subtitle="Han interactuado con el sistema"
          icon={<Users className="h-5 w-5" />}
        />
        <KPICard
          title="Estudiantes sin comenzar"
          value={sinComenzar}
          subtitle="Pendientes de iniciar"
          icon={<AlertCircle className="h-5 w-5" />}
        />
      </div>

      {/* Tracking Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Nombre completo</th>
                <th>Correo</th>
                <th>Semestre</th>
                <th>Curso</th>
                <th>Estado</th>
                <th>Conócete</th>
                <th>Autoconocimiento</th>
                <th>Reporte estudiantes</th>
                <th>Reporte familias</th>
                <th>Interacción coach</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginatedRecords.map((record) => (
                <tr key={record.id}>
                  <td className="font-medium">{record.nombreCompleto}</td>
                  <td className="text-sm">{record.correo}</td>
                  <td className="text-center">{record.semestre}</td>
                  <td>{record.curso}</td>
                  <td>
                    <StatusChip status={record.estado} />
                  </td>
                  <td className="text-sm max-w-24 truncate" title={record.avanceConocete}>
                    {record.avanceConocete}
                  </td>
                  <td className="text-sm max-w-24 truncate" title={record.avanceAutoconocimiento}>
                    {record.avanceAutoconocimiento}
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
                  <td>
                    <StatusChip status={record.interaccionCoach} />
                  </td>
                  <td>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/estudiante/${record.id}`)}
                      className="text-primary hover:text-primary/80 hover:bg-primary/10"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Ver
                    </Button>
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
            {Math.min(startIndex + ITEMS_PER_PAGE, trackingRecords.length)} de{" "}
            {trackingRecords.length} registros
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

      {/* Coach Interaction Chart */}
      <CoachInteractionChart data={coachStats} />
    </DashboardLayout>
  );
}