import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTag,
  getTags,
  updateTag,
  deleteTag,
  getTagById,
} from "@/services/tags-service";
import { toast } from "sonner";
import type { TagRequest } from "@/types/tags.types";

export const useCreateTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: TagRequest) => createTag(request),
    onSuccess: () => {
      toast.success("Etiket başarıyla oluşturuldu");
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
    onError: () => {
      toast.error("Etiket oluşturulurken bir hata oluştu");
    },
  });
};

export const useTags = (
  search: string,
  page: number,
  size: number,
  sort: string
) => {
  return useQuery({
    queryKey: ["tags", search, page, size, sort],
    queryFn: () => getTags(search, page, size, sort),
  });
};

export const useTagById = (id: number) => {
  return useQuery({
    queryKey: ["tag", id],
    queryFn: () => getTagById(id),
  });
};

export const useUpdateTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, request }: { id: number; request: TagRequest }) =>
      updateTag(id, request),
    onSuccess: () => {
      toast.success("Etiket başarıyla güncellendi");
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
    onError: () => {
      toast.error("Etiket güncellenirken bir hata oluştu");
    },
  });
};

export const useDeleteTag = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteTag(id),
    onSuccess: () => {
      toast.success("Etiket başarıyla silindi");
      queryClient.invalidateQueries({ queryKey: ["tags"] });
    },
    onError: () => {
      toast.error("Etiket silinirken bir hata oluştu");
    },
  });
};
