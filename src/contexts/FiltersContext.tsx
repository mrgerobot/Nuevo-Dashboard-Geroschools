import React, { createContext, useContext, useMemo, useState } from "react";

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
  const [draftFilters, setDraftFilters] = useState<Filters>({});
  const [appliedFilters, setAppliedFilters] = useState<Filters>({});

  const setDraftFilter = (key: string, value: string) => {
    setDraftFilters((prev) => ({ ...prev, [key]: value }));
  };

  const applyFilters = () => {
    setAppliedFilters(draftFilters);
  };

  const clearFilters = () => {
    setDraftFilters({});
    setAppliedFilters({});
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
