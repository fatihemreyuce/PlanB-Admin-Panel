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
      toast.success("Partner created successfully");
      queryClient.invalidateQueries({ queryKey: ["partners"] });
    },
    onError: () => {
      toast.error("Failed to create partner");
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
      toast.success("Partner updated successfully");
      queryClient.invalidateQueries({ queryKey: ["partners"] });
    },
    onError: () => {
      toast.error("Failed to update partner");
    },
  });
};

export const useDeletePartner = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deletePartner(id),
    onSuccess: () => {
      toast.success("Partner deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["partners"] });
    },
    onError: () => {
      toast.error("Failed to delete partner");
    },
  });
};

export const usePartnerById = (id: number) => {
  return useQuery({
    queryKey: ["partner", id],
    queryFn: () => getPartnerById(id),
  });
};
