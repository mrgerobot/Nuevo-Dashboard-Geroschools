import React, { createContext, useContext, useMemo, useState } from "react";
import {getAuth } from "@/auth/auth";

const auth = getAuth();
const LOCKED_CAMPUS = auth?.campus ?? "";

export type Filters = Record<string, string>;

type FiltersContextValue = {
  draftFilters: Filters;
  appliedFilters: Filters;
  setDraftFilter: (key: string, value: string) => void;
  applyFilters: () => void;
  clearFilters: () => void;
};

const FiltersContext = createContext<FiltersContextValue | null>(null);

export function FiltersProvider({ children }: { children: React.ReactNode }) {

  /* aca tengo que pedir que el campus sea el que el tutor tiene en la base de datos y se filtre todo por ese valor! */
  const baseFilters: Filters = LOCKED_CAMPUS ? { campus: LOCKED_CAMPUS } : {};

  const [draftFilters, setDraftFilters] = useState<Filters>(baseFilters);
  const [appliedFilters, setAppliedFilters] = useState<Filters>(baseFilters);


  const setDraftFilter = (key: string, value: string) => {
      if (key === "campus" && LOCKED_CAMPUS) return;
      setDraftFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setAppliedFilters(draftFilters);
  };

  const clearFilters = () => {
    setDraftFilters(baseFilters);
    setAppliedFilters(baseFilters);
  };

  const value = useMemo(
    () => ({ draftFilters, appliedFilters, setDraftFilter, applyFilters, clearFilters }),
    [draftFilters, appliedFilters]
  );

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
}

export function useFilters() {
  const ctx = useContext(FiltersContext);
  if (!ctx) throw new Error("useFilters must be used within FiltersProvider");
  return ctx;
}
