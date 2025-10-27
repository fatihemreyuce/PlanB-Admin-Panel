import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  UserPlus,
  Users,
  Upload,
  X,
  Image as ImageIcon,
} from "lucide-react";
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
import { useCreateTeamMember } from "@/hooks/use-team-members";
import type { TeamMemberRequest } from "@/types/team-members.types";

export default function TeamMembersCreatePage() {
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [title, setTitle] = useState("");
  const [quote, setQuote] = useState("");
  const [linkedinUrl, setLinkedinUrl] = useState("");
  const [orderNumber, setOrderNumber] = useState(1);
  const [profilePhoto, setProfilePhoto] = useState("");
  const [profilePhotoFile, setProfilePhotoFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const createMemberMutation = useCreateTeamMember();

  const handleFile = (file: File) => {
    if (file.size > 5 * 1024 * 1024) {
      alert("Dosya boyutu 5MB'dan büyük olamaz");
      return;
    }
    setProfilePhotoFile(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
      setProfilePhoto(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
  };

  const handleRemove = () => {
    setProfilePhotoFile(null);
    setPreview(null);
    setProfilePhoto("");
    if (inputRef.current) inputRef.current.value = "";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !title.trim() || !quote.trim()) {
      setError("Lütfen tüm zorunlu alanları doldurun");
      return;
    }

    const request: TeamMemberRequest = {
      name,
      title,
      quote,
      linkedinUrl: linkedinUrl || "",
      orderNumber,
      profilePhoto: "",
    };

    try {
      await createMemberMutation.mutateAsync(request);
      navigate("/team-members");
    } catch (error) {
      console.error("Error creating team member:", error);
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
                <UserPlus className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  Yeni Takım Üyesi
                </h1>
                <p className="text-white/90">Yeni bir takım üyesi ekleyin</p>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <Card className="shadow-lg border-planb-grey-2">
          <CardHeader>
            <CardTitle>Bilgiler</CardTitle>
            <CardDescription>Takım üyesi bilgilerini girin</CardDescription>
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
                  placeholder="İsim girin..."
                  className="h-12"
                />
              </div>

              {/* Title */}
              <div className="space-y-2">
                <Label htmlFor="title">
                  Ünvan <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="title"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Ünvan girin..."
                  className="h-12"
                />
              </div>

              {/* Quote */}
              <div className="space-y-2">
                <Label htmlFor="quote">
                  Alıntı <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="quote"
                  value={quote}
                  onChange={(e) => setQuote(e.target.value)}
                  placeholder="Alıntı girin..."
                  className="h-12"
                />
              </div>

              {/* LinkedIn URL */}
              <div className="space-y-2">
                <Label htmlFor="linkedinUrl">LinkedIn URL</Label>
                <Input
                  id="linkedinUrl"
                  value={linkedinUrl}
                  onChange={(e) => setLinkedinUrl(e.target.value)}
                  placeholder="LinkedIn URL girin..."
                  className="h-12"
                />
              </div>

              {/* Order Number */}
              <div className="space-y-2">
                <Label htmlFor="orderNumber">Sıra Numarası</Label>
                <Input
                  id="orderNumber"
                  type="number"
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(parseInt(e.target.value))}
                  className="h-12"
                />
              </div>

              {/* Profile Photo */}
              <div className="space-y-2">
                <Label>Profil Fotoğrafı</Label>
                <div
                  className={`relative border-2 border-dashed rounded-lg transition-colors ${
                    isDragging
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-300 hover:border-gray-400"
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
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
                            Fotoğrafı sürükleyip bırakın veya tıklayın
                          </p>
                          <p className="text-xs text-gray-500 mt-1">
                            PNG, JPG, GIF (Max 5MB)
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                {profilePhotoFile && (
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <ImageIcon className="h-4 w-4" />
                    <span className="truncate">{profilePhotoFile.name}</span>
                    <span className="text-gray-400">
                      ({(profilePhotoFile.size / 1024).toFixed(1)} KB)
                    </span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-4 pt-4">
                <Link to="/team-members">
                  <Button
                    type="button"
                    className="h-12 px-8 bg-white! hover:bg-planb-grey-3! text-planb-main! border-2! border-planb-grey-2! shadow-sm hover:shadow-md transition-all font-semibold"
                  >
                    İptal
                  </Button>
                </Link>
                <Button
                  type="submit"
                  disabled={createMemberMutation.isPending}
                  className="h-12 px-8 font-semibold bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white"
                >
                  {createMemberMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Oluşturuluyor...
                    </>
                  ) : (
                    <>
                      <UserPlus className="h-4 w-4 mr-2" />
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
