import { fetchClient } from "@/utils/fetch-client";
import type { SettingsRequest, SettingsResponse } from "@/types/settings.types";

export const getSettings = () => {
  return fetchClient<void, SettingsResponse>("/settings", {
    method: "GET",
  });
};

export const updateSettings = (id: number, request: SettingsRequest) => {
  return fetchClient<SettingsRequest, SettingsResponse>(
    `/admin/settings/${id}`,
    {
      method: "PUT",
      body: request,
    }
  );
};
