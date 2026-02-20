import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Trash2, Music, Shield, Search, X } from "lucide-react";
import { useAuth } from "@/context/AuthContext.tsx";
import { getAllTracks, createTrack, deleteTrack, type Track } from "@/lib/api.ts";

const AdminSongs = () => {
    const { isAdmin } = useAuth();
    const navigate = useNavigate();

    const [tracks, setTracks] = useState<Track[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [search, setSearch] = useState("");

    // Add song form
    const [title, setTitle] = useState("");
    const [artist, setArtist] = useState("");
    const [adding, setAdding] = useState(false);
    const [showForm, setShowForm] = useState(false);

    // Redirect non-admins
    useEffect(() => {
        if (!isAdmin) navigate("/");
    }, [isAdmin, navigate]);

    const loadTracks = async () => {
        setLoading(true);
        try {
            const data = await getAllTracks();
            setTracks(data);
        } catch {
            setError("Failed to load tracks.");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { loadTracks(); }, []);

    const showMsg = (msg: string, type: "success" | "error") => {
        if (type === "success") { setSuccess(msg); setTimeout(() => setSuccess(""), 3000); }
        else { setError(msg); setTimeout(() => setError(""), 4000); }
    };

    const handleAdd = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim() || !artist.trim()) { showMsg("Title and artist are required.", "error"); return; }
        setAdding(true);
        try {
            const newTrack = await createTrack({ title: title.trim(), artist: artist.trim() });
            setTracks(prev => [newTrack, ...prev]);
            setTitle(""); setArtist(""); setShowForm(false);
            showMsg(`"${newTrack.title}" added successfully!`, "success");
        } catch (err: any) {
            showMsg(err.message || "Failed to add track.", "error");
        } finally {
            setAdding(false);
        }
    };

    const handleDelete = async (track: Track) => {
        if (!confirm(`Delete "${track.title}" by ${track.artist}?`)) return;
        try {
            await deleteTrack(track.id);
            setTracks(prev => prev.filter(t => t.id !== track.id));
            showMsg(`"${track.title}" deleted.`, "success");
        } catch (err: any) {
            showMsg(err.message || "Failed to delete track.", "error");
        }
    };

    const filtered = tracks.filter(t =>
        t.title.toLowerCase().includes(search.toLowerCase()) ||
        t.artist.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="glass rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-56 h-56 bg-primary/10 rounded-full blur-3xl" />
                <div className="relative z-10 flex items-center justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <Shield size={16} className="text-primary" />
                            <span className="text-xs font-semibold text-primary uppercase tracking-wider font-body">Admin Panel</span>
                        </div>
                        <h1 className="text-3xl font-display font-bold text-foreground">Manage Songs</h1>
                        <p className="text-text-subdued text-sm font-body mt-1">
                            {tracks.length} tracks in database
                        </p>
                    </div>
                    <button
                        onClick={() => setShowForm(!showForm)}
                        className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-bold transition-all duration-200 ${
                            showForm
                                ? "glass text-text-subdued"
                                : "bg-primary text-primary-foreground glow-primary hover:scale-105"
                        }`}
                    >
                        {showForm ? <><X size={16} /> Cancel</> : <><Plus size={16} /> Add Song</>}
                    </button>
                </div>
            </div>

            {/* Notifications */}
            {error && (
                <div className="glass rounded-xl px-4 py-3 text-sm text-red-400 border border-red-500/20 font-body flex items-center justify-between">
                    <span>{error}</span>
                    <button onClick={() => setError("")}><X size={14} /></button>
                </div>
            )}
            {success && (
                <div className="glass rounded-xl px-4 py-3 text-sm text-green-400 border border-green-500/20 font-body">
                    {success}
                </div>
            )}

            {/* Add Song Form */}
            {showForm && (
                <div className="glass rounded-2xl p-6 border border-primary/20">
                    <h2 className="text-lg font-display font-bold text-foreground mb-4 flex items-center gap-2">
                        <Plus size={18} className="text-primary" />
                        Add New Song
                    </h2>
                    <form onSubmit={handleAdd} className="flex flex-col sm:flex-row gap-3">
                        <input
                            type="text"
                            placeholder="Song title"
                            value={title}
                            onChange={e => setTitle(e.target.value)}
                            className="flex-1 glass rounded-xl py-3 px-4 text-sm text-foreground placeholder:text-text-subdued focus:outline-none focus:ring-2 focus:ring-primary/30 font-body"
                        />
                        <input
                            type="text"
                            placeholder="Artist name"
                            value={artist}
                            onChange={e => setArtist(e.target.value)}
                            className="flex-1 glass rounded-xl py-3 px-4 text-sm text-foreground placeholder:text-text-subdued focus:outline-none focus:ring-2 focus:ring-primary/30 font-body"
                        />
                        <button
                            type="submit"
                            disabled={adding}
                            className="bg-primary text-primary-foreground rounded-xl px-6 py-3 text-sm font-bold hover:scale-[1.02] transition-transform glow-primary font-display disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 whitespace-nowrap"
                        >
                            {adding ? "Adding..." : "Add Song"}
                        </button>
                    </form>
                </div>
            )}

            {/* Song List */}
            <div className="glass rounded-2xl p-6">
                <div className="flex items-center justify-between mb-4 gap-4">
                    <h2 className="text-lg font-display font-bold text-foreground">All Songs</h2>
                    <div className="relative max-w-xs w-full">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-text-subdued" />
                        <input
                            type="text"
                            placeholder="Search songs..."
                            value={search}
                            onChange={e => setSearch(e.target.value)}
                            className="w-full glass rounded-xl py-2.5 pl-9 pr-4 text-sm text-foreground placeholder:text-text-subdued focus:outline-none focus:ring-2 focus:ring-primary/30 font-body"
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="flex items-center justify-center py-16 text-text-subdued font-body text-sm">
                        Loading tracks...
                    </div>
                ) : filtered.length === 0 ? (
                    <div className="flex flex-col items-center justify-center py-16 gap-3 text-text-subdued">
                        <Music size={40} className="opacity-20" />
                        <p className="text-sm font-body">{tracks.length === 0 ? "No songs yet. Add your first song!" : "No songs match your search."}</p>
                    </div>
                ) : (
                    <div className="space-y-1">
                        {filtered.map((track, i) => (
                            <div
                                key={track.id}
                                className="flex items-center gap-4 py-3 px-4 rounded-xl hover:bg-surface-hover/40 transition-colors group"
                            >
                                <span className="text-xs text-text-subdued w-6 text-center font-body">{i + 1}</span>
                                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                                    <Music size={16} className="text-primary" />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="text-sm font-semibold text-foreground truncate font-display">{track.title}</p>
                                    <p className="text-xs text-text-subdued truncate font-body">{track.artist}</p>
                                </div>
                                <span className="text-xs text-text-subdued font-body font-mono">#{track.id}</span>
                                <button
                                    onClick={() => handleDelete(track)}
                                    className="opacity-0 group-hover:opacity-100 flex items-center gap-1.5 text-red-400 hover:text-red-300 glass border-none rounded-full px-3 py-1.5 text-xs font-semibold transition-all hover:bg-red-500/10 font-body"
                                >
                                    <Trash2 size={13} />
                                    Delete
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminSongs;