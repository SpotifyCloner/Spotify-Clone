const BASE_URL = "http://localhost:8082";

export interface User {
    id: number;
    name: string;
    email: string;
    role: "USER" | "ADMIN";
    createdAt?: string;
}

export interface Track {
    id: number;
    title: string;
    artist: string;
}

export interface Playlist {
    id: number;
    name: string;
    user: User;
    tracks: Track[];
}

// ─── USER ─────────────────────────────────────────────────────────────────────

export async function signupUser(data: {
    name: string;
    email: string;
    password: string;
    role: "USER" | "ADMIN";
}): Promise<User> {
    const res = await fetch(`${BASE_URL}/users`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Signup failed");
    }
    return res.json();
}

export async function loginUser(data: {
    email: string;
    password: string;
}): Promise<User> {
    const res = await fetch(`${BASE_URL}/users/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Invalid email or password");
    }
    return res.json();
}

export async function getUserById(id: number): Promise<User> {
    const res = await fetch(`${BASE_URL}/users/${id}`);
    if (!res.ok) throw new Error("User not found");
    return res.json();
}

// ─── TRACKS ───────────────────────────────────────────────────────────────────

export async function getAllTracks(): Promise<Track[]> {
    const res = await fetch(`${BASE_URL}/tracks`);
    if (!res.ok) throw new Error("Failed to fetch tracks");
    return res.json();
}

export async function createTrack(data: {
    title: string;
    artist: string;
}): Promise<Track> {
    const res = await fetch(`${BASE_URL}/tracks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create track");
    return res.json();
}

export async function deleteTrack(id: number): Promise<void> {
    const res = await fetch(`${BASE_URL}/tracks/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete track");
}

// ─── PLAYLISTS ────────────────────────────────────────────────────────────────

export async function getAllPlaylists(): Promise<Playlist[]> {
    const res = await fetch(`${BASE_URL}/playlists`);
    if (!res.ok) throw new Error("Failed to fetch playlists");
    return res.json();
}

export async function createPlaylist(data: {
    name: string;
    userId: number;
}): Promise<Playlist> {
    const res = await fetch(`${BASE_URL}/playlists`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to create playlist");
    return res.json();
}

export async function addTrackToPlaylist(
    playlistId: number,
    trackId: number
): Promise<Playlist> {
    const res = await fetch(
        `${BASE_URL}/playlists/${playlistId}/tracks/${trackId}`,
        { method: "POST" }
    );
    if (!res.ok) throw new Error("Failed to add track");
    return res.json();
}

export async function removeTrackFromPlaylist(
    playlistId: number,
    trackId: number
): Promise<Playlist> {
    const res = await fetch(
        `${BASE_URL}/playlists/${playlistId}/tracks/${trackId}`,
        { method: "DELETE" }
    );
    if (!res.ok) throw new Error("Failed to remove track");
    return res.json();
}

export async function deletePlaylist(id: number): Promise<void> {
    const res = await fetch(`${BASE_URL}/playlists/${id}`, { method: "DELETE" });
    if (!res.ok) throw new Error("Failed to delete playlist");
}