import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Student } from "@/data/studentsStore";

type StudentsCtx = {
  students: Student[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

const Ctx = createContext<StudentsCtx | null>(null);

async function fetchStudents(): Promise<Student[]> {
  const res = await fetch("/api/students");
  if (!res.ok) throw new Error("Failed to load students");
  return res.json();
}

export function StudentsProvider({ children }: { children: React.ReactNode }) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const load = async () => {
  console.log("[StudentsProvider] load() starting…");

  setLoading(true);
  setError(null);

  try {
    console.log("[StudentsProvider] fetching /api/students");
    const res = await fetch("/api/students");

    console.log("[StudentsProvider] response:", res.status, res.statusText);
    const data = await res.json();

    console.log("[StudentsProvider] JSON received. IsArray:", Array.isArray(data), "len:", Array.isArray(data) ? data.length : "n/a");
    console.log("[StudentsProvider] sample[0]:", Array.isArray(data) ? data[0] : data);

    setStudents(Array.isArray(data) ? data : []);
  } catch (e: any) {
    console.error("[StudentsProvider] ERROR:", e);
    setError(e?.message ?? String(e));
  } finally {
    console.log("[StudentsProvider] load() finished");
    setLoading(false);
  }
};


  useEffect(() => {
    load();
  }, []);

  const value = useMemo(
    () => ({ students, loading, error, refresh: load }),
    [students, loading, error]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStudents() {
  const ctx = useContext(Ctx);
  if (!ctx) {
    throw new Error("useStudents() must be used inside <StudentsProvider> (wrap your App in it)");
  }
  return ctx;
}
