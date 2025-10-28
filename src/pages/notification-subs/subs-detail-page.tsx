import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, UserPlus, Mail, Phone } from "lucide-react";
import { useGetNotificationSubs } from "@/hooks/use-notification-subs";

export default function SubsDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { data } = useGetNotificationSubs(0, 1000, "id,desc");

  const sub = data?.content?.find((s) => s.id === Number(id));

  if (!sub) {
    return (
      <div className="min-h-screen p-6 flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Abone Bulunamadı</CardTitle>
            <CardDescription>
              Belirtilen ID'ye sahip bir abone bulunamadı.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/notification-subs">
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
          <div className="bg-linear-to-br from-emerald-600 to-teal-600 p-8">
            <Link to="/notification-subs">
              <Button
                size="icon"
                className="mb-6 bg-white! text-black! hover:bg-gray-100!"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                <UserPlus className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Abone Detayları
                </h1>
                <p className="text-white/90">
                  Bildirim abonesi detaylarını görüntüleyin
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <Card className="shadow-lg border-planb-grey-2">
          <CardHeader>
            <CardTitle>Bilgiler</CardTitle>
            <CardDescription>Abone detay bilgileri</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* ID */}
            <div className="flex items-center gap-4 p-4 bg-planb-grey-3 rounded-lg">
              <div className="p-3 bg-dashboard-primary rounded-lg">
                <span className="text-2xl font-bold text-white">#{sub.id}</span>
              </div>
              <div>
                <p className="text-sm text-dashboard-text font-medium">
                  Abone ID
                </p>
                <p className="text-lg font-semibold text-dashboard-primary">
                  {sub.id}
                </p>
              </div>
            </div>

            {/* Email */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-600" />
                Email Adresi
              </Label>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-lg font-semibold text-dashboard-primary">
                  {sub.email}
                </p>
              </div>
            </div>

            {/* Phone */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-purple-600" />
                Telefon Numarası
              </Label>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-lg font-semibold text-dashboard-primary">
                  {sub.phoneNumber}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-4">
              <Link to="/notification-subs">
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
