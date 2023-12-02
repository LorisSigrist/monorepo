import { UserRole } from '../schema/user-role';
import { BaseRepository } from './baseRepository';

/**
 * @extends BaseRepository<UserRole>
 */
class UserRoleRepository extends BaseRepository {
	constructor() {
		super(UserRole);
	}
}

export const userRoleRepository = new UserRoleRepository();
