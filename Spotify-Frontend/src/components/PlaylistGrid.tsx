import { motion } from "framer-motion";
import { ListMusic, Music } from "lucide-react";
import { Playlist } from "@/types/music";

interface PlaylistGridProps {
  playlists: Playlist[];
  onSelect: (id: number) => void;
}

export default function PlaylistGrid({ playlists, onSelect }: PlaylistGridProps) {
  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-3xl font-bold text-foreground">Your Playlists</h2>
        <p className="text-muted-foreground mt-1">{playlists.length} playlists</p>
      </div>

      {playlists.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 text-muted-foreground">
          <ListMusic className="w-12 h-12 mb-4 opacity-40" />
          <p className="text-lg font-medium">No playlists yet</p>
          <p className="text-sm mt-1">Create one from the sidebar</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {playlists.map((pl, i) => (
            <motion.button
              key={pl.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => onSelect(pl.id)}
              className="group bg-card hover:bg-secondary/60 border border-border rounded-xl p-4 text-left transition-all hover:shadow-lg"
            >
              <div className="aspect-square rounded-lg bg-secondary flex items-center justify-center mb-3 group-hover:shadow-lg transition-shadow overflow-hidden"
                style={{ background: `linear-gradient(135deg, hsl(${(pl.id * 47) % 360} 60% 40%), hsl(${(pl.id * 47 + 60) % 360} 70% 50%))` }}
              >
                <Music className="w-8 h-8 text-foreground/80" />
              </div>
              <p className="font-semibold text-foreground truncate text-sm">{pl.name}</p>
              <p className="text-xs text-muted-foreground mt-0.5">{pl.tracks.length} tracks</p>
            </motion.button>
          ))}
        </div>
      )}
    </div>
  );
}
