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
  title: z.string().min(3, { message: 'Title must be at least 3 characters long' }),
  content: z.string().min(10, { message: 'Content must be at least 10 characters long' }),
})