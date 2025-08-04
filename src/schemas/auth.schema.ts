import { z } from "zod";

export const registerSchema = z.object({
    username: z.string().min(3, "Username must be at least 3 characters long."),
    password: z.string().min(6, "Password must be at least 6 characters long."),
    firstname: z.string().min(1, "Fistname can not be empty."),
    lastname: z.string().min(1, "Lastname can not be empty."),
    avatar: z.string().optional(),
});

export const loginSchema = z.object({
    username: z.string(),
    password: z.string(),
});

export type RegisterInput = z.infer<typeof registerSchema>;
export type LoginInput = z.infer<typeof loginSchema>;
