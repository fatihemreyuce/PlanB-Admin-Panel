import { fetchClient } from "@/utils/fetch-client";
import type {
  NotificationRequest,
  NotificationResponse,
} from "@/types/notifications.types";
import type { Page } from "@/types/pagination";

export const getNotifications = (page: number, size: number, sort: string) => {
  return fetchClient<void, Page<NotificationResponse>>(
    `/admin/notifications?page=${page}&size=${size}&sort=${sort}`,
    {
      method: "GET",
    }
  );
};

export const createNotification = (request: NotificationRequest) => {
  return fetchClient<NotificationRequest, NotificationResponse>(
    "/admin/notifications",
    {
      method: "POST",
      body: request,
    }
  );
};

export const updateNotification = (
  id: number,
  request: NotificationRequest
) => {
  return fetchClient<NotificationRequest, NotificationResponse>(
    `/admin/notifications/${id}`,
    {
      method: "PUT",
      body: request,
    }
  );
};

export const deleteNotification = (id: number) => {
  return fetchClient<void, void>(`/admin/notifications/${id}`, {
    method: "DELETE",
  });
};

export const getNotificationById = (id: number) => {
  return fetchClient<void, NotificationResponse>(`/admin/notifications/${id}`, {
    method: "GET",
  });
};

export const createNotificationById = (id: number) => {
  return fetchClient<void, NotificationResponse>(
    `/admin/notifications/${id}/send`,
    {
      method: "POST",
    }
  );
};
