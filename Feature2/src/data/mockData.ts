import album1 from "@/assets/album1.jpg";
import album2 from "@/assets/album2.jpg";
import album3 from "@/assets/album3.jpg";
import album4 from "@/assets/album4.jpg";
import album5 from "@/assets/album5.jpg";
import album6 from "@/assets/album6.jpg";
import artist1 from "@/assets/artist1.jpg";
import artist2 from "@/assets/artist2.jpg";
import artist3 from "@/assets/artist3.jpg";
import artist4 from "@/assets/artist4.jpg";
import artist5 from "@/assets/artist5.jpg";
import artist6 from "@/assets/artist6.jpg";

export interface Song {
  id: string;
  title: string;
  artist: string;
  album: string;
  cover: string;
  duration: string;
  plays: number;
}

export interface Artist {
  id: string;
  name: string;
  image: string;
  genre: string;
  followers: number;
}

export const trendingSongs: Song[] = [
  { id: "1", title: "Midnight Groove", artist: "DJ Nova", album: "Neon Nights", cover: album1, duration: "3:24", plays: 2450000 },
  { id: "2", title: "Dark Streets", artist: "Shadow MC", album: "Urban Tales", cover: album2, duration: "4:12", plays: 1890000 },
  { id: "3", title: "Golden Hour", artist: "Sunset Folk", album: "Autumn Breeze", cover: album3, duration: "3:55", plays: 3200000 },
  { id: "4", title: "Neon Dreams", artist: "Electra", album: "Digital Love", cover: album4, duration: "5:01", plays: 1560000 },
  { id: "5", title: "Sunset Soul", artist: "Velvet Voice", album: "Golden Era", cover: album5, duration: "3:38", plays: 4100000 },
  { id: "6", title: "Jazz Cafe", artist: "Blue Note Trio", album: "Late Night Sessions", cover: album6, duration: "6:22", plays: 980000 },
];

export const popularArtists: Artist[] = [
  { id: "1", name: "DJ Nova", image: artist1, genre: "Pop", followers: 12500000 },
  { id: "2", name: "Beat Master", image: artist2, genre: "Electronic", followers: 8900000 },
  { id: "3", name: "Shadow MC", image: artist3, genre: "Hip Hop", followers: 15200000 },
  { id: "4", name: "Velvet Voice", image: artist4, genre: "R&B", followers: 6700000 },
  { id: "5", name: "Sunset Folk", image: artist5, genre: "Indie", followers: 4300000 },
  { id: "6", name: "Electra", image: artist6, genre: "EDM", followers: 9800000 },
];

export const recentlyPlayed: Song[] = trendingSongs.slice(0, 4);
