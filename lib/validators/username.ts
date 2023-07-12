import { z } from 'zod';

export const UsernameValidator = z.object({
  name: z
    .string()
    .min(3, {
      message: 'Title must be at least 3 characters long',
    })
    .max(32, {
      message: 'Title must be less than 128 characters long',
    })
    .regex(/^[a-zA-Z0-9_]+$/),
});

export type UsernameRequest = z.infer<typeof UsernameValidator>;
