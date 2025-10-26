export interface UserRequest {
  username: string;
  email: string;
  password: string;
}

export interface UserResponse {
  id: number;
  username: string;
  email: string;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}
