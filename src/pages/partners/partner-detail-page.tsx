import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { ArrowLeft, Users, Hash } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { usePartnerById } from "@/hooks/use-partner";

export default function PartnerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const partnerId = id ? parseInt(id) : 0;
  const { data: partner, isLoading } = usePartnerById(partnerId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dashboard-primary"></div>
      </div>
    );
  }

  if (!partner) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Partner Bulunamadı</CardTitle>
            <CardDescription>
              Belirtilen ID'ye sahip bir partner bulunamadı.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/partners">
              <Button>Listeye Dön</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-dashboard-bg-card rounded-xl shadow-lg border border-planb-grey-2 overflow-hidden">
          <div className="bg-linear-to-br from-indigo-600 to-purple-600 p-8">
            <Link to="/partners">
              <Button
                size="icon"
                className="mb-6 bg-white! text-black! hover:bg-gray-100!"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                {partner.icon ? (
                  <img
                    src={
                      partner.icon && partner.icon.startsWith("http")
                        ? partner.icon
                        : `/api/v1/files/${partner.icon}`
                    }
                    alt={partner.name}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                ) : (
                  <Users className="h-8 w-8 text-white" />
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {partner.name}
                </h1>
                <p className="text-white/90">Partner Detayları</p>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <Card className="shadow-lg border-planb-grey-2">
          <CardHeader>
            <CardTitle>Bilgiler</CardTitle>
            <CardDescription>Partner detay bilgileri</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* ID */}
            <div className="flex items-center gap-4 p-4 bg-planb-grey-3 rounded-lg">
              <div className="p-3 bg-indigo-500 rounded-lg">
                <Hash className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-dashboard-text font-medium">
                  Partner ID
                </p>
                <p className="text-lg font-semibold text-dashboard-primary">
                  {partner.id}
                </p>
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Users className="h-4 w-4 text-indigo-600" />
                İsim
              </Label>
              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <p className="text-lg font-semibold text-dashboard-primary">
                  {partner.name}
                </p>
              </div>
            </div>

            {/* Logo */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-600" />
                Logo
              </Label>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                {partner.icon ? (
                  <img
                    src={
                      partner.icon && partner.icon.startsWith("http")
                        ? partner.icon
                        : `/api/v1/files/${partner.icon}`
                    }
                    alt={partner.name}
                    className="max-w-full max-h-48 rounded-lg object-cover"
                  />
                ) : (
                  <Badge className="bg-purple-500 text-white">Logo yok</Badge>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-4">
              <Link to="/partners">
                <Button className="h-12 px-8 bg-white! hover:bg-planb-grey-3! text-planb-main! border-2! border-planb-grey-2! shadow-sm hover:shadow-md transition-all font-semibold">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Geri Dön
                </Button>
              </Link>
              <Link to={`/partners/edit/${partner.id}`}>
                <Button className="h-12 px-8 bg-linear-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-sm hover:shadow-lg transition-all font-semibold">
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
