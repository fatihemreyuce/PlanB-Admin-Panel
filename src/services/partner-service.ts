import { fetchClient } from "@/utils/fetch-client";
import type { PartnerRequest, PartnerResponse } from "@/types/partner.types";

export const createPartner = (request: PartnerRequest) => {
  return fetchClient<PartnerRequest, PartnerResponse>("/admin/partners", {
    method: "POST",
    body: request,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const getPartners = () => {
  return fetchClient<void, PartnerResponse[]>("/partners", {
    method: "GET",
  });
};

export const updatePartner = (id: number, request: PartnerRequest) => {
  return fetchClient<PartnerRequest, PartnerResponse>(`/admin/partners/${id}`, {
    method: "PUT",
    body: request,
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deletePartner = (id: number) => {
  return fetchClient<void, void>(`/admin/partners/${id}`, {
    method: "DELETE",
  });
};

export const getPartnerById = (id: number) => {
  return fetchClient<void, PartnerResponse>(`/partners/${id}`, {
    method: "GET",
  });
};
