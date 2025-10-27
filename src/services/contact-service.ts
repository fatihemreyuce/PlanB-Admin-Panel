import { fetchClient } from "@/utils/fetch-client";
import type { ContactRequest, ContactResponse } from "@/types/contact.types";
import type { Page } from "@/types/pagination";

export const createContact = (request: ContactRequest) => {
  return fetchClient<ContactRequest, ContactResponse>("/contact", {
    method: "POST",
    body: request,
  });
};

export const getContacts = (page: number, size: number, sort: string) => {
  return fetchClient<void, Page<ContactResponse>>(
    `/admin/contact?page=${page}&size=${size}&sort=${sort}`,
    {
      method: "GET",
    }
  );
};

export const deleteContact = (id: number) => {
  return fetchClient<void, void>(`/admin/contact/${id}`, {
    method: "DELETE",
  });
};
