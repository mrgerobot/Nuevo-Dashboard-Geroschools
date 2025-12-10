import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface ActivityProgressChartProps {
  data: { name: string; value: number }[];
}

const COLORS = {
  "Finalizado": "#22c55e",
  "En progreso": "#3b82f6",
  "Sin comenzar": "#6b7280",
};

export function ActivityProgressChart({ data }: ActivityProgressChartProps) {
  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Avance de actividades por estado
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Distribución del progreso de los estudiantes en las actividades de la plataforma.
      </p>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} />
            <XAxis type="number" />
            <YAxis 
              dataKey="name" 
              type="category" 
              width={100}
              tick={{ fontSize: 12, fill: "hsl(var(--foreground))" }}
            />
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                      <p className="font-medium text-foreground">{data.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {data.value} estudiantes
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Bar dataKey="value" radius={[0, 4, 4, 0]}>
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[entry.name as keyof typeof COLORS] || "#6b7280"} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}