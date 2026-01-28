import { cn } from "@/lib/utils";

type StatusType = 
  | "alta" 
  | "media" 
  | "baja" 
  | "sin-comenzar" 
  | "en-progreso" 
  | "finalizado"
  | "no-especifica"
  | "falta-completar";

interface StatusChipProps {
  status: string;
  className?: string;
}

const getStatusType = (status: string): StatusType => {
  const lower = status.toLowerCase();
  if (lower.includes("alta")) return "alta";
  if (lower.includes("media")) return "media";
  if (lower.includes("baja")) return "baja";
  if (lower.includes("sin comenzar")) return "sin-comenzar";
  if (lower.includes("en progreso") || lower.includes("en camino")) return "en-progreso";
  if (lower.includes("finalizado")) return "finalizado";
  if (lower.includes("no especifica")) return "no-especifica";
  if (lower.includes("falta completar")) return "falta-completar";
  return "sin-comenzar";
};

const statusStyles: Record<StatusType, string> = {
  alta: "bg-green-100 text-green-800 border-green-200",
  media: "bg-yellow-100 text-yellow-800 border-yellow-200",
  baja: "bg-red-100 text-red-800 border-red-200",
  "sin-comenzar": "bg-gray-100 text-gray-700 border-gray-200",
  "en-progreso": "bg-blue-100 text-blue-800 border-blue-200",
  finalizado: "bg-green-100 text-green-800 border-green-200",
  "no-especifica": "bg-gray-100 text-gray-600 border-gray-200",
  "falta-completar": "bg-orange-100 text-orange-800 border-orange-200",
};

const getDisplayText = (status: string): string => {
  if (!status) return "";

  const s = status.toLowerCase();

  if (s.includes("alta")) return "Alta";
  if (s.includes("media")) return "Media";
  if (s.includes("baja")) return "Baja";
  if (s.includes("sin comenzar")) return "Sin comenzar";
  if (s.includes("en progreso") || s.includes("en camino")) return "En progreso";
  if (s.includes("finalizado")) return "Finalizado";
  if (s.includes("no especifica")) return "No especifica";
  if (s.includes("falta completar")) return "Falta completar";

  // Fallback: Capitalize first letter only
  return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
};

export function StatusChip({ status, className }: StatusChipProps) {
  const type = getStatusType(status);
  const displayText = getDisplayText(status);

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border whitespace-nowrap",
        statusStyles[type],
        className
      )}
    >
      {displayText}
    </span>
  );
}