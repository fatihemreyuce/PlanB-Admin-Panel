import { z } from "zod";

const urlRegex =
  /^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

export const teamMemberCreateSchema = z.object({
  name: z
    .string()
    .min(2, "İsim en az 2 karakter olmalıdır")
    .max(100, "İsim en fazla 100 karakter olabilir"),
  title: z
    .string()
    .min(3, "Ünvan en az 3 karakter olmalıdır")
    .max(150, "Ünvan en fazla 150 karakter olabilir"),
  quote: z
    .string()
    .min(10, "Alıntı en az 10 karakter olmalıdır")
    .max(500, "Alıntı en fazla 500 karakter olabilir"),
  linkedinUrl: z
    .string()
    .regex(urlRegex, "Geçerli bir LinkedIn URL adresi giriniz")
    .max(500, "URL en fazla 500 karakter olabilir"),
  orderNumber: z
    .number()
    .int("Sıra numarası tam sayı olmalıdır")
    .min(0, "Sıra numarası 0'dan küçük olamaz")
    .max(1000, "Sıra numarası 1000'den büyük olamaz"),
  profilePhoto: z
    .instanceof(File, { message: "Lütfen bir fotoğraf seçiniz" })
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Fotoğraf boyutu en fazla 5MB olabilir"
    )
    .refine(
      (file) =>
        ["image/jpeg", "image/png", "image/jpg", "image/webp"].includes(
          file.type
        ),
      "Sadece JPG, PNG veya WEBP formatı desteklenir"
    ),
});

export const teamMemberUpdateSchema = z.object({
  name: z
    .string()
    .min(2, "İsim en az 2 karakter olmalıdır")
    .max(100, "İsim en fazla 100 karakter olabilir"),
  title: z
    .string()
    .min(3, "Ünvan en az 3 karakter olmalıdır")
    .max(150, "Ünvan en fazla 150 karakter olabilir"),
  quote: z
    .string()
    .min(10, "Alıntı en az 10 karakter olmalıdır")
    .max(500, "Alıntı en fazla 500 karakter olabilir"),
  linkedinUrl: z
    .string()
    .regex(urlRegex, "Geçerli bir LinkedIn URL adresi giriniz")
    .max(500, "URL en fazla 500 karakter olabilir"),
  orderNumber: z
    .number()
    .int("Sıra numarası tam sayı olmalıdır")
    .min(0, "Sıra numarası 0'dan küçük olamaz")
    .max(1000, "Sıra numarası 1000'den büyük olamaz"),
  profilePhoto: z
    .instanceof(File, { message: "Lütfen bir fotoğraf seçiniz" })
    .refine(
      (file) => file.size <= 5 * 1024 * 1024,
      "Fotoğraf boyutu en fazla 5MB olabilir"
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

export type TeamMemberCreateFormData = z.infer<typeof teamMemberCreateSchema>;
export type TeamMemberUpdateFormData = z.infer<typeof teamMemberUpdateSchema>;
