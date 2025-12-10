import { NavLink, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, ClipboardList, UserCircle, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

const navigation = [
  { name: "Resumen", href: "/", icon: LayoutDashboard },
  { name: "Población", href: "/poblacion", icon: Users },
  { name: "Seguimiento", href: "/seguimiento", icon: ClipboardList },
  { name: "Perfil del estudiante", href: "/estudiante", icon: UserCircle },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-sidebar-bg flex flex-col z-50">
      {/* Logo */}
      <div className="px-6 py-8">
        <h1 className="text-4xl font-bold text-sidebar-fg tracking-tight">gero</h1>
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
        <p className="text-sidebar-fg/70 text-sm italic mb-3">
          ¿Necesitas asistencia?
        </p>
        <button className="flex items-center gap-2 bg-sidebar-fg/10 hover:bg-sidebar-fg/20 text-sidebar-fg px-4 py-2.5 rounded-lg transition-colors w-full">
          <MessageCircle className="h-4 w-4" />
          <span className="font-medium text-sm">¡Contáctanos!</span>
        </button>
      </div>
    </aside>
  );
}