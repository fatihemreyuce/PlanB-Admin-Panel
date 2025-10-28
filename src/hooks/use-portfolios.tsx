import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createPortfolio,
  getPortfolios,
  getPortfolioById,
  updatePortfolio,
  deletePortfolio,
} from "@/services/portfolio-service";
import { toast } from "sonner";
import type { PortfolioRequest } from "@/types/portfolio.types";

export const useCreatePortfolio = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: PortfolioRequest) => createPortfolio(request),
    onSuccess: () => {
      toast.success("Portfolio başarıyla oluşturuldu");
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
    onError: () => {
      toast.error("Portfolio oluşturulurken bir hata oluştu");
    },
  });
};

export const usePortfolios = (
  search: string,
  page: number,
  size: number,
  sort: string
) => {
  return useQuery({
    queryKey: ["portfolios", search, page, size, sort],
    queryFn: () => getPortfolios(search, page, size, sort),
  });
};

export const usePortfolioById = (id: number) => {
  return useQuery({
    queryKey: ["portfolio", id],
    queryFn: () => getPortfolioById(id),
  });
};

export const useUpdatePortfolio = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, request }: { id: number; request: PortfolioRequest }) =>
      updatePortfolio(id, request),
    onSuccess: () => {
      toast.success("Portfolio başarıyla güncellendi");
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
    onError: () => {
      toast.error("Portfolio güncellenirken bir hata oluştu");
    },
  });
};

export const useDeletePortfolio = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deletePortfolio(id),
    onSuccess: () => {
      toast.success("Portfolio başarıyla silindi");
      queryClient.invalidateQueries({ queryKey: ["portfolios"] });
    },
    onError: () => {
      toast.error("Portfolio silinirken bir hata oluştu");
    },
  });
};
