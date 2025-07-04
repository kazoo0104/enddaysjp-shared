import { z } from 'zod';

export const categoryFormSchema = z.object({
  name: z.string().min(1, 'カテゴリ名は1文字以上で入力してください。'),
});

export type CategoryFormValues = z.infer<typeof categoryFormSchema>;

export const categorySchema = categoryFormSchema.extend({
  id: z.string(),
  createdAt: z.date().or(z.string()),
  updatedAt: z.date().or(z.string()),
});

export type Category = z.infer<typeof categorySchema>; 