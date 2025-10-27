import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getNotifications,
  createNotification,
  updateNotification,
  deleteNotification,
  getNotificationById,
  createNotificationById,
} from "@/services/notifications-service";
import type { NotificationRequest } from "@/types/notifications.types";
import { toast } from "sonner";

export const useNotifications = (page: number, size: number, sort: string) => {
  return useQuery({
    queryKey: ["notifications", page, size, sort],
    queryFn: () => getNotifications(page, size, sort),
  });
};

export const useGetNotificationById = (id: number) => {
  return useQuery({
    queryKey: ["notification", id],
    queryFn: () => getNotificationById(id),
  });
};

export const useCreateNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: NotificationRequest) => createNotification(request),
    onSuccess: () => {
      toast.success("Notification created successfully");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: () => {
      toast.error("Failed to create notification");
    },
  });
};

export const useCreateNotificationById = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => createNotificationById(id),
    onSuccess: () => {
      toast.success("Notification created successfully");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: () => {
      toast.error("Failed to create notification");
    },
  });
};

export const useUpdateNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      id,
      request,
    }: {
      id: number;
      request: NotificationRequest;
    }) => updateNotification(id, request),
    onSuccess: () => {
      toast.success("Notification updated successfully");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: () => {
      toast.error("Failed to update notification");
    },
  });
};

export const useDeleteNotification = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteNotification(id),
    onSuccess: () => {
      toast.success("Notification deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
    onError: () => {
      toast.error("Failed to delete notification");
    },
  });
};
