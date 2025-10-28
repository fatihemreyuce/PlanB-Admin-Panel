import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getSubsNotifications,
  deleteSubsNotification,
  createSubsNotification,
} from "@/services/subs-notifications-service";
import { toast } from "sonner";
import type { SubsNotificationRequest } from "@/types/subs-notifications.types";
import { useAuthQuery } from "./use-auth-query";

export const useCreateNotificationSub = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: SubsNotificationRequest) =>
      createSubsNotification(request),
    onSuccess: () => {
      toast.success("Bildirim aboneliği başarıyla oluşturuldu");
      queryClient.invalidateQueries({ queryKey: ["notification-subs"] });
    },
    onError: () => {
      toast.error("Bildirim aboneliği oluşturulurken bir hata oluştu");
    },
  });
};

export const useGetNotificationSubs = (
  page: number,
  size: number,
  sort: string
) => {
  return useAuthQuery({
    queryKey: ["notification-subs", page, size, sort],
    queryFn: () => getSubsNotifications(page, size, sort),
  });
};

export const useDeleteNotificationSub = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteSubsNotification(id),
    onSuccess: () => {
      toast.success("Bildirim aboneliği başarıyla silindi");
      queryClient.invalidateQueries({ queryKey: ["notification-subs"] });
    },
    onError: () => {
      toast.error("Bildirim aboneliği silinirken bir hata oluştu");
    },
  });
};
