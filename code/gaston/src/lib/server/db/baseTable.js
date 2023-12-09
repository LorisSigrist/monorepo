import { sql } from 'drizzle-orm';
import { bigint, datetime } from 'drizzle-orm/mysql-core';

export const BaseTable = {
	id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
	created: datetime('created')
		.notNull()
		.default(sql`CURRENT_TIMESTAMP`)
};
