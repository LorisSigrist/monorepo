import { index, int, mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { BaseTable } from '../baseTable.js';

export const User = mysqlTable(
	'user',
	{
		...BaseTable,

		username: varchar('username', { length: 256 }).notNull().unique('uix_username'),
		password: varchar('password', { length: 256 }).notNull(),

		/**
		 * A bitfield of roles
		 */
		roles: int('roles').notNull().default(0)
	},
	(table) => ({
		ix_username: index('ix_username').on(table.username)
	})
);

/**
 * @typedef {import('drizzle-orm').InferSelectModel<typeof User>} UserSelect
 * @typedef {import('drizzle-orm').InferInsertModel<typeof User>} UserInsert
 */
