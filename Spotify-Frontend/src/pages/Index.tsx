import { useState, useCallback, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import AppSidebar from "@/components/AppSidebar";
import TrackList from "@/components/TrackList";
import PlaylistGrid from "@/components/PlaylistGrid";
import PlaylistDetail from "@/components/PlaylistDetail";
import SearchBar from "@/components/SearchBar";
import { getAllTracks, getAllPlaylists, getPlaylistById } from "@/lib/mockData";
import { getCurrentUser, signOut } from "@/lib/auth";
import { LogOut, User } from "lucide-react";
import heroImage from "@/assets/hero-music.jpg";

const Index = () => {
  const [activeView, setActiveView] = useState("tracks");
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<number | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const user = getCurrentUser();

  const refresh = useCallback(() => setRefreshKey((k) => k + 1), []);

  const tracks = getAllTracks();
  const playlists = getAllPlaylists();
  const selectedPlaylist = selectedPlaylistId ? getPlaylistById(selectedPlaylistId) : undefined;

  // Force re-render on data changes
  void refreshKey;

  const filteredTracks = useMemo(() => {
    if (!searchQuery.trim()) return tracks;
    const q = searchQuery.toLowerCase();
    return tracks.filter(
      (t) =>
        t.title.toLowerCase().includes(q) ||
        t.artist.toLowerCase().includes(q) ||
        t.album.toLowerCase().includes(q)
    );
  }, [tracks, searchQuery]);

  const filteredPlaylists = useMemo(() => {
    if (!searchQuery.trim()) return playlists;
    const q = searchQuery.toLowerCase();
    return playlists.filter((p) => p.name.toLowerCase().includes(q));
  }, [playlists, searchQuery]);

  const handleNavigate = (view: string, playlistId?: number) => {
    setActiveView(view);
    setSelectedPlaylistId(playlistId ?? null);
    setSearchQuery("");
  };

  const handleSignOut = () => {
    signOut();
    navigate("/auth");
  };

  const renderContent = () => {
    if (activeView.startsWith("playlist-") && selectedPlaylist) {
      return (
        <PlaylistDetail
          playlist={selectedPlaylist}
          onBack={() => handleNavigate("playlists")}
          onPlaylistsChange={refresh}
        />
      );
    }

    if (activeView === "playlists") {
      return (
        <>
          <SearchBar value={searchQuery} onChange={setSearchQuery} placeholder="Search playlists..." />
          <PlaylistGrid
            playlists={filteredPlaylists}
            onSelect={(id) => handleNavigate(`playlist-${id}`, id)}
          />
        </>
      );
    }

    return (
      <>
        <div className="relative rounded-2xl overflow-hidden mb-8 h-48">
          <img src={heroImage} alt="Music visualization" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-background/90 to-background/30 flex items-center px-8">
            <div>
              <h2 className="font-display text-4xl font-bold text-foreground">Your Library</h2>
              <p className="text-muted-foreground mt-2">Discover and organize your music</p>
            </div>
          </div>
        </div>
        <SearchBar value={searchQuery} onChange={setSearchQuery} />
        <TrackList
          tracks={filteredTracks}
          title="All Tracks"
          subtitle={`${filteredTracks.length} tracks available`}
          onPlaylistsChange={refresh}
        />
      </>
    );
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <AppSidebar
        activeView={activeView}
        onNavigate={handleNavigate}
        playlists={playlists}
        onPlaylistsChange={refresh}
      />
      <main className="flex-1 overflow-y-auto p-8">
        {/* User bar */}
        <div className="flex items-center justify-end gap-3 mb-4">
          {user ? (
            <>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <User className="w-4 h-4" />
                <span>{user.name}</span>
              </div>
              <button
                onClick={handleSignOut}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
              >
                <LogOut className="w-3.5 h-3.5" />
                Logout
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <button
                onClick={() => navigate("/auth")}
                className="px-4 py-1.5 rounded-lg text-sm font-medium border border-border text-foreground hover:bg-secondary transition-colors"
              >
                Sign In
              </button>
              <button
                onClick={() => navigate("/auth?signup=true")}
                className="px-4 py-1.5 rounded-lg text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
        {renderContent()}
      </main>
    </div>
  );
};

export default Index;
