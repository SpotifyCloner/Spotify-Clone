import { Outlet, Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Music, Users, Settings, ArrowLeft } from "lucide-react";

const navItems = [
  { icon: LayoutDashboard, label: "Dashboard", path: "/admin" },
  { icon: Music, label: "Songs", path: "/admin/songs" },
  { icon: Users, label: "Artists", path: "/admin/artists" },
  { icon: Settings, label: "Settings", path: "/admin/settings" },
];

const AdminLayout = () => {
  const location = useLocation();

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      {/* Admin Sidebar */}
      <aside className="w-[240px] bg-card border-r border-border flex flex-col">
        <div className="p-5 border-b border-border">
          <Link to="/" className="flex items-center gap-2 text-text-subdued hover:text-foreground transition-colors mb-4">
            <ArrowLeft size={18} />
            <span className="text-sm">Back to App</span>
          </Link>
          <h1 className="text-lg font-bold text-primary flex items-center gap-2">
            <Music size={22} />
            Admin Panel
          </h1>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${
                location.pathname === item.path
                  ? "bg-primary/10 text-primary"
                  : "text-text-subdued hover:text-foreground hover:bg-surface-elevated"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto p-8">
        <Outlet />
      </main>
    </div>
  );
};

export default AdminLayout;
