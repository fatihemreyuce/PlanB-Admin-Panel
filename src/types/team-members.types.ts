export interface TeamMemberRequest {
  name: string;
  title: string;
  quote: string;
  linkedinUrl: string;
  orderNumber: number;
  profilePhoto: string | File;
}

export interface TeamMemberResponse {
  id: number;
  name: string;
  title: string;
  quote: string;
  profilePhoto: string;
  linkedinUrl: string;
  orderNumber: number;
}
