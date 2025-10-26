import { z } from "zod";

export const userCreateSchema = z.object({
  username: z
    .string()
    .min(3, "Kullanıcı adı en az 3 karakter olmalıdır")
    .max(50, "Kullanıcı adı en fazla 50 karakter olabilir"),
  email: z
    .string()
    .email("Geçerli bir email adresi giriniz")
    .min(5, "Email en az 5 karakter olmalıdır"),
  password: z
    .string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .max(100, "Şifre en fazla 100 karakter olabilir"),
});

export const userUpdateSchema = z.object({
  username: z
    .string()
    .min(3, "Kullanıcı adı en az 3 karakter olmalıdır")
    .max(50, "Kullanıcı adı en fazla 50 karakter olabilir"),
  email: z
    .string()
    .email("Geçerli bir email adresi giriniz")
    .min(5, "Email en az 5 karakter olmalıdır"),
  password: z
    .string()
    .min(6, "Şifre en az 6 karakter olmalıdır")
    .max(100, "Şifre en fazla 100 karakter olabilir"),
});

export type UserCreateFormData = z.infer<typeof userCreateSchema>;
export type UserUpdateFormData = z.infer<typeof userUpdateSchema>;
