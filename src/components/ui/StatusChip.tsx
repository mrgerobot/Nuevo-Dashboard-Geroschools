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
  if (status.includes("1.")) return "Alta";
  if (status.includes("2.")) return "Media";
  if (status.includes("3.")) return "Baja";
  if (status.includes("4.")) return "No especifica";
  if (status.includes("5.")) return "Falta completar";
  return status;
};

export function StatusChip({ status, className }: StatusChipProps) {
  const type = getStatusType(status);
  const displayText = getDisplayText(status);

  return (
    <span
      className={cn(
        "inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border",
        statusStyles[type],
        className
      )}
    >
      {displayText}
    </span>
  );
}