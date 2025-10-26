import { Link, useLocation } from "react-router-dom";
import { LayoutDashboard, Users, LogOut, User } from "lucide-react";
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
    <aside className="fixed left-0 top-0 h-screen w-60 bg-white/50 backdrop-blur-sm">
      <div className="flex flex-col h-full">
        {/* Logo Section */}
        <div className="p-6">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold text-planb-main">
              PlanB<span className="text-planb-orange">.</span>
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
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg ${
                  isActive
                    ? "bg-white text-planb-main shadow-sm"
                    : "text-planb-grey-1"
                }`}
              >
                <Icon className={`h-5 w-5 ${isActive ? "" : ""}`} />
                <span className="text-sm font-medium">{item.title}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-planb-grey-2 space-y-3">
          {/* User Info */}
          {currentUser && (
            <div className="flex items-center gap-3 px-3 py-2.5 rounded-lg ">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-planb-main text-white">
                <User className="h-4 w-4" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-planb-main truncate">
                  {currentUser.username}
                </p>
                <p className="text-xs text-planb-grey-1 truncate">
                  {currentUser.email}
                </p>
              </div>
            </div>
          )}

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-planb-red"
          >
            <LogOut className="h-5 w-5" />
            <span className="text-sm font-medium">Çıkış Yap</span>
          </button>
        </div>
      </div>
    </aside>
  );
}
