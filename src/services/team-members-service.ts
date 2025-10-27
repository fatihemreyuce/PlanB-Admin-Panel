import { fetchClient } from "@/utils/fetch-client";
import type {
  TeamMemberRequest,
  TeamMemberResponse,
} from "@/types/team-members.types";
import type { Page } from "@/types/pagination";

export const createTeamMember = (request: TeamMemberRequest) => {
  return fetchClient<TeamMemberRequest, TeamMemberResponse>(
    "/admin/team-members",
    {
      method: "POST",
      body: request,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};

export const getTeamMembers = (page: number, size: number, sort: string) => {
  return fetchClient<void, Page<TeamMemberResponse>>(
    `/team-members?page=${page}&size=${size}&sort=${encodeURIComponent(sort)}`,
    {
      method: "GET",
    }
  );
};

export const getTeamMemberById = (id: number) => {
  return fetchClient<void, TeamMemberResponse>(`/team-members/${id}`, {
    method: "GET",
  });
};

export const deleteTeamMember = (id: number) => {
  return fetchClient<void, void>(`/admin/team-members/${id}`, {
    method: "DELETE",
  });
};

export const updateTeamMember = (id: number, request: TeamMemberRequest) => {
  return fetchClient<TeamMemberRequest, TeamMemberResponse>(
    `/admin/team-members/${id}`,
    {
      method: "PUT",
      body: request,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
};
