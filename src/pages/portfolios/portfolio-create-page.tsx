import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Plus,
  Upload,
  X,
  Briefcase,
  Hash,
  Calendar as CalendarIcon,
  Link as LinkIcon,
  Bookmark,
  Check,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useCreatePortfolio } from "@/hooks/use-portfolios";
import type { PortfolioRequest, Assets } from "@/types/portfolio.types";
import {
  portfolioCreateSchema,
  type PortfolioCreateFormData,
} from "@/validations/portfolio.validation";

export default function PortfolioCreatePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [excerpt, setExcerpt] = useState("");
  const [outSourceLink, setOutSourceLink] = useState("");
  const [publishDate, setPublishDate] = useState("");
  const [assets, setAssets] = useState<{ file: File; isCovered: boolean }[]>(
    []
  );
  const [errors, setErrors] = useState<
    Partial<Record<keyof PortfolioCreateFormData, string>>
  >({});
  const [calendarOpen, setCalendarOpen] = useState(false);

  const createPortfolioMutation = useCreatePortfolio();

  const handleAddAsset = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      setErrors({ assets: "Dosya boyutu 5MB'dan büyük olamaz" });
      return;
    }
    if (
      !["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
        file.type
      )
    ) {
      setErrors({ assets: "Sadece JPG, PNG veya WEBP formatı desteklenir" });
      return;
    }
    setAssets([...assets, { file, isCovered: false }]);
    setErrors({});
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleAddAsset(file);
  };

  const handleRemoveAsset = (index: number) => {
    setAssets(assets.filter((_, i) => i !== index));
  };

  const toggleCover = (index: number) => {
    setAssets((prev) =>
      prev.map((asset, i) => ({
        ...asset,
        // Only allow one cover at a time
        isCovered: i === index ? !asset.isCovered : false,
      }))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const assetsData: Assets[] = assets.map((asset) => ({
      asset: asset.file,
      isCovered: asset.isCovered,
    }));

    const formData: PortfolioCreateFormData = {
      name,
      description,
      excerpt,
      outSourceLink: outSourceLink || "",
      publishDate,
      assets: assetsData.map((a) => ({
        asset: typeof a.asset === "string" ? a.asset : a.asset.name,
        isCovered: a.isCovered,
      })),
    };

    const result = portfolioCreateSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<
        Record<keyof PortfolioCreateFormData, string>
      > = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof PortfolioCreateFormData] =
            issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    const request: PortfolioRequest = {
      name,
      description,
      excerpt,
      outSourceLink: outSourceLink || "",
      publishDate: publishDate ? `${publishDate}T00:00:00` : "",
      assets: assetsData,
    };

    try {
      await createPortfolioMutation.mutateAsync(request);
      navigate("/portfolios");
    } catch (error) {
      console.error("Error creating portfolio:", error);
    }
  };

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-dashboard-bg-card rounded-xl shadow-lg border border-planb-grey-2 overflow-hidden">
          <div className="bg-linear-to-br from-violet-600 to-purple-600 p-8">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                <Briefcase className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Yeni Portföy
                </h1>
                <p className="text-white/90">Yeni bir portfolio ekleyin</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <Card className="shadow-lg border-planb-grey-2">
          <CardHeader>
            <CardTitle>Bilgiler</CardTitle>
            <CardDescription>Portfolio bilgilerini girin</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <Hash className="h-4 w-4 text-violet-600" />
                  İsim <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Portfolio ismini girin..."
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
                  <Hash className="h-4 w-4 text-purple-600" />
                  Özet <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="excerpt"
                  value={excerpt}
                  onChange={(e) => setExcerpt(e.target.value)}
                  placeholder="Portfolio özetini girin..."
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
                  <Hash className="h-4 w-4 text-indigo-600" />
                  Açıklama <span className="text-red-500">*</span>
                </Label>
                <textarea
                  id="description"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Portfolio açıklamasını girin..."
                  className="w-full h-32 p-3 rounded-md border-2 border-planb-grey-2 focus:border-violet-500 focus:outline-none"
                />
                {errors.description && (
                  <p className="text-sm text-planb-red font-medium">
                    {errors.description}
                  </p>
                )}
              </div>

              {/* Publish Date */}
              <div className="space-y-2">
                <Label
                  htmlFor="publishDate"
                  className="flex items-center gap-2"
                >
                  <CalendarIcon className="h-4 w-4 text-violet-600" />
                  Yayın Tarihi <span className="text-red-500">*</span>
                </Label>
                <div className="relative">
                  <Input
                    id="publishDate"
                    placeholder="gg.aa.yyyy"
                    value={
                      publishDate
                        ? new Date(publishDate).toLocaleDateString("tr-TR")
                        : ""
                    }
                    onFocus={() => setCalendarOpen(true)}
                    onClick={() => setCalendarOpen(true)}
                    readOnly
                    className="h-12 cursor-pointer bg-white! border-2! border-planb-grey-2! pr-10 focus:border-violet-500"
                  />
                  <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    <CalendarIcon className="h-4 w-4" />
                  </span>
                  {calendarOpen && (
                    <>
                      <div
                        className="fixed inset-0 z-40 bg-black/20"
                        onClick={() => setCalendarOpen(false)}
                      />
                      <div className="absolute z-50 mt-2 w-96 rounded-xl border border-planb-grey-2 bg-dashboard-bg-card shadow-2xl ring-1 ring-black/5 overflow-hidden">
                        <Calendar
                          mode="single"
                          selected={
                            publishDate ? new Date(publishDate) : undefined
                          }
                          onSelect={(date) => {
                            if (date) {
                              const yyyy = date.getFullYear();
                              const mm = String(date.getMonth() + 1).padStart(
                                2,
                                "0"
                              );
                              const dd = String(date.getDate()).padStart(
                                2,
                                "0"
                              );
                              setPublishDate(`${yyyy}-${mm}-${dd}`);
                              setCalendarOpen(false);
                            }
                          }}
                        />
                      </div>
                    </>
                  )}
                </div>
                {errors.publishDate && (
                  <p className="text-sm text-planb-red font-medium">
                    {errors.publishDate}
                  </p>
                )}
              </div>

              {/* Out Source Link */}
              <div className="space-y-2">
                <Label
                  htmlFor="outSourceLink"
                  className="flex items-center gap-2"
                >
                  <LinkIcon className="h-4 w-4 text-cyan-600" />
                  Dış Link
                </Label>
                <Input
                  id="outSourceLink"
                  value={outSourceLink}
                  onChange={(e) => setOutSourceLink(e.target.value)}
                  placeholder="https://example.com"
                  className="h-12"
                />
                {errors.outSourceLink && (
                  <p className="text-sm text-planb-red font-medium">
                    {errors.outSourceLink}
                  </p>
                )}
              </div>

              {/* Assets */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Briefcase className="h-4 w-4 text-pink-600" />
                  Resimler <span className="text-red-500">*</span>
                </Label>
                <div className="border-2 border-dashed rounded-lg p-4 border-gray-300 hover:border-gray-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                    id="asset-upload"
                  />
                  <label
                    htmlFor="asset-upload"
                    className="cursor-pointer flex flex-col items-center justify-center gap-3 p-6 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="p-3 bg-gray-200 rounded-full">
                      <Upload className="h-8 w-8 text-gray-600" />
                    </div>
                    <div className="text-center">
                      <p className="text-sm font-medium text-gray-700">
                        Resimleri sürükleyip bırakın veya tıklayın
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        PNG, JPG, GIF (Max 5MB)
                      </p>
                    </div>
                  </label>
                </div>
                {assets.length > 0 && (
                  <div className="grid grid-cols-3 gap-4 mt-4">
                    {assets.map((asset, index) => (
                      <div key={index} className="relative group">
                        <img
                          src={URL.createObjectURL(asset.file)}
                          alt={`Asset ${index + 1}`}
                          className="w-full h-32 object-cover rounded-lg"
                        />
                        <Button
                          type="button"
                          size="icon"
                          variant="destructive"
                          className="absolute top-2 right-2 h-6 w-6 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                          onClick={() => handleRemoveAsset(index)}
                        >
                          <X className="h-3 w-3" />
                        </Button>
                        <Button
                          type="button"
                          onClick={() => toggleCover(index)}
                          className={`absolute bottom-2 left-2 h-8 px-3 text-xs rounded-full shadow-sm transition-all border-2! flex items-center gap-1 ${
                            asset.isCovered
                              ? "bg-linear-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 border-green-700! text-white"
                              : "bg-white! text-dashboard-primary! border-planb-grey-2! hover:bg-planb-grey-3!"
                          }`}
                        >
                          {asset.isCovered ? (
                            <>
                              <Check className="h-3.5 w-3.5" /> Kapak
                            </>
                          ) : (
                            <>
                              <Bookmark className="h-3.5 w-3.5" /> Kapak Yap
                            </>
                          )}
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
                {errors.assets && (
                  <p className="text-sm text-planb-red font-medium">
                    {errors.assets}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4 pt-6">
                <Link to="/portfolios">
                  <Button
                    type="button"
                    className="h-12 px-8 bg-white! hover:bg-planb-grey-3! text-planb-main! border-2! border-planb-grey-2! shadow-sm hover:shadow-md transition-all font-semibold"
                  >
                    İptal
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={createPortfolioMutation.isPending}
                  className="h-12 px-8 font-semibold bg-linear-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  {createPortfolioMutation.isPending ? (
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
