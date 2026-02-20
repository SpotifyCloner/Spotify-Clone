import { Play } from "lucide-react";
import type { Artist } from "@/data/mockData";

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard = ({ artist }: ArtistCardProps) => {
  return (
    <div className="group glass rounded-xl p-3 transition-all duration-300 cursor-pointer hover:scale-[1.02] hover:glow-accent min-w-[170px]">
      <div className="relative mb-3">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full aspect-square object-cover rounded-full shadow-lg ring-2 ring-border/20 transition-transform duration-300 group-hover:scale-105"
        />
        <button className="absolute bottom-2 right-2 bg-accent text-accent-foreground rounded-full p-3 shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 glow-accent">
          <Play size={16} fill="currentColor" />
        </button>
      </div>
      <h3 className="font-display font-semibold text-foreground text-sm truncate">{artist.name}</h3>
      <p className="text-text-subdued text-xs mt-1 font-body">{artist.genre}</p>
    </div>
  );
};

export default ArtistCard;
