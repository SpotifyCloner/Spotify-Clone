import { Music, Users, TrendingUp, Disc3, Plus, Trash2, Edit } from "lucide-react";
import { trendingSongs, popularArtists } from "@/data/mockData";

const StatCard = ({ icon: Icon, label, value }: { icon: any; label: string; value: string }) => (
  <div className="bg-card rounded-lg p-5 flex items-center gap-4">
    <div className="bg-primary/10 text-primary rounded-lg p-3">
      <Icon size={24} />
    </div>
    <div>
      <p className="text-text-subdued text-sm">{label}</p>
      <p className="text-foreground text-2xl font-bold">{value}</p>
    </div>
  </div>
);

const AdminDashboard = () => {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Admin Dashboard</h1>
        <button className="flex items-center gap-2 bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-bold hover:scale-105 transition-transform">
          <Plus size={18} />
          Add Song
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Music} label="Total Songs" value="1,234" />
        <StatCard icon={Users} label="Total Artists" value="456" />
        <StatCard icon={TrendingUp} label="Total Plays" value="12.4M" />
        <StatCard icon={Disc3} label="Albums" value="789" />
      </div>

      {/* Songs Table */}
      <section>
        <h2 className="text-xl font-bold text-foreground mb-4">Manage Songs</h2>
        <div className="bg-card rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-text-subdued text-sm">
                <th className="text-left py-3 px-4">#</th>
                <th className="text-left py-3 px-4">Title</th>
                <th className="text-left py-3 px-4">Artist</th>
                <th className="text-left py-3 px-4">Album</th>
                <th className="text-left py-3 px-4">Duration</th>
                <th className="text-left py-3 px-4">Plays</th>
                <th className="text-right py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {trendingSongs.map((song, i) => (
                <tr key={song.id} className="border-b border-border/50 hover:bg-surface-elevated transition-colors">
                  <td className="py-3 px-4 text-text-subdued">{i + 1}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={song.cover} alt={song.title} className="w-10 h-10 rounded" />
                      <span className="font-medium text-foreground">{song.title}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-text-subdued">{song.artist}</td>
                  <td className="py-3 px-4 text-text-subdued">{song.album}</td>
                  <td className="py-3 px-4 text-text-subdued">{song.duration}</td>
                  <td className="py-3 px-4 text-text-subdued">{(song.plays / 1000000).toFixed(1)}M</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-text-subdued hover:text-foreground p-1 transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="text-text-subdued hover:text-destructive p-1 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Artists Table */}
      <section>
        <h2 className="text-xl font-bold text-foreground mb-4">Manage Artists</h2>
        <div className="bg-card rounded-lg overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-text-subdued text-sm">
                <th className="text-left py-3 px-4">#</th>
                <th className="text-left py-3 px-4">Artist</th>
                <th className="text-left py-3 px-4">Genre</th>
                <th className="text-left py-3 px-4">Followers</th>
                <th className="text-right py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {popularArtists.map((artist, i) => (
                <tr key={artist.id} className="border-b border-border/50 hover:bg-surface-elevated transition-colors">
                  <td className="py-3 px-4 text-text-subdued">{i + 1}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={artist.image} alt={artist.name} className="w-10 h-10 rounded-full" />
                      <span className="font-medium text-foreground">{artist.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-text-subdued">{artist.genre}</td>
                  <td className="py-3 px-4 text-text-subdued">{(artist.followers / 1000000).toFixed(1)}M</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <button className="text-text-subdued hover:text-foreground p-1 transition-colors">
                        <Edit size={16} />
                      </button>
                      <button className="text-text-subdued hover:text-destructive p-1 transition-colors">
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
};

export default AdminDashboard;
