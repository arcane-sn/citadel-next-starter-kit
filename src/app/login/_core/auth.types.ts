import { z } from "zod";

const MIN_PASSWORD_LENGTH = 8;

export const loginSchema = z.object({
  email: z.email("Email tidak valid"),
  password: z
    .string()
    .min(MIN_PASSWORD_LENGTH, `Password minimal ${MIN_PASSWORD_LENGTH} karakter`),
});

export const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.email(),
});

export type LoginPayload = z.infer<typeof loginSchema>;
export type User = z.infer<typeof userSchema>;
