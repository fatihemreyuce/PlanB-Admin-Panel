import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetUserById } from "@/hooks/use-user";
import { ArrowLeft, Edit, User, Mail, Calendar, Shield } from "lucide-react";

export default function UserDetailPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { data: user, isLoading, isError } = useGetUserById(Number(id));

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-planb-main">Yükleniyor...</p>
      </div>
    );
  }

  if (isError || !user) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <p className="text-planb-red text-lg mb-4">Kullanıcı bulunamadı</p>
          <Button onClick={() => navigate("/users")} variant="outline">
            Geri Dön
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => navigate("/users")}
          className="hover:bg-planb-cream text-white"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-3xl font-bold text-planb-main">
            Kullanıcı Detayı
          </h1>
          <p className="text-planb-grey-1">
            Kullanıcı bilgilerini görüntüleyin
          </p>
        </div>
      </div>

      {/* User Info Card */}
      <Card className="border-planb-grey-2">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-planb-main text-2xl flex items-center gap-2">
                <User className="h-6 w-6 text-planb-orange" />
                {user.username}
              </CardTitle>
              <CardDescription className="text-planb-grey-1">
                Kullanıcı Detay Bilgileri
              </CardDescription>
            </div>
            <Button
              onClick={() => navigate(`/users/edit/${user.id}`)}
              className="text-white"
            >
              <Edit className="h-4 w-4 mr-2" />
              Düzenle
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 mt-6">
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-planb-grey-1 text-sm font-medium">
                <User className="h-4 w-4 text-planb-orange" />
                Kullanıcı Adı
              </div>
              <p className="text-planb-main font-semibold text-lg">
                {user.username}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-planb-grey-1 text-sm font-medium">
                <Mail className="h-4 w-4 text-planb-orange" />
                E-posta Adresi
              </div>
              <p className="text-planb-main font-semibold text-lg break-all">
                {user.email}
              </p>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-planb-grey-1 text-sm font-medium">
                <Shield className="h-4 w-4 text-planb-orange" />
                Durum
              </div>
              <span
                className={`inline-flex items-center rounded-full px-4 py-1.5 text-sm font-semibold ${
                  user.active
                    ? "bg-planb-green text-white"
                    : "bg-planb-red text-white"
                }`}
              >
                {user.active ? "Aktif" : "Pasif"}
              </span>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-planb-grey-1 text-sm font-medium">
                <User className="h-4 w-4 text-planb-orange" />
                Kullanıcı ID
              </div>
              <p className="text-planb-main font-semibold text-lg">
                #{user.id}
              </p>
            </div>
          </div>

          <div className="border-t border-planb-grey-2 pt-6">
            <h3 className="text-planb-main font-semibold text-lg mb-4">
              Oluşturma Bilgileri
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-1">
                <div className="flex items-center gap-2 text-planb-grey-1 text-sm font-medium">
                  <Calendar className="h-4 w-4 text-planb-orange" />
                  Oluşturulma Tarihi
                </div>
                <p className="text-planb-main font-medium">
                  {new Date(user.createdAt).toLocaleDateString("tr-TR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </p>
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-2 text-planb-grey-1 text-sm font-medium">
                  <Calendar className="h-4 w-4 text-planb-orange" />
                  Son Güncelleme
                </div>
                <p className="text-planb-main font-medium">
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
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
