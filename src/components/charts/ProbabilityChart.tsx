import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface ProbabilityChartProps {
  data: { name: string; value: number; percentage: string }[];
}

const COLORS = ["#22c55e", "#eab308", "#ef4444", "#6b7280", "#f97316"];

export function ProbabilityChart({ data }: ProbabilityChartProps) {
  return (
    <div className="bg-card rounded-xl p-6 border border-border">
      <h3 className="text-lg font-semibold text-foreground mb-2">
        Distribución de probabilidad de elegir el Tec
      </h3>
      <p className="text-sm text-muted-foreground mb-4">
        Este gráfico muestra la distribución de estudiantes según la probabilidad estimada de elegir el Tec de Monterrey.
      </p>
      
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              content={({ active, payload }) => {
                if (active && payload && payload.length) {
                  const data = payload[0].payload;
                  return (
                    <div className="bg-card border border-border rounded-lg p-3 shadow-lg">
                      <p className="font-medium text-foreground">{data.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {data.value} estudiantes ({data.percentage}%)
                      </p>
                    </div>
                  );
                }
                return null;
              }}
            />
            <Legend
              layout="vertical"
              verticalAlign="middle"
              align="right"
              formatter={(value, entry: any) => (
                <span className="text-sm text-foreground">
                  {value} ({entry.payload.percentage}%)
                </span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}