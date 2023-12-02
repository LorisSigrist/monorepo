import { error } from '@sveltejs/kit';

/**
 *
 * Enforces that a given User Object has all the necessary roles.
 * - Triggers a 403 response if the user does not have the required roles.
 * - Triggers a 401 response if the user is not authenticated at all.s
 *
 * @param {App.Locals["user"]} user The user object
 * @param {string[]} roles The roles the user needs to have in order to pass the test. All roles must be present.
 * @returns {void}
 */
export function enforceRole(user, ...roles) {
	if (user.id === null) throw error(401, 'Unauthenticated');

	for (const role of roles) {
		if (!user.roles.includes(role)) throw error(403, 'Unauthorized');
	}

	// Success
}
