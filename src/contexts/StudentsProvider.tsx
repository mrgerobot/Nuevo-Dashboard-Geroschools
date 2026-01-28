import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { Student } from "@/data/studentsStore";

type StudentsCtx = {
  students: Student[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

const Ctx = createContext<StudentsCtx | null>(null);

async function fetchStudentsJSON(): Promise<Student[]> {
  const res = await fetch("/api/students");
  if (!res.ok) throw new Error("Failed to load students");
  const data = await res.json();

  // supports either: array OR {students:[...]}
  return Array.isArray(data) ? data : (data.students ?? []);
}

export function StudentsProvider({ children }: { children: React.ReactNode }) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const inflight = useRef<Promise<void> | null>(null);

  const refresh = async () => {
    if (inflight.current) return inflight.current;

    inflight.current = (async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchStudentsJSON();
        setStudents(data);
      } catch (e: any) {
        setError(e?.message ?? String(e));
        setStudents([]);
        throw e;
      } finally {
        setLoading(false);
        inflight.current = null;
      }
    })();

    return inflight.current;
  };

  useEffect(() => {
    // initial boot fetch
    refresh().catch(() => {});
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(() => ({ students, loading, error, refresh }), [students, loading, error]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStudents() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStudents must be used within <StudentsProvider>");
  return ctx;
}
