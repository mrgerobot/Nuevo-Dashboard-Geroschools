import { useParams, useNavigate } from "react-router-dom";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { StatusChip } from "@/components/ui/StatusChip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Mail, Phone, MapPin, GraduationCap, BookOpen, MessageSquare, CheckCircle,  Eye} from "lucide-react";
import { useStudents } from "@/contexts/StudentsProvider";
import type { Student } from "@/data/studentsStore";
import { Input } from "@/components/ui/input";
import React, { useEffect, useMemo, useState } from "react";
import { useFilters } from "@/contexts/FiltersContext";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Info , Search} from "lucide-react";

function normalize(s: unknown) {
  return (s ?? "")
    .toString()
    .trim()
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function BuscarEstudianteInline({
  students,
  selectedId,
  onPick,
}: {
  students: Student[];
  selectedId?: string;
  onPick: (id: string) => void;
}) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const nq = normalize(q);

  const results = useMemo(() => {
    if (nq.length < 2) return [];
    return students
      .filter((s) => {
        const id = normalize(s.id);
        const mail = normalize(s.correoInstitucional);
        const name = normalize(s.nombreCompleto);
        return id.includes(nq) || mail.includes(nq) || name.includes(nq);
      })
      .slice(0, 12);
  }, [students, nq]);

  return (
<div
  className="bg-card rounded-xl p-6
             border border-orange-200
             shadow-sm
             hover:shadow-md
             transition-shadow"
>      <div className="flex items-start justify-between gap-4">
        <div className="flex items-center gap-2">
  <h2 className="text-lg font-semibold text-foreground">
    Buscar estudiante
  </h2>

  <TooltipProvider>
    <Tooltip>
      <TooltipTrigger asChild>
        <button
          type="button"
          className="text-muted-foreground hover:text-foreground transition"
          aria-label="Información sobre búsqueda"
        >
          <Info size={16} />
        </button>
      </TooltipTrigger>

      <TooltipContent
        side="right"
        className="max-w-xs text-sm 
             bg-orange-50 text-orange-900 
             border border-orange-200 
             shadow-md"
      >
        <p>
         También puedes acceder al perfil de estudiante de un alumno desde la tabla de <i>Seguimiento</i>!
          <br/>
          Solo presiona el botón <b>Ver Perfil</b> de la columna <i>Acciones</i>!.
        </p>
      </TooltipContent>
    </Tooltip>
  </TooltipProvider>
</div>

        {selectedId ? (
          <Button variant="outline" onClick={() => setQ("")}>
            Limpiar
          </Button>
        ) : null}
      </div>

      <div className="relative">
  <Search
    className="absolute left-3 top-1/2 -translate-y-1/2 
               h-4 w-4 text-muted-foreground"
  />

  <Input
    value={q}
    onChange={(e) => {
      const v = e.target.value;
      setQ(v);
      setOpen(v.trim().length >= 2);
    }}
    onFocus={() => {
      if (q.trim().length >= 2) setOpen(true);
    }}
    onBlur={() => {
      setTimeout(() => setOpen(false), 120);
    }}
    placeholder="Ingresa un nombre, matrícula o correo"
    className="pl-10"
  />
</div>
      {open && (
      <div className="mt-3 max-h-72 overflow-auto border rounded-lg">
        {nq.length < 2 ? (
          <div className="p-3 text-sm text-muted-foreground">
            <i>Escribe al menos 2 caracteres.</i>
          </div>

        ) : results.length === 0 ? (
          <p className="text-muted-foreground">
            No encontramos coincidencias.
          </p>
        ) : (
          results.map((s) => (
            <button
              key={s.id}
              className={[
                "w-full text-left p-3 hover:bg-muted flex flex-col gap-0.5",
                selectedId === s.id ? "bg-muted" : "",
              ].join(" ")}
              onClick={() => {
                onPick(s.id);
                setOpen(false);
                setQ(""); 
              }}
            >
              <div className="font-medium">{s.nombreCompleto}</div>
              <div className="text-xs text-muted-foreground">
                {s.id} • {s.correoInstitucional} • {s.campusSede}
              </div>
            </button>
          ))
        )}
      </div> )}
    </div>
  );
}


