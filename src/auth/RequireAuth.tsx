import { Navigate, useLocation } from "react-router-dom";
import { getAuth } from "@/auth/auth";

export function RequireAuth({ children }: { children: JSX.Element }) {
  const loc = useLocation();
  const auth = getAuth(); // reads localStorage now

  if (!auth?.email) {
    return <Navigate to="/validar" replace state={{ from: loc.pathname }} />;
  }

  return children;
}


