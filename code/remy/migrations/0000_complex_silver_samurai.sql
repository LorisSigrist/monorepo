CREATE TABLE `user` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`created` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
	`username` varchar(256) NOT NULL,
	`password` varchar(256) NOT NULL,
	`roles` int NOT NULL DEFAULT 0,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `uix_username` UNIQUE(`username`)
);
--> statement-breakpoint
CREATE INDEX `ix_username` ON `user` (`username`);