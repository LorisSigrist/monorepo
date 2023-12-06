import { z } from 'zod';
import { error } from '@sveltejs/kit';
import { userRepository } from '$lib/server/db/repository/userRepository.js';

const PaginationParamSchema = z.object({
	offset: z.number({ coerce: true }).int().nonnegative().finite().default(0),
	limit: z.number({ coerce: true }).int().nonnegative().finite().default(20)
});

export async function load({ locals, url }) {
	const { limit, offset } = parseSearchParams(url, PaginationParamSchema);

	const users = await userRepository.findByPaginated(offset, limit);
	return { users };
}

/**
 * @template {z.ZodSchema<any>} Z
 *
 * @param {URL} url
 * @param {Z} schema
 * @returns {z.infer<Z>}
 *
 * @throws {ReturnType<typeof error>}
 */
function parseSearchParams(url, schema) {
	const params = Object.fromEntries(url.searchParams.entries());
	const parseResult = schema.safeParse(params);

	if (parseResult.success === false) {
		throw error(400, 'Invalid Search Params');
	}

	return parseResult.data;
}
