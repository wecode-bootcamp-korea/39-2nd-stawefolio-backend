-- migrate:up
CREATE TABLE `order_status` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL
);

CREATE TABLE `orders` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `order_number` binary(16) NOT NULL,
  `product_option_id` INT NOT NULL,
  `number_of_user` INT NOT NULL,
  `user_id` INT NOT NULL,
  `order_status_id` int NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP,
  CONSTRAINT FK_orders_user_id_user_id FOREIGN KEY (user_id) REFERENCES users (id),
  CONSTRAINT FK_orders_order_status_id_order_status FOREIGN KEY (order_status_id) REFERENCES order_status (id),
  CONSTRAINT FK_orders_product_option_id_product_options_id FOREIGN KEY (product_option_id) REFERENCES product_options (id)
);

-- migrate:down
DROP TABLE orders
DROP TABLE order_status