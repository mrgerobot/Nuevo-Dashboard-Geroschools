import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Resumen from "./pages/Resumen";
import Seguimiento from "./pages/Seguimiento";
import PerfilEstudiante from "./pages/PerfilEstudiante";
import NotFound from "./pages/NotFound";
import { FiltersProvider } from "@/contexts/FiltersContext";
import Validar from "./pages/Validador";
import { RequireAuth } from "@/auth/RequireAuth";
import { getAuth } from "@/auth/auth";
import { StudentsProvider } from "@/contexts/StudentsProvider";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <StudentsProvider>
      <FiltersProvider>
        <BrowserRouter>
          <Routes>
            {/* ✅ Validator screen */}
            <Route path="/validar" element={<Validar />} />

            {/* ✅ Default route: if authed go resumen, else go validar */}
            <Route path="/" element={<Navigate to={getAuth() ? "/resumen" : "/validar"} replace />}/>

            {/* ✅ Protected routes */}
            <Route
              path="/resumen"
              element={
                <RequireAuth>
                  <Resumen />
                </RequireAuth>
              }
            />

            <Route
              path="/seguimiento"
              element={
                <RequireAuth>
                  <Seguimiento />
                </RequireAuth>
              }
            />

            <Route
              path="/estudiante"
              element={
                <RequireAuth>
                  <PerfilEstudiante />
                </RequireAuth>
              }
            />
            <Route
              path="/estudiante/:id"
              element={
                <RequireAuth>
                  <PerfilEstudiante />
                </RequireAuth>
              }
            />

            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </FiltersProvider>
    </StudentsProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
