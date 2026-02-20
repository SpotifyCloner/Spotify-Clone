import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/context/AuthContext";
import UserLayout from "./layouts/UserLayout";
import Index from "./pages/Index";
import Search from "./pages/Search";
import CreatePlaylist from "./pages/CreatePlaylist";
import Analytics from "./pages/Analytics";
import AdminSongs from "./pages/AdminSongs";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

// Guard: only admins can access this route
const AdminRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn, isAdmin } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  if (!isAdmin) return <Navigate to="/" replace />;
  return <>{children}</>;
};

// Guard: must be logged in
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isLoggedIn } = useAuth();
  if (!isLoggedIn) return <Navigate to="/login" replace />;
  return <>{children}</>;
};

const AppRoutes = () => (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />

      <Route element={<UserLayout />}>
        {/* Public (but layout-wrapped) */}
        <Route path="/" element={<Index />} />
        <Route path="/search" element={<Search />} />

        {/* Logged-in users */}
        <Route path="/create-playlist" element={
          <ProtectedRoute><CreatePlaylist /></ProtectedRoute>
        } />

        {/* Admin only */}
        <Route path="/analytics" element={
          <AdminRoute><Analytics /></AdminRoute>
        } />
        <Route path="/admin/songs" element={
          <AdminRoute><AdminSongs /></AdminRoute>
        } />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
);

const App = () => (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <AuthProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </AuthProvider>
      </TooltipProvider>
    </QueryClientProvider>
);

export default App;