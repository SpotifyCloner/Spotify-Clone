import { ArrowLeft, Trash2 } from "lucide-react";
import { Playlist } from "@/types/music";
import TrackList from "./TrackList";
import { removeTrackFromPlaylist } from "@/lib/mockData";

interface PlaylistDetailProps {
  playlist: Playlist;
  onBack: () => void;
  onPlaylistsChange: () => void;
}

export default function PlaylistDetail({ playlist, onBack, onPlaylistsChange }: PlaylistDetailProps) {
  const handleRemoveTrack = (trackId: number) => {
    removeTrackFromPlaylist(playlist.id, trackId);
    onPlaylistsChange();
  };

  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
      >
        <ArrowLeft className="w-4 h-4" /> Back to playlists
      </button>

      <div className="flex items-end gap-6 mb-8">
        <div
          className="w-40 h-40 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: `linear-gradient(135deg, hsl(${(playlist.id * 47) % 360} 60% 40%), hsl(${(playlist.id * 47 + 60) % 360} 70% 50%))` }}
        >
          <span className="font-display text-4xl font-bold text-foreground/80">
            {playlist.name.charAt(0)}
          </span>
        </div>
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">Playlist</p>
          <h2 className="font-display text-4xl font-bold text-foreground mt-1">{playlist.name}</h2>
          <p className="text-muted-foreground mt-1">{playlist.tracks.length} tracks</p>
        </div>
      </div>

      {playlist.tracks.length === 0 ? (
        <div className="text-center py-16 text-muted-foreground">
          <p className="text-lg font-medium">No tracks yet</p>
          <p className="text-sm mt-1">Add tracks from the library</p>
        </div>
      ) : (
        <div className="bg-card rounded-xl border border-border overflow-hidden">
          {playlist.tracks.map((track, i) => (
            <div
              key={track.id}
              className="flex items-center justify-between px-4 py-3 hover:bg-secondary/50 transition-colors group"
            >
              <div className="flex items-center gap-4 min-w-0">
                <span className="text-muted-foreground text-sm w-6">{i + 1}</span>
                <div className="min-w-0">
                  <p className="text-sm font-medium text-foreground truncate">{track.title}</p>
                  <p className="text-xs text-muted-foreground truncate">{track.artist}</p>
                </div>
              </div>
              <button
                onClick={() => handleRemoveTrack(track.id)}
                className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
