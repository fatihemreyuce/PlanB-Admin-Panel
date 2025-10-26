import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, "Email adresi gereklidir")
    .email("Geçerli bir email adresi giriniz"),
  password: z.string().min(1, "Şifre gereklidir"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
