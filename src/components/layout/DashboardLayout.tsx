import { useState, ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Header } from "./Header";
import { FilterDrawer } from "./FilterDrawer";

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
  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleApplyFilters = () => {
    setIsFilterOpen(false);
    // Filter logic would be implemented here
  };

  const handleClearFilters = () => {
    setFilters({});
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

      <FilterDrawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onApply={handleApplyFilters}
        onClear={handleClearFilters}
      />
    </div>
  );
}