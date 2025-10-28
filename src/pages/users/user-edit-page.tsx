import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useGetUserById, useUpdateUser } from "@/hooks/use-user";
import {
  userUpdateSchema,
  type UserUpdateFormData,
} from "@/validations/user.validation";
import { ArrowLeft, UserCog, User, Mail, KeyRound, Info } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UserEditPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const userId = id ? parseInt(id) : 0;

  const { data: user, isLoading } = useGetUserById(userId);
  const updateUserMutation = useUpdateUser();

  const [formData, setFormData] = useState<UserUpdateFormData>({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof UserUpdateFormData, string>>
  >({});

  useEffect(() => {
    if (user) {
      setFormData({
        username: user.username,
        email: user.email,
        password: "",
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = userUpdateSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof UserUpdateFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof UserUpdateFormData] =
            issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      await updateUserMutation.mutateAsync({
        id: userId,
        request: {
          username: result.data.username,
          email: result.data.email,
          password: result.data.password || "",
        },
      });
      navigate("/users");
    } catch (error) {
      console.error("Kullanıcı güncelleme hatası:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dashboard-primary"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center space-y-4">
          <p className="text-planb-red font-bold">Kullanıcı bulunamadı</p>
          <Link to="/users">
            <Button className="bg-white! hover:bg-gray-100! text-dashboard-primary! border-2! border-planb-grey-2!">
              Geri Dön
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-dashboard-bg-card rounded-xl shadow-lg border border-planb-grey-2 overflow-hidden">
          <div className="bg-gradient-to-br from-planb-green to-planb-main p-8">
            <Link to="/users">
              <Button
                size="icon"
                className="mb-6 !bg-white !text-black hover:!bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                <UserCog className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Kullanıcı Düzenle
                </h1>
                <p className="text-white/90">
                  Kullanıcı bilgilerini güncelleyin
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-100 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Info className="h-5 w-5 text-blue-600 mt-0.5" />
            <p className="text-sm text-blue-800">
              <strong className="font-semibold">Güncelleme Notu:</strong>{" "}
              Kullanıcı bilgilerini güncellemek için tüm alanları doldurmanız
              gerekmektedir. Şifre alanı zorunludur ve minimum 6 karakter
              olmalıdır.
            </p>
          </div>
        </div>

        {/* Form */}
        <Card className="shadow-lg border-0">
          <CardHeader className="border-b border-planb-grey-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-planb-green">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle>Kullanıcı Bilgileri</CardTitle>
                <CardDescription>
                  Düzenlemek istediğiniz bilgileri güncelleyin
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div className="space-y-3">
                <Label
                  htmlFor="username"
                  className="flex items-center gap-2 text-base font-semibold"
                >
                  <User className="h-4 w-4 text-planb-main" />
                  Kullanıcı Adı
                </Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  placeholder="Örn: john_doe"
                  className="h-12 text-base"
                />
                {errors.username && (
                  <p className="text-sm text-planb-red font-medium">
                    {errors.username}
                  </p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-3">
                <Label
                  htmlFor="email"
                  className="flex items-center gap-2 text-base font-semibold"
                >
                  <Mail className="h-4 w-4 text-planb-main" />
                  Email Adresi
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Örn: john@example.com"
                  className="h-12 text-base"
                />
                {errors.email && (
                  <p className="text-sm text-planb-red font-medium">
                    {errors.email}
                  </p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-3">
                <Label
                  htmlFor="password"
                  className="flex items-center gap-2 text-base font-semibold"
                >
                  <KeyRound className="h-4 w-4 text-planb-main" />
                  Yeni Şifre
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Yeni şifre girin (minimum 6 karakter)"
                  className="h-12 text-base"
                />
                {errors.password && (
                  <p className="text-sm text-planb-red font-medium">
                    {errors.password}
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t border-planb-grey-2">
                <Link to="/users">
                  <Button
                    type="button"
                    className="px-8 h-11 font-semibold bg-white! hover:bg-planb-grey-3! text-planb-main! border-2! border-planb-grey-2! shadow-sm hover:shadow-md transition-all"
                  >
                    İptal
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={updateUserMutation.isPending}
                  className="bg-gradient-to-r from-planb-green to-planb-main hover:shadow-lg text-white px-8 h-11 font-semibold"
                >
                  {updateUserMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Güncelleniyor...
                    </>
                  ) : (
                    <>
                      <UserCog className="h-4 w-4 mr-2" />
                      Değişiklikleri Kaydet
                    </>
                  )}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
