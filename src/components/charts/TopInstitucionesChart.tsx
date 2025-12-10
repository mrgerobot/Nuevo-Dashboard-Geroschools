import { Award } from "lucide-react";

interface TopInstitucionesChartProps {
  data: { name: string; count: number }[];
}

export function TopInstitucionesChart({ data }: TopInstitucionesChartProps) {
  const maxCount = Math.max(...data.map(d => d.count));

  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Top 5 instituciones de interés
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Universidades más mencionadas por los estudiantes como opciones de estudio.
      </p>
      
      <div className="space-y-3">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-3">
            <div className="flex items-center justify-center w-8 h-8 rounded-full bg-secondary text-secondary-foreground">
              {index === 0 ? (
                <Award className="h-4 w-4 text-primary" />
              ) : (
                <span className="text-sm font-semibold">{index + 1}</span>
              )}
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground truncate" title={item.name}>
                {item.name}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${(item.count / maxCount) * 100}%` }}
                  />
                </div>
                <span className="text-xs text-muted-foreground w-8">
                  {item.count}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}