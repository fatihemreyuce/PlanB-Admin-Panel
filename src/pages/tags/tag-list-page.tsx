import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Tags,
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
import { useTags, useDeleteTag } from "@/hooks/use-tags";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Empty } from "@/components/ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function TagListPage() {
  const [searchValue, setSearchValue] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState("id,desc");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedTagId, setSelectedTagId] = useState<number | null>(null);
  const [confirmText, setConfirmText] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const { data, isLoading } = useTags(search, page, size, sort);
  const deleteTagMutation = useDeleteTag();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchValue);
      setPage(0);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchValue]);

  const handleDelete = async () => {
    if (!selectedTag) return;

    if (confirmText !== selectedTag.name) {
      setDeleteError(`Lütfen "${selectedTag.name}" yazın`);
      return;
    }
    if (!selectedTagId) return;

    await deleteTagMutation.mutateAsync(selectedTagId);
    setDeleteModalOpen(false);
    setSelectedTagId(null);
    setConfirmText("");
    setDeleteError("");
  };

  const tags = data?.content ?? [];
  const totalElements = data?.totalElements ?? tags.length;

  // Find selected tag for delete modal
  const selectedTag = tags.find((t) => t.id === selectedTagId);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-linear-to-br from-pink-50 to-rose-50 rounded-lg shadow-sm border border-pink-100 overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-full bg-pink-500 shadow-sm hover:shadow-md transition-all">
                  <Tags className="h-5 w-5 text-white" />
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-600 font-medium mb-1">
                  Toplam Etiket
                </p>
                <p className="text-2xl font-bold text-pink-600">
                  {totalElements}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-fuchsia-50 to-purple-50 rounded-lg shadow-sm border border-fuchsia-100 overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-full bg-fuchsia-500 shadow-sm hover:shadow-md transition-all">
                  <Tags className="h-5 w-5 text-white" />
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-600 font-medium mb-1">
                  Gösterilen Etiket
                </p>
                <p className="text-2xl font-bold text-fuchsia-600">
                  {tags.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-rose-50 to-pink-50 rounded-lg shadow-sm border border-rose-100 overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-full bg-rose-500 shadow-sm hover:shadow-md transition-all">
                  <Tags className="h-5 w-5 text-white" />
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-600 font-medium mb-1">
                  Aktif Etiket
                </p>
                <p className="text-2xl font-bold text-rose-600">
                  {tags.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-dashboard-bg-card rounded-xl shadow-lg border border-planb-grey-2 overflow-hidden">
          {/* Header */}
          <div className="bg-linear-to-br from-pink-600 to-fuchsia-600 p-5">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-white/20 backdrop-blur-sm">
                  <Tags className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white mb-1">
                    Etiketler
                  </h2>
                  <p className="text-sm text-white/90">Etiketleri yönetin</p>
                </div>
              </div>
              <Link to="/tags/create">
                <Button
                  size="lg"
                  className="bg-white/20! hover:bg-white/30! text-white! backdrop-blur-sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Yeni Etiket
                </Button>
              </Link>
            </div>
          </div>

          {/* Search and Filters */}
          <div className="p-4 border-b border-planb-grey-2">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-dashboard-text" />
                <Input
                  placeholder="Etiket ara..."
                  value={searchValue}
                  onChange={(e) => setSearchValue(e.target.value)}
                  className="pl-10 h-10 bg-dashboard-input"
                />
              </div>
              <Select
                value={size.toString()}
                onValueChange={(value) => {
                  setSize(parseInt(value));
                  setPage(0);
                }}
              >
                <SelectTrigger className="w-full md:w-40 h-10 border-0! bg-white! text-dashboard-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="10">10 / sayfa</SelectItem>
                  <SelectItem value="20">20 / sayfa</SelectItem>
                  <SelectItem value="50">50 / sayfa</SelectItem>
                  <SelectItem value="100">100 / sayfa</SelectItem>
                </SelectContent>
              </Select>
              <Select
                value={sort}
                onValueChange={(value) => {
                  setSort(value);
                  setPage(0);
                }}
              >
                <SelectTrigger className="w-full md:w-40 h-10 border-0! bg-white! text-dashboard-primary">
                  <SelectValue placeholder="Sıralama seçin" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="id,desc">En Yeni</SelectItem>
                  <SelectItem value="id,asc">En Eski</SelectItem>
                  <SelectItem value="name,asc">İsim (A-Z)</SelectItem>
                  <SelectItem value="name,desc">İsim (Z-A)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Content */}
          <div className="p-4">
            {isLoading ? (
              <div className="flex items-center justify-center py-20">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-dashboard-primary"></div>
              </div>
            ) : tags.length === 0 ? (
              <Empty
                icon={<Tags className="h-8 w-8 text-dashboard-text" />}
                title="Etiket Bulunamadı"
                description={
                  search
                    ? "Arama kriterlerinize uygun etiket bulunamadı"
                    : "Henüz etiket bulunmamaktadır"
                }
                action={
                  <Link to="/tags/create">
                    <Button className="bg-white! hover:bg-planb-grey-3! text-planb-main! border-2! border-planb-grey-2! shadow-sm hover:shadow-md transition-all font-semibold px-6 h-11">
                      <Plus className="h-4 w-4 mr-2" />
                      Yeni Etiket Ekle
                    </Button>
                  </Link>
                }
              />
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="font-semibold">İsim</TableHead>
                      <TableHead className="font-semibold">ID</TableHead>
                      <TableHead className="text-right font-semibold">
                        İşlemler
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {tags.map((tag) => (
                      <TableRow key={tag.id} className="hover:bg-planb-grey-3">
                        <TableCell className="py-3">
                          <div className="font-semibold text-sm text-dashboard-primary">
                            {tag.name}
                          </div>
                        </TableCell>
                        <TableCell className="py-3">
                          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                            {tag.id}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-3">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link to={`/tags/detail/${tag.id}`}>
                              <Button
                                size="icon"
                                className="h-8! w-8! bg-blue-100! hover:bg-blue-200! text-blue-600! border-0! rounded-full shadow-sm hover:shadow-md transition-all"
                              >
                                <Eye className="h-4 w-4 text-blue-600" />
                              </Button>
                            </Link>
                            <Link to={`/tags/edit/${tag.id}`}>
                              <Button
                                size="icon"
                                className="h-8! w-8! bg-emerald-100! hover:bg-emerald-200! text-emerald-600! border-0! rounded-full shadow-sm hover:shadow-md transition-all"
                              >
                                <Edit className="h-4 w-4 text-emerald-600" />
                              </Button>
                            </Link>
                            <Button
                              size="icon"
                              onClick={() => {
                                setSelectedTagId(tag.id);
                                setDeleteModalOpen(true);
                              }}
                              className="h-8! w-8! bg-red-100! hover:bg-red-200! text-planb-red! border-0! rounded-full shadow-sm hover:shadow-md transition-all"
                            >
                              <Trash2 className="h-4 w-4 text-planb-red" />
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
        </div>
      </div>

      {/* Delete Modal */}
      <Dialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
        <DialogContent className="bg-white max-w-lg p-0 border-0 shadow-2xl">
          <div className="relative overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 bg-red-50 opacity-50"></div>

            <div className="relative p-8">
              {/* Header with Icon */}
              <div className="flex items-start gap-4 mb-6">
                <div className="p-4 rounded-sm bg-planb-red shadow-lg">
                  <Trash2 className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1">
                  <DialogTitle className="text-2xl font-bold text-dashboard-primary mb-1.5">
                    Etiketi Sil
                  </DialogTitle>
                  <DialogDescription className="text-sm text-dashboard-text leading-relaxed">
                    Bu işlem geri alınamaz! Lütfen silmek istediğinizden emin
                    olun.
                  </DialogDescription>
                </div>
              </div>

              {/* Warning Box */}
              {selectedTag && (
                <div className="relative bg-white border-2 border-red-200 rounded-sm p-5 mb-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-sm bg-red-50">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-dashboard-primary mb-1">
                        Dikkat! {selectedTag.name} etiketini silmek üzeresiniz
                      </h3>
                      <p className="text-sm text-dashboard-text leading-relaxed mt-1.5">
                        Onaylamak için ismini yazın:{" "}
                        <span className="font-mono font-bold text-dashboard-primary bg-planb-cream px-2 py-0.5 rounded-sm">
                          {selectedTag.name}
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Input Section */}
              <div className="space-y-2 mb-6">
                <label className="text-sm font-bold text-dashboard-primary flex items-center gap-2 mb-1">
                  <div className="w-1.5 h-1.5 rounded-full bg-planb-red"></div>
                  Etiket İsmi
                </label>
                <Input
                  placeholder={
                    selectedTag
                      ? `"${selectedTag.name}" yazın`
                      : "İsmi girin..."
                  }
                  value={confirmText}
                  onChange={(e) => {
                    setConfirmText(e.target.value);
                    setDeleteError("");
                  }}
                  className="h-12 text-base border-2 focus:border-planb-red"
                />
                {deleteError && (
                  <div className="flex items-center gap-2 text-sm text-planb-red bg-red-50 p-3 rounded-sm">
                    <XCircle className="h-4 w-4 shrink-0" />
                    <span className="font-medium">{deleteError}</span>
                  </div>
                )}
              </div>

              {/* Actions */}
              <div className="flex justify-end gap-3 pt-4 border-t-2 border-planb-grey-2">
                <Button
                  onClick={() => {
                    setDeleteModalOpen(false);
                    setSelectedTagId(null);
                    setConfirmText("");
                    setDeleteError("");
                  }}
                  className="px-8 h-11 font-semibold bg-white! hover:bg-planb-grey-3! text-planb-main! border-2! border-planb-grey-2! shadow-sm hover:shadow-md transition-all"
                >
                  İptal
                </Button>
                <Button
                  onClick={handleDelete}
                  disabled={deleteTagMutation.isPending}
                  className="bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-8 h-11 font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  {deleteTagMutation.isPending ? (
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
