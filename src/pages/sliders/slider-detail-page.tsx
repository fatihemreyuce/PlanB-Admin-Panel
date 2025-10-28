import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  ArrowLeft,
  Image as ImageIcon,
  Hash,
  Edit,
  FileText,
} from "lucide-react";
import { useSliderById } from "@/hooks/use-slider";

export default function SliderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const sliderId = id ? parseInt(id) : 0;
  const { data: slider, isLoading } = useSliderById(sliderId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dashboard-primary"></div>
      </div>
    );
  }

  if (!slider) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Slider Bulunamadı</CardTitle>
            <CardDescription>
              Belirtilen ID'ye sahip bir slider bulunamadı.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/sliders">
              <Button>Listeye Dön</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="bg-dashboard-bg-card rounded-xl shadow-lg border border-planb-grey-2 overflow-hidden">
          <div className="bg-linear-to-br from-emerald-600 to-teal-600 p-8">
            <Link to="/sliders">
              <Button
                size="icon"
                className="mb-6 bg-white! text-black! hover:bg-gray-100!"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                {slider.image ? (
                  <img
                    src={
                      slider.image && slider.image.startsWith("http")
                        ? slider.image
                        : `/api/v1/files/${slider.image}`
                    }
                    alt={slider.name}
                    className="h-20 w-20 rounded-lg object-cover"
                  />
                ) : (
                  <ImageIcon className="h-8 w-8 text-white" />
                )}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {slider.name}
                </h1>
                <p className="text-white/90">Slider Detayları</p>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <Card className="shadow-lg border-planb-grey-2">
          <CardHeader>
            <CardTitle>Bilgiler</CardTitle>
            <CardDescription>Slider detay bilgileri</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* ID */}
            <div className="flex items-center gap-4 p-4 bg-planb-grey-3 rounded-lg">
              <div className="p-3 bg-emerald-500 rounded-lg">
                <Hash className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-dashboard-text font-medium">
                  Slider ID
                </p>
                <p className="text-lg font-semibold text-dashboard-primary">
                  {slider.id}
                </p>
              </div>
            </div>

            {/* Image */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-emerald-600" />
                Resim
              </Label>
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                {slider.image ? (
                  <img
                    src={
                      slider.image && slider.image.startsWith("http")
                        ? slider.image
                        : `/api/v1/files/${slider.image}`
                    }
                    alt={slider.name}
                    className="max-w-full max-h-64 rounded-lg object-cover"
                  />
                ) : (
                  <Badge className="bg-emerald-500 text-white">Resim yok</Badge>
                )}
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-teal-600" />
                İsim
              </Label>
              <div className="p-4 bg-teal-50 rounded-lg border border-teal-200">
                <p className="text-lg font-semibold text-dashboard-primary">
                  {slider.name}
                </p>
              </div>
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-cyan-600" />
                Özet
              </Label>
              <div className="p-4 bg-cyan-50 rounded-lg border border-cyan-200">
                <p className="text-lg font-semibold text-dashboard-primary">
                  {slider.excerpt}
                </p>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <FileText className="h-4 w-4 text-indigo-600" />
                Açıklama
              </Label>
              <div className="p-4 bg-indigo-50 rounded-lg border border-indigo-200">
                <p className="text-sm leading-relaxed text-dashboard-primary whitespace-pre-wrap">
                  {slider.description}
                </p>
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-pink-600" />
                Etiketler
              </Label>
              <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                {slider.tags && slider.tags.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {slider.tags.map((tag) => (
                      <Badge key={tag.id} className="bg-pink-600 text-white">
                        {tag.name}
                      </Badge>
                    ))}
                  </div>
                ) : (
                  <Badge className="bg-gray-100 text-gray-700">
                    Etiket yok
                  </Badge>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-4">
              <Link to="/sliders">
                <Button className="h-12 px-8 bg-white! hover:bg-planb-grey-3! text-planb-main! border-2! border-planb-grey-2! shadow-sm hover:shadow-md transition-all font-semibold">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Geri Dön
                </Button>
              </Link>
              <Link to={`/sliders/edit/${slider.id}`}>
                <Button className="h-12 px-8 bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-sm hover:shadow-lg transition-all font-semibold">
                  <Edit className="h-4 w-4 mr-2" />
                  Düzenle
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

function Label({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label
      className={`text-sm font-semibold text-dashboard-primary ${
        className || ""
      }`}
    >
      {children}
    </label>
  );
}
