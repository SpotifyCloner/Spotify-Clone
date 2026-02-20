import { Search, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const TopBar = () => {
  return (
    <header className="flex items-center justify-between px-6 py-3 bg-transparent absolute top-0 left-0 right-0 z-10">
      <div className="flex items-center gap-4">
        <div className="flex gap-2">
          <button className="bg-background/60 rounded-full p-1.5 text-foreground hover:bg-background/80 transition-colors">
            <ChevronLeft size={20} />
          </button>
          <button className="bg-background/60 rounded-full p-1.5 text-foreground hover:bg-background/80 transition-colors">
            <ChevronRight size={20} />
          </button>
        </div>
        <div className="relative">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="text"
            placeholder="What do you want to play?"
            className="bg-secondary rounded-full py-2.5 pl-10 pr-4 w-[350px] text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-foreground/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <span className="text-text-subdued text-sm font-semibold hover:text-foreground cursor-pointer transition-colors">Premium</span>
        <span className="text-text-subdued text-sm font-semibold hover:text-foreground cursor-pointer transition-colors">Support</span>
        <span className="text-text-subdued text-sm font-semibold hover:text-foreground cursor-pointer transition-colors">Download</span>
        <div className="w-px h-6 bg-border" />
        <Link to="/admin" className="text-text-subdued text-sm font-semibold hover:text-foreground transition-colors">
          Admin
        </Link>
        <span className="text-muted-foreground text-sm font-semibold hover:text-foreground cursor-pointer transition-colors">Sign up</span>
        <button className="bg-foreground text-background rounded-full px-7 py-2.5 text-sm font-bold hover:scale-105 transition-transform">
          Log in
        </button>
      </div>
    </header>
  );
};

export default TopBar;
