import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUpdateUser, useGetUserById } from "@/hooks/use-user";
import { ArrowLeft, Save } from "lucide-react";

export default function UserEditPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const updateUser = useUpdateUser();

  const { data: user, isLoading } = useGetUserById(Number(id));

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (user) {
      setUsername(user.username);
      setEmail(user.email);
    }
  }, [user]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!username.trim()) {
      newErrors.username = "Kullanıcı adı gereklidir";
    }

    if (!email.trim()) {
      newErrors.email = "E-posta gereklidir";
    } else if (!email.includes("@")) {
      newErrors.email = "Geçerli bir e-posta adresi giriniz";
    }

    if (password) {
      if (password.length < 6) {
        newErrors.password = "Şifre en az 6 karakter olmalıdır";
      }

      if (password !== confirmPassword) {
        newErrors.confirmPassword = "Şifreler eşleşmiyor";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate() || !id) {
      return;
    }

    try {
      await updateUser.mutateAsync({
        id: Number(id),
        request: {
          username,
          email,
          password: password || "",
        },
      });
      navigate("/users");
    } catch (error) {
      console.error("Kullanıcı güncelleme hatası:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Yükleniyor...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-destructive">Kullanıcı bulunamadı.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
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
            Kullanıcı Düzenle
          </h1>
          <p className="text-planb-grey-1">Kullanıcı bilgilerini güncelleyin</p>
        </div>
      </div>

      <Card className="border-planb-grey-2">
        <form onSubmit={handleSubmit}>
          <CardHeader className="pb-8">
            <CardTitle className="text-planb-main">
              Kullanıcı Bilgileri
            </CardTitle>
            <CardDescription className="text-planb-grey-1">
              Bilgileri güncelleyin (Şifre boş bırakılırsa değişmez)
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-8">
            <div className="space-y-3">
              <Label htmlFor="username">Kullanıcı Adı *</Label>
              <Input
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Kullanıcı adı giriniz"
                className={errors.username ? "border-destructive" : ""}
              />
              {errors.username && (
                <p className="text-sm text-destructive">{errors.username}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="email">E-posta *</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="E-posta adresi giriniz"
                className={errors.email ? "border-destructive" : ""}
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="password">Yeni Şifre</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifrenizi değiştiriniz"
                className={errors.password ? "border-destructive" : ""}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            {password && (
              <div className="space-y-3">
                <Label htmlFor="confirmPassword">Yeni Şifre Tekrar</Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Yeni şifreyi tekrar giriniz"
                  className={errors.confirmPassword ? "border-destructive" : ""}
                />
                {errors.confirmPassword && (
                  <p className="text-sm text-destructive">
                    {errors.confirmPassword}
                  </p>
                )}
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-end gap-4 pt-8">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/users")}
              className="border-planb-grey-2 hover:bg-planb-grey-3 text-white"
            >
              İptal
            </Button>
            <Button type="submit" disabled={updateUser.isPending}>
              <Save className="h-4 w-4 mr-2" />
              Güncelle
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
