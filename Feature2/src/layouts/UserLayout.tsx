import { Outlet } from "react-router-dom";
import Sidebar from "@/components/user/Sidebar";
import TopBar from "@/components/user/TopBar";
import PlayerBar from "@/components/user/PlayerBar";

const UserLayout = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-y-auto relative bg-gradient-to-b from-card to-background rounded-lg m-2 ml-0">
          <TopBar />
          <div className="pt-16 px-6 pb-6">
            <Outlet />
          </div>
        </main>
      </div>
      <PlayerBar />
    </div>
  );
};

export default UserLayout;
