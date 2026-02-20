import { Search as SearchIcon } from "lucide-react";

const genres = [
  { name: "Pop", gradient: "from-pink-500/80 to-rose-600/80" },
  { name: "Hip-Hop", gradient: "from-orange-500/80 to-amber-600/80" },
  { name: "Rock", gradient: "from-red-600/80 to-red-800/80" },
  { name: "R&B", gradient: "from-purple-500/80 to-violet-700/80" },
  { name: "Electronic", gradient: "from-cyan-500/80 to-teal-600/80" },
  { name: "Indie", gradient: "from-emerald-500/80 to-green-700/80" },
  { name: "Jazz", gradient: "from-blue-500/80 to-indigo-700/80" },
  { name: "Classical", gradient: "from-amber-500/80 to-yellow-700/80" },
  { name: "Country", gradient: "from-yellow-600/80 to-orange-700/80" },
  { name: "Latin", gradient: "from-rose-500/80 to-pink-700/80" },
  { name: "Podcasts", gradient: "from-emerald-600/80 to-teal-800/80" },
  { name: "Mood", gradient: "from-indigo-500/80 to-purple-700/80" },
];

const Search = () => {
  return (
    <div className="space-y-8">
      {/* Search */}
      <div className="relative max-w-xl mx-auto">
        <SearchIcon size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-text-subdued" />
        <input
          type="text"
          placeholder="What do you want to listen to?"
          className="w-full glass rounded-2xl py-4 pl-12 pr-6 text-sm text-foreground placeholder:text-text-subdued focus:outline-none focus:ring-2 focus:ring-primary/30 font-body"
        />
      </div>

      {/* Browse */}
      <section>
        <h2 className="text-2xl font-display font-bold text-foreground mb-5">Browse all</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {genres.map((genre) => (
            <div
              key={genre.name}
              className={`bg-gradient-to-br ${genre.gradient} backdrop-blur-sm rounded-xl p-5 h-[130px] relative overflow-hidden cursor-pointer hover:scale-[1.03] transition-transform duration-200 border border-white/10`}
            >
              <h3 className="text-lg font-display font-bold text-foreground">{genre.name}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Search;
