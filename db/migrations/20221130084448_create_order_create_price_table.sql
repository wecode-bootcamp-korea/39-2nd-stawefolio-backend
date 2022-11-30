-- migrate:up
ALTER TABLE `orders` ADD `price` decimal NOT NULL AFTER `number_of_user`;

-- migrate:down

