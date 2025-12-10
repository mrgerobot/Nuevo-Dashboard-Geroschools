import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface KPICardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon?: ReactNode;
  trend?: "up" | "down" | "neutral";
  className?: string;
  accentColor?: boolean;
}

export function KPICard({
  title,
  value,
  subtitle,
  icon,
  trend,
  className,
  accentColor = false,
}: KPICardProps) {
  return (
    <div className={cn("kpi-card", className)}>
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
          <p
            className={cn(
              "text-3xl font-bold",
              accentColor ? "text-primary" : "text-foreground"
            )}
          >
            {value}
          </p>
          {subtitle && (
            <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
          )}
        </div>
        {icon && (
          <div className={cn(
            "p-2 rounded-lg",
            accentColor ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"
          )}>
            {icon}
          </div>
        )}
      </div>
    </div>
  );
}