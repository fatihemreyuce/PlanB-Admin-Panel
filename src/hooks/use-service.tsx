import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} from "@/services/service-service";
import { toast } from "sonner";
import type { ServiceRequest } from "@/types/service.types";
import { useAuthQuery } from "./use-auth-query";

export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: ServiceRequest) => createService(request),
    onSuccess: () => {
      toast.success("Servis başarıyla oluşturuldu");
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: () => {
      toast.error("Servis oluşturulurken bir hata oluştu");
    },
  });
};

export const useServices = (
  search: string,
  page: number,
  size: number,
  sort: string
) => {
  return useAuthQuery({
    queryKey: ["services", search, page, size, sort],
    queryFn: () => getServices(search, page, size, sort),
  });
};

export const useServiceById = (id: number) => {
  return useAuthQuery({
    queryKey: ["service", id],
    queryFn: () => getServiceById(id),
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, request }: { id: number; request: ServiceRequest }) =>
      updateService(id, request),
    onSuccess: () => {
      toast.success("Servis başarıyla güncellendi");
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: () => {
      toast.error("Servis güncellenirken bir hata oluştu");
    },
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteService(id),
    onSuccess: () => {
      toast.success("Servis başarıyla silindi");
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: () => {
      toast.error("Servis silinirken bir hata oluştu");
    },
  });
};
