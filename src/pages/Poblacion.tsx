import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatusChip } from "@/components/ui/StatusChip";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { students } from "@/data/mockData";
import { Search, Eye, Download, ChevronLeft, ChevronRight } from "lucide-react";
import { useFilters } from "@/contexts/FiltersContext";

const ITEMS_PER_PAGE = 8;

export default function Poblacion() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const { appliedFilters } = useFilters();

  useEffect(() => {setCurrentPage(1);}, [search, appliedFilters]);


  const matchesFilters = (s: (typeof students)[number]) => {
  if (appliedFilters.campus) {
    if (s.campusSede !== appliedFilters.campus) return false;
  }

  if (appliedFilters.semestre) {
    if (String(s.semestre) !== appliedFilters.semestre) return false;
  }

  if (appliedFilters.grupo) {
    if (s.grupoDivision !== appliedFilters.grupo) return false;
  }

  if (appliedFilters.probabilidad) {
    if (s.probabilidadElegirTec !== appliedFilters.probabilidad) return false;
  }

  if (appliedFilters.estado) {
    // example: if your data has s.estado
    // if (s.estado !== appliedFilters.estado) return false;
  }

  if (appliedFilters.interaccion) {
    // example: if your data has s.interaccionCoach
    // if (s.interaccionCoach !== appliedFilters.interaccion) return false;
  }

  return true;
};


  const filteredStudents = students.filter(
    (s) =>
      s.nombreCompleto.toLowerCase().includes(search.toLowerCase()) ||
      s.correoInstitucional.toLowerCase().includes(search.toLowerCase())
  ).filter(matchesFilters);

  const totalPages = Math.ceil(filteredStudents.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedStudents = filteredStudents.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <DashboardLayout title="Población">
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
        <Button variant="outline" className="border-border">
          <Download className="h-4 w-4 mr-2" />
          Exportar datos
        </Button>
      </div>

      {/* Table */}
      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="data-table">
            <thead>
              <tr>
                <th>Correo</th>
                <th>Nombre completo</th>
                <th>Semestre</th>
                <th>Grupo</th>
                <th>Campus / Sede</th>
                <th>Carrera interés 1</th>
                <th>Carrera interés 2</th>
                <th>Carrera interés 3</th>
                <th>Probabilidad</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {paginatedStudents.map((student) => (
                <tr key={student.id}>
                  <td className="text-sm">{student.correoInstitucional}</td>
                  <td className="font-medium">{student.nombreCompleto}</td>
                  <td className="text-center">{student.semestre}</td>
                  <td>{student.grupoDivision}</td>
                  <td className="text-sm">{student.campusSede}</td>
                  <td className="text-sm max-w-32 truncate" title={student.carreraInteres1}>
                    {student.carreraInteres1}
                  </td>
                  <td className="text-sm max-w-32 truncate" title={student.carreraInteres2}>
                    {student.carreraInteres2}
                  </td>
                  <td className="text-sm max-w-32 truncate" title={student.carreraInteres3}>
                    {student.carreraInteres3}
                  </td>
                  <td>
                    <StatusChip status={student.probabilidadElegirTec} />
                  </td>
                  <td>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => navigate(`/estudiante/${student.id}`)}
                      className="text-primary hover:text-primary/80 hover:bg-primary/10"
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Ver perfil
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
            {Math.min(startIndex + ITEMS_PER_PAGE, filteredStudents.length)} de{" "}
            {filteredStudents.length} estudiantes
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
            <div className="flex items-center gap-1">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`w-8 h-8 rounded-md text-sm font-medium transition-colors ${
                    currentPage === i + 1
                      ? "bg-primary text-primary-foreground"
                      : "hover:bg-muted"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
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
    </DashboardLayout>
  );
}