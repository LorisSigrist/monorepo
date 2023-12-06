import { eq, inArray } from 'drizzle-orm';
import { db } from '..';
import { sql } from 'drizzle-orm';

/** @template {import('drizzle-orm/mysql-core').MySqlTableWithColumns<any>} Table */
export class BaseRepository {
	/** @type {Table} */
	#table;

	/** @param {Table} table */
	constructor(table) {
		this.#table = table;
	}

	/** @param {Table['$inferInsert']} entry */
	async insert(entry) {
		await db.insert(this.#table).values(entry);
	}

	/**
	 * Returns the Entry with the given ID if it exists
	 *
	 * @param {number} id
	 * @returns {Promise<Table['$inferSelect'] | undefined>}
	 */
	async find(id) {
		return (await db.select().from(this.#table).where(eq(this.#table.id, id)).limit(1)).at(0);
	}

	/**
	 * Returns all Entries in the Table.
	 *
	 * - SHOULD NEVER BE USED IN PRODUCTION - PREFER PAGINATION
	 */
	async findAll() {
		return await db.select().from(this.#table);
	}

	/**
	 * Patches an existing Entry with the given data.
	 *
	 * @param {number} id
	 * @param {Partial<Table['$inferSelect']>} patch
	 * @returns {Promise<void>}
	 */
	async patch(id, patch) {
		await db.update(this.#table).set({ values: patch }).where(eq(this.#table.id, id));
	}

	/**
	 * Deletes the Entry with the given ID
	 *
	 * @param {number} id
	 */
	async delete(id) {
		await db.delete(this.#table).where(eq(this.#table.id, id));
	}

	/**
	 * Get multiple Entries by their IDs in a single query.
	 *
	 * - IT DOES NOT GUARANTEE THE ORDER OF THE RESULTS
	 * - If an ID does not exist, it will not be returned in the result, but it will not throw an error
	 *   either.
	 *
	 * @param {Iterable<number>} ids
	 * @returns {Promise<Table['$inferSelect'][]>}
	 */
	async bulkFind(ids) {
		const idArray = [...ids];
		return await db.select().from(this.#table).where(inArray(this.#table.id, idArray));
	}

	/**
	 * Insert multiple Entries in a single query.
	 *
	 * @param {Iterable<Table['$inferSelect']>} entries
	 * @returns {Promise<void>}
	 */
	async bulkInsert(entries) {
		await db.insert(this.#table).values([...entries]);
	}

	/**
	 * Delete multiple Entries by their IDs in a single query.
	 *
	 * @param {Iterable<number>} ids
	 * @returns {Promise<void>}
	 */
	async bulkDelete(ids) {
		const idArray = [...ids];
		await db.delete(this.#table).where(inArray(this.#table.id, idArray));
	}

	/**
	 * Returns the total number of Entries in the Table.s
	 *
	 * @returns {Promise<number>}
	 */
	async count() {
		/** @type {import('drizzle-orm').SQL<number>} */
		const count = sql`cast(count(*) as UNSIGNED)`;
		return (await db.select({ count }).from(this.#table))[0].count;
	}
}
