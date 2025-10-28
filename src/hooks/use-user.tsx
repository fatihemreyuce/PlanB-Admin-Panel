import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getUsers,
  createUser,
  updateUser,
  deleteUser,
  getUserById,
  getUserMe,
} from "@/services/user-service";
import type { UserRequest } from "@/types/user.types";
import { toast } from "sonner";
import { useAuthQuery } from "./use-auth-query";

export const useUserMe = () => {
  return useAuthQuery({
    queryKey: ["user-me"],
    queryFn: () => getUserMe(),
  });
};

export const useUsers = (
  search: string,
  page: number,
  size: number,
  sort: string
) => {
  return useAuthQuery({
    queryKey: ["users", search, page, size, sort],
    queryFn: () => getUsers(search, page, size, sort),
  });
};

export const useCreateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: UserRequest) => createUser(request),
    onSuccess: () => {
      toast.success("Kullanıcı başarıyla oluşturuldu");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toast.error("Kullanıcı oluşturulurken bir hata oluştu");
    },
  });
};

export const useUpdateUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, request }: { id: number; request: UserRequest }) =>
      updateUser(id, request),
    onSuccess: () => {
      toast.success("Kullanıcı başarıyla güncellendi");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toast.error("Kullanıcı güncellenirken bir hata oluştu");
    },
  });
};

export const useDeleteUser = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteUser(id),
    onSuccess: () => {
      toast.success("Kullanıcı başarıyla silindi");
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
    onError: () => {
      toast.error("Kullanıcı silinirken bir hata oluştu");
    },
  });
};

export const useGetUserById = (id: number) => {
  return useAuthQuery({
    queryKey: ["user", id],
    queryFn: () => getUserById(id),
  });
};
