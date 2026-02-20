import { Play, SkipBack, SkipForward, Repeat, Shuffle, Volume2, Maximize2, ListMusic } from "lucide-react";
import { trendingSongs } from "@/data/mockData";

const PlayerBar = () => {
  const currentSong = trendingSongs[0];

  return (
    <footer className="glass-strong border-t border-border/30 px-6 py-3 flex items-center justify-between gap-4">
      {/* Current Song */}
      <div className="flex items-center gap-3 w-[280px] min-w-0">
        <img
          src={currentSong.cover}
          alt={currentSong.title}
          className="w-12 h-12 rounded-lg object-cover ring-1 ring-border/30"
        />
        <div className="min-w-0">
          <p className="text-sm font-medium text-foreground truncate hover:underline cursor-pointer">
            {currentSong.title}
          </p>
          <p className="text-xs text-text-subdued truncate hover:underline cursor-pointer">
            {currentSong.artist}
          </p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center gap-1 flex-1 max-w-[560px]">
        <div className="flex items-center gap-5">
          <button className="text-text-subdued hover:text-foreground transition-colors">
            <Shuffle size={16} />
          </button>
          <button className="text-text-subdued hover:text-foreground transition-colors">
            <SkipBack size={16} fill="currentColor" />
          </button>
          <button className="bg-primary text-primary-foreground rounded-full p-2.5 hover:scale-105 transition-transform glow-primary">
            <Play size={16} fill="currentColor" />
          </button>
          <button className="text-text-subdued hover:text-foreground transition-colors">
            <SkipForward size={16} fill="currentColor" />
          </button>
          <button className="text-text-subdued hover:text-foreground transition-colors">
            <Repeat size={16} />
          </button>
        </div>
        <div className="flex items-center gap-2 w-full">
          <span className="text-[11px] text-text-subdued min-w-[35px] text-right font-body">0:00</span>
          <div className="flex-1 h-1 bg-secondary rounded-full group cursor-pointer relative overflow-hidden">
            <div className="h-full w-1/3 bg-gradient-to-r from-primary to-accent rounded-full transition-colors" />
          </div>
          <span className="text-[11px] text-text-subdued min-w-[35px] font-body">{currentSong.duration}</span>
        </div>
      </div>

      {/* Volume */}
      <div className="flex items-center gap-3 w-[280px] justify-end">
        <button className="text-text-subdued hover:text-foreground transition-colors">
          <ListMusic size={16} />
        </button>
        <div className="flex items-center gap-2">
          <Volume2 size={16} className="text-text-subdued" />
          <div className="w-20 h-1 bg-secondary rounded-full cursor-pointer group relative overflow-hidden">
            <div className="h-full w-2/3 bg-gradient-to-r from-primary to-accent rounded-full transition-colors" />
          </div>
        </div>
        <button className="text-text-subdued hover:text-foreground transition-colors">
          <Maximize2 size={14} />
        </button>
      </div>
    </footer>
  );
};

export default PlayerBar;
