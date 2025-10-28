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
import {
  ArrowLeft,
  UserPlus,
  User,
  Mail,
  KeyRound,
  Sparkles,
} from "lucide-react";
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
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-dashboard-bg-card rounded-xl shadow-lg border border-planb-grey-2 overflow-hidden">
          <div className="bg-gradient-to-br from-planb-main to-planb-chocolate p-8">
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
                <UserPlus className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Yeni Kullanıcı
                </h1>
                <p className="text-white/90">
                  Sisteme yeni bir kullanıcı ekleyin
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Info Card */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-2 border-blue-100 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Sparkles className="h-5 w-5 text-blue-600 mt-0.5" />
            <p className="text-sm text-blue-800">
              <strong className="font-semibold">İpucu:</strong> Yeni kullanıcı
              oluştururken benzersiz bir kullanıcı adı ve geçerli bir email
              adresi kullanın.
            </p>
          </div>
        </div>

        {/* Form */}
        <Card className="shadow-lg border-0">
          <CardHeader className="border-b border-planb-grey-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-planb-main">
                <User className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle>Kullanıcı Bilgileri</CardTitle>
                <CardDescription>
                  Yeni kullanıcı için gerekli bilgileri doldurun
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
                  Şifre
                </Label>
                <Input
                  id="password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="Minimum 6 karakter"
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
                    className="px-8 h-11 font-semibold bg-white! hover:bg-planb-grey-3! text-planb-main! border-2! border-planb-grey-2! shadow-sm hover:shadow-md transition-all"
                    type="button"
                  >
                    İptal
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={createUserMutation.isPending}
                  className="bg-gradient-to-r from-planb-main to-planb-chocolate hover:shadow-lg text-white px-8 h-11 font-semibold"
                >
                  {createUserMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Oluşturuluyor...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
                      Kullanıcı Oluştur
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
