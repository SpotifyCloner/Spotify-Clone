import { Play, Clock, Plus } from "lucide-react";
import { motion } from "framer-motion";
import { Track } from "@/types/music";
import { formatDuration, getAllPlaylists, addTrackToPlaylist } from "@/lib/mockData";
import { useState } from "react";

interface TrackListProps {
  tracks: Track[];
  title: string;
  subtitle?: string;
  onPlaylistsChange?: () => void;
  showAddTo?: boolean;
}

export default function TrackList({ tracks, title, subtitle, onPlaylistsChange, showAddTo = true }: TrackListProps) {
  const [addingTrackId, setAddingTrackId] = useState<number | null>(null);

  const handleAddToPlaylist = (trackId: number, playlistId: number) => {
    addTrackToPlaylist(playlistId, trackId);
    setAddingTrackId(null);
    onPlaylistsChange?.();
  };

  const playlists = getAllPlaylists();

  return (
    <div>
      <div className="mb-6">
        <h2 className="font-display text-3xl font-bold text-foreground">{title}</h2>
        {subtitle && <p className="text-muted-foreground mt-1">{subtitle}</p>}
      </div>

      <div className="bg-card rounded-xl border border-border overflow-hidden">
        <div className="grid grid-cols-[40px_1fr_1fr_80px_40px] gap-4 px-4 py-3 border-b border-border text-xs font-medium uppercase tracking-wider text-muted-foreground">
          <span>#</span>
          <span>Title</span>
          <span>Album</span>
          <span className="flex items-center justify-end"><Clock className="w-3.5 h-3.5" /></span>
          <span />
        </div>

        {tracks.map((track, i) => (
          <motion.div
            key={track.id}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="grid grid-cols-[40px_1fr_1fr_80px_40px] gap-4 px-4 py-3 hover:bg-secondary/50 transition-colors group items-center relative"
          >
            <span className="text-muted-foreground text-sm group-hover:hidden">{i + 1}</span>
            <Play className="w-4 h-4 text-primary hidden group-hover:block" />

            <div>
              <p className="text-sm font-medium text-foreground truncate">{track.title}</p>
              <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
            </div>

            <span className="text-sm text-muted-foreground truncate">{track.album}</span>

            <span className="text-sm text-muted-foreground text-right">{formatDuration(track.duration)}</span>

            <div className="relative">
              {showAddTo && (
                <button
                  onClick={() => setAddingTrackId(addingTrackId === track.id ? null : track.id)}
                  className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-primary transition-all"
                >
                  <Plus className="w-4 h-4" />
                </button>
              )}
              {addingTrackId === track.id && (
                <div className="absolute right-0 top-6 z-20 bg-popover border border-border rounded-lg shadow-lg py-1 min-w-[160px]">
                  {playlists.length === 0 && (
                    <p className="px-3 py-2 text-xs text-muted-foreground">No playlists yet</p>
                  )}
                  {playlists.map((pl) => (
                    <button
                      key={pl.id}
                      onClick={() => handleAddToPlaylist(track.id, pl.id)}
                      className="w-full text-left px-3 py-2 text-sm text-popover-foreground hover:bg-accent/20 transition-colors"
                    >
                      {pl.name}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
