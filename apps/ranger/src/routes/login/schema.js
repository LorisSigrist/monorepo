import { z } from 'zod';

export const LoginSchema = z.object({
	username: z.string().min(3, 'Username too short').max(50, 'Username too long'),
	password: z.string().min(5, 'Password too short').max(50, 'Password too long')
});
