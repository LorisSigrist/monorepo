/** @type {['USER', 'ADMIN']} */
export const VALID_ROLES = ['USER', 'ADMIN'];

/** @type {Record<(typeof VALID_ROLES)[number], number>} */
export const ROLES = {
	USER: 0b0001,
	ADMIN: 0b0010
};
