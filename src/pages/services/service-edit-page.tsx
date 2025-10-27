import { useState, useEffect, useRef } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useServiceById, useUpdateService } from "@/hooks/use-service";
import { ArrowLeft, Settings, Upload, X } from "lucide-react";
import type { ServiceRequest } from "@/types/service.types";

export default function ServiceEditPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const serviceId = id ? parseInt(id) : 0;

  const { data: service, isLoading } = useServiceById(serviceId);
  const updateServiceMutation = useUpdateService();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (service) {
      setName(service.name);
      setDescription(service.description);
      if (service.icon && service.icon.startsWith("http")) {
        setPreview(service.icon);
      } else if (service.icon) {
        setPreview(`/api/v1/files/${service.icon}`);
      }
    }
  }, [service]);

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
    if (service?.icon) {
      const iconUrl =
        service.icon && service.icon.startsWith("http")
          ? service.icon
          : `/api/v1/files/${service.icon}`;
      setPreview(iconUrl);
    } else {
      setPreview(null);
    }
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !description.trim()) {
      setError("Lütfen tüm zorunlu alanları doldurun");
      return;
    }

    if (!iconFile && !service?.icon) {
      setError("Lütfen bir ikon dosyası seçin");
      return;
    }

    const request: ServiceRequest = {
      name,
      description,
      icon: iconFile || "",
    };

    // Remove icon if no new file is selected (to keep existing icon)
    if (!iconFile) {
      delete (request as any).icon;
    }

    try {
      await updateServiceMutation.mutateAsync({ id: serviceId, request });
      navigate("/services");
    } catch (error) {
      console.error("Error updating service:", error);
      setError("Servis güncellenirken bir hata oluştu");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dashboard-bg-main">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dashboard-primary"></div>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-dashboard-bg-main">
        <Card>
          <CardHeader>
            <CardTitle>Servis Bulunamadı</CardTitle>
            <CardDescription>
              Belirtilen ID'ye sahip bir servis bulunamadı.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/services">
              <Button>Listeye Dön</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-dashboard-bg-main p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-dashboard-bg-card rounded-xl shadow-lg border border-planb-grey-2 overflow-hidden">
          <div className="bg-gradient-to-br from-sky-600 to-blue-600 p-8">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                <Settings className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Servisi Düzenle
                </h1>
                <p className="text-white/90">{service.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <Card className="shadow-lg border-planb-grey-2">
          <CardHeader>
            <CardTitle>Bilgiler</CardTitle>
            <CardDescription>Servis bilgilerini düzenleyin</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}

              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name">
                  İsim <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Servis ismini girin..."
                  className="h-12"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label htmlFor="description">
                  Açıklama <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Servis açıklamasını girin..."
                  className="h-12"
                />
              </div>

              {/* Icon */}
              <div className="space-y-2">
                <Label htmlFor="icon">İkon</Label>
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
                          className="max-w-full max-h-48 rounded-lg object-cover"
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
                            İkonu sürükleyip bırakın veya tıklayın
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG, GIF (Max 5MB)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4 pt-4">
                <Link to="/services">
                  <Button
                    type="button"
                    className="h-12 px-8 bg-white! hover:bg-planb-grey-3! text-planb-main! border-2! border-planb-grey-2! shadow-sm hover:shadow-md transition-all font-semibold"
                  >
                    İptal
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={updateServiceMutation.isPending}
                  className="h-12 px-8 font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                >
                  {updateServiceMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Güncelleniyor...
                    </>
                  ) : (
                    <>
                      <Settings className="h-4 w-4 mr-2" />
                      Güncelle
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
