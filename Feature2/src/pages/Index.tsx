import SongCard from "@/components/user/SongCard";
import ArtistCard from "@/components/user/ArtistCard";
import { trendingSongs, popularArtists } from "@/data/mockData";

const Index = () => {
  return (
    <div className="space-y-8">
      {/* Trending Songs */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-foreground">Trending songs</h2>
          <button className="text-sm font-semibold text-text-subdued hover:underline">Show all</button>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4">
          {trendingSongs.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>

      {/* Popular Artists */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-2xl font-bold text-foreground">Popular artists</h2>
          <button className="text-sm font-semibold text-text-subdued hover:underline">Show all</button>
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
