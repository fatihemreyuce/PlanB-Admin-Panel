import { fetchClient } from "@/utils/fetch-client";
import type { UserRequest, UserResponse } from "@/types/user.types";
import type { Page } from "@/types/pagination";

export const getUsers = (
  search: string,
  page: number,
  size: number,
  sort: string
) => {
  return fetchClient<void, Page<UserResponse>>(
    `/admin/users?search=${search}&page=${page}&size=${size}&sort=${sort}`,
    {
      method: "GET",
    }
  );
};

export const createUser = (request: UserRequest) => {
  return fetchClient<UserRequest, UserResponse>("/admin/users", {
    method: "POST",
    body: request,
  });
};

export const updateUser = (id: number, request: UserRequest) => {
  return fetchClient<UserRequest, UserResponse>(`/admin/users/${id}`, {
    method: "PUT",
    body: request,
  });
};

export const deleteUser = (id: number) => {
  return fetchClient<void, void>(`/admin/users/${id}`, {
    method: "DELETE",
  });
};

export const getUserById = (id: number) => {
  return fetchClient<void, UserResponse>(`/admin/users/${id}`, {
    method: "GET",
  });
};

export const getUserMe = () => {
  return fetchClient<void, UserResponse>("/admin/users/me", {
    method: "GET",
  });
};
