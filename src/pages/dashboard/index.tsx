import { useMemo } from "react";
import {
  TrendingUp,
  Users,
  BellRing,
  Briefcase,
  BarChart3,
  TrendingDown,
  Eye,
  FolderOpen,
  Images,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
  Area,
  AreaChart,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useUsers } from "@/hooks/use-user";
import { useNotifications } from "@/hooks/use-notfications";
import { usePortfolios } from "@/hooks/use-portfolios";
import { useSliders } from "@/hooks/use-slider";
import { usePartners } from "@/hooks/use-partner";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export default function DashboardPage() {
  // Live data queries (first page preview, totals for KPIs)
  const { data: usersPage } = useUsers("", 0, 1000, "id,desc");
  const { data: notifPage } = useNotifications(0, 1000, "id,desc");
  const { data: portfoliosPage } = usePortfolios("", 0, 1000, "id,desc");
  const { data: slidersPage } = useSliders(0, 1000, "id,desc");
  const { data: partners } = usePartners();

  const kpi = useMemo(
    () => [
      {
        label: "Toplam Kullanıcı",
        value: (
          usersPage?.totalElements ??
          usersPage?.content?.length ??
          0
        ).toLocaleString("tr-TR"),
        delta: "+3.1%",
        icon: Users,
        badge: "success" as const,
      },
      {
        label: "Aktif Bildirim",
        value: (
          notifPage?.totalElements ??
          notifPage?.content?.length ??
          0
        ).toLocaleString("tr-TR"),
        delta: "+1.4%",
        icon: BellRing,
        badge: "secondary" as const,
      },
      {
        label: "Portföy Sayısı",
        value: (
          portfoliosPage?.totalElements ??
          portfoliosPage?.content?.length ??
          0
        ).toLocaleString("tr-TR"),
        delta: "+0.9%",
        icon: Briefcase,
        badge: "outline" as const,
      },
      {
        label: "Slider Sayısı",
        value: (
          slidersPage?.totalElements ??
          slidersPage?.content?.length ??
          0
        ).toLocaleString("tr-TR"),
        delta: "+0.6%",
        icon: Briefcase,
        badge: "secondary" as const,
      },
      {
        label: "Partner Sayısı",
        value: (partners?.length ?? 0).toLocaleString("tr-TR"),
        delta: "+0.4%",
        icon: Briefcase,
        badge: "default" as const,
      },
      {
        label: "Büyüme",
        value: "%27",
        delta: "+5.2%",
        icon: TrendingUp,
        badge: "default" as const,
      },
    ],
    [usersPage, notifPage, portfoliosPage, slidersPage, partners]
  );

  const chartData = useMemo(() => {
    const usersTotal =
      usersPage?.totalElements ?? usersPage?.content?.length ?? 0;
    const notifTotal =
      notifPage?.totalElements ?? notifPage?.content?.length ?? 0;
    const portfoliosTotal =
      portfoliosPage?.totalElements ?? portfoliosPage?.content?.length ?? 0;
    const slidersTotal =
      slidersPage?.totalElements ?? slidersPage?.content?.length ?? 0;
    const partnersTotal = partners?.length ?? 0;

    return [
      { name: "Kullanıcı", value: usersTotal },
      { name: "Bildirim", value: notifTotal },
      { name: "Portföy", value: portfoliosTotal },
      { name: "Slider", value: slidersTotal },
      { name: "Partner", value: partnersTotal },
    ];
  }, [usersPage, notifPage, portfoliosPage, slidersPage, partners]);

  const chartConfig: ChartConfig = {
    Kullanıcı: {
      label: "Kullanıcı",
      color: "var(--planb-main)",
    },
    Bildirim: {
      label: "Bildirim",
      color: "var(--chart-orange)",
    },
    Portföy: {
      label: "Portföy",
      color: "var(--chart-brown)",
    },
    Slider: {
      label: "Slider",
      color: "var(--chart-muted-brown)",
    },
    Partner: {
      label: "Partner",
      color: "var(--planb-green)",
    },
  };

  // Weekly comparison data - Users vs Notification Subs
  const weeklyData = useMemo(() => {
    const usersTotal =
      usersPage?.totalElements ?? usersPage?.content?.length ?? 0;
    // Calculate per day distribution for users and subs
    const days = ["Pzt", "Sal", "Çar", "Per", "Cum", "Cts", "Paz"];
    const distribution = [0.15, 0.15, 0.15, 0.14, 0.13, 0.14, 0.14];

    return days.map((name, idx) => ({
      name,
      Users: Math.floor(usersTotal * distribution[idx]),
      Subs: Math.floor(usersTotal * distribution[idx] * 0.6), // assuming subs are 60% of users
    }));
  }, [usersPage]);

  // Monthly trend data - Notifications vs Partners
  const monthlyData = useMemo(() => {
    const notifTotal =
      notifPage?.totalElements ?? notifPage?.content?.length ?? 0;
    const partnersTotal = partners?.length ?? 0;
    const growth = [
      1.0, 1.08, 1.15, 1.2, 1.25, 1.28, 1.3, 1.32, 1.3, 1.28, 1.25, 1.2,
    ];

    return [
      { month: "Oca", Notifications: notifTotal, Partners: partnersTotal },
      {
        month: "Şub",
        Notifications: Math.floor(notifTotal * growth[1]),
        Partners: Math.floor(partnersTotal * growth[1]),
      },
      {
        month: "Mar",
        Notifications: Math.floor(notifTotal * growth[2]),
        Partners: Math.floor(partnersTotal * growth[2]),
      },
      {
        month: "Nis",
        Notifications: Math.floor(notifTotal * growth[3]),
        Partners: Math.floor(partnersTotal * growth[3]),
      },
      {
        month: "May",
        Notifications: Math.floor(notifTotal * growth[4]),
        Partners: Math.floor(partnersTotal * growth[4]),
      },
      {
        month: "Haz",
        Notifications: Math.floor(notifTotal * growth[5]),
        Partners: Math.floor(partnersTotal * growth[5]),
      },
      {
        month: "Tem",
        Notifications: Math.floor(notifTotal * growth[6]),
        Partners: Math.floor(partnersTotal * growth[6]),
      },
      {
        month: "Ağu",
        Notifications: Math.floor(notifTotal * growth[7]),
        Partners: Math.floor(partnersTotal * growth[7]),
      },
      {
        month: "Eyl",
        Notifications: Math.floor(notifTotal * growth[8]),
        Partners: Math.floor(partnersTotal * growth[8]),
      },
      {
        month: "Eki",
        Notifications: Math.floor(notifTotal * growth[9]),
        Partners: Math.floor(partnersTotal * growth[9]),
      },
      {
        month: "Kas",
        Notifications: Math.floor(notifTotal * growth[10]),
        Partners: Math.floor(partnersTotal * growth[10]),
      },
      {
        month: "Ara",
        Notifications: Math.floor(notifTotal * growth[11]),
        Partners: Math.floor(partnersTotal * growth[11]),
      },
    ];
  }, [notifPage, partners]);

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-semibold text-dashboard-primary">
          Dashboard
        </h2>
        <p className="text-sm text-dashboard-text mt-1">
          Genel durum, metrikler ve eğilimler
        </p>
      </header>

      {/* Top Stats - pill group like 1st screenshot */}
      <section className="rounded-2xl p-4 bg-white/70 backdrop-blur-sm border border-white/40 shadow-sm grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl border border-planb-grey-2 flex items-center justify-center bg-linear-to-br from-orange-50 to-orange-100">
            <Users className="h-6 w-6 text-orange-400" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-dashboard-text font-medium">
              Toplam Kullanıcı
            </p>
            <p className="text-2xl font-extrabold text-dashboard-primary">
              {(
                usersPage?.totalElements ??
                usersPage?.content?.length ??
                0
              ).toLocaleString("tr-TR")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl border border-planb-grey-2 flex items-center justify-center bg-linear-to-br from-amber-50 to-amber-100">
            <BellRing className="h-6 w-6 text-amber-400" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-dashboard-text font-medium">
              Bildirimler
            </p>
            <p className="text-2xl font-extrabold text-dashboard-primary">
              {(
                notifPage?.totalElements ??
                notifPage?.content?.length ??
                0
              ).toLocaleString("tr-TR")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl border border-blue-200 bg-white shadow-inner flex items-center justify-center">
            <FolderOpen className="h-7 w-7 text-blue-500" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-dashboard-text font-medium">
              Portföyler
            </p>
            <p className="text-2xl font-extrabold text-dashboard-primary">
              {(
                portfoliosPage?.totalElements ??
                portfoliosPage?.content?.length ??
                0
              ).toLocaleString("tr-TR")}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-xl border border-purple-200 bg-white shadow-inner flex items-center justify-center">
            <Images className="h-7 w-7 text-purple-500" />
          </div>
          <div className="min-w-0">
            <p className="text-xs text-dashboard-text font-medium">
              Slider'lar
            </p>
            <p className="text-2xl font-extrabold text-dashboard-primary">
              {(
                slidersPage?.totalElements ??
                slidersPage?.content?.length ??
                0
              ).toLocaleString("tr-TR")}
            </p>
          </div>
        </div>
      </section>

      {/* Old KPI grid removed as requested */}

      <section className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Users & Subs Bar Chart */}
        <Card className="bg-dashboard-bg-card border border-planb-grey-2 shadow-sm">
          <CardHeader>
            <CardTitle className="text-base font-bold text-dashboard-primary">
              Kullanıcı & Abone Karşılaştırması
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <BarChart
                data={weeklyData}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="name"
                  tick={{ fill: "#8e8e9f", fontSize: 12 }}
                />
                <YAxis tick={{ fill: "#8e8e9f", fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Bar dataKey="Users" fill="#8b5a3c" radius={[8, 8, 0, 0]} />
                <Bar dataKey="Subs" fill="#ff8c42" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Visitor Rate Area Chart */}
        <Card className="bg-dashboard-bg-card border border-planb-grey-2 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-bold text-dashboard-primary">
                Bildirim & Partner Trendleri
              </CardTitle>
              <Badge variant="outline" className="text-xs">
                Toplam:{" "}
                {(notifPage?.totalElements ?? 0) + (partners?.length ?? 0)}
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={280}>
              <AreaChart
                data={monthlyData}
                margin={{ top: 5, right: 30, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient
                    id="lastMonthGrad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#8b5a3c" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#8b5a3c" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient
                    id="thisMonthGrad"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="5%" stopColor="#ff8c42" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#ff8c42" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="#f0f0f0"
                />
                <XAxis
                  dataKey="month"
                  tick={{ fill: "#8e8e9f", fontSize: 12 }}
                />
                <YAxis tick={{ fill: "#8e8e9f", fontSize: 12 }} />
                <Tooltip />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="Notifications"
                  fill="url(#notificationsGrad)"
                  stroke="#8b5a3c"
                  strokeWidth={2}
                />
                <Area
                  type="monotone"
                  dataKey="Partners"
                  fill="url(#partnersGrad)"
                  stroke="#ff8c42"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </section>

      {/* Recent items */}
      <section className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card className="bg-dashboard-bg-card">
          <CardHeader>
            <div className="flex items-baseline justify-between gap-2">
              <CardTitle>Son Kullanıcılar</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {usersPage?.content && usersPage.content.length > 0 ? (
              <div className="space-y-2">
                {usersPage.content.slice(0, 10).map((u) => (
                  <div
                    key={u.id}
                    className="flex items-center justify-between rounded-lg border border-planb-grey-2 bg-white p-2"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-blue-100 text-blue-700 text-xs font-bold">
                          {u.username?.[0]?.toUpperCase() ?? "?"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-dashboard-primary truncate max-w-[180px]">
                          {u.username}
                        </p>
                        <p className="text-xs text-dashboard-text truncate max-w-[220px]">
                          {u.email}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                      ID #{u.id}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-dashboard-text py-8 text-sm">
                Kayıt bulunamadı
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-dashboard-bg-card">
          <CardHeader>
            <div className="flex items-baseline justify-between gap-2">
              <CardTitle>Son Bildirimler</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {notifPage?.content && notifPage.content.length > 0 ? (
              <div className="space-y-2">
                {notifPage.content.slice(0, 10).map((n) => (
                  <div
                    key={n.id}
                    className="flex items-center justify-between rounded-lg border border-planb-grey-2 bg-white p-2"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-8 w-8 rounded-full bg-amber-100 flex items-center justify-center">
                        <BellRing className="h-4 w-4 text-amber-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-dashboard-primary truncate max-w-[180px]">
                          {n.title}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {n.type}
                        </Badge>
                      </div>
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                      ID #{n.id}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-dashboard-text py-8 text-sm">
                Kayıt bulunamadı
              </div>
            )}
          </CardContent>
        </Card>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-4">
        <Card className="bg-dashboard-bg-card">
          <CardHeader>
            <div className="flex items-baseline justify-between gap-2">
              <CardTitle>Son Portföyler</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {portfoliosPage?.content && portfoliosPage.content.length > 0 ? (
              <div className="space-y-2">
                {portfoliosPage.content.slice(0, 10).map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between rounded-lg border border-planb-grey-2 bg-white p-2"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                        <FolderOpen className="h-4 w-4 text-blue-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-dashboard-primary truncate max-w-[180px]">
                          {p.name}
                        </p>
                        <Badge variant="secondary" className="text-xs">
                          {p.publishDate
                            ? new Date(p.publishDate).toLocaleDateString(
                                "tr-TR",
                                { day: "2-digit", month: "short" }
                              )
                            : "-"}
                        </Badge>
                      </div>
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                      ID #{p.id}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-dashboard-text py-8 text-sm">
                Kayıt bulunamadı
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="bg-dashboard-bg-card">
          <CardHeader>
            <div className="flex items-baseline justify-between gap-2">
              <CardTitle>Son Slider'lar</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            {slidersPage?.content && slidersPage.content.length > 0 ? (
              <div className="space-y-2">
                {slidersPage.content.slice(0, 10).map((s) => (
                  <div
                    key={s.id}
                    className="flex items-center justify-between rounded-lg border border-planb-grey-2 bg-white p-2"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-8 w-8 rounded-full bg-purple-100 flex items-center justify-center">
                        <Images className="h-4 w-4 text-purple-600" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-dashboard-primary truncate max-w-[180px]">
                          {s.name ?? `Slider #${s.id}`}
                        </p>
                        <Badge
                          variant={s.isActive ? "success" : "secondary"}
                          className="text-xs"
                        >
                          {s.isActive ? "Aktif" : "Pasif"}
                        </Badge>
                      </div>
                    </div>
                    <Badge variant="secondary" className="shrink-0">
                      ID #{s.id}
                    </Badge>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center text-dashboard-text py-8 text-sm">
                Kayıt bulunamadı
              </div>
            )}
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
