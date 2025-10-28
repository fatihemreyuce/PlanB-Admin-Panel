import { z } from "zod";

export const sliderCreateSchema = z.object({
  name: z
    .string()
    .min(3, "İsim en az 3 karakter olmalıdır")
    .max(100, "İsim en fazla 100 karakter olabilir"),
  description: z
    .string()
    .min(10, "Açıklama en az 10 karakter olmalıdır")
    .max(1000, "Açıklama en fazla 1000 karakter olabilir"),
  excerpt: z
    .string()
    .min(10, "Özet en az 10 karakter olmalıdır")
    .max(200, "Özet en fazla 200 karakter olabilir"),
  image: z
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
  tagIds: z.array(z.number()).min(1, "En az bir etiket seçiniz"),
});

export const sliderUpdateSchema = z.object({
  name: z
    .string()
    .min(3, "İsim en az 3 karakter olmalıdır")
    .max(100, "İsim en fazla 100 karakter olabilir"),
  description: z
    .string()
    .min(10, "Açıklama en az 10 karakter olmalıdır")
    .max(1000, "Açıklama en fazla 1000 karakter olabilir"),
  excerpt: z
    .string()
    .min(10, "Özet en az 10 karakter olmalıdır")
    .max(200, "Özet en fazla 200 karakter olabilir"),
  image: z
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
  tagIds: z.array(z.number()).min(1, "En az bir etiket seçiniz"),
});

export type SliderCreateFormData = z.infer<typeof sliderCreateSchema>;
export type SliderUpdateFormData = z.infer<typeof sliderUpdateSchema>;
