import { z } from 'zod';

const blogValidationSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  author: z
    .string()
    .refine((val) => /^[0-9a-fA-F]{24}$/.test(val), {
      message: 'Invalid author ID format',
    }),
  isPublished: z.boolean(),
});

export default blogValidationSchema;
