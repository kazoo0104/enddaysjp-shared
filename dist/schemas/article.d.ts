import { z } from "zod";
export declare const SourceTypeEnum: z.ZodEnum<["YOUTUBE", "X", "WEB"]>;
export declare const articleFormSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    url: z.ZodString;
    sourceType: z.ZodEnum<["YOUTUBE", "X", "WEB"]>;
    thumbnailUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    categoryId: z.ZodString;
}, "strip", z.ZodTypeAny, {
    title: string;
    content: string;
    url: string;
    sourceType: "YOUTUBE" | "X" | "WEB";
    categoryId: string;
    thumbnailUrl?: string | undefined;
}, {
    title: string;
    content: string;
    url: string;
    sourceType: "YOUTUBE" | "X" | "WEB";
    categoryId: string;
    thumbnailUrl?: string | undefined;
}>;
export type ArticleFormValues = z.infer<typeof articleFormSchema>;
export declare const articleSchema: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
    url: z.ZodString;
    sourceType: z.ZodEnum<["YOUTUBE", "X", "WEB"]>;
    thumbnailUrl: z.ZodUnion<[z.ZodOptional<z.ZodString>, z.ZodLiteral<"">]>;
    categoryId: z.ZodString;
} & {
    id: z.ZodString;
    createdAt: z.ZodUnion<[z.ZodDate, z.ZodString]>;
    updatedAt: z.ZodUnion<[z.ZodDate, z.ZodString]>;
    category: z.ZodNullable<z.ZodObject<Pick<{
        name: z.ZodString;
    } & {
        id: z.ZodString;
        createdAt: z.ZodUnion<[z.ZodDate, z.ZodString]>;
        updatedAt: z.ZodUnion<[z.ZodDate, z.ZodString]>;
    }, "name" | "id">, "strip", z.ZodTypeAny, {
        name: string;
        id: string;
    }, {
        name: string;
        id: string;
    }>>;
}, "strip", z.ZodTypeAny, {
    id: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    title: string;
    content: string;
    url: string;
    sourceType: "YOUTUBE" | "X" | "WEB";
    categoryId: string;
    category: {
        name: string;
        id: string;
    } | null;
    thumbnailUrl?: string | undefined;
}, {
    id: string;
    createdAt: string | Date;
    updatedAt: string | Date;
    title: string;
    content: string;
    url: string;
    sourceType: "YOUTUBE" | "X" | "WEB";
    categoryId: string;
    category: {
        name: string;
        id: string;
    } | null;
    thumbnailUrl?: string | undefined;
}>;
export type Article = z.infer<typeof articleSchema>;
//# sourceMappingURL=article.d.ts.map