import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Upload, X, Image as ImageIcon, Hash } from "lucide-react";
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
import { useCreateSlider } from "@/hooks/use-slider";
import { useTags } from "@/hooks/use-tags";
import type { SliderRequest } from "@/types/slider.types";
import {
  sliderCreateSchema,
  type SliderCreateFormData,
} from "@/validations/slider.validation";

export default function SliderCreatePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [errors, setErrors] = useState<
    Partial<Record<keyof SliderCreateFormData, string>>
  >({});
  const inputRef = useRef<HTMLInputElement>(null);

  const createSliderMutation = useCreateSlider();
  const { data: tagsData } = useTags("", 0, 1000, "id,desc");
  const tags = tagsData?.content ?? [];

  const handleFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setErrors({ image: "Dosya boyutu 5MB'dan büyük olamaz" });
      return;
    }
    if (
      !["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
        file.type
      )
    ) {
      setErrors({ image: "Sadece JPG, PNG veya WEBP formatı desteklenir" });
      return;
    }
    setImageFile(file);
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
    setImageFile(null);
    setPreview(null);
    setErrors({});
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleTagToggle = (tagId: number) => {
    setSelectedTagIds((prev) =>
      prev.includes(tagId)
        ? prev.filter((id) => id !== tagId)
        : [...prev, tagId]
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    if (!imageFile) {
      setErrors({ image: "Lütfen bir resim seçiniz" });
      return;
    }

    const formData: SliderCreateFormData = {
      name,
      description,
      excerpt,
      image: imageFile!,
      tagIds: selectedTagIds,
    };

    const result = sliderCreateSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof SliderCreateFormData, string>> =
        {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof SliderCreateFormData] =
            issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    const request: SliderRequest = {
      name,
      description,
      excerpt,
      image: imageFile!,
      tagIds: selectedTagIds,
    };

    try {
      await createSliderMutation.mutateAsync(request);
      navigate("/sliders");
    } catch (error) {
      console.error("Error creating slider:", error);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-dashboard-bg-card rounded-xl shadow-lg border border-planb-grey-2 overflow-hidden">
          <div className="bg-linear-to-br from-emerald-600 to-teal-600 p-8">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                <ImageIcon className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Yeni Slider
                </h1>
                <p className="text-white/90">Yeni bir slider ekleyin</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <Card className="shadow-lg border-planb-grey-2">
          <CardHeader>
            <CardTitle>Bilgiler</CardTitle>
            <CardDescription>Slider bilgilerini girin</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-emerald-600" />
                  İsim <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Slider ismini girin..."
                  className="h-12"
                />
                {errors.name && (
                  <p className="text-sm text-planb-red font-medium">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Excerpt */}
              <div className="space-y-2">
                <Label htmlFor="excerpt" className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-teal-600" />
                  Özet <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Slider özetini girin..."
                  className="h-12"
                />
                {errors.excerpt && (
                  <p className="text-sm text-planb-red font-medium">
                    {errors.excerpt}
                  </p>
                )}
              </div>

              {/* Description */}
              <div className="space-y-2">
                <Label
                  htmlFor="description"
                  className="flex items-center gap-2"
                >
                  <Hash className="h-4 w-4 text-cyan-600" />
                  Açıklama <span className="text-red-500">*</span>
                </Label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Slider açıklamasını girin..."
                  className="w-full h-32 p-3 rounded-md border-2 border-planb-grey-2 focus:border-emerald-500 focus:outline-none"
                />
                {errors.description && (
                  <p className="text-sm text-planb-red font-medium">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Image */}
              <div className="space-y-2">
                <Label htmlFor="image" className="flex items-center gap-2">
                  <ImageIcon className="h-4 w-4 text-emerald-600" />
                  Resim <span className="text-red-500">*</span>
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
                            Resmi sürükleyip bırakın veya tıklayın
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG, GIF (Max 5MB)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {errors.image && (
                  <p className="text-sm text-planb-red font-medium">
                    {errors.image}
                  </p>
                )}
              </div>

              {/* Tags */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-pink-600" />
                  Etiketler <span className="text-red-500">*</span>
                </Label>
                <div className="border-2 border-planb-grey-2 rounded-lg p-4 min-h-[100px] max-h-[200px] overflow-y-auto bg-planb-grey-3">
                  {tags.length === 0 ? (
                    <p className="text-sm text-dashboard-text">
                      Etiket bulunamadı
                    </p>
                  ) : (
                    <div className="flex flex-wrap gap-2">
                      {tags.map((tag) => (
                        <button
                          key={tag.id}
                          type="button"
                          onClick={() => handleTagToggle(tag.id)}
                          className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all ${
                            selectedTagIds.includes(tag.id)
                              ? "bg-linear-to-r from-pink-600 to-rose-600 text-white shadow-lg"
                              : "bg-gray-800 text-gray-200 hover:bg-gray-700"
                          }`}
                        >
                          {tag.name}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                {errors.tagIds && (
                  <p className="text-sm text-planb-red font-medium">
                    {errors.tagIds}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4 pt-6">
                <Link to="/sliders">
                  <Button
                    type="button"
                    className="h-12 px-8 bg-white! hover:bg-planb-grey-3! text-planb-main! border-2! border-planb-grey-2! shadow-sm hover:shadow-md transition-all font-semibold"
                  >
                    İptal
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={createSliderMutation.isPending}
                  className="h-12 px-8 font-semibold bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  {createSliderMutation.isPending ? (
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
