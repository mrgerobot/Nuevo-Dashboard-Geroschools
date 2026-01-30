import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { Student } from "@/data/studentsStore";

type StudentsCtx = {
  students: Student[];
  loading: boolean;
  error: string | null;
  refresh: () => Promise<void>;
};

const StudentsContext = createContext<StudentsCtx | null>(null);

const CACHE_KEY = "gero:students:snapshot:v1";

export function StudentsProvider({ children }: { children: React.ReactNode }) {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const refresh = async () => {
    setError(null);

    // 1) Hydrate from cache immediately (so refresh doesn't show empty dashboard)
    let hadCached = false;
    try {
      const cachedRaw = localStorage.getItem(CACHE_KEY);
      if (cachedRaw) {
        const cached = JSON.parse(cachedRaw) as { students: Student[]; ts: number };
        if (Array.isArray(cached.students) && cached.students.length) {
          setStudents(cached.students);
          hadCached = true;
        }
      }
    } catch {
      // ignore cache parse issues
    }

    // If we had cached data, we can treat UI as "ready" while we revalidate
    setLoading(!hadCached);

    // 2) Fetch latest snapshot (revalidate)
    try {
      const res = await fetch("/api/students"); // snapshot endpoint should be cache-friendly server-side
      if (!res.ok) throw new Error(`Failed to load students (${res.status})`);

      const data = await res.json();
      const list: Student[] = Array.isArray(data) ? data : (data?.students ?? []);

      if (!Array.isArray(list)) throw new Error("Invalid students payload");

      setStudents(list);

      // persist last good snapshot
      try {
        localStorage.setItem(CACHE_KEY, JSON.stringify({ students: list, ts: Date.now() }));
      } catch {
        // localStorage full etc. ignore
      }
    } catch (e: any) {
      console.error("[StudentsProvider] refresh failed:", e);
      setError(e?.message ?? String(e));
      // IMPORTANT: do NOT wipe students here — keep last known good (cache or previous state)
    } finally {
      setLoading(false);
      console.log(students);
    }
  };

  useEffect(() => {
    refresh();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const value = useMemo(
    () => ({ students, loading, error, refresh }),
    [students, loading, error]
  );

  return <StudentsContext.Provider value={value}>{children}</StudentsContext.Provider>;
}

export function useStudents() {
  const ctx = useContext(StudentsContext);
  if (!ctx) throw new Error("useStudents must be used within <StudentsProvider>");
  return ctx;
}
