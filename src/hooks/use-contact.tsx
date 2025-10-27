import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createContact,
  getContacts,
  deleteContact,
} from "@/services/contact-service";
import { toast } from "sonner";
import type { ContactRequest } from "@/types/contact.types";

export const useCreateContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: ContactRequest) => createContact(request),
    onSuccess: () => {
      toast.success("Contact created successfully");
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
    onError: () => {
      toast.error("Failed to create contact");
    },
  });
};

export const useContacts = (page: number, size: number, sort: string) => {
  return useQuery({
    queryKey: ["contacts", page, size, sort],
    queryFn: () => getContacts(page, size, sort),
  });
};

export const useDeleteContact = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteContact(id),
    onSuccess: () => {
      toast.success("Contact deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["contacts"] });
    },
    onError: () => {
      toast.error("Failed to delete contact");
    },
  });
};
