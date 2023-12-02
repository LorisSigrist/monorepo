import { getRoles } from '@sigrist.dev/guardian';

/**
 * @type {import("@sveltejs/kit").Handle}
 */
export const guard = async ({ event, resolve }) => {
	// 404 - No need to guard
	if (!event.route.id) return await resolve(event);

	const requiredRoles = getRoles(event.route.id);
	const authorized = [...requiredRoles].every((role) => event.locals.user.roles.includes(role));

	if (!authorized) {
		return new Response('Unauthorized', {
			status: 401,
			statusText: 'Unauthorized'
		});
	}

	return await resolve(event);
};
