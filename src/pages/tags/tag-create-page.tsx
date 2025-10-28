import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Plus, Tags } from "lucide-react";
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
import { useCreateTag } from "@/hooks/use-tags";
import type { TagRequest } from "@/types/tags.types";
import {
  tagCreateSchema,
  type TagCreateFormData,
} from "@/validations/tag.validation";

export default function TagCreatePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [errors, setErrors] = useState<
    Partial<Record<keyof TagCreateFormData, string>>
  >({});

  const createTagMutation = useCreateTag();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const formData: TagCreateFormData = {
      name,
    };

    const result = tagCreateSchema.safeParse(formData);
    if (!result.success) {
      const fieldErrors: Partial<Record<keyof TagCreateFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        if (issue.path[0]) {
          fieldErrors[issue.path[0] as keyof TagCreateFormData] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    const request: TagRequest = {
      name,
    };

    try {
      await createTagMutation.mutateAsync(request);
      navigate("/tags");
    } catch (error) {
      console.error("Error creating tag:", error);
    }
  };

  return (
    <div className="min-h-screen bg-dashboard-bg-main p-6">
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
                  Yeni Etiket
                </h1>
                <p className="text-white/90">Yeni bir etiket ekleyin</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <Card className="shadow-lg border-planb-grey-2">
          <CardHeader>
            <CardTitle>Bilgiler</CardTitle>
            <CardDescription>Etiket bilgilerini girin</CardDescription>
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
                  disabled={createTagMutation.isPending}
                  className="h-12 px-8 font-semibold bg-linear-to-r from-pink-600 to-fuchsia-600 hover:from-pink-700 hover:to-fuchsia-700 text-white shadow-lg hover:shadow-xl transition-all"
                >
                  {createTagMutation.isPending ? (
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
