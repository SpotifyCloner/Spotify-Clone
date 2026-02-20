import { Music, Plus, Trash2, Search } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  getAllTracks,
  createPlaylist,
  addTrackToPlaylist,
  removeTrackFromPlaylist,
  deletePlaylist,
  type Track,
  type Playlist,
} from "@/lib/api";

const CreatePlaylist = () => {
  const { user, isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const [tracks, setTracks] = useState<Track[]>([]);
  const [playlist, setPlaylist] = useState<Playlist | null>(null);
  const [playlistName, setPlaylistName] = useState("My Playlist #1");
  const [editingName, setEditingName] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!isLoggedIn) {
      navigate("/login");
    }
  }, [isLoggedIn, navigate]);

  // Load all tracks from backend
  useEffect(() => {
    if (!isLoggedIn) return;
    setLoading(true);
    getAllTracks()
        .then(setTracks)
        .catch(() => setError("Failed to load tracks."))
        .finally(() => setLoading(false));
  }, [isLoggedIn]);

  const handleCreatePlaylist = async () => {
    if (!user) return;
    setCreating(true);
    setError("");
    try {
      const created = await createPlaylist({ name: playlistName, userId: user.id });
      setPlaylist(created);
      showSuccess("Playlist created!");
    } catch (err: any) {
      setError(err.message || "Failed to create playlist.");
    } finally {
      setCreating(false);
    }
  };

  const handleAddTrack = async (track: Track) => {
    if (!playlist) {
      setError("Please create a playlist first.");
      return;
    }
    try {
      const updated = await addTrackToPlaylist(playlist.id, track.id);
      setPlaylist(updated);
      showSuccess(`"${track.title}" added!`);
    } catch (err: any) {
      setError(err.message || "Failed to add track.");
    }
  };

  const handleRemoveTrack = async (track: Track) => {
    if (!playlist) return;
    try {
      const updated = await removeTrackFromPlaylist(playlist.id, track.id);
      setPlaylist(updated);
      showSuccess(`"${track.title}" removed.`);
    } catch (err: any) {
      setError(err.message || "Failed to remove track.");
    }
  };

  const handleDeletePlaylist = async () => {
    if (!playlist) return;
    try {
      await deletePlaylist(playlist.id);
      setPlaylist(null);
      showSuccess("Playlist deleted.");
    } catch (err: any) {
      setError(err.message || "Failed to delete playlist.");
    }
  };

  const showSuccess = (msg: string) => {
    setSuccessMsg(msg);
    setTimeout(() => setSuccessMsg(""), 3000);
  };

  const playlistTrackIds = new Set(playlist?.tracks?.map((t) => t.id) ?? []);

  const filteredTracks = tracks.filter(
      (t) =>
          t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          t.artist.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
      <div className="space-y-8">
        {/* Notifications */}
        {error && (
            <div className="glass rounded-xl px-4 py-3 text-sm text-red-400 border border-red-500/20 font-body">
              {error}
            </div>
        )}
        {successMsg && (
            <div className="glass rounded-xl px-4 py-3 text-sm text-green-400 border border-green-500/20 font-body">
              {successMsg}
            </div>
        )}

        {/* Header */}
        <div className="glass rounded-2xl p-8 flex items-end gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-60 h-60 bg-accent/10 rounded-full blur-3xl" />
          <div className="w-[200px] h-[200px] glass rounded-xl flex items-center justify-center relative z-10">
            <Music size={56} className="text-text-subdued" />
          </div>
          <div className="relative z-10 flex-1">
            <p className="text-xs font-semibold text-primary uppercase tracking-wider font-body">Playlist</p>

            {editingName ? (
                <input
                    autoFocus
                    value={playlistName}
                    onChange={(e) => setPlaylistName(e.target.value)}
                    onBlur={() => setEditingName(false)}
                    onKeyDown={(e) => e.key === "Enter" && setEditingName(false)}
                    className="text-4xl font-display font-bold bg-transparent text-foreground focus:outline-none border-b border-primary/50 mt-2 mb-3 w-full"
                />
            ) : (
                <h1
                    className="text-4xl font-display font-bold text-foreground mt-2 mb-3 cursor-pointer hover:text-primary transition-colors"
                    onClick={() => setEditingName(true)}
                    title="Click to rename"
                >
                  {playlistName}
                </h1>
            )}

            <p className="text-sm text-text-subdued font-body">
              {playlist ? `${playlist.tracks?.length ?? 0} songs` : "Not created yet"}
            </p>

            <div className="flex items-center gap-3 mt-4">
              {!playlist ? (
                  <button
                      onClick={handleCreatePlaylist}
                      disabled={creating}
                      className="bg-primary text-primary-foreground rounded-full px-6 py-2.5 text-sm font-bold hover:scale-105 transition-transform glow-primary font-display disabled:opacity-60"
                  >
                    {creating ? "Creating..." : "Create Playlist"}
                  </button>
              ) : (
                  <button
                      onClick={handleDeletePlaylist}
                      className="glass text-red-400 border border-red-500/20 rounded-full px-5 py-2.5 text-sm font-semibold hover:bg-red-500/10 transition-colors flex items-center gap-2 font-body"
                  >
                    <Trash2 size={14} />
                    Delete Playlist
                  </button>
              )}
            </div>
          </div>
        </div>

        {/* Current Playlist Tracks */}
        {playlist && playlist.tracks && playlist.tracks.length > 0 && (
            <div className="glass rounded-2xl p-6">
              <h2 className="text-xl font-display font-bold text-foreground mb-4">
                In this playlist
              </h2>
              <div className="space-y-1">
                {playlist.tracks.map((track) => (
                    <div
                        key={track.id}
                        className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-surface-hover/50 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-11 h-11 rounded-lg bg-primary/10 flex items-center justify-center">
                          <Music size={16} className="text-primary" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground font-display">{track.title}</p>
                          <p className="text-xs text-text-subdued font-body">{track.artist}</p>
                        </div>
                      </div>
                      <button
                          onClick={() => handleRemoveTrack(track)}
                          className="glass text-red-400 hover:text-red-300 border-none rounded-full px-4 py-1.5 text-sm font-semibold transition-all font-body"
                      >
                        Remove
                      </button>
                    </div>
                ))}
              </div>
            </div>
        )}

        {/* Search & Add Tracks */}
        <div className="glass rounded-2xl p-6">
          <h2 className="text-xl font-display font-bold text-foreground mb-4">
            Find something for your playlist
          </h2>
          <div className="relative max-w-md">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-subdued" />
            <input
                type="text"
                placeholder="Search for songs or artists"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full glass rounded-xl py-3 pl-10 pr-4 text-sm text-foreground placeholder:text-text-subdued focus:outline-none focus:ring-2 focus:ring-primary/30 font-body"
            />
          </div>

          <div className="mt-6 space-y-1">
            {loading ? (
                <p className="text-text-subdued text-sm font-body py-4 text-center">Loading tracks...</p>
            ) : filteredTracks.length === 0 ? (
                <p className="text-text-subdued text-sm font-body py-4 text-center">
                  {tracks.length === 0 ? "No tracks in the database yet." : "No tracks match your search."}
                </p>
            ) : (
                filteredTracks.map((track) => {
                  const inPlaylist = playlistTrackIds.has(track.id);
                  return (
                      <div
                          key={track.id}
                          className="flex items-center justify-between py-3 px-4 rounded-xl hover:bg-surface-hover/50 transition-colors group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-11 h-11 rounded-lg bg-accent/10 flex items-center justify-center ring-1 ring-border/20">
                            <Music size={16} className="text-accent" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-foreground font-display">{track.title}</p>
                            <p className="text-xs text-text-subdued font-body">{track.artist}</p>
                          </div>
                        </div>
                        {inPlaylist ? (
                            <span className="text-xs text-primary font-semibold font-body px-4 py-1.5">
                      ✓ Added
                    </span>
                        ) : (
                            <button
                                onClick={() => handleAddTrack(track)}
                                className="glass text-text-subdued hover:text-primary border-none rounded-full px-4 py-1.5 text-sm font-semibold transition-all hover:glow-primary font-body flex items-center gap-1"
                            >
                              <Plus size={14} />
                              Add
                            </button>
                        )}
                      </div>
                  );
                })
            )}
          </div>
        </div>
      </div>
  );
};

export default CreatePlaylist;