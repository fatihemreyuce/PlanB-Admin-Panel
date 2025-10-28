import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getSettings, updateSettings } from "@/services/settings-service";
import { toast } from "sonner";
import type { SettingsRequest } from "@/types/settings.types";

export const useSettings = () => {
  return useQuery({
    queryKey: ["settings"],
    queryFn: () => getSettings(),
  });
};

export const useUpdateSettings = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, request }: { id: number; request: SettingsRequest }) =>
      updateSettings(id, request),
    onSuccess: () => {
      toast.success("Ayarlar başarıyla güncellendi");
      queryClient.invalidateQueries({ queryKey: ["settings"] });
    },
    onError: () => {
      toast.error("Ayarlar güncellenirken bir hata oluştu");
    },
  });
};
