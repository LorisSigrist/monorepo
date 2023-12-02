CREATE TABLE `user_role` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`name` varchar(256) NOT NULL,
	`role` varchar(256) NOT NULL,
	CONSTRAINT `user_role_id` PRIMARY KEY(`id`),
	CONSTRAINT `ix_name` UNIQUE(`name`),
	CONSTRAINT `ix_role` UNIQUE(`role`)
);
--> statement-breakpoint
ALTER TABLE `user` ADD `created` datetime DEFAULT '2023-11-08 14:25:45.665' NOT NULL;