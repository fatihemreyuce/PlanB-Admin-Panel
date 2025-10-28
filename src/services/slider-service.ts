import { fetchClient } from "@/utils/fetch-client";
import type { SliderRequest, SliderResponse } from "@/types/slider.types";
import type { Page } from "@/types/pagination";

export const createSlider = (request: SliderRequest) => {
  return fetchClient<SliderRequest, SliderResponse>("/admin/sliders", {
    method: "POST",
    body: request,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getSliders = (page: number, size: number, sort: string) => {
  return fetchClient<void, Page<SliderResponse>>(
    `/sliders?page=${page}&size=${size}&sort=${sort}`,
    {
      method: "GET",
    }
  );
};

export const getSliderById = (id: number) => {
  return fetchClient<void, SliderResponse>(`/sliders/${id}`, {
    method: "GET",
  });
};

export const updateSlider = (id: number, request: SliderRequest) => {
  return fetchClient<SliderRequest, SliderResponse>(`/admin/sliders/${id}`, {
    method: "PUT",
    body: request,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteSlider = (id: number) => {
  return fetchClient<void, void>(`/admin/sliders/${id}`, {
    method: "DELETE",
  });
};
