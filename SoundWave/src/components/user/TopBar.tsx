import { Home, Search, ListMusic, Headphones, LogOut, User } from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";

const TopBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isLoggedIn, logout } = useAuth();

  const navItems = [
    { path: "/", icon: Home, label: "Home" },
    { path: "/search", icon: Search, label: "Discover" },
    { path: "/create-playlist", icon: ListMusic, label: "Playlist" },
  ];

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
      <header className="glass-strong sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <div className="w-9 h-9 rounded-lg bg-primary/20 flex items-center justify-center glow-primary">
              <Headphones size={20} className="text-primary" />
            </div>
            <span className="font-display font-bold text-lg text-gradient">SoundWave</span>
          </Link>

          {/* Navigation */}
          <nav className="flex items-center gap-1">
            {navItems.map(({ path, icon: Icon, label }) => {
              const isActive = location.pathname === path;
              return (
                  <Link
                      key={path}
                      to={path}
                      className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                          isActive
                              ? "glass text-primary glow-primary"
                              : "text-text-subdued hover:text-foreground hover:bg-secondary/50"
                      }`}
                  >
                    <Icon size={16} />
                    <span className="hidden sm:inline">{label}</span>
                  </Link>
              );
            })}
          </nav>

          {/* Auth */}
          <div className="flex items-center gap-3">
            {isLoggedIn ? (
                <>
                  <div className="flex items-center gap-2 text-sm text-foreground font-medium font-body">
                    <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                      <User size={14} className="text-primary" />
                    </div>
                    <span className="hidden sm:inline">{user?.name}</span>
                  </div>
                  <button
                      onClick={handleLogout}
                      className="glass px-4 py-2 rounded-full text-sm font-semibold text-text-subdued hover:text-foreground transition-all duration-200 flex items-center gap-1.5"
                  >
                    <LogOut size={14} />
                    <span className="hidden sm:inline">Log out</span>
                  </button>
                </>
            ) : (
                <>
                  <Link
                      to="/signup"
                      className="text-text-subdued text-sm font-medium hover:text-foreground transition-colors"
                  >
                    Sign up
                  </Link>
                  <Link
                      to="/login"
                      className="glass px-5 py-2 rounded-full text-sm font-semibold text-primary hover:glow-primary transition-all duration-200"
                  >
                    Log in
                  </Link>
                </>
            )}
          </div>
        </div>
      </header>
  );
};

export default TopBar;