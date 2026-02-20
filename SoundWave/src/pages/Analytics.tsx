import { useState, useEffect, useCallback } from "react";
import {
    BarChart2, Zap, Filter, Radio, Search, RefreshCw,
    Music, TrendingUp, Clock, Activity, ChevronRight, X, Star
} from "lucide-react";

const AI_API = "http://localhost:8000";

// ─── Types ────────────────────────────────────────────────────────────────────
interface Track { id: string; title: string; artist: string; score?: number; mood?: string; genre?: string; tempo?: number; language?: string; }
interface Event { id: number; event_type: string; user_id: string; track_id: string; metadata: any; timestamp: string; }
interface FilterCriteria { mood?: string; genre?: string; tempo_min?: number; tempo_max?: number; sort_by?: string; ascending?: boolean; }

const MOODS = ["happy","calm","energetic","melancholy","nostalgic","party","romantic","intense","confident","joyful","dreamy","sad","angry","moody","rebellious","gritty"];
const GENRES = ["pop","rock","electronic","indie","ambient","hiphop","jazz","folk","country","reggaeton","blues"];
const EVENT_ICONS: Record<string, string> = { play: "▶", skip: "⏭", like: "♥", search: "⌕", add_to_playlist: "+", test_play: "▶", sanity_check: "✓" };
const EVENT_COLORS: Record<string, string> = { play: "#00e5a0", skip: "#ff6b6b", like: "#ff9fff", search: "#7eb8ff", add_to_playlist: "#ffd166", default: "#aaa" };

