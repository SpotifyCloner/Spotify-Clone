import { Track, Playlist, User } from "@/types/music";

const mockUser: User = { id: 1, name: "Alex Rivera", email: "alex@example.com" };

export const mockTracks: Track[] = [
  { id: 1, title: "Midnight City", artist: "M83", album: "Hurry Up, We're Dreaming", duration: 243 },
  { id: 2, title: "Starlight", artist: "Muse", album: "Black Holes and Revelations", duration: 240 },
  { id: 3, title: "Electric Feel", artist: "MGMT", album: "Oracular Spectacular", duration: 229 },
  { id: 4, title: "Redbone", artist: "Childish Gambino", album: "Awaken, My Love!", duration: 327 },
  { id: 5, title: "Blinding Lights", artist: "The Weeknd", album: "After Hours", duration: 200 },
  { id: 6, title: "Levitating", artist: "Dua Lipa", album: "Future Nostalgia", duration: 203 },
  { id: 7, title: "Heat Waves", artist: "Glass Animals", album: "Dreamland", duration: 239 },
  { id: 8, title: "Take On Me", artist: "a-ha", album: "Hunting High and Low", duration: 225 },
  { id: 9, title: "Somebody That I Used to Know", artist: "Gotye", album: "Making Mirrors", duration: 244 },
  { id: 10, title: "Do I Wanna Know?", artist: "Arctic Monkeys", album: "AM", duration: 272 },
];

let playlists: Playlist[] = [
  { id: 1, name: "Late Night Vibes", user: mockUser, tracks: [mockTracks[0], mockTracks[3], mockTracks[6]] },
  { id: 2, name: "Workout Energy", user: mockUser, tracks: [mockTracks[1], mockTracks[4], mockTracks[5]] },
  { id: 3, name: "Chill Classics", user: mockUser, tracks: [mockTracks[2], mockTracks[7], mockTracks[9]] },
];

let nextPlaylistId = 4;

export function getAllTracks(): Track[] {
  return mockTracks;
}

export function getAllPlaylists(): Playlist[] {
  return [...playlists];
}

export function getPlaylistById(id: number): Playlist | undefined {
  return playlists.find((p) => p.id === id);
}

export function createPlaylist(name: string): Playlist {
  const pl: Playlist = { id: nextPlaylistId++, name, user: mockUser, tracks: [] };
  playlists = [...playlists, pl];
  return pl;
}

export function deletePlaylist(id: number) {
  playlists = playlists.filter((p) => p.id !== id);
}

export function addTrackToPlaylist(playlistId: number, trackId: number): Playlist | undefined {
  const pl = playlists.find((p) => p.id === playlistId);
  const tr = mockTracks.find((t) => t.id === trackId);
  if (pl && tr && !pl.tracks.find((t) => t.id === trackId)) {
    pl.tracks = [...pl.tracks, tr];
  }
  return pl;
}

export function removeTrackFromPlaylist(playlistId: number, trackId: number): Playlist | undefined {
  const pl = playlists.find((p) => p.id === playlistId);
  if (pl) {
    pl.tracks = pl.tracks.filter((t) => t.id !== trackId);
  }
  return pl;
}

export function formatDuration(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${m}:${s.toString().padStart(2, "0")}`;
}
