import * as z from "zod";

export const roastSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name must be at most 50 characters"),
  bio: z
    .string()
    .min(2, "Bio must be at least 2 characters")
    .max(400, "Bio must be at most 400 characters"),
  level: z.enum(["mild", "medium", "savage"]),
});

export type RoastValues = z.infer<typeof roastSchema>;
