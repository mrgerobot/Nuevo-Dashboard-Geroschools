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
const norm = (v: unknown) =>
  (v ?? "")
    .toString()
    .trim()
    .replace(/\s+/g, " ")
    .toLowerCase();

function getStatusType(status: unknown): StatusType {
  const s = norm(status);

  // IMPORTANT: check these first
  if (s.includes("falta completar")) return "falta-completar";
  if (s.includes("no especifica")) return "no-especifica";

  // exact-ish word matches (avoid substring accidents)
  if (/\balta\b/.test(s)) return "alta";
  if (/\bmedia\b/.test(s)) return "media";
  if (/\bbaja\b/.test(s)) return "baja";

  if (s.includes("sin comenzar")) return "sin-comenzar";
  if (s.includes("en progreso")) return "en-progreso";
  if (s.includes("finalizado")) return "finalizado";

  // neutral fallback (don’t lie)
  return "no-especifica";
}

function getDisplayText(status: unknown): string {
  const s = norm(status);
  if (!s) return "";

  if (s.includes("falta completar")) return "Falta completar";
  if (s.includes("no especifica")) return "No especifica";

  if (/\balta\b/.test(s)) return "Alta";
  if (/\bmedia\b/.test(s)) return "Media";
  if (/\bbaja\b/.test(s)) return "Baja";

  if (s.includes("sin comenzar")) return "Sin comenzar";
  if (s.includes("en progreso")) return "En progreso";
  if (s.includes("finalizado")) return "Finalizado";

  return status?.toString?.().trim?.() ?? "";
}


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