import { JWT_COOKIE_NAME, parseJWT } from './jwt.server.js';
import { userRepository } from '$lib/server/db/repository/userRepository';

/**
 * @type {App.Locals["user"]}
 */
const ANONYMOUS_USER = {
	id: null,
	roles: 0
};

/**
 * @type { import("@sveltejs/kit").Handle}
 */
export const populateUser = async ({ event, resolve }) => {
	event.locals.user = ANONYMOUS_USER;

	const jwt_token = event.cookies.get(JWT_COOKIE_NAME);
	if (!jwt_token) return await resolve(event);

	const parseResult = parseJWT(jwt_token);
	if (!parseResult.valid) {
		switch (parseResult.reason) {
			case 'invalid_signature':
			case 'invalid_data':
			default: {
				event.cookies.delete('jwt');
				return await resolve(event);
			}
		}
	}

	const { user_id } = parseResult.data;
	const user = await userRepository.find(user_id);

	if (!user) {
		event.cookies.delete('jwt');
		return await resolve(event);
	}

	event.locals.user = {
		id: user.id,
		roles: user.roles
	};

	return await resolve(event);
};