// ─── Main Dashboard ───────────────────────────────────────────────────────────
const Analytics = () => {
    const [activeTab, setActiveTab] = useState<"recommend" | "filter" | "events">("recommend");
    const [tracks, setTracks] = useState<Track[]>([]);
    const [recommendations, setRecommendations] = useState<Track[]>([]);
    const [selectedTrackId, setSelectedTrackId] = useState<string>("");
    const [filterResults, setFilterResults] = useState<Track[]>([]);
    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [filterCriteria, setFilterCriteria] = useState<FilterCriteria>({});
    const [trackSearch, setTrackSearch] = useState("");
    const [topK, setTopK] = useState(5);
    const [eventStats, setEventStats] = useState<Record<string, number>>({});

    // Load all tracks via filter with no criteria (returns all)
    const loadAllTracks = useCallback(async () => {
        try {
            const res = await fetch(`${AI_API}/filter`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({}) });
            const data = await res.json();
            setTracks(data.results || []);
        } catch { setError("Cannot connect to AI Analytics API (port 8000). Make sure your FastAPI server is running."); }
    }, []);

    const loadEvents = useCallback(async () => {
        try {
            const res = await fetch(`${AI_API}/events`);
            const data = await res.json();
            setEvents(data);
            // Compute stats
            const stats: Record<string, number> = {};
            data.forEach((e: Event) => { stats[e.event_type] = (stats[e.event_type] || 0) + 1; });
            setEventStats(stats);
        } catch { /* silent */ }
    }, []);

    useEffect(() => { loadAllTracks(); loadEvents(); }, [loadAllTracks, loadEvents]);

    const handleRecommend = async () => {
        if (!selectedTrackId) return;
        setLoading(true); setError("");
        try {
            const res = await fetch(`${AI_API}/recommend/${selectedTrackId}?top_k=${topK}`);
            if (!res.ok) throw new Error("Track not found");
            const data = await res.json();
            setRecommendations(data.recommendations);
        } catch (e: any) { setError(e.message); } finally { setLoading(false); }
    };

    const handleFilter = async () => {
        setLoading(true); setError("");
        try {
            const payload: any = {};
            if (filterCriteria.mood) payload.mood = filterCriteria.mood;
            if (filterCriteria.genre) payload.genre = filterCriteria.genre;
            if (filterCriteria.tempo_min) payload.tempo_min = filterCriteria.tempo_min;
            if (filterCriteria.tempo_max) payload.tempo_max = filterCriteria.tempo_max;
            if (filterCriteria.sort_by) { payload.sort_by = filterCriteria.sort_by; payload.ascending = filterCriteria.ascending ?? false; }
            const res = await fetch(`${AI_API}/filter`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
            const data = await res.json();
            setFilterResults(data.results);
        } catch (e: any) { setError(e.message); } finally { setLoading(false); }
    };

    const logEvent = async (type: string, trackId: string) => {
        await fetch(`${AI_API}/events`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ event_type: type, user_id: "dashboard_user", track_id: trackId, metadata: { source: "dashboard" } }) });
        loadEvents();
    };

    const filteredTracks = tracks.filter(t =>
        t.title.toLowerCase().includes(trackSearch.toLowerCase()) || t.artist.toLowerCase().includes(trackSearch.toLowerCase())
    );

    const selectedTrack = tracks.find(t => t.id === selectedTrackId);

    return (
        <div style={{ fontFamily: "'DM Mono', 'Fira Code', monospace" }} className="space-y-6">
            {/* Header */}
            <div className="relative overflow-hidden rounded-2xl p-8" style={{ background: "linear-gradient(135deg, rgba(0,229,160,0.08) 0%, rgba(126,184,255,0.08) 50%, rgba(255,159,255,0.08) 100%)", border: "1px solid rgba(0,229,160,0.2)" }}>
                <div className="absolute top-0 right-0 w-64 h-64 rounded-full blur-3xl" style={{ background: "radial-gradient(circle, rgba(0,229,160,0.12) 0%, transparent 70%)" }} />
                <div className="relative z-10 flex items-start justify-between">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#00e5a0" }} />
                            <span className="text-xs uppercase tracking-widest" style={{ color: "#00e5a0" }}>AI Analytics Engine</span>
                        </div>
                        <h1 className="text-3xl font-bold mb-1" style={{ color: "#f0f0f0", letterSpacing: "-0.02em" }}>
                            Music Intelligence
                        </h1>
                        <p className="text-sm" style={{ color: "#888" }}>Content-based recommendations · Smart filters · Event tracking</p>
                    </div>
                    <div className="flex gap-4 text-right">
                        {[
                            { label: "Tracks", value: tracks.length },
                            { label: "Events", value: events.length },
                            { label: "Event Types", value: Object.keys(eventStats).length },
                        ].map(({ label, value }) => (
                            <div key={label} className="glass rounded-xl px-4 py-3">
                                <div className="text-2xl font-bold" style={{ color: "#00e5a0" }}>{value}</div>
                                <div className="text-xs" style={{ color: "#666" }}>{label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Event Type Mini Bar Chart */}
                {Object.keys(eventStats).length > 0 && (
                    <div className="relative z-10 mt-6 flex items-end gap-2 h-12">
                        {Object.entries(eventStats).map(([type, count]) => {
                            const max = Math.max(...Object.values(eventStats));
                            const pct = (count / max) * 100;
                            return (
                                <div key={type} className="flex flex-col items-center gap-1">
                                    <div className="w-8 rounded-t transition-all duration-500" style={{ height: `${(pct / 100) * 40}px`, background: EVENT_COLORS[type] || EVENT_COLORS.default, opacity: 0.85 }} />
                                    <span className="text-[9px]" style={{ color: "#555" }}>{type.split("_")[0]}</span>
                                </div>
                            );
                        })}
                    </div>
                )}
            </div>

            {error && (
                <div className="glass rounded-xl px-4 py-3 text-sm flex items-center justify-between" style={{ borderColor: "rgba(255,107,107,0.3)", border: "1px solid", color: "#ff6b6b" }}>
                    <span>{error}</span>
                    <button onClick={() => setError("")}><X size={14} /></button>
                </div>
            )}

            {/* Tabs */}
            <div className="flex gap-1 p-1 rounded-xl" style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                {([
                    { id: "recommend", label: "Recommend", icon: Zap },
                    { id: "filter", label: "Smart Filter", icon: Filter },
                    { id: "events", label: "Event Log", icon: Activity },
                ] as const).map(({ id, label, icon: Icon }) => (
                    <button key={id} onClick={() => setActiveTab(id)}
                            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all duration-200"
                            style={{ background: activeTab === id ? "rgba(0,229,160,0.1)" : "transparent", color: activeTab === id ? "#00e5a0" : "#666", border: activeTab === id ? "1px solid rgba(0,229,160,0.2)" : "1px solid transparent" }}>
                        <Icon size={14} />
                        {label}
                    </button>
                ))}
            </div>

            {/* ── TAB: RECOMMEND ── */}
            {activeTab === "recommend" && (
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Left: Track Selector */}
                    <div className="glass rounded-2xl p-6 space-y-4">
                        <div className="flex items-center gap-2 mb-4">
                            <Music size={16} style={{ color: "#00e5a0" }} />
                            <h2 className="text-sm font-semibold" style={{ color: "#ccc" }}>Select a Seed Track</h2>
                        </div>
                        <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2" style={{ color: "#555" }} />
                            <input
                                type="text" placeholder="Search tracks…" value={trackSearch} onChange={e => setTrackSearch(e.target.value)}
                                className="w-full rounded-xl py-2.5 pl-9 pr-4 text-sm focus:outline-none"
                                style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#ddd" }}
                            />
                        </div>
                        <div className="space-y-1 max-h-72 overflow-y-auto pr-1" style={{ scrollbarWidth: "thin" }}>
                            {filteredTracks.slice(0, 30).map(track => (
                                <button key={track.id} onClick={() => setSelectedTrackId(track.id)}
                                        className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all duration-150"
                                        style={{ background: selectedTrackId === track.id ? "rgba(0,229,160,0.1)" : "transparent", border: selectedTrackId === track.id ? "1px solid rgba(0,229,160,0.2)" : "1px solid transparent" }}>
                                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0"
                                         style={{ background: "rgba(0,229,160,0.08)", color: "#00e5a0" }}>{track.id}</div>
                                    <div className="min-w-0">
                                        <p className="text-sm font-medium truncate" style={{ color: "#ddd" }}>{track.title}</p>
                                        <p className="text-xs truncate" style={{ color: "#666" }}>{track.artist}</p>
                                    </div>
                                    {selectedTrackId === track.id && <ChevronRight size={14} style={{ color: "#00e5a0", flexShrink: 0 }} />}
                                </button>
                            ))}
                        </div>
                        <div className="flex items-center gap-3 pt-2">
                            <div className="flex items-center gap-2">
                                <label className="text-xs" style={{ color: "#666" }}>Top K:</label>
                                <select value={topK} onChange={e => setTopK(Number(e.target.value))}
                                        className="rounded-lg px-2 py-1 text-xs focus:outline-none"
                                        style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", color: "#ccc" }}>
                                    {[3,5,8,10].map(n => <option key={n} value={n}>{n}</option>)}
                                </select>
                            </div>
                            <button onClick={handleRecommend} disabled={!selectedTrackId || loading}
                                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-semibold transition-all"
                                    style={{ background: selectedTrackId ? "rgba(0,229,160,0.15)" : "rgba(255,255,255,0.04)", color: selectedTrackId ? "#00e5a0" : "#444", border: `1px solid ${selectedTrackId ? "rgba(0,229,160,0.3)" : "rgba(255,255,255,0.06)"}` }}>
                                <Zap size={14} />
                                {loading ? "Generating…" : "Get Recommendations"}
                            </button>
                        </div>
                    </div>

                    {/* Right: Results */}
                    <div className="glass rounded-2xl p-6">
                        <div className="flex items-center gap-2 mb-4">
                            <Star size={16} style={{ color: "#ffd166" }} />
                            <h2 className="text-sm font-semibold" style={{ color: "#ccc" }}>
                                {recommendations.length > 0 ? `Recommendations for "${selectedTrack?.title}"` : "Recommendations"}
                            </h2>
                        </div>
                        {recommendations.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-48 gap-3" style={{ color: "#444" }}>
                                <Zap size={32} style={{ opacity: 0.3 }} />
                                <p className="text-sm">Select a track and click Get Recommendations</p>
                            </div>
                        ) : (
                            <div className="space-y-2">
                                {recommendations.map((rec, i) => (
                                    <div key={rec.id} className="flex items-center gap-3 px-3 py-3 rounded-xl transition-all"
                                         style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.06)" }}>
                                        <span className="text-xs font-bold w-5 text-center" style={{ color: "#444" }}>{i + 1}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate" style={{ color: "#ddd" }}>{rec.title}</p>
                                            <p className="text-xs" style={{ color: "#666" }}>{rec.artist}</p>
                                        </div>
                                        {/* Score bar */}
                                        <div className="flex items-center gap-2">
                                            <div className="w-16 h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.06)" }}>
                                                <div className="h-full rounded-full" style={{ width: `${(rec.score ?? 0) * 100}%`, background: "linear-gradient(90deg, #00e5a0, #7eb8ff)" }} />
                                            </div>
                                            <span className="text-xs w-8" style={{ color: "#555" }}>{((rec.score ?? 0) * 100).toFixed(0)}%</span>
                                        </div>
                                        <button onClick={() => logEvent("play", rec.id)}
                                                className="w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-110"
                                                style={{ background: "rgba(0,229,160,0.1)", color: "#00e5a0", border: "1px solid rgba(0,229,160,0.2)" }}
                                                title="Log play event">▶</button>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ── TAB: FILTER ── */}
            {activeTab === "filter" && (
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Filter Controls */}
                    <div className="glass rounded-2xl p-6 space-y-5">
                        <div className="flex items-center gap-2 mb-1">
                            <Filter size={16} style={{ color: "#7eb8ff" }} />
                            <h2 className="text-sm font-semibold" style={{ color: "#ccc" }}>Filter Criteria</h2>
                        </div>

                        <div>
                            <label className="text-xs mb-2 block" style={{ color: "#666" }}>Mood</label>
                            <select value={filterCriteria.mood || ""} onChange={e => setFilterCriteria(p => ({ ...p, mood: e.target.value || undefined }))}
                                    className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#ccc" }}>
                                <option value="">Any mood</option>
                                {MOODS.map(m => <option key={m} value={m}>{m}</option>)}
                            </select>
                        </div>

                        <div>
                            <label className="text-xs mb-2 block" style={{ color: "#666" }}>Genre</label>
                            <select value={filterCriteria.genre || ""} onChange={e => setFilterCriteria(p => ({ ...p, genre: e.target.value || undefined }))}
                                    className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#ccc" }}>
                                <option value="">Any genre</option>
                                {GENRES.map(g => <option key={g} value={g}>{g}</option>)}
                            </select>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            <div>
                                <label className="text-xs mb-2 block" style={{ color: "#666" }}>Tempo Min</label>
                                <input type="number" placeholder="e.g. 80" value={filterCriteria.tempo_min || ""}
                                       onChange={e => setFilterCriteria(p => ({ ...p, tempo_min: e.target.value ? Number(e.target.value) : undefined }))}
                                       className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                                       style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#ccc" }} />
                            </div>
                            <div>
                                <label className="text-xs mb-2 block" style={{ color: "#666" }}>Tempo Max</label>
                                <input type="number" placeholder="e.g. 130" value={filterCriteria.tempo_max || ""}
                                       onChange={e => setFilterCriteria(p => ({ ...p, tempo_max: e.target.value ? Number(e.target.value) : undefined }))}
                                       className="w-full rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                                       style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#ccc" }} />
                            </div>
                        </div>

                        <div>
                            <label className="text-xs mb-2 block" style={{ color: "#666" }}>Sort By</label>
                            <div className="flex gap-2">
                                <select value={filterCriteria.sort_by || ""} onChange={e => setFilterCriteria(p => ({ ...p, sort_by: e.target.value || undefined }))}
                                        className="flex-1 rounded-xl px-3 py-2.5 text-sm focus:outline-none"
                                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#ccc" }}>
                                    <option value="">None</option>
                                    <option value="tempo">Tempo</option>
                                    <option value="title">Title</option>
                                </select>
                                <button onClick={() => setFilterCriteria(p => ({ ...p, ascending: !p.ascending }))}
                                        className="px-3 rounded-xl text-xs font-bold transition-all"
                                        style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#888" }}>
                                    {filterCriteria.ascending ? "↑ ASC" : "↓ DESC"}
                                </button>
                            </div>
                        </div>

                        <div className="flex gap-2 pt-1">
                            <button onClick={() => { setFilterCriteria({}); setFilterResults([]); }}
                                    className="flex-1 py-2 rounded-xl text-xs font-medium transition-all"
                                    style={{ background: "transparent", border: "1px solid rgba(255,255,255,0.08)", color: "#555" }}>
                                Clear
                            </button>
                            <button onClick={handleFilter} disabled={loading}
                                    className="flex-1 py-2 rounded-xl text-sm font-semibold transition-all"
                                    style={{ background: "rgba(126,184,255,0.12)", color: "#7eb8ff", border: "1px solid rgba(126,184,255,0.25)" }}>
                                {loading ? "Filtering…" : "Apply Filter"}
                            </button>
                        </div>
                    </div>

                    {/* Results */}
                    <div className="lg:col-span-2 glass rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <BarChart2 size={16} style={{ color: "#7eb8ff" }} />
                                <h2 className="text-sm font-semibold" style={{ color: "#ccc" }}>Results</h2>
                            </div>
                            {filterResults.length > 0 && (
                                <span className="text-xs px-3 py-1 rounded-full" style={{ background: "rgba(126,184,255,0.1)", color: "#7eb8ff", border: "1px solid rgba(126,184,255,0.2)" }}>
                  {filterResults.length} tracks
                </span>
                            )}
                        </div>
                        {filterResults.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-48 gap-3" style={{ color: "#444" }}>
                                <Filter size={32} style={{ opacity: 0.3 }} />
                                <p className="text-sm">Apply filters to see results</p>
                            </div>
                        ) : (
                            <div className="space-y-1 max-h-[480px] overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
                                {filterResults.map((track) => (
                                    <div key={track.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all"
                                         style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                                        <span className="text-xs font-mono w-8 flex-shrink-0" style={{ color: "#444" }}>{track.id}</span>
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium truncate" style={{ color: "#ddd" }}>{track.title}</p>
                                            <p className="text-xs" style={{ color: "#666" }}>{track.artist}</p>
                                        </div>
                                        <div className="flex items-center gap-2 flex-shrink-0">
                                            {track.mood && (
                                                <span className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(255,159,255,0.08)", color: "#ff9fff", border: "1px solid rgba(255,159,255,0.15)" }}>
                          {track.mood}
                        </span>
                                            )}
                                            {track.tempo && (
                                                <span className="text-xs px-2 py-0.5 rounded-full font-mono" style={{ background: "rgba(255,255,255,0.04)", color: "#666" }}>
                          {track.tempo}bpm
                        </span>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ── TAB: EVENTS ── */}
            {activeTab === "events" && (
                <div className="space-y-4">
                    {/* Stats Row */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                        {Object.entries(eventStats).slice(0, 4).map(([type, count]) => (
                            <div key={type} className="glass rounded-xl p-4"
                                 style={{ borderLeft: `3px solid ${EVENT_COLORS[type] || EVENT_COLORS.default}` }}>
                                <div className="text-2xl font-bold mb-1" style={{ color: EVENT_COLORS[type] || EVENT_COLORS.default }}>{count}</div>
                                <div className="text-xs capitalize" style={{ color: "#666" }}>{type.replace("_", " ")}</div>
                            </div>
                        ))}
                    </div>

                    {/* Event Log */}
                    <div className="glass rounded-2xl p-6">
                        <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                                <Clock size={16} style={{ color: "#ffd166" }} />
                                <h2 className="text-sm font-semibold" style={{ color: "#ccc" }}>Event Log</h2>
                            </div>
                            <button onClick={loadEvents} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-all"
                                    style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", color: "#666" }}>
                                <RefreshCw size={12} />
                                Refresh
                            </button>
                        </div>
                        {events.length === 0 ? (
                            <div className="flex flex-col items-center justify-center h-32 gap-3" style={{ color: "#444" }}>
                                <Activity size={28} style={{ opacity: 0.3 }} />
                                <p className="text-sm">No events yet. Run seed_events.py or interact with tracks.</p>
                            </div>
                        ) : (
                            <div className="space-y-1.5 max-h-[500px] overflow-y-auto" style={{ scrollbarWidth: "thin" }}>
                                {events.map(ev => (
                                    <div key={ev.id} className="flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all group"
                                         style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.04)" }}>
                    <span className="w-6 h-6 rounded-full flex items-center justify-center text-xs flex-shrink-0"
                          style={{ background: `${EVENT_COLORS[ev.event_type] || EVENT_COLORS.default}18`, color: EVENT_COLORS[ev.event_type] || EVENT_COLORS.default }}>
                      {EVENT_ICONS[ev.event_type] || "•"}
                    </span>
                                        <span className="text-xs font-semibold w-24 flex-shrink-0 capitalize" style={{ color: EVENT_COLORS[ev.event_type] || EVENT_COLORS.default }}>
                      {ev.event_type.replace("_", " ")}
                    </span>
                                        <span className="text-xs flex-shrink-0" style={{ color: "#555" }}>{ev.user_id}</span>
                                        {ev.track_id && (
                                            <span className="text-xs px-2 py-0.5 rounded font-mono" style={{ background: "rgba(255,255,255,0.04)", color: "#666" }}>
                        {ev.track_id}
                      </span>
                                        )}
                                        {ev.metadata && Object.keys(ev.metadata).length > 0 && (
                                            <span className="text-xs truncate flex-1" style={{ color: "#444" }}>
                        {JSON.stringify(ev.metadata)}
                      </span>
                                        )}
                                        <span className="text-xs ml-auto flex-shrink-0" style={{ color: "#333" }}>
                      {new Date(ev.timestamp).toLocaleTimeString()}
                    </span>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default Analytics;