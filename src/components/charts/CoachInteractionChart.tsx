import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface CoachInteractionChartProps {
  data: { name: string; value: number }[];
}

const COLORS = {
  "Sin comenzar": "#6b7280",
  "Baja": "#ef4444",
  "Media": "#eab308",
  "Alta": "#22c55e",
};

export function CoachInteractionChart({ data }: CoachInteractionChartProps) {
  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Niveles de interacción con el coach
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Distribución de estudiantes según su nivel de interacción con el coach de orientación.
      </p>
      
      <div className="h-48">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="name" 
              tick={{ fontSize: 12, fill: "hsl(var(--foreground))" }}
            />
            <YAxis />
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
            <Bar dataKey="value" radius={[4, 4, 0, 0]}>
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