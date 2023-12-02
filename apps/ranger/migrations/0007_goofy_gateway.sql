ALTER TABLE `user_role` DROP CONSTRAINT `ix_name`;--> statement-breakpoint
ALTER TABLE `user_role` DROP CONSTRAINT `ix_role`;--> statement-breakpoint
ALTER TABLE `user_role` ADD CONSTRAINT `uix_name` UNIQUE(`name`);--> statement-breakpoint
ALTER TABLE `user_role` ADD CONSTRAINT `uix_role` UNIQUE(`role`);