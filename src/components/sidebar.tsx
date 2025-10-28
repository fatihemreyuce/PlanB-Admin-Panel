import { Link, useLocation, useMatch } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Bell,
  LogOut,
  UserPlus,
  UsersRound,
  Settings as SettingsIcon,
  Building2,
  Mail,
  Tag,
  Image as ImageIcon,
  Briefcase,
  Cog,
} from "lucide-react";
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
    {
      title: "Bildirimler",
      icon: Bell,
      path: "/notifications",
      rotate: true,
    },
    {
      title: "Bildirim Aboneleri",
      icon: UserPlus,
      path: "/notification-subs",
    },
    {
      title: "Takım Üyeleri",
      icon: UsersRound,
      path: "/team-members",
    },
    {
      title: "Servisler",
      icon: SettingsIcon,
      path: "/services",
    },
    {
      title: "Partnerler",
      icon: Building2,
      path: "/partners",
    },
    {
      title: "İletişim",
      icon: Mail,
      path: "/contacts",
    },
    {
      title: "Etiketler",
      icon: Tag,
      path: "/tags",
    },
    {
      title: "Slider",
      icon: ImageIcon,
      path: "/sliders",
    },
    {
      title: "Portföyler",
      icon: Briefcase,
      path: "/portfolios",
    },
    {
      title: "Ayarlar",
      icon: Cog,
      path: "/settings",
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
            const isActive = useMatch({ path: item.path });

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`group flex items-center gap-3 px-4 py-3 rounded-full transition-all duration-200 ${
                  isActive ? "bg-white shadow-sm" : "hover:bg-white/50"
                }`}
              >
                <Icon
                  className={`h-5 w-5 ${item.rotate ? "rotate-45" : ""} ${
                    isActive
                      ? "text-dashboard-primary"
                      : "text-sidebar-inactive group-hover:text-dashboard-primary"
                  }`}
                />
                <span
                  className={`text-sm font-semibold ${
                    isActive
                      ? "text-dashboard-primary"
                      : "text-sidebar-inactive group-hover:text-dashboard-primary"
                  }`}
                >
                  {item.title}
                </span>
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
                <div className="w-9 h-9 rounded-lg bg-linear-to-br from-sidebar-dark-blue to-dashboard-accent text-white flex items-center justify-center font-bold text-xs shadow-sm">
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
