import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, ClipboardList, UserCircle, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import geroLogo from "@/assets/gero-logo-2.png";
import { getAuth } from "@/auth/auth";
import { LogOut } from "lucide-react";
import { logout } from "@/lib/logout";

const auth = getAuth();
const message = `Hola, soy ${auth?.email ?? "un tutor"} y necesito asistencia con el dashboard.`;
const url = `https://wa.me/5491162204594?text=${encodeURIComponent(message)}`;

const navigation = [
  { name: "Resumen", href: "/resumen", icon: LayoutDashboard },
  // { name: "Población", href: "/poblacion", icon: Users },
  { name: "Seguimiento", href: "/seguimiento", icon: ClipboardList },
  { name: "Perfil del estudiante", href: "/estudiante", icon: UserCircle },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-sidebar-bg flex flex-col z-50">
      {/* Logo */}
      <div className="px-6 py-8 flex justify-center">
        <img src={geroLogo} alt="Gero" className="h-28 w-auto" />
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4">
        <ul className="space-y-1">
          {navigation.map((item) => {
            const isActive = 
              item.href === "/" 
                ? location.pathname === "/" 
                : location.pathname.startsWith(item.href);

            return (
              <li key={item.name}>
                <NavLink
                  to={item.href}
                  className={cn(
                    "sidebar-nav-item",
                    isActive && "sidebar-nav-item-active"
                  )}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Help Section */}
      <div className="px-4 pb-6">
        <a href={url} target="_blank" rel="noopener noreferrer">
        <p className="text-sidebar-fg/70 text-sm italic mb-3">
          ¿Necesitas asistencia?
        </p>
        <button className="flex items-center gap-2 bg-sidebar-fg/10 hover:bg-sidebar-fg/20 text-sidebar-fg px-4 py-2.5 rounded-lg transition-colors w-full">
          <MessageCircle className="h-4 w-4" />
          <span className="font-medium text-sm">¡Contáctanos!</span>
        </button>
        </a>
      </div>
      <div className="mt-auto p-3">
        <button
          onClick={logout}
          className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted-foreground hover:bg-orange-50 hover:text-orange-700"
        >
          <LogOut className="h-4 w-4" />
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}