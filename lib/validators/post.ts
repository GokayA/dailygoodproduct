import { z } from 'zod';

export const PostValidator = z.object({
  title: z
    .string()
    .min(3, {
      message: 'Title must be at least 3 characters long',
    })
    .max(128, {
      message: 'Title must be less than 128 characters long',
    }),
  subTitle: z
    .string()
    .min(3, { message: 'Subtitle must be at least 3 characters long' })
    .max(30, { message: 'Subtitle must be less than 30 characters long.' }),
  image: z.any(),
  content: z.any(),
});

export type PostCreationRequest = z.infer<typeof PostValidator>;
