export interface NotificationRequest {
  title: string;
  content: string;
  type: "EMAIL";
}

export interface NotificationResponse {
  id: number;
  title: string;
  content: string;
  type: "EMAIL";
}
