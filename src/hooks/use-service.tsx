import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createService,
  getServices,
  getServiceById,
  updateService,
  deleteService,
} from "@/services/service-service";
import { toast } from "sonner";
import type { ServiceRequest } from "@/types/service.types";

export const useCreateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: ServiceRequest) => createService(request),
    onSuccess: () => {
      toast.success("Service created successfully");
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: () => {
      toast.error("Failed to create service");
    },
  });
};

export const useServices = (
  search: string,
  page: number,
  size: number,
  sort: string
) => {
  return useQuery({
    queryKey: ["services", search, page, size, sort],
    queryFn: () => getServices(search, page, size, sort),
  });
};

export const useServiceById = (id: number) => {
  return useQuery({
    queryKey: ["service", id],
    queryFn: () => getServiceById(id),
  });
};

export const useUpdateService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, request }: { id: number; request: ServiceRequest }) =>
      updateService(id, request),
    onSuccess: () => {
      toast.success("Service updated successfully");
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: () => {
      toast.error("Failed to update service");
    },
  });
};

export const useDeleteService = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteService(id),
    onSuccess: () => {
      toast.success("Service deleted successfully");
      queryClient.invalidateQueries({ queryKey: ["services"] });
    },
    onError: () => {
      toast.error("Failed to delete service");
    },
  });
};
