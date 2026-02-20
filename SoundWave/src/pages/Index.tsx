import SongCard from "@/components/user/SongCard";
import ArtistCard from "@/components/user/ArtistCard";
import { trendingSongs, popularArtists } from "@/data/mockData";
import { TrendingUp, Users, Sparkles } from "lucide-react";

const Index = () => {
  return (
    <div className="space-y-10">
      {/* Hero */}
      <section className="glass rounded-2xl p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-56 h-56 bg-accent/10 rounded-full blur-3xl" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 mb-3">
            <Sparkles size={16} className="text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider font-body">Welcome back</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-gradient mb-3">
            Feel the Rhythm
          </h1>
          <p className="text-text-subdued text-lg max-w-lg font-body">
            Dive into curated playlists, discover new artists, and let the music move you.
          </p>
        </div>
      </section>

      {/* Trending Songs */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <TrendingUp size={20} className="text-primary" />
            <h2 className="text-2xl font-display font-bold text-foreground">Trending Now</h2>
          </div>
          <button className="text-sm font-medium text-text-subdued hover:text-primary transition-colors font-body">
            Show all
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {trendingSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>

      {/* Popular Artists */}
      <section>
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2">
            <Users size={20} className="text-accent" />
            <h2 className="text-2xl font-display font-bold text-foreground">Popular Artists</h2>
          </div>
          <button className="text-sm font-medium text-text-subdued hover:text-accent transition-colors font-body">
            Show all
          </button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {popularArtists.map((artist) => (
            <ArtistCard key={artist.id} artist={artist} />
          ))}
        </div>
      </section>
    </div>
  );
};

export default Index;
