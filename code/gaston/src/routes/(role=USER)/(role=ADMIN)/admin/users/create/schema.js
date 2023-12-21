import { z } from 'zod';
import { VALID_ROLES } from '$lib/auth/roles.js';

export const CreateUserSchema = z.object({
	username: z
		.string()
		.min(3, 'Username must be at least three characers long')
		.max(32, 'Username cannot be longer than 32 characters'),
	password: z
		.string()
		.min(8, 'Password must be at least 8 characers long')
		.max(64, 'Password cannot be longer than 64 characters'),
	roles: z.array(z.enum(VALID_ROLES)).describe('An array of the roles to assign to the user.')
});
