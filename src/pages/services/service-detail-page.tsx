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
import { ArrowLeft, Settings, Hash } from "lucide-react";
import { useServiceById } from "@/hooks/use-service";

export default function ServiceDetailPage() {
  const { id } = useParams<{ id: string }>();
  const serviceId = id ? parseInt(id) : 0;
  const { data: service, isLoading } = useServiceById(serviceId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dashboard-primary"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Servis Bulunamadı</CardTitle>
            <CardDescription>
              Belirtilen ID'ye sahip bir servis bulunamadı.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/services">
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
          <div className="bg-gradient-to-br from-sky-600 to-blue-600 p-8">
            <Link to="/services">
              <Button
                size="icon"
                className="mb-6 !bg-white !text-black hover:!bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                <Settings className="h-20 w-20 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {service.name}
                </h1>
                <p className="text-white/90">{service.description}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <Card className="shadow-lg border-planb-grey-2">
          <CardHeader>
            <CardTitle>Bilgiler</CardTitle>
            <CardDescription>Servis detay bilgileri</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* ID */}
            <div className="flex items-center gap-4 p-4 bg-planb-grey-3 rounded-lg">
              <div className="p-3 bg-sky-500 rounded-lg">
                <Hash className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-dashboard-text font-medium">
                  Servis ID
                </p>
                <p className="text-lg font-semibold text-dashboard-primary">
                  {service.id}
                </p>
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-sky-600" />
                İsim
              </Label>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-lg font-semibold text-dashboard-primary">
                  {service.name}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-purple-600" />
                Açıklama
              </Label>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-lg font-semibold text-dashboard-primary">
                  {service.description}
                </p>
              </div>
            </div>

            {/* Icon */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Settings className="h-4 w-4 text-emerald-600" />
                İkon
              </Label>
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                {service.icon ? (
                  <img
                    src={
                      service.icon && service.icon.startsWith("http")
                        ? service.icon
                        : `/api/v1/files/${service.icon}`
                    }
                    alt={service.name}
                    className="max-w-full max-h-48 rounded-lg object-cover"
                  />
                ) : (
                  <Badge className="bg-emerald-500 text-white">İkon yok</Badge>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-4">
              <Link to="/services">
                <Button className="h-12 px-8 bg-white! hover:bg-planb-grey-3! text-planb-main! border-2! border-planb-grey-2! shadow-sm hover:shadow-md transition-all font-semibold">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Geri Dön
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
