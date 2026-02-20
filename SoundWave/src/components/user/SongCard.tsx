import { Play } from "lucide-react";
import type { Song } from "@/data/mockData";

interface SongCardProps {
  song: Song;
}

const SongCard = ({ song }: SongCardProps) => {
  return (
    <div className="group glass rounded-xl p-3 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:glow-primary min-w-[170px]">
      <div className="relative mb-3 overflow-hidden rounded-lg">
        <img
          src={song.cover}
          alt={song.title}
          className="w-full aspect-square object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <button className="absolute bottom-2 right-2 bg-primary text-primary-foreground rounded-full p-3 shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 glow-primary">
          <Play size={16} fill="currentColor" />
        </button>
      </div>
      <h3 className="font-display font-semibold text-foreground text-sm truncate">{song.title}</h3>
      <p className="text-text-subdued text-xs mt-1 truncate font-body">{song.artist}</p>
    </div>
  );
};

export default SongCard;
