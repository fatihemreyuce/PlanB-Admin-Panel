import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  createTeamMember,
  getTeamMembers,
  getTeamMemberById,
  deleteTeamMember,
  updateTeamMember,
} from "@/services/team-members-service";
import { toast } from "sonner";
import type { TeamMemberRequest } from "@/types/team-members.types";

export const useCreateTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: TeamMemberRequest) => createTeamMember(request),
    onSuccess: () => {
      toast.success("Takım üyesi başarıyla oluşturuldu");
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
    },
    onError: () => {
      toast.error("Takım üyesi oluşturulurken bir hata oluştu");
    },
  });
};

export const useGetTeamMembers = (page: number, size: number, sort: string) => {
  return useQuery({
    queryKey: ["team-members", page, size, sort],
    queryFn: () => getTeamMembers(page, size, sort),
  });
};

export const useGetTeamMemberById = (id: number) => {
  return useQuery({
    queryKey: ["team-members", id],
    queryFn: () => getTeamMemberById(id),
  });
};

export const useDeleteTeamMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: number) => deleteTeamMember(id),
    onSuccess: () => {
      toast.success("Takım üyesi başarıyla silindi");
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
    },
    onError: () => {
      toast.error("Takım üyesi silinirken bir hata oluştu");
    },
  });
};

export const useUpdateTeamMember = (id: number) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (request: TeamMemberRequest) => updateTeamMember(id, request),
    onSuccess: () => {
      toast.success("Takım üyesi başarıyla güncellendi");
      queryClient.invalidateQueries({ queryKey: ["team-members"] });
    },
    onError: () => {
      toast.error("Takım üyesi güncellenirken bir hata oluştu");
    },
  });
};
