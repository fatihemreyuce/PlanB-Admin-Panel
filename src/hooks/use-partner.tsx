import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPartner,
  getPartners,
  updatePartner,
  deletePartner,
  getPartnerById,
} from "@/services/partner-service";
import { toast } from "sonner";
import type { PartnerRequest } from "@/types/partner.types";

export const useCreatePartner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: PartnerRequest) => createPartner(request),
    onSuccess: () => {
      toast.success("Partner başarıyla oluşturuldu");
      queryClient.invalidateQueries({ queryKey: ["partners"] });
    },
    onError: () => {
      toast.error("Partner oluşturulurken bir hata oluştu");
    },
  });
};

export const usePartners = () => {
  return useQuery({
    queryKey: ["partners"],
    queryFn: () => getPartners(),
  });
};

export const useUpdatePartner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, request }: { id: number; request: PartnerRequest }) =>
      updatePartner(id, request),
    onSuccess: () => {
      toast.success("Partner başarıyla güncellendi");
      queryClient.invalidateQueries({ queryKey: ["partners"] });
    },
    onError: () => {
      toast.error("Partner güncellenirken bir hata oluştu");
    },
  });
};

export const useDeletePartner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deletePartner(id),
    onSuccess: () => {
      toast.success("Partner başarıyla silindi");
      queryClient.invalidateQueries({ queryKey: ["partners"] });
    },
    onError: () => {
      toast.error("Partner silinirken bir hata oluştu");
    },
  });
};

export const usePartnerById = (id: number) => {
  return useQuery({
    queryKey: ["partner", id],
    queryFn: () => getPartnerById(id),
  });
};