// Helper functions
export const getStudentById = (students, id: string): Student | undefined => {
  return students.find(s => s.id === id);
};

export default function PerfilEstudiante() {
  const { students, loading, error, refresh } = useStudents();
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { appliedFilters } = useFilters();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {setCurrentPage(1);}, [appliedFilters]);

  const matchesFilters = (s: (typeof students)[number]) => {
    if (appliedFilters.campus){
      if(s.campusSede !== appliedFilters.campus) return false;
    }

    return true;
  };

  const filteredStudents = students.filter(matchesFilters);
  
  // If no ID, show the first student as default
  const student = filteredStudents.find(s => s.id === id);
  const tracking = student;
  const vocational = student;

  if (!student) {
  return (
    <DashboardLayout title="Perfil del estudiante" showFilter={false}>
      <BuscarEstudianteInline
        students={filteredStudents}
        selectedId={id}
        onPick={(studentId) => navigate(`/estudiante/${studentId}`)}
      />
    </DashboardLayout>
  );
}

  return (
    <DashboardLayout title="Perfil del estudiante" showFilter={false}>
      <Button
        variant="ghost"
        onClick={() => navigate(`/estudiante`)}
        className="mb-6 text-muted-foreground hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Volver
      </Button>

    {!id && (
    <div className="mb-6">
      <BuscarEstudianteInline
        students={filteredStudents}
        selectedId={student.id}
        onPick={(studentId) => navigate(`/estudiante/${studentId}`)}
      />
    </div>
    )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column - Student Info */}
        <div className="space-y-6">
          {/* Student Info Card */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <GraduationCap className="h-5 w-5 text-primary" />
              Información del estudiante
            </h2>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground">Nombre completo</p>
                <p className="font-medium text-foreground">{student.nombreCompleto}</p>
              </div>
              
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Correo institucional</p>
                  <p className="text-sm text-foreground">{student.correoInstitucional}</p>
                </div>
              </div>
              
              {/* <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Correo personal</p>
                  <p className="text-sm text-foreground">{student.correoPersonal}</p>
                </div>
              </div> */}
              
              {/* <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <div>
                  <p className="text-sm text-muted-foreground">Teléfono</p>
                  <p className="text-sm text-foreground">{student.telefono}</p>
                </div>
              </div> */}
            </div>
          </div>
          
          {/* Status Chips */}
          {tracking && (
            <div className="flex flex-wrap gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Estado:</span>
                <StatusChip status={tracking.estado} />
              </div>
              {/* <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Coach:</span>
                <StatusChip status={tracking.interaccionCoach} />
              </div> */}
            </div>
          )}

          {/* Academic Data Card */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              Datos académicos
            </h2>
            
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Semestre</span>
                <span className="text-sm font-medium">{student.semestre}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Grupo / División</span>
                <span className="text-sm font-medium">{student.grupoDivision}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-muted-foreground">Campus / Sede</span>
                <span className="text-sm font-medium">{student.campusSede}</span>
              </div>
            </div>
          </div>

          {/* Interests Card */}
          <div className="bg-card rounded-xl border border-border p-6">
            <h2 className="text-lg font-semibold text-foreground mb-4">Intereses</h2>
            
            <div className="space-y-4">
              {(student.carreraInteres1 || student.carreraInteres2) && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                    Carreras de interés
                  </p>
                  <ul className="space-y-1">
                    {student.carreraInteres1 && (
                      <li className="text-sm">1. {student.carreraInteres1}</li>
                    )}
                    {student.carreraInteres2 && (
                      <li className="text-sm">2. {student.carreraInteres2}</li>
                    )}
                  </ul>
                </div>
              )}

              {(student.institucionInteres1 || student.institucionInteres2) && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">
                    Instituciones de interés
                  </p>
                  <ul className="space-y-1">
                    {student.institucionInteres1 && (
                      <li className="text-sm">1. {student.institucionInteres1}</li>
                    )}
                    {student.institucionInteres2 && (
                      <li className="text-sm">2. {student.institucionInteres2}</li>
                    )}
                  </ul>
                </div>
              )}

            </div>
          </div>

          {/* Probability Badge */}
          <div className="bg-primary/10 rounded-xl p-6 border border-primary/20">
            <p className="text-sm text-muted-foreground mb-2">Probabilidad de elegir el Tec</p>
            <StatusChip status={student.probabilidadElegirTec} className="text-sm px-4 py-1" />
          </div>
        </div>

        {/* Right Column - Tabs */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="vocacional" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-6">
              <TabsTrigger value="vocacional">Resumen vocacional</TabsTrigger>
              <TabsTrigger value="carreras">Carreras recomendadas</TabsTrigger>
              <TabsTrigger value="seguimiento">Seguimiento</TabsTrigger>
            </TabsList>

            <TabsContent value="vocacional" className="space-y-6">
              {vocational.avanceAutoconocimiento == "Completo" ? (
                <>
                  {/* Estilo de vida */}
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="font-semibold text-foreground mb-3">Estilo de vida</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {vocational.estiloDeVida}
                    </p>
                  </div>

                  {/* Arquetipos */}
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="font-semibold text-foreground mb-4">Arquetipos de personalidad</h3>
                    <div className="space-y-3">
                      {vocational.rankingArquetiposPersonalidad.slice(0, 6).map((arq) => {
                        const level = String(arq.nivel ?? "").trim().toLowerCase();
                        const width =
                          level.includes("alta") ? "100%" :
                          level.includes("media") ? "66%" :
                          "33%";

                        return (
                          <div key={arq.tipo} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-sm">{arq.tipo}</span>
                              <StatusChip status={arq.nivel} />
                            </div>
                        
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width }} />
                            </div>
                          </div>
                        );
                      })}

                    </div>
                  </div>

                  {/* Arquetipos */}
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="font-semibold text-foreground mb-4">Inteligencias múltiples</h3>
                    <div className="space-y-3">
                      {vocational.rankingInteligenciasMultiples.slice(0, 6).map((arq) => {
                        const level = String(arq.nivel ?? "").trim().toLowerCase();
                        const width =
                          level.includes("alta") ? "100%" :
                          level.includes("media") ? "66%" :
                          "33%";

                        return (
                          <div key={arq.tipo} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="font-medium text-sm">{arq.tipo}</span>
                              <StatusChip status={arq.nivel} />
                            </div>
                        
                            <div className="h-2 bg-muted rounded-full overflow-hidden">
                              <div className="h-full bg-primary rounded-full" style={{ width }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Orientación de intereses */}
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="font-semibold text-foreground mb-3">Orientación de intereses</h3>
                    <ul className="space-y-2">
                      {vocational.orientacionIntereses}
                    </ul>
                  </div>

                  {/* Habilidades */}
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="font-semibold text-foreground mb-4">Habilidades y fortalezas</h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Cognitivas</p>
                        {vocational.habilidadesCognitivas.map((h) => (
                          <div key={h.tipo} className="flex justify-between text-sm py-1">
                            <span>{h.tipo}</span>
                            <StatusChip status={h.nivel} />
                          </div>
                        ))}
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-2">Blandas</p>
                        {vocational.habilidadesBlandas.map((h) => (
                          <div key={h.tipo} className="flex justify-between text-sm py-1">
                            <span>{h.tipo}</span>
                            <StatusChip status={h.nivel} />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-card rounded-xl border border-border p-6 text-center">
                  <p className="text-muted-foreground">No hay perfil vocacional disponible para este estudiante.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="carreras" className="space-y-6">
              {vocational.avanceAutoconocimiento == "Completo" ? (
                <>
                  {/* Por intereses */}
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="font-semibold text-foreground mb-4">Carreras recomendadas por intereses</h3>
                    <ul className="space-y-2">
                      {vocational.carrerasRecomendadasPorIntereses.map((carrera, index) => (
                        <li key={index} className="flex items-center gap-3 p-3 bg-secondary/50 rounded-lg">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary text-primary-foreground text-xs font-bold">
                            {index + 1}
                          </span>
                          <span className="text-sm font-medium">{carrera}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Por fortalezas */}
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="font-semibold text-foreground mb-4">Carreras recomendadas por fortalezas</h3>
                    <ul className="space-y-2">
                      {vocational.carrerasRecomendadasPorFortalezas.map((carrera, index) => (
                        <li key={index} className="flex items-center gap-3 p-3 bg-muted/50 rounded-lg">
                          <span className="flex items-center justify-center w-6 h-6 rounded-full bg-muted-foreground/20 text-foreground text-xs font-bold">
                            {index + 1}
                          </span>
                          <span className="text-sm font-medium">{carrera}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Áreas de estudio */}
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="font-semibold text-foreground mb-4">Ranking de áreas de estudio</h3>
                    <div className="space-y-3">
                      {vocational.rankingAreaEstudio.map((area) => (
                        <div key={area.area} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{area.area}</span>
                            <span className="font-medium">{area.porcentaje}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full transition-all duration-500"
                              style={{ width: `${area.porcentaje}%` }}
                            />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              ) : (
                <div className="bg-card rounded-xl border border-border p-6 text-center">
                  <p className="text-muted-foreground">No hay recomendaciones disponibles para este estudiante.</p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="seguimiento" className="space-y-6">
              {tracking ? (
                <>
                  {/* Timeline */}
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="font-semibold text-foreground mb-4">Línea de tiempo de actividades</h3>
                    <div className="space-y-4">
                      <div className="flex items-start gap-4">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${tracking.avanceConocete === "Finalizado" ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"}`}>
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Conócete</p>
                          <p className="text-xs text-muted-foreground">{tracking.avanceConocete}</p>
                        </div>
                      </div>
                      <div className="flex items-start gap-4">
                        <div className={`flex items-center justify-center w-8 h-8 rounded-full ${tracking.avanceAutoconocimiento === "Finalizado" ? "bg-green-100 text-green-600" : "bg-muted text-muted-foreground"}`}>
                          <CheckCircle className="h-4 w-4" />
                        </div>
                        <div>
                          <p className="font-medium text-sm">Autoconocimiento</p>
                          <p className="text-xs text-muted-foreground">{tracking.avanceAutoconocimiento}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Coach Interaction
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-primary" />
                      Interacción con coach
                    </h3>
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-sm text-muted-foreground">Nivel actual:</span>
                      <StatusChip status={tracking.interaccionCoach} />
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {tracking.interaccionCoach === "Sin comenzar" 
                        ? "El estudiante aún no ha interactuado con el coach de orientación."
                        : tracking.interaccionCoach === "BAJA"
                        ? "El estudiante ha tenido una interacción mínima con el coach."
                        : tracking.interaccionCoach === "MEDIA"
                        ? "El estudiante mantiene una interacción regular con el coach."
                        : "El estudiante tiene una interacción activa y frecuente con el coach."}
                    </p>
                  </div> */}

                  {/* Internal Notes
                  <div className="bg-card rounded-xl border border-border p-6">
                    <h3 className="font-semibold text-foreground mb-4">Notas internas</h3>
                    <Textarea 
                      placeholder="Agregar notas internas sobre el estudiante..."
                      className="min-h-32 resize-none"
                    />
                    <Button className="mt-3 bg-primary hover:bg-primary/90 text-primary-foreground">
                      Guardar notas
                    </Button>
                  </div> */}
                </>
              ) : (
                <div className="bg-card rounded-xl border border-border p-6 text-center">
                  <p className="text-muted-foreground">No hay datos de seguimiento disponibles para este estudiante.</p>
                </div>
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </DashboardLayout>
  );
}