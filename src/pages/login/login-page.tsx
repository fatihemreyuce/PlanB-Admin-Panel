import { useState } from "react";
import { Navigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useLoginState } from "@/hooks/use-login-state";
import { loginSchema, type LoginFormData } from "@/validations/auth.validation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [fieldErrors, setFieldErrors] = useState<
    Partial<Record<keyof LoginFormData, string>>
  >({});
  const { login, isLoading, isLoggedIn, isActionable } = useLoginState();

  // Redirect if already logged in
  if (isLoggedIn && isActionable) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setFieldErrors({});

    // Validate with zod
    const result = loginSchema.safeParse({ email, password });

    if (!result.success) {
      const errors: Partial<Record<keyof LoginFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          errors[issue.path[0] as keyof LoginFormData] = issue.message;
        }
      });
      setFieldErrors(errors);
      return;
    }

    try {
      await login({ email, password });
    } catch (err) {
      setError("Giriş başarısız. Lütfen bilgilerinizi kontrol edin.");
    }
  };

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center p-4"
      style={{ backgroundImage: "var(--gradient-linear-7)" }}
    >
      <Card className="w-full max-w-md shadow-2xl border-0 bg-white/95 backdrop-blur-sm">
        <CardHeader className="space-y-1 text-center pb-8">
          <div className="flex justify-center mb-6">
            <div
              className="rounded-full p-4 shadow-lg"
              style={{ backgroundImage: "var(--gradient-linear-2)" }}
            >
              <Lock className="h-10 w-10 text-white" />
            </div>
          </div>
          <CardTitle className="text-3xl font-bold text-planb-main">
            PlanB Admin Panel
          </CardTitle>
          <CardDescription className="text-planb-grey-1 text-base mt-2">
            PlanB Admin Panel'e giriş yapmak için email ve şifrenizi girin
          </CardDescription>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-planb-main font-semibold">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-planb-main" />
                <Input
                  id="email"
                  type="email"
                  placeholder="ornek@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`pl-12 border-planb-grey-2 focus:border-planb-main ${
                    fieldErrors.email ? "border-planb-red" : ""
                  }`}
                  disabled={isLoading}
                  aria-invalid={!!fieldErrors.email}
                />
              </div>
              {fieldErrors.email && (
                <p className="text-sm text-planb-red">{fieldErrors.email}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="password"
                className="text-planb-main font-semibold"
              >
                Şifre
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-planb-main z-10" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`pl-12 pr-12 border-planb-grey-2 focus:border-planb-main ${
                    fieldErrors.password ? "border-planb-red" : ""
                  }`}
                  disabled={isLoading}
                  aria-invalid={!!fieldErrors.password}
                />
                <Button
                  type="button"
                  variant="secondary"
                  size="icon"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 bg-planb-main hover:bg-planb-main/90 text-white shadow-md"
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
              {fieldErrors.password && (
                <p className="text-sm text-planb-red">{fieldErrors.password}</p>
              )}
            </div>

            {error && (
              <div className="text-sm text-planb-red bg-planb-red/10 p-3 rounded-md border border-planb-red/20">
                {error}
              </div>
            )}

            <Button
              type="submit"
              className="w-full hover:opacity-90 text-white font-semibold h-11 shadow-lg"
              style={{ backgroundImage: "var(--gradient-linear-2)" }}
              disabled={isLoading}
            >
              {isLoading ? "Giriş yapılıyor..." : "Giriş Yap"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
