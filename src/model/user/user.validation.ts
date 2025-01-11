import { z } from 'zod';

const userValidationSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
  role: z.enum(['admin', 'user']).default('user'),
  isActive: z.boolean().default(true),
});

export default userValidationSchema;
