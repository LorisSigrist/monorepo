import { getRoles } from '@sigrist.dev/sveltekit-roles';
import { ROLES, VALID_ROLES } from './roles.js';

/**
 * @param {any} role
 * @returns {role is VALID_ROLES[number]}
 */
const isValidRole = (role) => VALID_ROLES.includes(role);

/** @type {import('@sveltejs/kit').Handle} */
export const guard = async ({ event, resolve }) => {
	// Non-SvelteKit route -> pass through
	if (!event.route.id) return await resolve(event);

	const requiredRoleNames = [...getRoles(event.route.id)].filter(isValidRole);
	const requiredRoleBitmask = requiredRoleNames.reduce((acc, role) => acc | ROLES[role], 0);

	//Check that the user has all the required roles
	const authorized = (event.locals.user.roles & requiredRoleBitmask) === requiredRoleBitmask;

	if (!authorized) {
		//If not authenticated, return a 401
		if (event.locals.user.id === null) {
			return new Response('Unauthenticated', {
				status: 401,
				statusText: 'Unauthenticated'
			});
		}

		//Otherwise, return a 403
		return new Response('Unauthorized', {
			status: 403,
			statusText: 'Unauthorized'
		});
	}

	return await resolve(event);
};
