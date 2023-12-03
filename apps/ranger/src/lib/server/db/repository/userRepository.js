import { eq } from 'drizzle-orm';
import { db } from '..';
import { User } from '../schema/user.js';
import { BaseRepository } from './baseRepository';

/**
 * @extends BaseRepository<User>
 */
class UserRepository extends BaseRepository {
	constructor() {
		super(User);
	}

	/**
	 * Get a user by their username if they exist.
	 * @param {string} username
	 */
	async getByName(username) {
		return await db.query.User.findFirst({
			where: eq(User.username, username)
		});
	}

	/**
	 * Returns the paginated Users, sorted by ID (asc)
	 * @param {number} offset
	 * @param {number} limit
	 *
	 * @return
	 */
	async findByPaginated(offset, limit) {
		return await db.select().from(User).orderBy(User.id).limit(limit).offset(offset);
	}
}

export const userRepository = new UserRepository();
