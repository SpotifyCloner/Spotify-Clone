import { useState } from "react";
import { Music, ListMusic, Home, Plus, Trash2 } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { getAllPlaylists, createPlaylist, deletePlaylist } from "@/lib/mockData";
import { Playlist } from "@/types/music";

interface SidebarProps {
  activeView: string;
  onNavigate: (view: string, playlistId?: number) => void;
  playlists: Playlist[];
  onPlaylistsChange: () => void;
}

export default function AppSidebar({ activeView, onNavigate, playlists, onPlaylistsChange }: SidebarProps) {
  const [newName, setNewName] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleCreate = () => {
    if (newName.trim()) {
      createPlaylist(newName.trim());
      setNewName("");
      setShowInput(false);
      onPlaylistsChange();
    }
  };

  const handleDelete = (e: React.MouseEvent, id: number) => {
    e.stopPropagation();
    deletePlaylist(id);
    onPlaylistsChange();
    if (activeView === `playlist-${id}`) onNavigate("tracks");
  };

  const navItems = [
    { id: "tracks", label: "All Tracks", icon: Music },
    { id: "playlists", label: "Playlists", icon: ListMusic },
  ];

  return (
    <aside className="w-64 shrink-0 bg-sidebar border-r border-sidebar-border flex flex-col h-full">
      <div className="p-6">
        <h1 className="font-display text-xl font-bold text-foreground flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
            <Music className="w-4 h-4 text-primary-foreground" />
          </div>
          SoundFlow
        </h1>
      </div>

      <nav className="px-3 space-y-1">
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={cn(
              "w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
              activeView === item.id
                ? "bg-sidebar-accent text-sidebar-accent-foreground"
                : "text-sidebar-foreground hover:bg-sidebar-accent/50"
            )}
          >
            <item.icon className="w-4 h-4" />
            {item.label}
          </button>
        ))}
      </nav>

      <div className="mt-6 px-3 flex-1 overflow-hidden flex flex-col">
        <div className="flex items-center justify-between px-3 mb-2">
          <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Your Playlists
          </span>
          <button
            onClick={() => setShowInput(!showInput)}
            className="text-muted-foreground hover:text-primary transition-colors"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>

        {showInput && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} className="px-1 mb-2">
            <input
              autoFocus
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleCreate()}
              placeholder="Playlist name..."
              className="w-full bg-input border border-border rounded-md px-3 py-1.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring"
            />
          </motion.div>
        )}

        <div className="flex-1 overflow-y-auto space-y-0.5">
          {playlists.map((pl) => (
            <button
              key={pl.id}
              onClick={() => onNavigate(`playlist-${pl.id}`, pl.id)}
              className={cn(
                "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors group",
                activeView === `playlist-${pl.id}`
                  ? "bg-sidebar-accent text-sidebar-accent-foreground"
                  : "text-sidebar-foreground hover:bg-sidebar-accent/50"
              )}
            >
              <span className="truncate">{pl.name}</span>
              <Trash2
                onClick={(e) => handleDelete(e, pl.id)}
                className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-destructive transition-all"
              />
            </button>
          ))}
        </div>
      </div>
    </aside>
  );
}
