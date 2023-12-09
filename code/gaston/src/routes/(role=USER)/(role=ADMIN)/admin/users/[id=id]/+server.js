import { userRepository } from '$lib/server/db/repository/userRepository.js';
import { redirect } from '@sveltejs/kit';

export const DELETE = async ({ params }) => {
	const id = Number(params.id);
	await userRepository.delete(id);

	throw redirect(303, '/admin/users');
};
