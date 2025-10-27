import { z } from "zod";

export const contactCreateSchema = z.object({
  name: z
    .string()
    .min(2, "İsim en az 2 karakter olmalıdır")
    .max(100, "İsim en fazla 100 karakter olabilir"),
  email: z
    .string()
    .email("Geçerli bir email adresi giriniz")
    .min(5, "Email en az 5 karakter olmalıdır"),
  subject: z
    .string()
    .min(5, "Konu en az 5 karakter olmalıdır")
    .max(200, "Konu en fazla 200 karakter olabilir"),
  description: z
    .string()
    .min(10, "Açıklama en az 10 karakter olmalıdır")
    .max(1000, "Açıklama en fazla 1000 karakter olabilir"),
});

export type ContactCreateFormData = z.infer<typeof contactCreateSchema>;
