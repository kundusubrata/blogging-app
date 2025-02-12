import { z } from "zod";

export const signupBody = z.object({
  firstname: z.string().trim().min(2).max(50),
  lastname: z.string().trim().min(2).max(50),
  email: z.string().email(),
  password: z.string().min(3),
});

export const signinBody = z.object({
  email: z.string().email(),
  password: z.string().min(3),
});

export const updateProfileBody = z.object({
  firstname: z.string().trim().min(2).max(50).optional(),
  lastname: z.string().trim().min(2).max(50).optional(),
  email: z.string().email().optional(),
});

export const createPostBody = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: "Title must be at least 2 characters" })
    .max(100, { message: "Title must be at most 100 characters" }),
  content: z
    .string()
    .trim()
    .min(2, { message: "Content must be at least 2 characters" })
    .max(10000, { message: "Content must be at most 10000 characters" }),
});

export const editPostBody = z.object({
  title: z
    .string()
    .trim()
    .min(2, { message: "Title must be at least 2 characters" })
    .max(100, { message: "Title must be at most 100 characters" })
    .optional(),
  content: z
    .string()
    .trim()
    .min(2, { message: "Content must be at least 2 characters" })
    .max(10000, { message: "Content must be at most 10000 characters" })
    .optional(),
});
