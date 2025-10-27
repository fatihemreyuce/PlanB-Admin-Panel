import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCreateNotification } from "@/hooks/use-notfications";
import {
  ArrowLeft,
  BellPlus,
  Bell,
  Mail,
  Sparkles,
  FileText,
  Type,
} from "lucide-react";
import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { NotificationRequest } from "@/types/notifications.types";

export default function NotificationCreatePage() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState<NotificationRequest>({
    title: "",
    content: "",
    type: "EMAIL",
  });
  const [errors, setErrors] = useState<{
    title?: string;
    content?: string;
  }>({});

  const createNotificationMutation = useCreateNotification();

  const validate = () => {
    const newErrors: { title?: string; content?: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = "Başlık gereklidir";
    }

    if (!formData.content.trim()) {
      newErrors.content = "İçerik gereklidir";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!validate()) {
      return;
    }

    try {
      await createNotificationMutation.mutateAsync(formData);
      navigate("/notifications");
    } catch (error) {
      console.error("Bildirim oluşturma hatası:", error);
    }
  };

  return (
    <div className="min-h-screen bg-dashboard-bg-main p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-dashboard-bg-card rounded-xl shadow-lg border border-planb-grey-2 overflow-hidden">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-600 p-8">
            <Link to="/notifications">
              <Button
                size="icon"
                className="mb-6 !bg-white !text-black hover:!bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                <BellPlus className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Yeni Bildirim
                </h1>
                <p className="text-white/90">
                  Sisteme yeni bir bildirim ekleyin
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
              <strong className="font-semibold">İpucu:</strong> Bildirim
              oluştururken açıklayıcı bir başlık ve detaylı içerik yazın.
              Oluşturduğunuz bildirimleri istediğiniz zaman gönderebilirsiniz.
            </p>
          </div>
        </div>

        {/* Form */}
        <Card className="shadow-lg border-0">
          <CardHeader className="border-b border-planb-grey-2">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-600">
                <Bell className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle>Bildirim Bilgileri</CardTitle>
                <CardDescription>
                  Yeni bildirim için gerekli bilgileri doldurun
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent className="p-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Title */}
              <div className="space-y-3">
                <Label
                  htmlFor="title"
                  className="flex items-center gap-2 text-base font-semibold"
                >
                  <Type className="h-4 w-4 text-planb-main" />
                  Başlık
                </Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  placeholder="Örn: Yeni Özellik Duyurusu"
                  className="h-12 text-base"
                />
                {errors.title && (
                  <p className="text-sm text-planb-red font-medium">
                    {errors.title}
                  </p>
                )}
              </div>

              {/* Content */}
              <div className="space-y-3">
                <Label
                  htmlFor="content"
                  className="flex items-center gap-2 text-base font-semibold"
                >
                  <FileText className="h-4 w-4 text-planb-main" />
                  İçerik
                </Label>
                <textarea
                  id="content"
                  value={formData.content}
                  onChange={(e) =>
                    setFormData({ ...formData, content: e.target.value })
                  }
                  placeholder="Bildirim içeriğini buraya yazın..."
                  className="w-full min-h-[150px] px-4 py-3 text-base border border-planb-grey-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-planb-main"
                />
                {errors.content && (
                  <p className="text-sm text-planb-red font-medium">
                    {errors.content}
                  </p>
                )}
              </div>

              {/* Type */}
              <div className="space-y-3">
                <Label
                  htmlFor="type"
                  className="flex items-center gap-2 text-base font-semibold"
                >
                  <Mail className="h-4 w-4 text-planb-main" />
                  Bildirim Türü
                </Label>
                <Input
                  id="type"
                  value={formData.type}
                  disabled
                  className="h-12 text-base bg-dashboard-input"
                />
                <p className="text-xs text-dashboard-text">
                  Şu anda sadece Email bildirimleri desteklenmektedir.
                </p>
              </div>

              {/* Buttons */}
              <div className="flex justify-end gap-4 pt-6 border-t border-planb-grey-2">
                <Link to="/notifications">
                  <Button
                    className="px-8 h-11 font-semibold bg-white! hover:bg-planb-grey-3! text-planb-main! border-2! border-planb-grey-2! shadow-sm hover:shadow-md transition-all"
                    type="button"
                  >
                    İptal
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={createNotificationMutation.isPending}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:shadow-lg text-white px-8 h-11 font-semibold"
                >
                  {createNotificationMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Oluşturuluyor...
                    </>
                  ) : (
                    <>
                      <BellPlus className="h-4 w-4 mr-2" />
                      Bildirim Oluştur
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
