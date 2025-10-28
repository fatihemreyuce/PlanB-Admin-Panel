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
import { ArrowLeft, Users, Mail, Linkedin, Hash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useGetTeamMemberById } from "@/hooks/use-team-members";

export default function TeamMembersDetailPage() {
  const { id } = useParams<{ id: string }>();
  const memberId = id ? parseInt(id) : 0;
  const { data: member, isLoading } = useGetTeamMemberById(memberId);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dashboard-primary"></div>
      </div>
    );
  }

  if (!member) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Card>
          <CardHeader>
            <CardTitle>Üye Bulunamadı</CardTitle>
            <CardDescription>
              Belirtilen ID'ye sahip bir üye bulunamadı.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Link to="/team-members">
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
          <div className="bg-gradient-to-br from-sky-600 to-blue-600 p-8">
            <Link to="/team-members">
              <Button
                size="icon"
                className="mb-6 !bg-white !text-black hover:!bg-gray-100"
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </Link>
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-white/20 backdrop-blur-sm">
                <Avatar className="h-20 w-20">
                  <AvatarImage
                    src={
                      member.profilePhoto && member.profilePhoto.trim() !== ""
                        ? member.profilePhoto.startsWith("http")
                          ? member.profilePhoto
                          : `/api/v1/files/${member.profilePhoto}`
                        : undefined
                    }
                  />
                  <AvatarFallback className="bg-white text-sky-600 text-2xl font-bold">
                    {member.name[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">
                  {member.name}
                </h1>
                <p className="text-white/90">{member.title}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Details */}
        <Card className="shadow-lg border-planb-grey-2">
          <CardHeader>
            <CardTitle>Bilgiler</CardTitle>
            <CardDescription>Üye detay bilgileri</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* ID */}
            <div className="flex items-center gap-4 p-4 bg-planb-grey-3 rounded-lg">
              <div className="p-3 bg-sky-500 rounded-lg">
                <Hash className="h-6 w-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-dashboard-text font-medium">
                  Üye ID
                </p>
                <p className="text-lg font-semibold text-dashboard-primary">
                  {member.id}
                </p>
              </div>
            </div>

            {/* Name */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Users className="h-4 w-4 text-sky-600" />
                İsim
              </Label>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="text-lg font-semibold text-dashboard-primary">
                  {member.name}
                </p>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Users className="h-4 w-4 text-purple-600" />
                Ünvan
              </Label>
              <div className="p-4 bg-purple-50 rounded-lg border border-purple-200">
                <p className="text-lg font-semibold text-dashboard-primary">
                  {member.title}
                </p>
              </div>
            </div>

            {/* Quote */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-emerald-600" />
                Alıntı
              </Label>
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <p className="text-lg font-semibold text-dashboard-primary">
                  "{member.quote}"
                </p>
              </div>
            </div>

            {/* Order Number */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Hash className="h-4 w-4 text-amber-600" />
                Sıra Numarası
              </Label>
              <div className="p-4 bg-amber-50 rounded-lg border border-amber-200">
                <Badge className="bg-amber-500 text-white">
                  {member.orderNumber}
                </Badge>
              </div>
            </div>

            {/* LinkedIn */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Linkedin className="h-4 w-4 text-blue-600" />
                LinkedIn URL
              </Label>
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  {member.linkedinUrl}
                </a>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-4 pt-4">
              <Link to="/team-members">
                <Button className="h-12 px-8 bg-white! hover:bg-planb-grey-3! text-planb-main! border-2! border-planb-grey-2! shadow-sm hover:shadow-md transition-all font-semibold">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Geri Dön
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
