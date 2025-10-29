export interface SettingsRequest {
  siteLogo?: string | File;
  maintenanceMode: boolean;
  aboutUsDescription: string;
  email: string;
  instagramUrl: string;
  xUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  teamMembersHeader: string;
  teamMembersDescription: string;
}

export interface SettingsResponse {
  id: number;
  siteLogo: string;
  maintenanceMode: boolean;
  aboutUsDescription: string;
  email: string;
  instagramUrl: string;
  xUrl: string;
  linkedinUrl: string;
  youtubeUrl: string;
  teamMembersHeader: string;
  teamMembersDescription: string;
}
