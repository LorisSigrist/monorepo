import { superValidate } from 'sveltekit-superforms/server';
import { LoginSchema } from './schema';
import { fail, redirect } from '@sveltejs/kit';
import { userRepository } from '$lib/server/db/repository/userRepository';
import { JWT_COOKIE_NAME, createJWT } from '$lib/auth/jwt.server';
import { verify } from 'argon2';

export async function load() {
	return { form: superValidate(LoginSchema) };
}

export const actions = {
	default: async ({ request, cookies }) => {
		const form = await superValidate(request, LoginSchema);
		if (!form.valid) return fail(400, { form, malformedSubmission: true });

		const user = await userRepository.getByName(form.data.username);
		if (!user) return fail(400, { form, invalidLogin: true });

		const isCorrectPassword = await verify(user.password, form.data.password);
		if (!isCorrectPassword) return fail(400, { form, invalidLogin: true });

		const jwt = createJWT({ user_id: user.id, roles: user.roles });
		cookies.set(JWT_COOKIE_NAME, jwt, {
			path: '/',
			httpOnly: true,
			secure: true,
			sameSite: 'strict'
		});

		throw redirect(303, '/');
	}
};
