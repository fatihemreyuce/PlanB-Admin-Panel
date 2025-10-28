export interface ServiceRequest {
  name: string;
  description: string;
  icon: string | File;
}

export interface ServiceResponse {
  id: number;
  icon: string;
  name: string;
  description: string;
}
