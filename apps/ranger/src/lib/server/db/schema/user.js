import { index, mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { BaseTable } from '../baseTable.js';

export const User = mysqlTable(
	'user',
	{
		...BaseTable,

		username: varchar('username', { length: 256 }).notNull().unique('uix_username'),
		password: varchar('password', { length: 256 }).notNull()
	},
	(table) => ({
		ix_username: index('ix_username').on(table.username)
	})
);
