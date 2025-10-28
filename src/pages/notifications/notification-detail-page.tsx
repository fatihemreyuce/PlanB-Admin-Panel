import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetNotificationById } from "@/hooks/use-notfications";
import { ArrowLeft, Edit, Mail, Bell, Type, FileText } from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function NotificationDetailPage() {
  const { id } = useParams<{ id: string }>();
  const notificationId = id ? parseInt(id) : 0;
  const { data: notification, isLoading } =
    useGetNotificationById(notificationId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dashboard-primary"></div>
      </div>
    );
  }

  if (!notification) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-planb-red font-bold">Bildirim bulunamadı</p>
          <Link to="/notifications">
            <Button className="bg-white! hover:bg-gray-100! text-blue-600! border-0!">
              Geri Dön
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-dashboard-bg-card rounded-xl shadow-lg border border-planb-grey-2 overflow-hidden">
          <div className="bg-linear-to-br from-blue-600 to-indigo-600 p-8">
            <Link to="/notifications">
              <Button
                size="icon"
                className="mb-6 bg-white! text-black! hover:bg-gray-100!"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                <Bell className="h-12 w-12 text-white" />
              </div>
              <div className="flex-1">
                <h1 className="text-3xl font-bold text-white mb-2">
                  {notification.title}
                </h1>
                <div className="flex items-center gap-2 text-white/90">
                  <Badge className="bg-white/20 text-white hover:bg-white/30 border border-white/30">
                    <Mail className="h-3 w-3 mr-1" />
                    {notification.type}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-planb-grey-1">
                Bildirim ID
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-blue-50">
                  <Bell className="h-5 w-5 text-blue-600" />
                </div>
                <p className="text-2xl font-bold text-planb-main">
                  #{notification.id}
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-planb-grey-1">Tür</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-purple-50">
                  <Mail className="h-5 w-5 text-purple-600" />
                </div>
                <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-100">
                  {notification.type}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-planb-grey-1">
                Başlık
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-orange-50">
                  <Type className="h-5 w-5 text-planb-orange" />
                </div>
                <p className="text-sm font-semibold text-planb-main line-clamp-1">
                  {notification.title}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Details Card */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              İçerik
            </CardTitle>
            <CardDescription>Bildirim içeriği ve detayları</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* Title */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-planb-grey-1 text-sm font-medium">
                  <Type className="h-4 w-4" />
                  Başlık
                </div>
                <p className="text-planb-main font-semibold text-lg">
                  {notification.title}
                </p>
              </div>

              {/* Content */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-planb-grey-1 text-sm font-medium">
                  <FileText className="h-4 w-4" />
                  İçerik
                </div>
                <div className="bg-planb-grey-3 rounded-lg p-4">
                  <p className="text-planb-main whitespace-pre-wrap leading-relaxed">
                    {notification.content}
                  </p>
                </div>
              </div>

              {/* Type */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-planb-grey-1 text-sm font-medium">
                  <Mail className="h-4 w-4" />
                  Bildirim Türü
                </div>
                <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100">
                  {notification.type}
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Link to="/notifications">
            <Button className="h-12 px-6 bg-white! hover:bg-planb-grey-3! text-planb-main! border-2! border-planb-grey-2! shadow-sm hover:shadow-md transition-all font-semibold">
              Geri Dön
            </Button>
          </Link>
          <Link to={`/notifications/edit/${notification.id}`}>
            <Button className="h-12 px-6 bg-linear-to-r from-blue-600 to-indigo-600! hover:from-blue-700! hover:to-indigo-700! text-white! shadow-sm hover:shadow-lg transition-all font-semibold">
              <Edit className="h-4 w-4 mr-2" />
              Düzenle
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
