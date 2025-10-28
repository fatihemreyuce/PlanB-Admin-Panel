import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowLeft, Tags, Hash, Edit } from "lucide-react";
import { useTagById } from "@/hooks/use-tags";

export default function TagDetailPage() {
  const { id } = useParams<{ id: string }>();
  const tagId = id ? parseInt(id) : 0;
  const { data: tag, isLoading } = useTagById(tagId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dashboard-primary"></div>
      </div>
    );
  }

  if (!tag) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Etiket Bulunamadı</CardTitle>
            <CardDescription>
              Belirtilen ID'ye sahip bir etiket bulunamadı.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/tags">
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
          <div className="bg-linear-to-br from-pink-600 to-fuchsia-600 p-8">
            <Link to="/tags">
              <Button
                size="icon"
                className="mb-6 bg-white! text-black! hover:bg-gray-100!"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                <Tags className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {tag.name}
                </h1>
                <p className="text-white/90">Etiket Detayları</p>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <Card className="shadow-lg border-planb-grey-2">
          <CardHeader>
            <CardTitle>Bilgiler</CardTitle>
            <CardDescription>Etiket detay bilgileri</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* ID */}
            <div className="flex items-center gap-4 p-4 bg-planb-grey-3 rounded-lg">
              <div className="p-3 bg-pink-500 rounded-lg">
                <Hash className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-dashboard-text font-medium">
                  Etiket ID
                </p>
                <p className="text-lg font-semibold text-dashboard-primary">
                  {tag.id}
                </p>
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Tags className="h-4 w-4 text-pink-600" />
                İsim
              </Label>
              <div className="p-4 bg-pink-50 rounded-lg border border-pink-200">
                <p className="text-lg font-semibold text-dashboard-primary">
                  {tag.name}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-4">
              <Link to="/tags">
                <Button className="h-12 px-8 bg-white! hover:bg-planb-grey-3! text-planb-main! border-2! border-planb-grey-2! shadow-sm hover:shadow-md transition-all font-semibold">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Geri Dön
                </Button>
              </Link>
              <Link to={`/tags/edit/${tag.id}`}>
                <Button className="h-12 px-8 bg-linear-to-r from-pink-600 to-fuchsia-600 hover:from-pink-700 hover:to-fuchsia-700 text-white shadow-sm hover:shadow-lg transition-all font-semibold">
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
