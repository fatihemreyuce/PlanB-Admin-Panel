import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useGetUserById } from "@/hooks/use-user";
import {
  ArrowLeft,
  Edit,
  Mail,
  Calendar,
  User,
  Shield,
  CheckCircle2,
  XCircle,
  Clock,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UserDetailPage() {
  const { id } = useParams<{ id: string }>();
  const userId = id ? parseInt(id) : 0;
  const { data: user, isLoading } = useGetUserById(userId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-planb-background">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-planb-main"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-planb-background">
        <div className="text-center space-y-4">
          <p className="text-planb-red font-bold">Kullanıcı bulunamadı</p>
          <Link to="/users">
            <Button variant="outline">Geri Dön</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-planb-background p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-lg border border-planb-grey-2 overflow-hidden">
          <div className="bg-gradient-to-br from-indigo-600 to-purple-600 p-8">
            <Link to="/users">
              <Button
                size="icon"
                className="mb-6 !bg-white !text-black hover:!bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                  <Avatar className="h-20 w-20">
                    <AvatarFallback className="bg-white text-planb-main text-2xl font-bold">
                      {user.username[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-white mb-2">
                    {user.username}
                  </h1>
                  <div className="flex items-center gap-2 text-white/90">
                    <Mail className="h-4 w-4" />
                    <p>{user.email}</p>
                  </div>
                </div>
              </div>
              <Link to={`/users/edit/${user.id}`}>
                <Button className="bg-white text-planb-main hover:bg-gray-100 shadow-lg">
                  <Edit className="h-4 w-4 mr-2" />
                  Düzenle
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-planb-grey-1">
                Kullanıcı ID
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-planb-cream">
                  <User className="h-5 w-5 text-planb-main" />
                </div>
                <p className="text-2xl font-bold text-planb-main">#{user.id}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-planb-grey-1">Durum</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div
                  className={`p-2 rounded-lg ${
                    user.active ? "bg-green-50" : "bg-red-50"
                  }`}
                >
                  {user.active ? (
                    <CheckCircle2 className="h-5 w-5 text-planb-green" />
                  ) : (
                    <XCircle className="h-5 w-5 text-planb-red" />
                  )}
                </div>
                <Badge
                  variant={user.active ? "default" : "secondary"}
                  className={
                    user.active
                      ? "bg-green-100 text-green-700 hover:bg-green-100"
                      : ""
                  }
                >
                  {user.active ? "Aktif" : "Pasif"}
                </Badge>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-sm text-planb-grey-1">
                Son Güncelleme
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-orange-50">
                  <Clock className="h-5 w-5 text-planb-orange" />
                </div>
                <p className="text-sm font-semibold text-planb-main">
                  {new Date(user.updatedAt).toLocaleDateString("tr-TR")}
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Details Card */}
        <Card>
          <CardHeader>
            <CardTitle>Detaylı Bilgiler</CardTitle>
            <CardDescription>Kullanıcının tüm bilgileri</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Email */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-planb-grey-1 text-sm font-medium">
                  <Mail className="h-4 w-4" />
                  Email Adresi
                </div>
                <p className="text-planb-main font-semibold">{user.email}</p>
              </div>

              {/* Status */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-planb-grey-1 text-sm font-medium">
                  <Shield
                    className={`h-4 w-4 ${
                      user.active ? "text-planb-green" : "text-planb-red"
                    }`}
                  />
                  Hesap Durumu
                </div>
                <Badge
                  variant={user.active ? "default" : "secondary"}
                  className={
                    user.active
                      ? "bg-green-100 text-green-700 hover:bg-green-100"
                      : ""
                  }
                >
                  {user.active ? "Aktif Hesap" : "Pasif Hesap"}
                </Badge>
              </div>

              {/* Created At */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-planb-grey-1 text-sm font-medium">
                  <Calendar className="h-4 w-4 text-planb-main" />
                  Oluşturulma Tarihi
                </div>
                <p className="text-planb-main font-semibold">
                  {new Date(user.createdAt).toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              {/* Updated At */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-planb-grey-1 text-sm font-medium">
                  <Calendar className="h-4 w-4 text-planb-orange" />
                  Güncellenme Tarihi
                </div>
                <p className="text-planb-main font-semibold">
                  {new Date(user.updatedAt).toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Actions */}
        <div className="flex justify-end gap-4">
          <Link to="/users">
            <Button variant="outline">Geri Dön</Button>
          </Link>
          <Link to={`/users/edit/${user.id}`}>
            <Button className="bg-planb-green hover:bg-planb-main text-white">
              <Edit className="h-4 w-4 mr-2" />
              Düzenle
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
