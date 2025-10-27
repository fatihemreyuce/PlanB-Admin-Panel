import { z } from "zod";

// Turkish phone number regex
const phoneRegex = /^(05)[0-9]{9}$/;

export const subsNotificationCreateSchema = z.object({
  email: z
    .string()
    .email("Geçerli bir email adresi giriniz")
    .min(5, "Email en az 5 karakter olmalıdır"),
  phoneNumber: z
    .string()
    .regex(phoneRegex, "Telefon numarası 05XX XXX XX XX formatında olmalıdır")
    .min(10, "Telefon numarası 10 haneli olmalıdır")
    .max(10, "Telefon numarası 10 haneli olmalıdır"),
});

export const subsNotificationUpdateSchema = z.object({
  email: z
    .string()
    .email("Geçerli bir email adresi giriniz")
    .min(5, "Email en az 5 karakter olmalıdır"),
  phoneNumber: z
    .string()
    .regex(phoneRegex, "Telefon numarası 05XX XXX XX XX formatında olmalıdır")
    .min(10, "Telefon numarası 10 haneli olmalıdır")
    .max(10, "Telefon numarası 10 haneli olmalıdır"),
});

export type SubsNotificationCreateFormData = z.infer<
  typeof subsNotificationCreateSchema
>;
export type SubsNotificationUpdateFormData = z.infer<
  typeof subsNotificationUpdateSchema
>;
