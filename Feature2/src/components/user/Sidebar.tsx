import { Home, Search, Library, Plus, Heart } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
  const location = useLocation();

  return (
    <aside className="w-[300px] bg-sidebar flex flex-col gap-2 p-2 shrink-0">
      {/* Navigation */}
      <div className="bg-card rounded-lg p-4">
        <nav className="flex flex-col gap-4">
          <Link
            to="/"
            className={`flex items-center gap-4 font-semibold transition-colors hover:text-foreground ${
              location.pathname === "/" ? "text-foreground" : "text-text-subdued"
            }`}
          >
            <Home size={24} />
            <span>Home</span>
          </Link>
          <Link
            to="/search"
            className="flex items-center gap-4 font-semibold text-text-subdued transition-colors hover:text-foreground"
          >
            <Search size={24} />
            <span>Search</span>
          </Link>
        </nav>
      </div>

      {/* Library */}
      <div className="bg-card rounded-lg p-4 flex-1 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <button className="flex items-center gap-2 text-text-subdued font-semibold hover:text-foreground transition-colors">
            <Library size={24} />
            <span>Your Library</span>
          </button>
          <button className="text-text-subdued hover:text-foreground transition-colors hover:bg-surface-hover rounded-full p-1">
            <Plus size={20} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto space-y-4">
          {/* Create Playlist Card */}
          <div className="bg-secondary rounded-lg p-4">
            <h3 className="font-bold text-foreground mb-1">Create your first playlist</h3>
            <p className="text-muted-foreground text-sm mb-4">It's easy, we'll help you</p>
            <button className="bg-foreground text-background rounded-full px-4 py-1.5 text-sm font-bold hover:scale-105 transition-transform">
              Create playlist
            </button>
          </div>

          {/* Browse Podcasts Card */}
          <div className="bg-secondary rounded-lg p-4">
            <h3 className="font-bold text-foreground mb-1">Let's find some podcasts to follow</h3>
            <p className="text-muted-foreground text-sm mb-4">We'll keep you updated on new episodes</p>
            <button className="bg-foreground text-background rounded-full px-4 py-1.5 text-sm font-bold hover:scale-105 transition-transform">
              Browse podcasts
            </button>
          </div>
        </div>

        {/* Footer Links */}
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-x-3 gap-y-1 text-[11px] text-text-subdued">
            <a href="#" className="hover:underline">Legal</a>
            <a href="#" className="hover:underline">Safety & Privacy Center</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
            <a href="#" className="hover:underline">Cookies</a>
            <a href="#" className="hover:underline">About Ads</a>
            <a href="#" className="hover:underline">Accessibility</a>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
