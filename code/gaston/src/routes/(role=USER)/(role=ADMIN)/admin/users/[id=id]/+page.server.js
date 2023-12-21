import { userRepository } from '$lib/server/db/repository/userRepository.js';
import { fail, redirect } from '@sveltejs/kit';

export const actions = {
	delete: async ({ params }) => {
		const id = Number(params.id);
		if (isNaN(id)) {
			throw fail(400, { message: 'Invalid id' });
		}

		await userRepository.delete(id);
		throw redirect(302, '/admin/users');
	}
};
