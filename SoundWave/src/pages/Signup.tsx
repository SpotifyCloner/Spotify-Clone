import { Link, useNavigate } from "react-router-dom";
import { Headphones, User, Shield } from "lucide-react";
import { useState } from "react";
import { signupUser } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const Signup = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"USER" | "ADMIN">("USER");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!name || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    setLoading(true);
    try {
      const user = await signupUser({ name, email, password, role });
      login(user);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Signup failed. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-background bg-mesh flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto glow-accent">
              <Headphones className="text-accent" size={28} />
            </div>
            <h1 className="mt-5 text-3xl font-display font-bold text-gradient">Join SoundWave</h1>
            <p className="mt-2 text-text-subdued text-sm font-body">Start listening for free</p>
          </div>

          {error && (
              <div className="glass rounded-xl px-4 py-3 text-sm text-red-400 border border-red-500/20 text-center font-body">
                {error}
              </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2 font-display">Email</label>
              <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full glass rounded-xl py-3 px-4 text-foreground placeholder:text-text-subdued focus:outline-none focus:ring-2 focus:ring-accent/30 font-body"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2 font-display">Password</label>
              <input
                  type="password"
                  placeholder="Create a password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full glass rounded-xl py-3 px-4 text-foreground placeholder:text-text-subdued focus:outline-none focus:ring-2 focus:ring-accent/30 font-body"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-foreground mb-2 font-display">Display name</label>
              <input
                  type="text"
                  placeholder="What should we call you?"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full glass rounded-xl py-3 px-4 text-foreground placeholder:text-text-subdued focus:outline-none focus:ring-2 focus:ring-accent/30 font-body"
              />
            </div>

            {/* Role Selector */}
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2 font-display">Account Type</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                    type="button"
                    onClick={() => setRole("USER")}
                    className={`flex flex-col items-center gap-2 py-4 px-3 rounded-xl border transition-all duration-200 ${
                        role === "USER"
                            ? "border-accent/60 bg-accent/10 text-accent"
                            : "border-border/30 glass text-text-subdued hover:border-border/60"
                    }`}
                >
                  <User size={22} />
                  <span className="text-sm font-semibold font-display">Listener</span>
                  <span className="text-[11px] font-body opacity-70">Browse & play music</span>
                </button>
                <button
                    type="button"
                    onClick={() => setRole("ADMIN")}
                    className={`flex flex-col items-center gap-2 py-4 px-3 rounded-xl border transition-all duration-200 ${
                        role === "ADMIN"
                            ? "border-primary/60 bg-primary/10 text-primary"
                            : "border-border/30 glass text-text-subdued hover:border-border/60"
                    }`}
                >
                  <Shield size={22} />
                  <span className="text-sm font-semibold font-display">Admin</span>
                  <span className="text-[11px] font-body opacity-70">Manage songs & users</span>
                </button>
              </div>
            </div>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-accent text-accent-foreground rounded-xl py-3 font-bold text-base hover:scale-[1.02] transition-transform glow-accent font-display disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? "Creating account..." : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-text-subdued text-sm font-body">
            Already have an account?{" "}
            <Link to="/login" className="text-primary hover:underline font-semibold">
              Log in
            </Link>
          </p>
        </div>
      </div>
  );
};

export default Signup;