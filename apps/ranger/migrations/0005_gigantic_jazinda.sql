ALTER TABLE `user` DROP CONSTRAINT `ix_username`;--> statement-breakpoint
ALTER TABLE `user` ADD CONSTRAINT `uix_username` UNIQUE(`username`);