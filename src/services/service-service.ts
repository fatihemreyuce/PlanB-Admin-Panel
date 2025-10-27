import { fetchClient } from "@/utils/fetch-client";
import type { ServiceRequest, ServiceResponse } from "@/types/service.types";
import type { Page } from "@/types/pagination";

export const createService = (request: ServiceRequest) => {
  return fetchClient<ServiceRequest, ServiceResponse>("/admin/services", {
    method: "POST",
    body: request,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getServices = (
  search: string,
  page: number,
  size: number,
  sort: string
) => {
  return fetchClient<void, Page<ServiceResponse>>(
    `/services?search=${search}&page=${page}&size=${size}&sort=${sort}`,
    {
      method: "GET",
    }
  );
};

export const getServiceById = (id: number) => {
  return fetchClient<void, ServiceResponse>(`/services/${id}`, {
    method: "GET",
  });
};

export const updateService = (id: number, request: ServiceRequest) => {
  return fetchClient<ServiceRequest, ServiceResponse>(`/admin/services/${id}`, {
    method: "PUT",
    body: request,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteService = (id: number) => {
  return fetchClient<void, void>(`/admin/services/${id}`, {
    method: "DELETE",
  });
};
