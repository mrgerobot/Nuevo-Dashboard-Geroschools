import { Navigate, useLocation } from "react-router-dom";
import { getAuth } from "./auth";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const loc = useLocation();
  const auth = getAuth();

  if (!auth) {
    return <Navigate to="/validar" replace state={{ from: loc.pathname }} />;
  }

  return children;
}
