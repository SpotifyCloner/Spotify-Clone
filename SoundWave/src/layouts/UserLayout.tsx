import { Outlet } from "react-router-dom";
import TopBar from "@/components/user/TopBar";
import PlayerBar from "@/components/user/PlayerBar";

const UserLayout = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-mesh">
      <TopBar />
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-6 py-6 pb-8">
          <Outlet />
        </div>
      </main>
      <PlayerBar />
    </div>
  );
};

export default UserLayout;
