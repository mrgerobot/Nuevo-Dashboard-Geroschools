import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface FilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
  onApply: () => void;
  onClear: () => void;

  // NEW
  filterOptions: Record<string, { value: string; label: string }[]>;
}

const getFilterLabel = (
  filterOptions: Record<string, { value: string; label: string }[]>,
  key: string,
  value: string
) => {
  const options = filterOptions[key];
  return options?.find((o) => o.value === value)?.label ?? value;
};

export function FilterDrawer({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onApply,
  onClear,
  filterOptions,
}: FilterDrawerProps) {
  const activeFilters = Object.entries(filters).filter(([_, v]) => v);

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-foreground/20 z-40 animate-fade-in"
          onClick={onClose}
        />
      )}

      {/* Drawer */}
      <div
        className={cn(
          "fixed right-0 top-0 h-screen w-96 bg-background shadow-2xl z-50 transform transition-transform duration-300 ease-out",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-border">
            <h2 className="text-xl font-semibold text-foreground">Filtros</h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-muted-foreground" />
            </button>
          </div>

          {/* Active Filters */}
          {activeFilters.length > 0 && (
            <div className="px-6 py-3 border-b border-border">
              <p className="text-sm text-muted-foreground mb-2">Filtros activos:</p>
              <div className="flex flex-wrap gap-2">
                {activeFilters.map(([key, value]) => (
                  <Badge
                    key={key}
                    variant="secondary"
                    className="bg-secondary text-secondary-foreground"
                  >
                    {getFilterLabel(filterOptions, key, value)}
                    <button
                      onClick={() => onFilterChange(key, "")}
                      className="ml-1 hover:text-primary"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {/* Filter Controls */}
          <div className="flex-1 overflow-y-auto px-6 py-4 space-y-5 scrollbar-thin">
            {/* <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Campus / Sede</Label>
              <Select
                value={filters.campus || ""}
                onValueChange={(v) => onFilterChange("campus", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar campus" />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.campus.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Estado</Label>
              <Select
                value={filters.estado || ""}
                onValueChange={(v) => onFilterChange("estado", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar estado" />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.estado.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Mentor</Label>
              <Select
                value={filters.mentor || ""}
                onValueChange={(v) => onFilterChange("mentor", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar mentor" />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.mentor.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Semestre</Label>
              <Select
                value={filters.semestre || ""}
                onValueChange={(v) => onFilterChange("semestre", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar semestre" />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.semestre.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Grupo / Curso</Label>
              <Select
                value={filters.grupo || ""}
                onValueChange={(v) => onFilterChange("grupo", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar grupo" />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.grupo.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Probabilidad de elegir el Tec</Label>
              <Select
                value={filters.probabilidad || ""}
                onValueChange={(v) => onFilterChange("probabilidad", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar probabilidad" />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.probabilidad.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* <div className="space-y-2">
              <Label className="text-sm font-medium text-foreground">Interacción con coach</Label>
              <Select
                value={filters.interaccion || ""}
                onValueChange={(v) => onFilterChange("interaccion", v)}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Seleccionar nivel" />
                </SelectTrigger>
                <SelectContent>
                  {filterOptions.interaccion.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value}>
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div> */}
          </div>

          {/* Actions */}
          <div className="px-6 py-4 border-t border-border space-y-3">
            <Button
              onClick={onApply}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              Aplicar filtros
            </Button>
            <Button
              onClick={onClear}
              variant="outline"
              className="w-full border-border text-foreground hover:bg-muted"
            >
              Limpiar filtros
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}