/**
 * Parse a routeID and return the roles required to access the route
 *
 * @example
 * getRoles('/(role=author)/posts')
 * // => Set(['author'])
 *
 * @param {string} routeId
 * @returns {Set<string>} The Roles requried to access the route
 */
export function getRoles(routeId) {
	/** @type {Set<string>} */
	const roles = new Set();
	const segments = routeId.split('/');

	for (const segment of segments) {
		if (segment.startsWith('(role=')) {
			roles.add(segment.slice(6, -1));
		}
	}

	return roles;
}
