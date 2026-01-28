import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getAuth } from "@/auth/auth";

// NEW
import { useStudents } from "@/contexts/StudentsProvider";
import { buildFilterOptionsFromStudents, type FilterOptionsMap } from "@/lib/filters/buildFilterOptions";

export type Filters = Record<string, string>;

type FiltersContextValue = {
  draftFilters: Filters;
  appliedFilters: Filters;
  setDraftFilter: (key: keyof Filters, value: string) => void;
  applyFilters: () => void;
  clearFilters: () => void;

  // NEW
  filterOptions: FilterOptionsMap;
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

  // NEW: dynamic filter options from students dataset
  const { students } = useStudents();

  const lockedCampus = getLockedCampus(); // your existing function
  const selectedCampus = draftFilters.campus || appliedFilters.campus || "";

  const campusToUse = lockedCampus || selectedCampus;

  const scopedStudents = useMemo(() => {
    if (!campusToUse) return students;
    return students.filter(s => s.campusSede === campusToUse);
  }, [students, campusToUse]);

  const filterOptions = useMemo(() => {
  const opts = buildFilterOptionsFromStudents(scopedStudents);

  // if campus is locked, keep campus as single option
  if (lockedCampus) {
    opts.campus = [{ value: lockedCampus, label: lockedCampus }];
  }

  return opts;
}, [scopedStudents, lockedCampus]);


  const value = useMemo(
    () => ({ draftFilters, appliedFilters, setDraftFilter, applyFilters, clearFilters, filterOptions }),
    [draftFilters, appliedFilters, filterOptions]
  );

  return <FiltersContext.Provider value={value}>{children}</FiltersContext.Provider>;
}

export function useFilters() {
  const ctx = useContext(FiltersContext);
  if (!ctx) throw new Error("useFilters must be used within a FiltersProvider");
  return ctx;
}
