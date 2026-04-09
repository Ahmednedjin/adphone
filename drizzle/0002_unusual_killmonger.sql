ALTER TABLE `users` ADD `username` varchar(50);--> statement-breakpoint
ALTER TABLE `users` ADD `password_hash` text;--> statement-breakpoint
ALTER TABLE `users` ADD `phone` varchar(20);--> statement-breakpoint
ALTER TABLE `users` ADD `email_verified` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD `phone_verified` timestamp;--> statement-breakpoint
ALTER TABLE `users` ADD `email_verification_token` varchar(255);--> statement-breakpoint
ALTER TABLE `users` ADD `phone_verification_code` varchar(10);--> statement-breakpoint
ALTER TABLE `users` ADD CONSTRAINT `users_username_unique` UNIQUE(`username`);