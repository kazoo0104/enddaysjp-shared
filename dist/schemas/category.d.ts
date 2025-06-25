import { z } from 'zod';
export declare const categoryFormSchema: z.ZodObject<{
    name: z.ZodString;
}, "strip", z.ZodTypeAny, {
    name: string;
}, {
    name: string;
}>;
export type CategoryFormValues = z.infer<typeof categoryFormSchema>;
export declare const categorySchema: z.ZodObject<{
    name: z.ZodString;
} & {
    id: z.ZodString;
    createdAt: z.ZodUnion<[z.ZodDate, z.ZodString]>;
    updatedAt: z.ZodUnion<[z.ZodDate, z.ZodString]>;
}, "strip", z.ZodTypeAny, {
    name: string;
    id: string;
    createdAt: string | Date;
    updatedAt: string | Date;
}, {
    name: string;
    id: string;
    createdAt: string | Date;
    updatedAt: string | Date;
}>;
export type Category = z.infer<typeof categorySchema>;
//# sourceMappingURL=category.d.ts.map