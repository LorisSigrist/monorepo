import { z } from 'zod';
import { JWT_KEY } from '$env/static/private';
import jsonwebtoken from 'jsonwebtoken';
import { Result } from '@sigrist.dev/result';

const { verify, decode, sign } = jsonwebtoken;

export const JWT_COOKIE_NAME = 'jwt';

/** @type {import("jsonwebtoken").Algorithm} */
const ALGORITHM = 'HS512';

export const JWTSchema = z.object({
	user_id: z.number().int().nonnegative().describe('User ID'),
	roles: z.number().int().nonnegative().describe('Bitmask of roles'),
	exp: z.number().int().nonnegative().describe('Unix timestamp in seconds')
});

/**
 * @typedef {z.infer<typeof JWTSchema>} JWT
 */

/**
 * @param {string} token
 * @returns {import("@sigrist.dev/result").Result<JWT, {
 * 		invalid_signature: undefined,
 * 		invalid_data: { raw: any },
 * 		expired: { exp: number }
 * }>}
 */
export const parseJWT = (token) => {
	const isValid = verify(token, JWT_KEY, { algorithms: [ALGORITHM] });
	if (!isValid) {
		return Result.bad('invalid_signature', undefined);
	}

	const raw_data = decode(token);
	const parseResult = JWTSchema.safeParse(raw_data);

	if (parseResult.success === false) {
		return Result.bad('invalid_data', { raw: raw_data });
	}

	if (Date.now() > parseResult.data.exp * 1000) {
		return Result.bad('expired', { exp: parseResult.data.exp });
	}

	return Result.ok(parseResult.data);
};

/**
 * Creates and signs a JWT token
 *
 * @param {Omit<JWT, "exp">} data
 * @returns {string}
 */
export const createJWT = (data) => {
	/** @type {JWT} */
	const jwt = {
		...data,
		exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30 // 30 days
	};

	return sign(jwt, JWT_KEY, { algorithm: ALGORITHM });
};
