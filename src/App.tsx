import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Resumen from "./pages/Resumen";
import Poblacion from "./pages/Poblacion";
import Seguimiento from "./pages/Seguimiento";
import PerfilEstudiante from "./pages/PerfilEstudiante";
import NotFound from "./pages/NotFound";
import { FiltersProvider } from "@/contexts/FiltersContext";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <FiltersProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Resumen />} />
            <Route path="/resumen" element={<Resumen />} />
            <Route path="/poblacion" element={<Poblacion />} />
            <Route path="/seguimiento" element={<Seguimiento />} />
            <Route path="/estudiante" element={<PerfilEstudiante />} />
            <Route path="/estudiante/:id" element={<PerfilEstudiante />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </FiltersProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;