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
import { ArrowLeft, UserCog } from "lucide-react";
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
      <div className="max-w-3xl mx-auto space-y-6">
        {/* Header */}
        <div>
          <Link to="/users">
            <Button
              variant="ghost"
              size="icon"
              className="mb-4 hover:bg-planb-cream"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-planb-green">
              <UserCog className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-planb-main">
                Kullanıcı Düzenle
              </h1>
              <p className="text-planb-grey-1">
                Kullanıcı bilgilerini güncelleyin
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Kullanıcı Bilgileri</CardTitle>
            <CardDescription>
              Düzenlemek istediğiniz bilgileri güncelleyin
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Username */}
              <div className="space-y-2">
                <Label htmlFor="username">Kullanıcı Adı</Label>
                <Input
                  id="username"
                  value={formData.username}
                  onChange={(e) =>
                    setFormData({ ...formData, username: e.target.value })
                  }
                  placeholder="Örn: john_doe"
                />
                {errors.username && (
                  <p className="text-sm text-planb-red">{errors.username}</p>
                )}
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email">Email Adresi</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="Örn: john@example.com"
                />
                {errors.email && (
                  <p className="text-sm text-planb-red">{errors.email}</p>
                )}
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password">Şifre (Opsiyonel)</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Değiştirmek istemiyorsanız boş bırakın"
                />
                {errors.password && (
                  <p className="text-sm text-planb-red">{errors.password}</p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 pt-4">
                <Link to="/users">
                  <Button variant="outline" type="button">
                    İptal
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={updateUserMutation.isPending}
                  className="bg-planb-green hover:bg-planb-main text-white"
                >
                  {updateUserMutation.isPending
                    ? "Güncelleniyor..."
                    : "Değişiklikleri Kaydet"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
