const routeGuardRegex = /^\(role=[a-z]+\)$/;

/**
 * @type {import("@sveltejs/kit").Handle}
 */
export const guard = async ({ event, resolve }) => {
	if (!event.route.id) {
		// Not a guarded route
		return await resolve(event);
	}

	const parts = event.route.id.split('/');
	const guardPart = parts.filter((part) => routeGuardRegex.test(part));

	//All the roles that the user needs to have to access this route
	const requiredRoles = new Set(guardPart.flatMap((part) => part.slice(6, -1).split('|')));

	let authorized = true;
	for (const role of requiredRoles) {
		authorized = authorized && event.locals.user.roles.includes(role);
	}

	if (!authorized) {
		return new Response('Unauthorized', {
			status: 401,
			statusText: 'Unauthorized'
		});
	}

	return await resolve(event);
};
