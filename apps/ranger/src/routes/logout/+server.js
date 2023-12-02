import { JWT_COOKIE_NAME } from '$lib/auth/jwt.server.js';
import { redirect } from '@sveltejs/kit';

export async function POST({ cookies }) {
    cookies.delete(JWT_COOKIE_NAME);
    throw redirect(303, '/login');
}