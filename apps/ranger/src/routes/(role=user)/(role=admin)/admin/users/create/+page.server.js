import { fail } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { CreateUserSchema } from './schema.js';
import { enforceRole } from '$lib/auth/enforceRole.server.js';
import { userRoleRepository } from '$lib/server/db/repository/userRoleRepository.js';
import { userRepository } from '$lib/server/db/repository/userRepository.js';
import { hash } from 'argon2';

export const load = async ({ locals }) => {
	enforceRole(locals.user, 'admin');

	//Run the Promises in parallel
	return {
		form: superValidate(CreateUserSchema),
		roles: userRoleRepository.findAll()
	};
};

export const actions = {
	default: async ({ request, locals }) => {
		enforceRole(locals.user, 'admin');

		const form = await superValidate(request, CreateUserSchema);
		if (!form.valid) return fail(400, { form });

		const hashedPassword = await hash(form.data.password);
		userRepository.insert({ username: form.data.username, password: hashedPassword });
	}
};
