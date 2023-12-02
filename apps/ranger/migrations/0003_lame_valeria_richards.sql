CREATE TABLE `session` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`valid_until` timestamp NOT NULL,
	`token` varchar(256) NOT NULL,
	`user_id` bigint NOT NULL,
	CONSTRAINT `session_id` PRIMARY KEY(`id`),
	CONSTRAINT `uix_token` UNIQUE(`token`)
);
--> statement-breakpoint
ALTER TABLE `user` MODIFY COLUMN `created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP;--> statement-breakpoint
CREATE INDEX `ix_token` ON `session` (`token`);--> statement-breakpoint
ALTER TABLE `session` ADD CONSTRAINT `session_user_id_user_id_fk` FOREIGN KEY (`user_id`) REFERENCES `user`(`id`) ON DELETE no action ON UPDATE no action;