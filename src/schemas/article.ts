import { z } from "zod";
import { categorySchema } from "./category.js";

export const SourceTypeEnum = z.enum(["YOUTUBE", "X", "WEB"]);

export const articleFormSchema = z.object({
  title: z.string().min(2, "タイトルは2文字以上で入力してください。"),
  content: z.string().min(10, "概要は10文字以上で入力してください。"),
  description: z.string().optional(),
  url: z.string().url("有効なURLを入力してください。"),
  sourceType: SourceTypeEnum,
  thumbnailUrl: z
    .string()
    .url("有効なURLで入力してください。")
    .optional()
    .or(z.literal("")),
  categoryId: z.string().min(1, "カテゴリは必須です。"),
});

export type ArticleFormValues = z.infer<typeof articleFormSchema>;

export const updateArticleFormSchema = articleFormSchema.partial();
export type UpdateArticleFormValues = z.infer<typeof updateArticleFormSchema>;

export const articleSchema = articleFormSchema.extend({
  id: z.string(),
  description: z.string().nullable(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
  category: categorySchema.pick({ id: true, name: true }).nullable(),
});

export type Article = z.infer<typeof articleSchema>; 