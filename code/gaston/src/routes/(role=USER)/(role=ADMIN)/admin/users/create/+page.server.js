import { fail, redirect } from '@sveltejs/kit';
import { superValidate } from 'sveltekit-superforms/server';
import { CreateUserSchema } from './schema.js';
import { userRepository } from '$lib/server/db/repository/userRepository.js';
import { hash } from 'argon2';
import { ROLES } from '$lib/auth/roles.js';

export const load = async () => {
	//Run the Promises in parallel
	return {
		form: superValidate(CreateUserSchema)
	};
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, CreateUserSchema);
		if (!form.valid) return fail(400, { form });
		await sleep(200);
		return { form };

		const roles = form.data.roles.reduce((acc, role) => acc | ROLES[role], 0);

		const hashedPassword = await hash(form.data.password);
		userRepository.insert({
			username: form.data.username,
			password: hashedPassword,
			roles
		});
	}
};

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
