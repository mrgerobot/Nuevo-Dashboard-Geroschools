import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
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
    setLoading(true);
    setError(null);
    try {
      const data = await fetchStudents();
      setStudents(Array.isArray(data) ? data : []);
    } catch (e: any) {
      setError(e?.message ?? String(e));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const value = useMemo(() => ({ students, loading, error, refresh: load }), [students, loading, error]);

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useStudents() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useStudents must be used within <StudentsProvider>");
  return ctx;
}
