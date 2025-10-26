import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateUser } from "@/hooks/use-user";
import {
  userCreateSchema,
  type UserCreateFormData,
} from "@/validations/user.validation";
import { ArrowLeft, UserPlus } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UserCreatePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<UserCreateFormData>({
    username: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState<
    Partial<Record<keyof UserCreateFormData, string>>
  >({});

  const createUserMutation = useCreateUser();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = userCreateSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof UserCreateFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof UserCreateFormData] =
            issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      await createUserMutation.mutateAsync(result.data);
      navigate("/users");
    } catch (error) {
      console.error("Kullanıcı oluşturma hatası:", error);
    }
  };

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
            <div className="p-3 rounded-xl bg-planb-main">
              <UserPlus className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-planb-main">
                Yeni Kullanıcı
              </h1>
              <p className="text-planb-grey-1">
                Sisteme yeni bir kullanıcı ekleyin
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>Kullanıcı Bilgileri</CardTitle>
            <CardDescription>
              Yeni kullanıcı için gerekli bilgileri doldurun
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
                <Label htmlFor="password">Şifre</Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Minimum 6 karakter"
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
                  disabled={createUserMutation.isPending}
                  className="bg-planb-main hover:bg-planb-chocolate text-white"
                >
                  {createUserMutation.isPending
                    ? "Oluşturuluyor..."
                    : "Kullanıcı Oluştur"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
