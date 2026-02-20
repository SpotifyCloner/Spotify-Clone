import { Play, SkipBack, SkipForward, Repeat, Shuffle, Volume2, Maximize2, ListMusic } from "lucide-react";
import { trendingSongs } from "@/data/mockData";

const PlayerBar = () => {
  const currentSong = trendingSongs[0];

  return (
    <footer className="h-[72px] bg-player border-t border-border px-4 flex items-center justify-between">
      {/* Current Song */}
      <div className="flex items-center gap-3 w-[300px]">
        <img src={currentSong.cover} alt={currentSong.title} className="w-14 h-14 rounded" />
        <div>
          <p className="text-sm font-medium text-foreground hover:underline cursor-pointer">{currentSong.title}</p>
          <p className="text-xs text-text-subdued hover:underline cursor-pointer">{currentSong.artist}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-1 flex-1 max-w-[600px]">
        <div className="flex items-center gap-4">
          <button className="text-text-subdued hover:text-foreground transition-colors">
            <Shuffle size={18} />
          </button>
          <button className="text-text-subdued hover:text-foreground transition-colors">
            <SkipBack size={18} fill="currentColor" />
          </button>
          <button className="bg-foreground text-background rounded-full p-2 hover:scale-105 transition-transform">
            <Play size={18} fill="currentColor" />
          </button>
          <button className="text-text-subdued hover:text-foreground transition-colors">
            <SkipForward size={18} fill="currentColor" />
          </button>
          <button className="text-text-subdued hover:text-foreground transition-colors">
            <Repeat size={18} />
          </button>
        </div>
        <div className="flex items-center gap-2 w-full">
          <span className="text-[11px] text-text-subdued min-w-[35px] text-right">0:00</span>
          <div className="flex-1 h-1 bg-secondary rounded-full group cursor-pointer">
            <div className="h-full w-1/3 bg-foreground rounded-full group-hover:bg-primary transition-colors" />
          </div>
          <span className="text-[11px] text-text-subdued min-w-[35px]">{currentSong.duration}</span>
        </div>
      </div>

      {/* Volume & extras */}
      <div className="flex items-center gap-3 w-[300px] justify-end">
        <button className="text-text-subdued hover:text-foreground transition-colors">
          <ListMusic size={18} />
        </button>
        <div className="flex items-center gap-2">
          <Volume2 size={18} className="text-text-subdued" />
          <div className="w-24 h-1 bg-secondary rounded-full cursor-pointer group">
            <div className="h-full w-2/3 bg-foreground rounded-full group-hover:bg-primary transition-colors" />
          </div>
        </div>
        <button className="text-text-subdued hover:text-foreground transition-colors">
          <Maximize2 size={16} />
        </button>
      </div>
    </footer>
  );
};

export default PlayerBar;
