-- migrate:up
ALTER TABLE `orders` ADD `check_in_date` datetime NOT NULL AFTER `number_of_user`;
ALTER TABLE `orders` ADD `check_out_date` datetime NOT NULL AFTER `check_in_date`;

-- migrate:down

