import { z } from 'zod';
import { JWT_KEY } from '$env/static/private';
import { verify, decode, sign } from 'jsonwebtoken';

export const JWT_COOKIE_NAME = 'jwt';

/** @type {import("jsonwebtoken").Algorithm} */
const ALGORITHM = 'HS512';

export const JWTSchema = z.object({
	user_id: z.number().int().positive()
});

/**
 * @param {string} token
 * @returns {{ valid: true, data: z.infer<typeof JWTSchema>} | { valid: false, reason: "invalid_signature" | "invalid_data" }}
 */
export const parseJWT = (token) => {
	const isValid = verify(token, JWT_KEY, { algorithms: [ALGORITHM] });
	if (!isValid) return { valid: false, reason: 'invalid_signature' };

	const raw_data = decode(token);
	const parseResult = JWTSchema.safeParse(raw_data);
	if (parseResult.success === false) return { valid: false, reason: 'invalid_data' };

	return { valid: true, data: parseResult.data };
};

/**
 * Creates and signs a JWT token
 *
 * @param {z.infer<typeof JWTSchema>} data
 * @returns {string}
 */
export const createJWT = (data) => {
	return sign(data, JWT_KEY, { algorithm: ALGORITHM });
};
