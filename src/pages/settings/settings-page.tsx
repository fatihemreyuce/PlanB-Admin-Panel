import { useEffect, useState, useRef } from "react";
import {
  Settings as SettingsIcon,
  Mail,
  Instagram,
  Twitter,
  Linkedin,
  Youtube,
  Users,
  Save,
  Upload,
  X,
  Image as ImageIcon,
  Wrench,
  Info,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { useSettings, useUpdateSettings } from "@/hooks/use-settings";
import type { SettingsRequest } from "@/types/settings.types";

export default function SettingsPage() {
  const { data: settings, isLoading } = useSettings();
  const updateMutation = useUpdateSettings();

  const [form, setForm] = useState<SettingsRequest>({
    siteLogo: "",
    maintenanceMode: false,
    aboutUsDescription: "",
    email: "",
    instagramUrl: "",
    xUrl: "",
    linkedinUrl: "",
    youtubeUrl: "",
    teamMembersHeader: "",
    teamMembersDescription: "",
  });
  const [id, setId] = useState(0);
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (settings) {
      setId(settings.id);

      // Helper to filter out "string" values
      const getValue = (value: string | undefined): string => {
        return value && value !== "string" ? value : "";
      };

      setForm({
        siteLogo: getValue(settings.siteLogo),
        maintenanceMode: settings.maintenanceMode || false,
        aboutUsDescription: getValue(settings.aboutUsDescription),
        email: getValue(settings.email),
        instagramUrl: getValue(settings.instagramUrl),
        xUrl: getValue(settings.xUrl),
        linkedinUrl: getValue(settings.linkedinUrl),
        youtubeUrl: getValue(settings.youtubeUrl),
        teamMembersHeader: getValue(settings.teamMembersHeader),
        teamMembersDescription: getValue(settings.teamMembersDescription),
      });

      if (settings.siteLogo && settings.siteLogo !== "string") {
        const siteLogoUrl = settings.siteLogo.startsWith("http")
          ? settings.siteLogo
          : `/api/v1/files/${settings.siteLogo}`;
        setPreview(siteLogoUrl);
      }
    }
  }, [settings]);

  const handleFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      alert("Dosya boyutu 5MB'dan büyük olamaz");
      return;
    }
    setIconFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    setIconFile(null);
    if (settings?.siteLogo) {
      const siteLogoUrl = settings.siteLogo.startsWith("http")
        ? settings.siteLogo
        : `/api/v1/files/${settings.siteLogo}`;
      setPreview(siteLogoUrl);
    } else {
      setPreview(null);
    }
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleChange = (
    key: keyof SettingsRequest,
    value: string | boolean
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Only include siteLogo if there's a new file to upload
    const request: Record<string, unknown> = {
      maintenanceMode: form.maintenanceMode,
      aboutUsDescription: form.aboutUsDescription,
      email: form.email,
      instagramUrl: form.instagramUrl,
      xUrl: form.xUrl,
      linkedinUrl: form.linkedinUrl,
      youtubeUrl: form.youtubeUrl,
      teamMembersHeader: form.teamMembersHeader,
      teamMembersDescription: form.teamMembersDescription,
    };

    // Only add siteLogo if we have a new file
    if (iconFile) {
      request.siteLogo = iconFile;
    }

    try {
      await updateMutation.mutateAsync({
        id,
        request: request as SettingsRequest,
      });
    } catch (error) {
      console.error("Error updating settings:", error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dashboard-primary"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-dashboard-bg-card rounded-xl shadow-lg border border-planb-grey-2 overflow-hidden">
          <div className="bg-linear-to-br from-violet-600 to-purple-600 p-8">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                <SettingsIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Genel Ayarlar
                </h1>
                <p className="text-white/90">
                  Site yapılandırmalarını güncelleyin
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <Card className="shadow-lg border-planb-grey-2">
          <CardHeader>
            <CardTitle>Bilgiler</CardTitle>
            <CardDescription>Temel site bilgilerini düzenleyin</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Site Logo */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-violet-600" /> Site Logosu
                </Label>
                <div className="relative border-2 border-dashed rounded-lg transition-colors border-gray-300 hover:border-gray-400">
                  <input
                    ref={inputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  />
                  <div className="p-6 text-center">
                    {preview ? (
                      <div className="relative inline-block">
                        <img
                          src={preview}
                          alt="Preview"
                          className="max-w-full max-h-32 rounded-lg object-contain"
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="destructive"
                          className="absolute -top-2 -right-2 h-7 w-7 rounded-full"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemove();
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        <div className="flex justify-center">
                          <div className="p-3 bg-gray-100 rounded-full">
                            <Upload className="h-8 w-8 text-gray-600" />
                          </div>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-700">
                            Site logosunu sürükleyip bırakın veya tıklayın
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG, WEBP (Max 5MB)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* About Us Description */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Info className="h-4 w-4 text-violet-600" /> Hakkımızda
                  Açıklaması
                </Label>
                <textarea
                  value={form.aboutUsDescription}
                  onChange={(e) =>
                    handleChange("aboutUsDescription", e.target.value)
                  }
                  placeholder="Kısa bir açıklama..."
                  rows={4}
                  className="w-full p-3 rounded-md border-2 border-planb-grey-2 focus:border-violet-500 focus:outline-none resize-none"
                />
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-violet-600" /> E-posta
                </Label>
                <Input
                  type="email"
                  placeholder="info@site.com"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className="h-12"
                />
              </div>

              {/* Social Media URLs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Instagram className="h-4 w-4 text-violet-600" /> Instagram
                  </Label>
                  <Input
                    placeholder="https://instagram.com/..."
                    value={form.instagramUrl}
                    onChange={(e) =>
                      handleChange("instagramUrl", e.target.value)
                    }
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Twitter className="h-4 w-4 text-violet-600" /> X (Twitter)
                  </Label>
                  <Input
                    placeholder="https://x.com/..."
                    value={form.xUrl}
                    onChange={(e) => handleChange("xUrl", e.target.value)}
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Linkedin className="h-4 w-4 text-violet-600" /> LinkedIn
                  </Label>
                  <Input
                    placeholder="https://linkedin.com/company/..."
                    value={form.linkedinUrl}
                    onChange={(e) =>
                      handleChange("linkedinUrl", e.target.value)
                    }
                    className="h-12"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Youtube className="h-4 w-4 text-violet-600" /> YouTube
                  </Label>
                  <Input
                    placeholder="https://youtube.com/@..."
                    value={form.youtubeUrl}
                    onChange={(e) => handleChange("youtubeUrl", e.target.value)}
                    className="h-12"
                  />
                </div>
              </div>

              {/* Maintenance Mode */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Wrench className="h-4 w-4 text-violet-600" /> Bakım Modu
                </Label>
                <Select
                  value={form.maintenanceMode ? "true" : "false"}
                  onValueChange={(v) =>
                    handleChange("maintenanceMode", v === "true")
                  }
                >
                  <SelectTrigger className="w-48 h-10 bg-white! border-2! border-planb-grey-2!">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="false">Kapalı</SelectItem>
                    <SelectItem value="true">Açık</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Team Members Section */}
              <div className="border-t pt-6 space-y-4">
                <h3 className="text-lg font-semibold flex items-center gap-2 text-dashboard-primary">
                  <Users className="h-5 w-5" />
                  Takım Üyeleri
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Takım Başlığı</Label>
                    <Input
                      value={form.teamMembersHeader}
                      onChange={(e) =>
                        handleChange("teamMembersHeader", e.target.value)
                      }
                      placeholder="Örn: Ekibimiz"
                      className="h-12"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label>Takım Açıklaması</Label>
                    <Input
                      value={form.teamMembersDescription}
                      onChange={(e) =>
                        handleChange("teamMembersDescription", e.target.value)
                      }
                      placeholder="Kısa bir açıklama..."
                      className="h-12"
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  disabled={updateMutation.isPending || isLoading}
                  className="h-12 px-8 bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg"
                >
                  {updateMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Kaydediliyor...
                    </>
                  ) : (
                    <>
                      <Save className="h-4 w-4 mr-2" /> Kaydet
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
