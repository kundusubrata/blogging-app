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
});

export const createPostBody = z.object({
  title: z.string().trim().min(2).max(100),
  content: z.string().trim().min(2).max(1000),
})

export const editPostBody = z.object({
  title: z.string().trim().min(2).max(100).optional(),
  content: z.string().trim().min(2).max(1000).optional(),
})
