import { fetchClient } from "@/utils/fetch-client";
import type { TagRequest, TagResponse } from "@/types/tags.types";
import type { Page } from "@/types/pagination";

export const createTag = (request: TagRequest) => {
  return fetchClient<TagRequest, TagResponse>("/admin/tags", {
    method: "POST",
    body: request,
  });
};

export const getTags = (
  search: string,
  page: number,
  size: number,
  sort: string
) => {
  return fetchClient<void, Page<TagResponse>>(
    `/tags?search=${search}&page=${page}&size=${size}&sort=${sort}`,
    {
      method: "GET",
    }
  );
};

export const updateTag = (id: number, request: TagRequest) => {
  return fetchClient<TagRequest, TagResponse>(`/admin/tags/${id}`, {
    method: "PUT",
    body: request,
  });
};

export const deleteTag = (id: number) => {
  return fetchClient<void, void>(`/admin/tags/${id}`, {
    method: "DELETE",
  });
};

export const getTagById = (id: number) => {
  return fetchClient<void, TagResponse>(`/tags/${id}`, {
    method: "GET",
  });
};
