import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createContact,
  getContacts,
  deleteContact,
} from "@/services/contact-service";
import { toast } from "sonner";
import type { ContactRequest } from "@/types/contact.types";
import { useAuthQuery } from "./use-auth-query";

export const useCreateContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: ContactRequest) => createContact(request),
    onSuccess: () => {
      toast.success("Mesaj başarıyla oluşturuldu");
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
    onError: () => {
      toast.error("Mesaj oluşturulurken bir hata oluştu");
    },
  });
};

export const useContacts = (page: number, size: number, sort: string) => {
  return useAuthQuery({
    queryKey: ["contacts", page, size, sort],
    queryFn: () => getContacts(page, size, sort),
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteContact(id),
    onSuccess: () => {
      toast.success("Mesaj başarıyla silindi");
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
    onError: () => {
      toast.error("Mesaj silinirken bir hata oluştu");
    },
  });
};
