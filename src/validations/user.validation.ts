import { z } from "zod";

// Create User Validation
export const createUserSchema = z
  .object({
    username: z
      .string()
      .min(1, "Kullanıcı adı gereklidir")
      .min(3, "Kullanıcı adı en az 3 karakter olmalıdır"),
    email: z
      .string()
      .min(1, "E-posta gereklidir")
      .email("Geçerli bir e-posta adresi giriniz"),
    password: z
      .string()
      .min(1, "Şifre gereklidir")
      .min(6, "Şifre en az 6 karakter olmalıdır"),
    confirmPassword: z.string().min(1, "Şifre tekrarı gereklidir"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Şifreler eşleşmiyor",
    path: ["confirmPassword"],
  });

export type CreateUserFormData = z.infer<typeof createUserSchema>;

// Update User Validation
export const updateUserSchema = z
  .object({
    username: z
      .string()
      .min(1, "Kullanıcı adı gereklidir")
      .min(3, "Kullanıcı adı en az 3 karakter olmalıdır"),
    email: z
      .string()
      .min(1, "E-posta gereklidir")
      .email("Geçerli bir e-posta adresi giriniz"),
    password: z.string().optional(),
    confirmPassword: z.string().optional(),
  })
  .refine(
    (data) => {
      // Eğer şifre girilmişse, şifre tekrarı da girilmeli
      if (data.password) {
        return (
          data.confirmPassword !== undefined &&
          data.password === data.confirmPassword
        );
      }
      return true;
    },
    {
      message: "Şifreler eşleşmiyor",
      path: ["confirmPassword"],
    }
  );

export type UpdateUserFormData = z.infer<typeof updateUserSchema>;

// Search and Filter Validation (optional)
export const userSearchSchema = z.object({
  search: z.string().optional(),
  page: z.number().min(0).optional(),
  size: z.number().min(1).max(100).optional(),
  sort: z.string().optional(),
});

export type UserSearchFormData = z.infer<typeof userSearchSchema>;
