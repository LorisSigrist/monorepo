CREATE TABLE `user_to_user_role` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`user_id` bigint NOT NULL,
	`user_role_id` bigint NOT NULL,
	CONSTRAINT `user_to_user_role_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `created` datetime NOT NULL DEFAULT '2023-11-08 14:45:02.828';--> statement-breakpoint
ALTER TABLE `user_to_user_role` ADD CONSTRAINT `user_to_user_role_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE `user_to_user_role` ADD CONSTRAINT `user_to_user_role_user_role_id_user_role_id_fk` FOREIGN KEY (`user_role_id`) REFERENCES `user_role`(`id`) ON DELETE cascade ON UPDATE no action;