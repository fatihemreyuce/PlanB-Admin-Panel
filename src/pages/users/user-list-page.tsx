import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Mail,
  User,
  XCircle,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useUsers, useDeleteUser } from "@/hooks/use-user";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Empty } from "@/components/ui/empty";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function UserListPage() {
  const [searchValue, setSearchValue] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState("id,desc");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const [confirmText, setConfirmText] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const { data, isLoading } = useUsers(search, page, size, sort);
  const deleteUserMutation = useDeleteUser();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchValue);
      setPage(0);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchValue]);

  const handleDelete = async () => {
    if (!selectedUser) return;

    if (confirmText !== selectedUser.username) {
      setDeleteError(`Lütfen "${selectedUser.username}" yazın`);
      return;
    }
    if (!selectedUserId) return;

    await deleteUserMutation.mutateAsync(selectedUserId);
    setDeleteModalOpen(false);
    setSelectedUserId(null);
    setConfirmText("");
    setDeleteError("");
  };

  const users = data?.content ?? [];
  const totalElements = data?.totalElements ?? users.length;
  const totalPages =
    data?.totalPages ??
    (totalElements > 0 ? Math.ceil(totalElements / size) : 0);

  // Find selected user for delete modal
  const selectedUser = users.find((u) => u.id === selectedUserId);

  return (
    <div className="min-h-screen bg-planb-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white rounded-xl shadow-sm border border-planb-grey-2 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-planb-grey-1 font-medium mb-1">
                  Toplam Kullanıcı
                </p>
                <p className="text-2xl font-bold text-planb-main">
                  {totalElements}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-planb-cream">
                <User className="h-6 w-6 text-planb-orange" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-planb-grey-2 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-planb-grey-1 font-medium mb-1">
                  Aktif Kullanıcı
                </p>
                <p className="text-2xl font-bold text-planb-green">
                  {users.filter((u) => u.active).length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-green-50">
                <User className="h-6 w-6 text-planb-green" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-planb-grey-2 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-planb-grey-1 font-medium mb-1">
                  Pasif Kullanıcı
                </p>
                <p className="text-2xl font-bold text-planb-chocolate">
                  {users.filter((u) => !u.active).length}
                </p>
              </div>
              <div className="p-3 rounded-lg bg-orange-50">
                <User className="h-6 w-6 text-planb-chocolate" />
              </div>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-xl shadow-sm border border-planb-grey-2">
          {/* Header */}
          <div className="p-6 border-b border-planb-grey-2">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold text-planb-main">
                  Kullanıcılar
                </h2>
                <p className="text-sm text-planb-grey-1 mt-1">
                  Sistem kullanıcılarını yönetin
                </p>
              </div>
              <Link to="/users/create">
                <Button
                  size="lg"
                  className="bg-planb-main hover:bg-planb-chocolate text-white"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Yeni Kullanıcı
                </Button>
              </Link>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="p-6 border-b border-planb-grey-2">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-planb-grey-1" />
                <Input
                  placeholder="Kullanıcı ara..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pl-10 h-10"
                />
              </div>
              <Select
                value={size.toString()}
                onValueChange={(value) => {
                  setSize(parseInt(value));
                  setPage(0);
                }}
              >
                <SelectTrigger className="w-full md:w-40 h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 / sayfa</SelectItem>
                  <SelectItem value="20">20 / sayfa</SelectItem>
                  <SelectItem value="50">50 / sayfa</SelectItem>
                  <SelectItem value="100">100 / sayfa</SelectItem>
                </SelectContent>
              </Select>
              <Select value={sort} onValueChange={(value) => setSort(value)}>
                <SelectTrigger className="w-full md:w-40 h-10">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id,desc">En Yeni</SelectItem>
                  <SelectItem value="id,asc">En Eski</SelectItem>
                  <SelectItem value="username,asc">İsim (A-Z)</SelectItem>
                  <SelectItem value="username,desc">İsim (Z-A)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-planb-main"></div>
              </div>
            ) : users.length === 0 ? (
              <Empty
                icon={<Search className="h-8 w-8 text-planb-grey-1" />}
                title="Kullanıcı Bulunamadı"
                description="Arama kriterlerinize uygun kullanıcı bulunamadı"
                action={
                  <Link to="/users/create">
                    <Button>
                      <Plus className="h-4 w-4 mr-2" />
                      Yeni Kullanıcı Ekle
                    </Button>
                  </Link>
                }
              />
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-[50px]">Avatar</TableHead>
                      <TableHead className="font-semibold">
                        Kullanıcı Adı
                      </TableHead>
                      <TableHead className="font-semibold">Email</TableHead>
                      <TableHead className="font-semibold">Durum</TableHead>
                      <TableHead className="font-semibold">
                        Oluşturulma
                      </TableHead>
                      <TableHead className="text-right font-semibold">
                        İşlemler
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {users.map((user) => (
                      <TableRow key={user.id} className="hover:bg-planb-grey-3">
                        <TableCell>
                          <Avatar className="h-12 w-12">
                            <AvatarFallback className="bg-planb-orange text-white text-sm font-semibold">
                              {user.username[0].toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        </TableCell>
                        <TableCell>
                          <div className="font-semibold text-planb-main">
                            {user.username}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2 text-sm text-planb-grey-1">
                            <Mail className="h-3 w-3" />
                            <span>{user.email}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={user.active ? "default" : "secondary"}
                            className={
                              user.active
                                ? "bg-green-100 text-green-700 hover:bg-green-100"
                                : ""
                            }
                          >
                            {user.active ? "Aktif" : "Pasif"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="text-sm text-planb-grey-1">
                            {new Date(user.createdAt).toLocaleDateString(
                              "tr-TR"
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center justify-end gap-2">
                            <Link to={`/users/detail/${user.id}`}>
                              <Button
                                size="icon"
                                className="!h-8 !w-8 !bg-white hover:!bg-gray-100 !text-blue-600 !border-0"
                              >
                                <Eye className="h-4 w-4 text-blue-600" />
                              </Button>
                            </Link>
                            <Link to={`/users/edit/${user.id}`}>
                              <Button
                                size="icon"
                                className="!h-8 !w-8 !bg-white hover:!bg-gray-100 !text-blue-600 !border-0"
                              >
                                <Edit className="h-4 w-4 text-blue-600" />
                              </Button>
                            </Link>
                            <Button
                              size="icon"
                              onClick={() => {
                                setSelectedUserId(user.id);
                                setDeleteModalOpen(true);
                              }}
                              className="!h-8 !w-8 !bg-white hover:!bg-gray-100 !text-red-600 !border-0"
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="p-6 border-t border-planb-grey-2">
              <div className="flex items-center justify-between">
                <p className="text-sm text-planb-grey-1">
                  Sayfa {page + 1} / {totalPages} • Toplam {totalElements} kayıt
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page - 1)}
                    disabled={page === 0}
                  >
                    Önceki
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setPage(page + 1)}
                    disabled={page >= totalPages - 1}
                  >
                    Sonraki
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Delete Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="bg-white max-w-lg p-0 border-0 shadow-2xl">
          <div className="relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-gradient-to-br from-red-50 via-white to-orange-50 opacity-50"></div>

            <div className="relative p-8">
              {/* Header with Icon */}
              <div className="flex items-start gap-4 mb-8">
                <div className="p-4 rounded-2xl bg-gradient-to-br from-red-500 to-orange-500 shadow-lg">
                  <Trash2 className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1">
                  <DialogTitle className="text-2xl font-bold text-planb-main mb-2">
                    Kullanıcıyı Sil
                  </DialogTitle>
                  <DialogDescription className="text-sm text-planb-grey-1 leading-relaxed">
                    Bu işlem geri alınamaz! Lütfen silmek istediğinizden emin
                    olun.
                  </DialogDescription>
                </div>
              </div>

              {/* Warning Box */}
              {selectedUser && (
                <div className="relative bg-white border-2 border-red-200 rounded-2xl p-5 mb-8 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-xl bg-red-50">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-planb-main mb-1">
                        Dikkat! {selectedUser.username} kullanıcısını silmek
                        üzeresiniz
                      </h3>
                      <p className="text-sm text-planb-grey-1 leading-relaxed mt-2">
                        Onaylamak için kullanıcı adını yazın:{" "}
                        <span className="font-mono font-bold text-planb-main bg-planb-cream px-2 py-0.5 rounded">
                          {selectedUser.username}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Input Section */}
              <div className="space-y-3 mb-8">
                <label className="text-sm font-bold text-planb-main flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-planb-red"></div>
                  Kullanıcı Adı
                </label>
                <Input
                  placeholder={
                    selectedUser
                      ? `"${selectedUser.username}" yazın`
                      : "Kullanıcı adını girin..."
                  }
                  value={confirmText}
                  onChange={(e) => {
                    setConfirmText(e.target.value);
                    setDeleteError("");
                  }}
                  className="h-12 text-base border-2 focus:border-planb-red"
                />
                {deleteError && (
                  <div className="flex items-center gap-2 text-sm text-planb-red bg-red-50 p-3 rounded-xl">
                    <XCircle className="h-4 w-4 shrink-0" />
                    <span className="font-medium">{deleteError}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-6 border-t-2 border-planb-grey-2">
                <Button
                  variant="outline"
                  onClick={() => {
                    setDeleteModalOpen(false);
                    setSelectedUserId(null);
                    setConfirmText("");
                    setDeleteError("");
                  }}
                  className="px-8 h-11 font-semibold text-white"
                >
                  İptal
                </Button>
                <Button
                  onClick={handleDelete}
                  disabled={deleteUserMutation.isPending}
                  className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-8 h-11 font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  {deleteUserMutation.isPending ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                      Siliniyor...
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4 mr-2" />
                      Sil
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
