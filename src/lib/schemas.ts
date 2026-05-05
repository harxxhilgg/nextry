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

export const userSchema = z.object({
  name: z
    .string()
    .min(2, "Name is required.")
    .max(20, "Name cannot exceed 20 chars."),
  age: z
    .number()
    .min(1, "Age must be valid.")
    .max(100, "Please enter appropriate age."),
  location: z
    .string()
    .min(2, "Location is required.")
    .max(20, "Location cannot exceed 20 chars."),
});

export type UserData = z.infer<typeof userSchema>;
