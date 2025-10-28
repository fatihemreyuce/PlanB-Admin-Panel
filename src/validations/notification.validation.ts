import { z } from "zod";

export const notificationCreateSchema = z.object({
  title: z
    .string()
    .min(5, "Başlık en az 5 karakter olmalıdır")
    .max(200, "Başlık en fazla 200 karakter olabilir"),
  content: z
    .string()
    .min(20, "İçerik en az 20 karakter olmalıdır")
    .max(2000, "İçerik en fazla 2000 karakter olabilir"),
  type: z.enum(["EMAIL"]).refine((v) => v === "EMAIL", {
    message: "Geçerli bir bildirim tipi seçiniz",
  }),
});

export const notificationUpdateSchema = z.object({
  title: z
    .string()
    .min(5, "Başlık en az 5 karakter olmalıdır")
    .max(200, "Başlık en fazla 200 karakter olabilir"),
  content: z
    .string()
    .min(20, "İçerik en az 20 karakter olmalıdır")
    .max(2000, "İçerik en fazla 2000 karakter olabilir"),
  type: z.enum(["EMAIL"]).refine((v) => v === "EMAIL", {
    message: "Geçerli bir bildirim tipi seçiniz",
  }),
});

export type NotificationCreateFormData = z.infer<
  typeof notificationCreateSchema
>;
export type NotificationUpdateFormData = z.infer<
  typeof notificationUpdateSchema
>;
