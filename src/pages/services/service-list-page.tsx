import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Eye,
  Edit,
  Trash2,
  Settings,
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
import { useServices, useDeleteService } from "@/hooks/use-service";
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

export default function ServiceListPage() {
  const [searchValue, setSearchValue] = useState("");
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(10);
  const [sort, setSort] = useState("id,desc");
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [selectedServiceId, setSelectedServiceId] = useState<number | null>(
    null
  );
  const [confirmText, setConfirmText] = useState("");
  const [deleteError, setDeleteError] = useState("");

  const { data, isLoading } = useServices(search, page, size, sort);
  const deleteServiceMutation = useDeleteService();

  useEffect(() => {
    const timer = setTimeout(() => {
      setSearch(searchValue);
      setPage(0);
    }, 500);
    return () => clearTimeout(timer);
  }, [searchValue]);

  const handleDelete = async () => {
    if (!selectedService) return;

    if (confirmText !== selectedService.name) {
      setDeleteError(`Lütfen "${selectedService.name}" yazın`);
      return;
    }
    if (!selectedServiceId) return;

    await deleteServiceMutation.mutateAsync(selectedServiceId);
    setDeleteModalOpen(false);
    setSelectedServiceId(null);
    setConfirmText("");
    setDeleteError("");
  };

  const services = data?.content ?? [];
  const totalElements = data?.totalElements ?? services.length;

  // Find selected service for delete modal
  const selectedService = services.find((s) => s.id === selectedServiceId);

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          <div className="bg-linear-to-br from-sky-50 to-blue-50 rounded-lg shadow-sm border border-sky-100 overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-full bg-sky-500 shadow-sm hover:shadow-md transition-all">
                  <Settings className="h-5 w-5 text-white" />
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-600 font-medium mb-1">
                  Toplam Servis
                </p>
                <p className="text-2xl font-bold text-sky-600">
                  {totalElements}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-purple-50 to-pink-50 rounded-lg shadow-sm border border-purple-100 overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-full bg-purple-500 shadow-sm hover:shadow-md transition-all">
                  <Settings className="h-5 w-5 text-white" />
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-600 font-medium mb-1">
                  Gösterilen Servis
                </p>
                <p className="text-2xl font-bold text-purple-600">
                  {services.length}
                </p>
              </div>
            </div>
          </div>

          <div className="bg-linear-to-br from-emerald-50 to-teal-50 rounded-lg shadow-sm border border-emerald-100 overflow-hidden">
            <div className="p-4">
              <div className="flex items-center justify-between mb-3">
                <div className="p-2 rounded-full bg-emerald-500 shadow-sm hover:shadow-md transition-all">
                  <Settings className="h-5 w-5 text-white" />
                </div>
              </div>
              <div>
                <p className="text-xs text-slate-600 font-medium mb-1">
                  Aktif Servis
                </p>
                <p className="text-2xl font-bold text-emerald-600">
                  {services.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Card */}
        <div className="bg-dashboard-bg-card rounded-xl shadow-lg border border-planb-grey-2 overflow-hidden">
          {/* Header */}
          <div className="p-5 bg-linear-to-r from-[#06b6d4] to-[#14b8a6] text-white">
            <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-lg bg-white/20">
                  <Settings className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h2 className="text-2xl font-bold mb-1">Servisler</h2>
                  <p className="text-sm opacity-90">Servisleri yönetin</p>
                </div>
              </div>
              <Link to="/services/create">
                <Button
                  size="lg"
                  className="rounded-full h-10 px-5 bg-white/0! hover:bg-white/10! text-white! border border-white/40! shadow-sm"
                >
                  <Plus className="h-4 w-4 mr-2 text-white" />
                  Yeni Servis
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
                  placeholder="Servis ara..."
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
            ) : services.length === 0 ? (
              <Empty
                icon={<Settings className="h-8 w-8 text-dashboard-text" />}
                title="Servis Bulunamadı"
                description={
                  search
                    ? "Arama kriterlerinize uygun servis bulunamadı"
                    : "Henüz servis bulunmamaktadır"
                }
                action={
                  <Link to="/services/create">
                    <Button className="bg-white! hover:bg-planb-grey-3! text-planb-main! border-2! border-planb-grey-2! shadow-sm hover:shadow-md transition-all font-semibold px-6 h-11">
                      <Plus className="h-4 w-4 mr-2" />
                      Yeni Servis Ekle
                    </Button>
                  </Link>
                }
              />
            ) : (
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow className="hover:bg-transparent">
                      <TableHead className="w-[50px]">İkon</TableHead>
                      <TableHead className="font-semibold">İsim</TableHead>
                      <TableHead className="font-semibold">Açıklama</TableHead>
                      <TableHead className="font-semibold">ID</TableHead>
                      <TableHead className="text-right font-semibold">
                        İşlemler
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {services.map((service) => (
                      <TableRow
                        key={service.id}
                        className="hover:bg-planb-grey-3"
                      >
                        <TableCell className="py-3">
                          <div className="flex items-center justify-center h-10 w-10 rounded-full bg-sky-100">
                            <Settings className="h-5 w-5 text-sky-600" />
                          </div>
                        </TableCell>
                        <TableCell className="py-3">
                          <div className="font-semibold text-sm text-dashboard-primary">
                            {service.name}
                          </div>
                        </TableCell>
                        <TableCell className="py-3">
                          <div className="text-sm text-dashboard-text max-w-md truncate">
                            {service.description}
                          </div>
                        </TableCell>
                        <TableCell className="py-3">
                          <Badge className="bg-amber-100 text-amber-700 hover:bg-amber-100">
                            {service.id}
                          </Badge>
                        </TableCell>
                        <TableCell className="py-3">
                          <div className="flex items-center justify-end gap-1.5">
                            <Link to={`/services/detail/${service.id}`}>
                              <Button
                                size="icon"
                                className="h-8! w-8! bg-blue-100! hover:bg-blue-200! text-blue-600! border-0! rounded-full shadow-sm hover:shadow-md transition-all"
                              >
                                <Eye className="h-4 w-4 text-blue-600" />
                              </Button>
                            </Link>
                            <Link to={`/services/edit/${service.id}`}>
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
                                setSelectedServiceId(service.id);
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
                    Servisi Sil
                  </DialogTitle>
                  <DialogDescription className="text-sm text-dashboard-text leading-relaxed">
                    Bu işlem geri alınamaz! Lütfen silmek istediğinizden emin
                    olun.
                  </DialogDescription>
                </div>
              </div>

              {/* Warning Box */}
              {selectedService && (
                <div className="relative bg-white border-2 border-red-200 rounded-sm p-5 mb-6 shadow-sm">
                  <div className="flex items-start gap-4">
                    <div className="p-2 rounded-sm bg-red-50">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-dashboard-primary mb-1">
                        Dikkat! {selectedService.name} servisini silmek
                        üzeresiniz
                      </h3>
                      <p className="text-sm text-dashboard-text leading-relaxed mt-1.5">
                        Onaylamak için ismini yazın:{" "}
                        <span className="font-mono font-bold text-dashboard-primary bg-planb-cream px-2 py-0.5 rounded-sm">
                          {selectedService.name}
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
                  Servis İsmi
                </label>
                <Input
                  placeholder={
                    selectedService
                      ? `"${selectedService.name}" yazın`
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
                    setSelectedServiceId(null);
                    setConfirmText("");
                    setDeleteError("");
                  }}
                  className="px-8 h-11 font-semibold bg-white! hover:bg-planb-grey-3! text-planb-main! border-2! border-planb-grey-2! shadow-sm hover:shadow-md transition-all"
                >
                  İptal
                </Button>
                <Button
                  onClick={handleDelete}
                  disabled={deleteServiceMutation.isPending}
                  className="bg-linear-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-8 h-11 font-semibold shadow-lg hover:shadow-xl transition-all"
                >
                  {deleteServiceMutation.isPending ? (
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
