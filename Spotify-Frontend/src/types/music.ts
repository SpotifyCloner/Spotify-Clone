export interface User {
  id: number;
  name: string;
  email: string;
}

export interface Track {
  id: number;
  title: string;
  artist: string;
  album: string;
  duration: number; // seconds
  coverUrl?: string;
}

export interface Playlist {
  id: number;
  name: string;
  user: User;
  tracks: Track[];
}

export interface PlaylistRequest {
  name: string;
  userId: number;
}
