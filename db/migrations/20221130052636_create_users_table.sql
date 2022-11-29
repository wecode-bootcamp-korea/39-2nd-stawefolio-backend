-- migrate:up
CREATE TABLE `users` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `kakao_id` bigint NOT NULL,
  `name` varchar(255),
  `email` varchar(64) NOT NULL,
  `password` varchar(15),
  `phone_number` varchar(20),
  `profile_image_url` varchar(2083),
  `created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP
);

-- migrate:down
DROP TABLE users