import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useUsers, useDeleteUser } from "@/hooks/use-user";
import { Badge } from "@/components/ui/badge";
import { Empty } from "@/components/ui/empty";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  ChevronLeft,
  ChevronRight,
  Eye,
  Users,
} from "lucide-react";

export default function UserListPage() {
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState("id,desc");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState("");
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const { data, isLoading, isError } = useUsers(search, page, size, sort);
  const deleteUser = useDeleteUser();

  // Debounce for search
  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchValue);
      setPage(0);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchValue]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
  };

  const handleSizeChange = (newSize: string) => {
    setSize(Number(newSize));
    setPage(0);
  };

  const handleSortChange = (newSort: string) => {
    setSort(newSort);
    setPage(0);
  };

  const handleDeleteClick = (id: number) => {
    setSelectedUserId(id);
    setDeleteModalOpen(true);
    setDeleteConfirmText("");
  };

  const handleDelete = async () => {
    if (selectedUserId && deleteConfirmText === "dhsaıud") {
      await deleteUser.mutateAsync(selectedUserId);
      setDeleteModalOpen(false);
      setSelectedUserId(null);
      setDeleteConfirmText("");
    }
  };

  const handleDeleteModalClose = () => {
    setDeleteModalOpen(false);
    setSelectedUserId(null);
    setDeleteConfirmText("");
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full">
        <p>Yükleniyor...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-destructive">
          Kullanıcılar yüklenirken bir hata oluştu.
        </p>
      </div>
    );
  }

  const users = data?.content || [];
  const totalPages = data?.totalPages || 0;
  const totalElements = data?.totalElements ?? users.length;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-planb-main">Kullanıcılar</h1>
          <p className="text-planb-grey-1">
            Toplam {totalElements} kullanıcı bulundu
          </p>
        </div>
        <Button onClick={() => navigate("/users/create")}>
          <Plus className="h-4 w-4 mr-2" />
          Yeni Kullanıcı
        </Button>
      </div>

      <Card className="border-planb-grey-2">
        <CardHeader>
          <CardTitle className="text-planb-main">Kullanıcı Listesi</CardTitle>
          <CardDescription className="text-planb-grey-1">
            Kullanıcıları arayın, filtreleyin ve yönetin
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    type="text"
                    placeholder="Kullanıcı ara..."
                    value={searchValue}
                    onChange={handleSearch}
                    className="pl-10"
                  />
                </div>
              </div>
              <Select value={sort} onValueChange={handleSortChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Sırala" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id,desc">ID (Azalan)</SelectItem>
                  <SelectItem value="id,asc">ID (Artan)</SelectItem>
                  <SelectItem value="username,asc">
                    Kullanıcı Adı (A-Z)
                  </SelectItem>
                  <SelectItem value="username,desc">
                    Kullanıcı Adı (Z-A)
                  </SelectItem>
                  <SelectItem value="email,asc">E-posta (A-Z)</SelectItem>
                  <SelectItem value="email,desc">E-posta (Z-A)</SelectItem>
                </SelectContent>
              </Select>
              <Select value={size.toString()} onValueChange={handleSizeChange}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Sayfa boyutu" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="5">5 / Sayfa</SelectItem>
                  <SelectItem value="10">10 / Sayfa</SelectItem>
                  <SelectItem value="20">20 / Sayfa</SelectItem>
                  <SelectItem value="50">50 / Sayfa</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Table */}
            <div className="border rounded-lg">
              <table className="w-full">
                <thead>
                  <tr className="border-b bg-muted/50">
                    <th className="px-6 py-3 text-left text-sm font-medium">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium">
                      Kullanıcı Adı
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium">
                      E-posta
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium">
                      Durum
                    </th>
                    <th className="px-6 py-3 text-left text-sm font-medium">
                      Oluşturulma
                    </th>
                    <th className="px-6 py-3 text-right text-sm font-medium">
                      İşlemler
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user) => (
                    <tr
                      key={user.id}
                      className="border-b hover:bg-muted/50 transition"
                    >
                      <td className="px-6 py-4 text-sm">{user.id}</td>
                      <td className="px-6 py-4 text-sm font-medium">
                        {user.username}
                      </td>
                      <td className="px-6 py-4 text-sm">{user.email}</td>
                      <td className="px-6 py-4 text-sm">
                        <Badge variant={user.active ? "success" : "error"}>
                          {user.active ? "Aktif" : "Pasif"}
                        </Badge>
                      </td>
                      <td className="px-6 py-4 text-sm">
                        {new Date(user.createdAt).toLocaleDateString("tr-TR")}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="flex justify-end gap-2">
                          <Button
                            size="icon-sm"
                            variant="ghost"
                            onClick={() => navigate(`/users/detail/${user.id}`)}
                            className="text-white"
                            title="Detay"
                          >
                            <Eye className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon-sm"
                            variant="ghost"
                            onClick={() => navigate(`/users/edit/${user.id}`)}
                            className="text-white"
                            title="Düzenle"
                          >
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            size="icon-sm"
                            variant="ghost"
                            onClick={() => handleDeleteClick(user.id)}
                            className="hover:bg-planb-red/10"
                            title="Sil"
                          >
                            <Trash2 className="h-4 w-4 text-planb-red" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {users.length === 0 && (
              <Empty
                icon={<Users className="h-6 w-6 text-planb-grey-1" />}
                title={search ? "Kullanıcı bulunamadı" : "Henüz kullanıcı yok"}
                description={
                  search
                    ? "Arama kriterlerinize uygun kullanıcı bulunamadı. Lütfen farklı bir arama terimi deneyin."
                    : "Henüz hiç kullanıcı oluşturulmamış. İlk kullanıcıyı oluşturmak için 'Yeni Kullanıcı' butonuna tıklayın."
                }
                action={
                  !search && (
                    <Button onClick={() => navigate("/users/create")}>
                      <Plus className="h-4 w-4 mr-2" />
                      Yeni Kullanıcı Oluştur
                    </Button>
                  )
                }
              />
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between">
                <p className="text-sm text-muted-foreground">
                  Sayfa {page + 1} / {totalPages}
                </p>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(page - 1)}
                    disabled={page === 0}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handlePageChange(page + 1)}
                    disabled={page >= totalPages - 1}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Delete Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={handleDeleteModalClose}>
        <DialogContent className="border-planb-red/20 max-w-md shadow-xl">
          <DialogHeader className="pb-4 border-b border-planb-grey-2">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-planb-red/10">
                <Trash2 className="h-5 w-5 text-planb-red" />
              </div>
              <div>
                <DialogTitle className="text-planb-main text-xl font-bold">
                  Kullanıcıyı Sil
                </DialogTitle>
                <DialogDescription className="text-planb-grey-1 text-sm">
                  Bu işlem geri alınamaz
                </DialogDescription>
              </div>
            </div>
          </DialogHeader>
          <div className="py-6">
            <div className="rounded-lg bg-planb-cream/30 p-4 mb-4">
              <p className="text-sm text-planb-main font-medium mb-2">
                Silme işlemini onaylamak için aşağıya "dhsaıud" yazın
              </p>
            </div>
            <div className="space-y-2">
              <Label
                htmlFor="delete-confirm"
                className="text-planb-main text-sm font-semibold"
              >
                Onay metnini girin
              </Label>
              <Input
                id="delete-confirm"
                type="text"
                value={deleteConfirmText}
                onChange={(e) => setDeleteConfirmText(e.target.value)}
                placeholder="dhsaıud"
                className="w-full"
                autoFocus
              />
              {deleteConfirmText && deleteConfirmText !== "dhsaıud" && (
                <div className="flex items-center gap-2 text-sm text-planb-red font-medium p-2 rounded bg-planb-red/10">
                  <Trash2 className="h-4 w-4" />
                  <span>Onay metni yanlış!</span>
                </div>
              )}
            </div>
          </div>
          <DialogFooter className="gap-3 pt-4 border-t border-planb-grey-2">
            <Button
              type="button"
              variant="outline"
              onClick={handleDeleteModalClose}
              className="flex-1 border-planb-grey-2 text-white hover:bg-planb-grey-3"
            >
              İptal
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteConfirmText !== "dhsaıud"}
              className="flex-1 min-w-[120px]"
            >
              <Trash2 className="h-4 w-4 mr-2" />
              Kullanıcıyı Sil
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
