import { z } from "zod";

export const tagCreateSchema = z.object({
  name: z
    .string()
    .min(2, "Etiket adı en az 2 karakter olmalıdır")
    .max(50, "Etiket adı en fazla 50 karakter olabilir"),
});

export const tagUpdateSchema = z.object({
  name: z
    .string()
    .min(2, "Etiket adı en az 2 karakter olmalıdır")
    .max(50, "Etiket adı en fazla 50 karakter olabilir"),
});

export type TagCreateFormData = z.infer<typeof tagCreateSchema>;
export type TagUpdateFormData = z.infer<typeof tagUpdateSchema>;
