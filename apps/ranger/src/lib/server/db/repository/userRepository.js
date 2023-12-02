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
	 * @param {number} id
	 */
	async getUser(id) {
		return await db.query.User.findFirst({
			where: eq(User.id, id),
			with: {
				usersToUserRole: {
					with: {
						role: true
					}
				}
			}
		});
	}

	/**
	 * Get a user by their username if they exist.
	 * @param {string} username
	 */
	async getByName(username) {
		return await db.query.User.findFirst({
			where: eq(User.username, username),
			with: {
				usersToUserRole: {
					with: {
						role: true
					}
				}
			}
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

	/**
	 *
	 * @param {*} userData
	 * @param {*} roleIds
	 */
	async createWithRoles(userData, roleIds) {}
}

export const userRepository = new UserRepository();
