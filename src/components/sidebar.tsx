import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, LogOut } from "lucide-react";
import { useLoginState } from "@/hooks/use-login-state";
import { useUserMe } from "@/hooks/use-user";

export default function Sidebar() {
  const location = useLocation();
  const { logout } = useLoginState();
  const { data: currentUser } = useUserMe();

  const handleLogout = async () => {
    await logout();
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: LayoutDashboard,
      path: "/dashboard",
    },
    {
      title: "Kullanıcılar",
      icon: Users,
      path: "/users",
    },
  ];

  return (
    <aside className="fixed left-0 top-0 h-screen w-60 bg-gradient-sidebar border-r border-planb-grey-2">
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-sidebar-dark-blue">
              PlanB<span className="text-sidebar-orange">.</span>
            </h1>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-xl ${
                  isActive
                    ? "bg-white text-sidebar-dark-blue shadow-md"
                    : "text-sidebar-inactive hover:text-sidebar-dark-blue"
                }`}
              >
                <Icon className="h-5 w-5" />
                <span className="text-sm font-medium">{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 space-y-1.5">
          {/* User Info */}
          {currentUser && (
            <div className="bg-white/60 backdrop-blur-sm rounded-xl p-2.5 border border-white/20">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-sidebar-dark-blue to-dashboard-accent text-white flex items-center justify-center font-bold text-xs shadow-sm">
                  {currentUser.username[0].toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold text-sidebar-dark-blue leading-tight truncate">
                    {currentUser.username}
                  </p>
                  <p className="text-[10px] text-sidebar-inactive leading-tight truncate mt-0.5">
                    {currentUser.email}
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-2.5 py-2 rounded-lg bg-sidebar-dark-blue text-white/90 hover:text-white transition-colors"
          >
            <LogOut className="h-3.5 w-3.5" />
            <span className="text-xs font-medium">Çıkış Yap</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
