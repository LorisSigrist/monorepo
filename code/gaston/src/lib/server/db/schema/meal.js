import { mysqlTable, date } from 'drizzle-orm/mysql-core';
import { BaseTable } from '../baseTable.js';

export const Meal = mysqlTable('meal', {
	...BaseTable,
	date: date('date').notNull()
});

/**
 * @typedef {import('drizzle-orm').InferSelectModel<typeof Meal>} MealSelect
 *
 * @typedef {import('drizzle-orm').InferInsertModel<typeof Meal>} MealInsert
 */
