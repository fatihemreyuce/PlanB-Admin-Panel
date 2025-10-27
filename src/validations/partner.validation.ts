import { z } from "zod";

export const partnerCreateSchema = z.object({
  name: z
    .string()
    .min(2, "Partner adı en az 2 karakter olmalıdır")
    .max(100, "Partner adı en fazla 100 karakter olabilir"),
  icon: z
    .instanceof(File, { message: "Lütfen bir logo seçiniz" })
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Logo boyutu en fazla 5MB olabilir"
    )
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
          file.type
        ),
      "Sadece JPG, PNG veya WEBP formatı desteklenir"
    ),
});

export const partnerUpdateSchema = z.object({
  name: z
    .string()
    .min(2, "Partner adı en az 2 karakter olmalıdır")
    .max(100, "Partner adı en fazla 100 karakter olabilir"),
  icon: z
    .instanceof(File, { message: "Lütfen bir logo seçiniz" })
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Logo boyutu en fazla 5MB olabilir"
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

export type PartnerCreateFormData = z.infer<typeof partnerCreateSchema>;
export type PartnerUpdateFormData = z.infer<typeof partnerUpdateSchema>;
