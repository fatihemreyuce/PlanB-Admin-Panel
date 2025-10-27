import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Settings, Upload, X } from "lucide-react";
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
import { useCreateService } from "@/hooks/use-service";
import type { ServiceRequest } from "@/types/service.types";
import {
  serviceCreateSchema,
  type ServiceCreateFormData,
} from "@/validations/service.validation";

export default function ServiceCreatePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [iconFile, setIconFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<
    Partial<Record<keyof ServiceCreateFormData, string>>
  >({});
  const inputRef = useRef<HTMLInputElement>(null);

  const createServiceMutation = useCreateService();

  const handleFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setErrors({ icon: "Dosya boyutu 5MB'dan büyük olamaz" });
      return;
    }
    if (
      !["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
        file.type
      )
    ) {
      setErrors({ icon: "Sadece JPG, PNG veya WEBP formatı desteklenir" });
      return;
    }
    setIconFile(file);
    setErrors({});
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
    setPreview(null);
    setErrors({});
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const formData: ServiceCreateFormData = {
      name,
      description,
      icon: iconFile!,
    };

    const result = serviceCreateSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ServiceCreateFormData, string>> =
        {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof ServiceCreateFormData] =
            issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    const request: ServiceRequest = {
      name,
      description,
      icon: iconFile!,
    };

    try {
      await createServiceMutation.mutateAsync(request);
      navigate("/services");
    } catch (error) {
      console.error("Error creating service:", error);
    }
  };

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
                  Yeni Servis
                </h1>
                <p className="text-white/90">Yeni bir servis ekleyin</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <Card className="shadow-lg border-planb-grey-2">
          <CardHeader>
            <CardTitle>Bilgiler</CardTitle>
            <CardDescription>Servis bilgilerini girin</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
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
                {errors.name && (
                  <p className="text-sm text-planb-red font-medium">
                    {errors.name}
                  </p>
                )}
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
                {errors.description && (
                  <p className="text-sm text-planb-red font-medium">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Icon */}
              <div className="space-y-2">
                <Label htmlFor="icon">
                  İkon <span className="text-red-500">*</span>
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
                {errors.icon && (
                  <p className="text-sm text-planb-red font-medium">
                    {errors.icon}
                  </p>
                )}
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
                  disabled={createServiceMutation.isPending}
                  className="h-12 px-8 font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                >
                  {createServiceMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Oluşturuluyor...
                    </>
                  ) : (
                    <>
                      <Plus className="h-4 w-4 mr-2" />
                      Oluştur
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
