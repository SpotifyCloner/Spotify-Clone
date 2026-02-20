import { Link, useNavigate } from "react-router-dom";
import { Headphones } from "lucide-react";
import { useState } from "react";
import { loginUser } from "@/lib/api";
import { useAuth } from "@/context/AuthContext";

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (!email || !password) {
      setError("Please fill in all fields.");
      return;
    }
    setLoading(true);
    try {
      const user = await loginUser({ email, password });
      login(user);
      navigate("/");
    } catch (err: any) {
      setError(err.message || "Login failed. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
      <div className="min-h-screen bg-background bg-mesh flex flex-col items-center justify-center px-4">
        <div className="w-full max-w-md space-y-8">
          <div className="text-center">
            <div className="w-14 h-14 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto glow-primary">
              <Headphones className="text-primary" size={28} />
            </div>
            <h1 className="mt-5 text-3xl font-display font-bold text-gradient">Welcome back</h1>
            <p className="mt-2 text-text-subdued text-sm font-body">Log in to SoundWave</p>
          </div>

          {error && (
              <div className="glass rounded-xl px-4 py-3 text-sm text-red-400 border border-red-500/20 text-center font-body">
                {error}
              </div>
          )}

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2 font-display">
                Email
              </label>
              <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full glass rounded-xl py-3 px-4 text-foreground placeholder:text-text-subdued focus:outline-none focus:ring-2 focus:ring-primary/30 font-body"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold text-foreground mb-2 font-display">
                Password
              </label>
              <input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full glass rounded-xl py-3 px-4 text-foreground placeholder:text-text-subdued focus:outline-none focus:ring-2 focus:ring-primary/30 font-body"
              />
            </div>
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-primary-foreground rounded-xl py-3 font-bold text-base hover:scale-[1.02] transition-transform glow-primary font-display disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              {loading ? "Logging in..." : "Log In"}
            </button>
          </form>

          <p className="text-center text-text-subdued text-sm font-body">
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:underline font-semibold">
              Sign up
            </Link>
          </p>
        </div>
      </div>
  );
};

export default Login;