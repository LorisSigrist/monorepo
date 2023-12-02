import { drizzle } from 'drizzle-orm/mysql2';
import { createConnection } from 'mysql2';
import { config } from 'dotenv';
import { User } from '../src/lib/server/db/schema/user.js';
import { UserRole, UsersToUserRolesRelation } from '../src/lib/server/db/schema/user-role.js';
import { eq } from 'drizzle-orm';
config();

const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } = process.env;

const connection = createConnection({
	host: DB_HOST,
	user: DB_USER,
	password: DB_PASSWORD,
	database: DB_NAME
});

const db = drizzle(connection);

await db.insert(User).values({
	username: 'admin',
	password: 'admin'
});

//Create the user roles
await db.insert(UserRole).values({
	role: 'admin',
	name: 'Administrator'
});

await db.insert(UserRole).values({
	role: 'user',
	name: 'User'
});

const [adminRole] = await db.select().from(UserRole).where(eq(UserRole.role, 'admin'));
const [userRole] = await db.select().from(UserRole).where(eq(UserRole.role, 'user'));

//Give both roles to the admin user
await db.insert(UsersToUserRolesRelation).values({
	user_id: 1,
	user_role_id: adminRole.id
});

await db.insert(UsersToUserRolesRelation).values({
	user_id: 1,
	user_role_id: userRole.id
});

process.exit(0);
