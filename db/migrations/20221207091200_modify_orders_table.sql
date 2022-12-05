-- migrate:up
ALTER TABLE `orders` MODIFY `order_number` varchar(255) NOT NULL

-- migrate:down

