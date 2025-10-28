import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Briefcase,
  Hash,
  Edit,
  FileText,
  Calendar,
  Link as LinkIcon,
} from "lucide-react";
import { usePortfolioById } from "@/hooks/use-portfolios";

export default function PortfolioDetailPage() {
  const { id } = useParams<{ id: string }>();
  const portfolioId = id ? parseInt(id) : 0;
  const { data: portfolio, isLoading } = usePortfolioById(portfolioId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dashboard-bg-main">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dashboard-primary"></div>
      </div>
    );
  }

  if (!portfolio) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dashboard-bg-main">
        <Card>
          <CardHeader>
            <CardTitle>Portfolio Bulunamadı</CardTitle>
            <CardDescription>
              Belirtilen ID'ye sahip bir portfolio bulunamadı.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/portfolios">
              <Button>Listeye Dön</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dashboard-bg-main p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-dashboard-bg-card rounded-xl shadow-lg border border-planb-grey-2 overflow-hidden">
          <div className="bg-linear-to-br from-violet-600 to-purple-600 p-8">
            <Link to="/portfolios">
              <Button
                size="icon"
                className="mb-6 bg-white! text-black! hover:bg-gray-100!"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {portfolio.name}
                </h1>
                <p className="text-white/90">Portfolio Detayları</p>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <Card className="shadow-lg border-planb-grey-2">
          <CardHeader>
            <CardTitle>Bilgiler</CardTitle>
            <CardDescription>Portfolio detay bilgileri</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* ID */}
            <div className="flex items-center gap-4 p-4 bg-planb-grey-3 rounded-lg">
              <div className="p-3 bg-violet-500 rounded-lg">
                <Hash className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-dashboard-text font-medium">
                  Portfolio ID
                </p>
                <p className="text-lg font-semibold text-dashboard-primary">
                  {portfolio.id}
                </p>
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-violet-600" />
                İsim
              </Label>
              <div className="p-4 bg-violet-50 rounded-lg border border-violet-200">
                <p className="text-lg font-semibold text-dashboard-primary">
                  {portfolio.name}
                </p>
              </div>
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-purple-600" />
                Özet
              </Label>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-lg font-semibold text-dashboard-primary">
                  {portfolio.excerpt}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-indigo-600" />
                Açıklama
              </Label>
              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <p className="text-sm leading-relaxed text-dashboard-primary whitespace-pre-wrap">
                  {portfolio.description}
                </p>
              </div>
            </div>

            {/* Publish Date */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-violet-600" />
                Yayın Tarihi
              </Label>
              <div className="p-4 bg-violet-50 rounded-lg border border-violet-200">
                <Badge className="bg-violet-600 text-white">
                  {new Date(portfolio.publishDate).toLocaleDateString("tr-TR")}
                </Badge>
              </div>
            </div>

            {/* Out Source Link */}
            {portfolio.outSourceLink && (
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4 text-cyan-600" />
                  Dış Link
                </Label>
                <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                  <a
                    href={portfolio.outSourceLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-cyan-600 hover:underline font-medium"
                  >
                    {portfolio.outSourceLink}
                  </a>
                </div>
              </div>
            )}

            {/* Assets */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Briefcase className="h-4 w-4 text-pink-600" />
                Resimler
              </Label>
              <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                {portfolio.assets && portfolio.assets.length > 0 ? (
                  <div className="grid grid-cols-3 gap-4">
                    {portfolio.assets.map((asset, index) => (
                      <div key={index} className="relative">
                        {typeof asset.asset === "string" ? (
                          <img
                            src={
                              asset.asset.startsWith("http")
                                ? asset.asset
                                : `/api/v1/files/${asset.asset}`
                            }
                            alt={`Asset ${index + 1}`}
                            className="w-full h-32 object-cover rounded-lg"
                          />
                        ) : (
                          <div className="w-full h-32 bg-gray-200 rounded-lg flex items-center justify-center text-gray-500 text-sm">
                            Resim
                          </div>
                        )}
                        {asset.isCovered && (
                          <Badge className="absolute top-2 left-2 bg-green-600 text-white">
                            Kapak
                          </Badge>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <Badge className="bg-gray-100 text-gray-700">
                    Resim bulunamadı
                  </Badge>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-4">
              <Link to="/portfolios">
                <Button className="h-12 px-8 bg-white! hover:bg-planb-grey-3! text-planb-main! border-2! border-planb-grey-2! shadow-sm hover:shadow-md transition-all font-semibold">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Geri Dön
                </Button>
              </Link>
              <Link to={`/portfolios/edit/${portfolio.id}`}>
                <Button className="h-12 px-8 bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-sm hover:shadow-lg transition-all font-semibold">
                  <Edit className="h-4 w-4 mr-2" />
                  Düzenle
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Label({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label
      className={`text-sm font-semibold text-dashboard-primary ${
        className || ""
      }`}
    >
      {children}
    </label>
  );
}
