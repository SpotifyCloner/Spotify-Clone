import { Play } from "lucide-react";
import type { Artist } from "@/data/mockData";

interface ArtistCardProps {
  artist: Artist;
}

const ArtistCard = ({ artist }: ArtistCardProps) => {
  return (
    <div className="group bg-card hover:bg-surface-elevated rounded-md p-3 transition-all duration-200 cursor-pointer min-w-[170px]">
      <div className="relative mb-3">
        <img
          src={artist.image}
          alt={artist.name}
          className="w-full aspect-square object-cover rounded-full shadow-lg"
        />
        <button className="absolute bottom-2 right-2 bg-primary text-primary-foreground rounded-full p-3 shadow-xl opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-200 hover:scale-105">
          <Play size={18} fill="currentColor" />
        </button>
      </div>
      <h3 className="font-semibold text-foreground text-sm truncate">{artist.name}</h3>
      <p className="text-text-subdued text-xs mt-1">Artist</p>
    </div>
  );
};

export default ArtistCard;
