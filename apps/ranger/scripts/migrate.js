import { drizzle } from 'drizzle-orm/mysql2';
import { migrate } from 'drizzle-orm/mysql2/migrator';
import { createConnection } from 'mysql2';
import { config } from 'dotenv';
config();

const { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } = process.env;

const connection = createConnection({
	host: DB_HOST,
	user: DB_USER,
	password: DB_PASSWORD,
	database: DB_NAME
});

const db = drizzle(connection);
await migrate(db, { migrationsFolder: './migrations' });

process.exit(0);
