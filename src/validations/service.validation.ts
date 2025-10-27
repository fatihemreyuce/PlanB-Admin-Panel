import { z } from "zod";

export const serviceCreateSchema = z.object({
  name: z
    .string()
    .min(2, "Servis adı en az 2 karakter olmalıdır")
    .max(100, "Servis adı en fazla 100 karakter olabilir"),
  description: z
    .string()
    .min(10, "Açıklama en az 10 karakter olmalıdır")
    .max(500, "Açıklama en fazla 500 karakter olabilir"),
  icon: z
    .instanceof(File, { message: "Lütfen bir resim seçiniz" })
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Resim boyutu en fazla 5MB olabilir"
    )
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
          file.type
        ),
      "Sadece JPG, PNG veya WEBP formatı desteklenir"
    ),
});

export const serviceUpdateSchema = z.object({
  name: z
    .string()
    .min(2, "Servis adı en az 2 karakter olmalıdır")
    .max(100, "Servis adı en fazla 100 karakter olabilir"),
  description: z
    .string()
    .min(10, "Açıklama en az 10 karakter olmalıdır")
    .max(500, "Açıklama en fazla 500 karakter olabilir"),
  icon: z
    .instanceof(File, { message: "Lütfen bir resim seçiniz" })
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Resim boyutu en fazla 5MB olabilir"
    )
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
          file.type
        ),
      "Sadece JPG, PNG veya WEBP formatı desteklenir"
    )
    .optional(),
});

export type ServiceCreateFormData = z.infer<typeof serviceCreateSchema>;
export type ServiceUpdateFormData = z.infer<typeof serviceUpdateSchema>;
