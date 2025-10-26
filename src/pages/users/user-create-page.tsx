import { useState } from "react";
import { useNavigate } from "react-router-dom";
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
import { useCreateUser } from "@/hooks/use-user";
import { ArrowLeft, Save } from "lucide-react";

export default function UserCreatePage() {
  const navigate = useNavigate();
  const createUser = useCreateUser();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

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

    if (!password) {
      newErrors.password = "Şifre gereklidir";
    } else if (password.length < 6) {
      newErrors.password = "Şifre en az 6 karakter olmalıdır";
    }

    if (password !== confirmPassword) {
      newErrors.confirmPassword = "Şifreler eşleşmiyor";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      await createUser.mutateAsync({
        username,
        email,
        password: password!,
      });
      navigate("/users");
    } catch (error) {
      console.error("Kullanıcı oluşturma hatası:", error);
    }
  };

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
          <h1 className="text-3xl font-bold text-planb-main">Yeni Kullanıcı</h1>
          <p className="text-planb-grey-1">
            Yeni bir kullanıcı hesabı oluşturun
          </p>
        </div>
      </div>

      <Card className="border-planb-grey-2">
        <form onSubmit={handleSubmit}>
          <CardHeader className="pb-6">
            <CardTitle className="text-planb-main">
              Kullanıcı Bilgileri
            </CardTitle>
            <CardDescription className="text-planb-grey-1">
              Lütfen tüm alanları doldurun
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
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
              <Label htmlFor="password">Şifre *</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Şifre giriniz (min 6 karakter)"
                className={errors.password ? "border-destructive" : ""}
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password}</p>
              )}
            </div>

            <div className="space-y-3">
              <Label htmlFor="confirmPassword">Şifre Tekrar *</Label>
              <Input
                id="confirmPassword"
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Şifreyi tekrar giriniz"
                className={errors.confirmPassword ? "border-destructive" : ""}
              />
              {errors.confirmPassword && (
                <p className="text-sm text-destructive">
                  {errors.confirmPassword}
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex justify-end gap-4 pt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate("/users")}
              className="border-planb-grey-2 hover:bg-planb-grey-3 text-white"
            >
              İptal
            </Button>
            <Button type="submit" disabled={createUser.isPending}>
              <Save className="h-4 w-4 mr-2" />
              Oluştur
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
