import { createContext, useContext, useEffect, useMemo, useRef, useState } from "react";
import type { Student } from "@/data/studentsStore";

const CACHE_KEY = "gero:studentsCache:v1";

function readCache<T>(key: string): T | null {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return null;
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}


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
  const [students, setStudents] = useState<Student[]>(() => {
    if (typeof window === "undefined") return [];
    const cached = readCache<{ students: Student[] }>(CACHE_KEY);
    return cached?.students ?? [];
  });

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
        localStorage.setItem(CACHE_KEY, JSON.stringify({ students, ts: Date.now() }));
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
    if (students.length > 0) setLoading(false);
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
