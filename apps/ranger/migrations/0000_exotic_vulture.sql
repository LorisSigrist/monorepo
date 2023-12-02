CREATE TABLE `user` (
	`id` bigint AUTO_INCREMENT NOT NULL,
	`username` varchar(256) NOT NULL,
	`password` varchar(256) NOT NULL,
	CONSTRAINT `user_id` PRIMARY KEY(`id`),
	CONSTRAINT `ix_username` UNIQUE(`username`)
);
