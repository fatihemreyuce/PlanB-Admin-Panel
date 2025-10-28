import { z } from "zod";

export const assetSchema = z.object({
  asset: z.string().min(1, "Lütfen bir resim seçiniz"),
  isCovered: z.boolean(),
});

export const portfolioCreateSchema = z.object({
  name: z
    .string()
    .min(3, "İsim en az 3 karakter olmalıdır")
    .max(100, "İsim en fazla 100 karakter olabilir"),
  description: z
    .string()
    .min(10, "Açıklama en az 10 karakter olmalıdır")
    .max(2000, "Açıklama en fazla 2000 karakter olabilir"),
  excerpt: z
    .string()
    .min(10, "Özet en az 10 karakter olmalıdır")
    .max(200, "Özet en fazla 200 karakter olabilir"),
  outSourceLink: z
    .string()
    .url("Geçerli bir URL giriniz")
    .optional()
    .or(z.literal("")),
  publishDate: z.string().min(1, "Yayın tarihi gereklidir"),
  assets: z.array(assetSchema).min(1, "En az bir resim ekleyiniz"),
});

export const portfolioUpdateSchema = z.object({
  name: z
    .string()
    .min(3, "İsim en az 3 karakter olmalıdır")
    .max(100, "İsim en fazla 100 karakter olabilir"),
  description: z
    .string()
    .min(10, "Açıklama en az 10 karakter olmalıdır")
    .max(2000, "Açıklama en fazla 2000 karakter olabilir"),
  excerpt: z
    .string()
    .min(10, "Özet en az 10 karakter olmalıdır")
    .max(200, "Özet en fazla 200 karakter olabilir"),
  outSourceLink: z
    .string()
    .url("Geçerli bir URL giriniz")
    .optional()
    .or(z.literal("")),
  publishDate: z.string().min(1, "Yayın tarihi gereklidir"),
  assets: z.array(assetSchema).min(1, "En az bir resim ekleyiniz"),
});

export type PortfolioCreateFormData = z.infer<typeof portfolioCreateSchema>;
export type PortfolioUpdateFormData = z.infer<typeof portfolioUpdateSchema>;
