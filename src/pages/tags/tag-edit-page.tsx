import { useState, useEffect } from "react";
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
import { useTagById, useUpdateTag } from "@/hooks/use-tags";
import { Tags } from "lucide-react";
import type { TagRequest } from "@/types/tags.types";
import {
  tagUpdateSchema,
  type TagUpdateFormData,
} from "@/validations/tag.validation";

export default function TagEditPage() {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const tagId = id ? parseInt(id) : 0;

  const { data: tag, isLoading } = useTagById(tagId);
  const updateTagMutation = useUpdateTag();

  const [name, setName] = useState("");
  const [errors, setErrors] = useState<
    Partial<Record<keyof TagUpdateFormData, string>>
  >({});

  useEffect(() => {
    if (tag) {
      setName(tag.name);
    }
  }, [tag]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const formData: TagUpdateFormData = {
      name,
    };

    const result = tagUpdateSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof TagUpdateFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof TagUpdateFormData] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    const request: TagRequest = {
      name,
    };

    try {
      await updateTagMutation.mutateAsync({ id: tagId, request });
      navigate("/tags");
    } catch (error) {
      console.error("Error updating tag:", error);
    }
  };

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
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                <Tags className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Etiketi Düzenle
                </h1>
                <p className="text-white/90">{tag.name}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <Card className="shadow-lg border-planb-grey-2">
          <CardHeader>
            <CardTitle>Bilgiler</CardTitle>
            <CardDescription>Etiket bilgilerini düzenleyin</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center gap-2">
                  <Tags className="h-4 w-4 text-pink-600" />
                  İsim <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Etiket ismini girin..."
                  className="h-12"
                />
                {errors.name && (
                  <p className="text-sm text-planb-red font-medium">
                    {errors.name}
                  </p>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4 pt-6">
                <Link to="/tags">
                  <Button
                    type="button"
                    className="h-12 px-8 bg-white! hover:bg-planb-grey-3! text-planb-main! border-2! border-planb-grey-2! shadow-sm hover:shadow-md transition-all font-semibold"
                  >
                    İptal
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={updateTagMutation.isPending}
                  className="h-12 px-8 font-semibold bg-linear-to-r from-pink-600 to-fuchsia-600 hover:from-pink-700 hover:to-fuchsia-700 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  {updateTagMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Güncelleniyor...
                    </>
                  ) : (
                    <>
                      <Tags className="h-4 w-4 mr-2" />
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
