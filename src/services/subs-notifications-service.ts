import { fetchClient } from "@/utils/fetch-client";
import type {
  SubsNotificationRequest,
  SubsNotificationResponse,
} from "@/types/subs-notifications.types";
import type { Page } from "@/types/pagination";

export const createSubsNotification = (request: SubsNotificationRequest) => {
  return fetchClient<SubsNotificationRequest, SubsNotificationResponse>(
    "/notification-subscribers",
    {
      method: "POST",
      body: request,
    }
  );
};

export const getSubsNotifications = (
  page: number,
  size: number,
  sort: string
) => {
  return fetchClient<void, Page<SubsNotificationResponse>>(
    `/admin/notification-subscribers?page=${page}&size=${size}&sort=${sort}`,
    {
      method: "GET",
    }
  );
};

export const deleteSubsNotification = (id: number) => {
  return fetchClient<void, void>(`/admin/notification-subscribers/${id}`, {
    method: "DELETE",
  });
};
