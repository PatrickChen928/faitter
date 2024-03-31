import * as z from 'zod'

export const SignUpValidation = z.object({
  username: z.string().min(3, { message: 'Name must be at least 3 characters long' }),
  email: z.string().email(),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
})

export const SignInValidation = z.object({
  email: z.string().email(),
  password: z.string().min(8, { message: 'Password must be at least 8 characters long' }),
})

export const CreatePostValidation = z.object({
  caption: z.string().min(3).max(2200),
  file: z.custom<File[]>(),
  location: z.string().min(2).max(100),
  tags: z.string(),
})

export const UpdateProfileValidation = z.object({
  bio: z.string().min(3).max(2200),
  file: z.custom<File[]>(),
})
