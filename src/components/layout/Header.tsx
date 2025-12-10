import { Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

interface HeaderProps {
  title: string;
  subtitle?: string;
  onFilterClick?: () => void;
}

export function Header({ title, subtitle, onFilterClick }: HeaderProps) {
  return (
    <header className="mb-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">{title}</h1>
          {subtitle && (
            <p className="text-muted-foreground text-sm mt-1">{subtitle}</p>
          )}
        </div>
        {onFilterClick && (
          <Button 
            onClick={onFilterClick}
            className="bg-primary hover:bg-primary/90 text-primary-foreground"
          >
            <Filter className="h-4 w-4 mr-2" />
            Filtrar
          </Button>
        )}
      </div>
      <div className="h-px bg-border mt-4" />
    </header>
  );
}