import { useMemo } from "react";
import {
  TrendingUp,
  Users,
  BellRing,
  Briefcase,
  BarChart3,
  TrendingDown,
} from "lucide-react";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  CartesianGrid,
  XAxis,
  YAxis,
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

      <section className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 xl:grid-cols-3 gap-4">
        {kpi.map((item) => {
          const Icon = item.icon;
          return (
            <Card key={item.label} className="bg-dashboard-bg-card">
              <CardHeader className="flex flex-row items-center justify-between px-6">
                <div>
                  <CardTitle className="text-sm text-dashboard-text">
                    {item.label}
                  </CardTitle>
                  <div className="mt-2 text-2xl font-bold text-dashboard-primary">
                    {item.value}
                  </div>
                </div>
                <div className="shrink-0 rounded-xl p-2.5 bg-linear-to-br from-sidebar-dark-blue to-dashboard-accent text-white shadow-sm">
                  <Icon className="w-5 h-5" />
                </div>
              </CardHeader>
              <CardContent className="px-6 -mt-2">
                <Badge variant={item.badge}>{item.delta} bu hafta</Badge>
              </CardContent>
            </Card>
          );
        })}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        <Card className="bg-dashboard-bg-card border border-planb-grey-2 shadow-lg transition-all duration-300 hover:shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-planb-main flex items-center gap-2">
                  <BarChart3 className="w-6 h-6 text-planb-main" />
                  İçerik Dağılımı
                </CardTitle>
                <CardDescription className="text-dashboard-text mt-2">
                  Tüm modüllerin toplam kayıt sayıları
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <ChartContainer config={chartConfig} className="h-[380px] w-full">
              <BarChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
              >
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="0%"
                      stopColor="var(--planb-main)"
                      stopOpacity={1}
                    />
                    <stop
                      offset="50%"
                      stopColor="var(--dashboard-primary)"
                      stopOpacity={0.8}
                    />
                    <stop
                      offset="100%"
                      stopColor="var(--planb-main)"
                      stopOpacity={0.5}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  vertical={false}
                  stroke="var(--planb-grey-2)"
                  strokeOpacity={0.3}
                />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{
                    fill: "var(--dashboard-text)",
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  interval={0}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "var(--dashboard-text)", fontSize: 12 }}
                  allowDecimals={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Bar
                  dataKey="value"
                  radius={[16, 16, 0, 0]}
                  fill="url(#barGradient)"
                  animationDuration={1500}
                />
              </BarChart>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="bg-dashboard-bg-card border border-planb-grey-2 shadow-lg transition-all duration-300 hover:shadow-xl">
          <CardHeader className="pb-4">
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-xl font-bold text-planb-main flex items-center gap-2">
                  <TrendingUp className="w-6 h-6 text-chart-orange" />
                  Trend Analizi
                </CardTitle>
                <CardDescription className="text-dashboard-text mt-2">
                  İçeriklerin görsel analizi ve trendleri
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="pt-2">
            <ChartContainer config={chartConfig} className="h-[380px] w-full">
              <LineChart
                data={chartData}
                margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
              >
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor="var(--chart-orange)"
                      stopOpacity={0.5}
                    />
                    <stop
                      offset="95%"
                      stopColor="var(--chart-orange)"
                      stopOpacity={0}
                    />
                  </linearGradient>
                </defs>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--planb-grey-2)"
                  strokeOpacity={0.3}
                />
                <XAxis
                  dataKey="name"
                  tickLine={false}
                  axisLine={false}
                  tick={{
                    fill: "var(--dashboard-text)",
                    fontSize: 11,
                    fontWeight: 600,
                  }}
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  interval={0}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: "var(--dashboard-text)", fontSize: 12 }}
                  allowDecimals={false}
                />
                <ChartTooltip content={<ChartTooltipContent />} />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="var(--chart-orange)"
                  strokeWidth={4}
                  dot={{
                    r: 7,
                    fill: "var(--chart-orange)",
                    strokeWidth: 2,
                    stroke: "white",
                  }}
                  activeDot={{ r: 10, stroke: "var(--chart-orange)" }}
                  animationDuration={1500}
                />
              </LineChart>
            </ChartContainer>
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-1/2">Kullanıcı Adı</TableHead>
                    <TableHead>E-posta</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {usersPage.content.map((u) => (
                    <TableRow key={u.id}>
                      <TableCell className="font-medium truncate max-w-[150px]">
                        {u.username}
                      </TableCell>
                      <TableCell className="text-sm text-dashboard-text truncate max-w-[200px]">
                        {u.email}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Başlık</TableHead>
                    <TableHead>Yayın Tarihi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notifPage.content.map((n) => (
                    <TableRow key={n.id}>
                      <TableCell className="font-medium truncate max-w-[200px]">
                        {n.title}
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{n.type}</Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Başlık</TableHead>
                    <TableHead>Yayın Tarihi</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {portfoliosPage.content.map((p) => (
                    <TableRow key={p.id}>
                      <TableCell className="font-medium truncate max-w-[200px]">
                        {p.name}
                      </TableCell>
                      <TableCell className="text-sm text-dashboard-text">
                        <Badge variant="secondary">
                          {p.publishDate
                            ? new Date(p.publishDate).toLocaleDateString(
                                "tr-TR",
                                { day: "2-digit", month: "short" }
                              )
                            : "-"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Başlık</TableHead>
                    <TableHead>Durum</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {slidersPage.content.map((s) => (
                    <TableRow key={s.id}>
                      <TableCell className="font-medium truncate max-w-[200px]">
                        {s.title ?? `Slider #${s.id}`}
                      </TableCell>
                      <TableCell>
                        <Badge variant={s.isActive ? "success" : "secondary"}>
                          {s.isActive ? "Aktif" : "Pasif"}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
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
