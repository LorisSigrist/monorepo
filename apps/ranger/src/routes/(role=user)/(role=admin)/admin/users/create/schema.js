import { z } from 'zod';

export const CreateUserSchema = z.object({
	username: z.string().min(3).max(32),
	password: z.string().min(8).max(64),
	roles: z
		.array(z.number().int().positive())
		.describe('An array of the IDs of the roles to assign to the user.')
});
