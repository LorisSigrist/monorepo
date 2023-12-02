import { drizzle } from 'drizzle-orm/mysql2';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USER } from '$env/static/private';
import mysql from 'mysql2/promise';

import * as UserSchema from './schema/user.js';
import * as UserRoleSchema from './schema/user-role.js';

const poolConnection = mysql.createPool({
	host: DB_HOST,
	user: DB_USER,
	password: DB_PASSWORD,
	database: DB_NAME
});

export const db = drizzle(poolConnection, {
	schema: {
		...UserSchema,
		...UserRoleSchema
	},
	mode: 'default',
	logger: true
});
