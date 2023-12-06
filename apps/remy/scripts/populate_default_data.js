import { drizzle } from 'drizzle-orm/mysql2';
import { createConnection } from 'mysql2';
import { config } from 'dotenv';
import { User } from '../src/lib/server/db/schema/user.js';
import { ROLES } from '../src/lib/auth/roles.js';
import { hash } from 'argon2';
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
	password: await hash('admin'),
	roles: ROLES['ADMIN'] | ROLES['USER']
});

process.exit(0);
