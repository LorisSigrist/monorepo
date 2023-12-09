import { z } from 'zod';
import { VALID_ROLES } from '$lib/auth/roles.js';

export const CreateUserSchema = z.object({
	username: z.string().min(3).max(32),
	password: z.string().min(8).max(64),
	roles: z.array(z.enum(VALID_ROLES)).describe('An array of the roles to assign to the user.')
});
