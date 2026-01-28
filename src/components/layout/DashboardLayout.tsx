import { useState, ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { FilterDrawer } from "./FilterDrawer";
import { useFilters } from "@/contexts/FiltersContext";

interface DashboardLayoutProps {
  children: ReactNode;
  title: string;
  subtitle?: string;
  showFilter?: boolean;
}

export function DashboardLayout({
  children,
  title,
  subtitle = "Última actualización: 26/03/2025 a las 16:34 hs.",
  showFilter = true,

}: DashboardLayoutProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const { draftFilters, setDraftFilter, applyFilters, clearFilters, filterOptions } = useFilters();

  const handleApplyFilters = () => {
    applyFilters();       // <-- THIS is where appliedFilters is updated
    setIsFilterOpen(false);
  };

  const handleClearFilters = () => {
    clearFilters();       // clears both draft + applied
  };

  return (
    <div className="min-h-screen bg-background">
      <Sidebar />
      
      <main className="ml-60 p-8">
        <Header
          title={title}
          subtitle={subtitle}
          onFilterClick={showFilter ? () => setIsFilterOpen(true) : undefined}
        />
        
        {children}
      </main>

      {showFilter && (
        <FilterDrawer
          isOpen={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          filters={draftFilters}
          onFilterChange={setDraftFilter}
          onApply={handleApplyFilters}
          onClear={handleClearFilters}
          filterOptions={filterOptions}
        />
      )}
    </div>
  );
}