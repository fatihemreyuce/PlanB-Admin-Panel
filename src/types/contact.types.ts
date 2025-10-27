export interface ContactRequest {
  name: string;
  email: string;
  subject: string;
  description: string;
}

export interface ContactResponse {
  id: number;
  name: string;
  email: string;
  subject: string;
  description: string;
  createdAt: string;
}
