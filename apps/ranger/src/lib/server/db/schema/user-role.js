import { bigint, mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { User } from './user.js';
import { relations } from 'drizzle-orm';

export const UserRole = mysqlTable('user_role', {
	id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
	name: varchar('name', { length: 256 }).notNull().unique('uix_name'),
	role: varchar('role', { length: 256 }).notNull().unique('uix_role')
});

// Many to many relationship between users and user roles
export const UserToUserRoleJoinTable = mysqlTable('user_to_user_role', {
	id: bigint('id', { mode: 'number' }).primaryKey().autoincrement(),
	user_id: bigint('user_id', { mode: 'number' })
		.references(() => User.id, { onDelete: 'cascade' })
		.notNull(),
	user_role_id: bigint('user_role_id', { mode: 'number' })
		.references(() => UserRole.id, { onDelete: 'cascade' })
		.notNull()
});

//The relation from the users table to the UserToUserRole table
export const UsersRelation = relations(User, ({ many }) => ({
	usersToUserRole: many(UserToUserRoleJoinTable)
}));

//The relation from the users-roles table to the UserToUserRole table
export const UserRolesRelation = relations(UserRole, ({ many }) => ({
	usersToUserRole: many(UserToUserRoleJoinTable)
}));

//The relation from the UserToUserRole table to the User and UserRole tables
export const UsersToUserRolesRelation = relations(UserToUserRoleJoinTable, ({ one }) => ({
	user: one(User, {
		fields: [UserToUserRoleJoinTable.user_id],
		references: [User.id]
	}),
	role: one(UserRole, {
		fields: [UserToUserRoleJoinTable.user_role_id],
		references: [UserRole.id]
	})
}));
