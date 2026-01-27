import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import {getAuth } from "@/auth/auth";

export type Filters = Record<string, string>;

type FiltersContextValue = {
  draftFilters: Filters;
  appliedFilters: Filters;
  setDraftFilter: (key: keyof Filters, value: string) => void;
  applyFilters: () => void;
  clearFilters: () => void;
};

const FiltersContext = createContext<FiltersContextValue | null>(null);

export function FiltersProvider({ children }: { children: React.ReactNode }) {
  // ✅ Always read auth at runtime (works in incognito after login too)
  const getLockedCampus = () => {
    if (typeof window === "undefined") return "";
    return getAuth()?.campus ?? "";
  };

  const makeBaseFilters = (): Filters => {
    const campus = getLockedCampus();
    return campus ? { campus } : {};
  };

  const [draftFilters, setDraftFilters] = useState<Filters>(() => makeBaseFilters());
  const [appliedFilters, setAppliedFilters] = useState<Filters>(() => makeBaseFilters());

  const setDraftFilter = (key: keyof Filters, value: string) => {
    const locked = getLockedCampus();
    if (key === "campus" && locked) return;

    setDraftFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    const locked = getLockedCampus();
    setAppliedFilters(locked ? { ...draftFilters, campus: locked } : draftFilters);
  };

  const clearFilters = () => {
    const base = makeBaseFilters();
    setDraftFilters(base);
    setAppliedFilters(base);
  };

  useEffect(() => {
    const syncCampus = () => {
      const campus = getLockedCampus();
      if (!campus) return;

      setDraftFilters((prev) => ({ ...prev, campus }));
      setAppliedFilters((prev) => ({ ...prev, campus }));
    };

    syncCampus();

    window.addEventListener("gero:auth-updated", syncCampus);
    return () => window.removeEventListener("gero:auth-updated", syncCampus);
  }, []);

  const value = useMemo(
    () => ({ draftFilters, appliedFilters, setDraftFilter, applyFilters, clearFilters }),
    [draftFilters, appliedFilters]
  );

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
}

export function useFilters() {
  const ctx = useContext(FiltersContext);
  if (!ctx) throw new Error("useFilters must be used within a FiltersProvider");
  return ctx;
}
