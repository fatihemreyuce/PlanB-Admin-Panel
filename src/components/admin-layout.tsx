import { Outlet, useLocation } from "react-router-dom";
import Sidebar from "./sidebar";

export default function AdminLayout() {
  const location = useLocation();
  return (
    <div className="min-h-screen bg-linear-to-br from-background/40 to-primary/70 duration-300">
      <Sidebar />
      <div className="pl-60 min-h-screen">
        <main key={location.pathname} className="min-h-screen p-6 page-animate">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
