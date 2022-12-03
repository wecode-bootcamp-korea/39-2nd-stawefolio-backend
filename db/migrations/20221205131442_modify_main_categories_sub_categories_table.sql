-- migrate:up
ALTER TABLE `products`
DROP FOREIGN KEY `FK_products_sub_category_id_sub_categories_id`,
CHANGE `sub_category_id` `category_id` INT NOT NULL,
ADD CONSTRAINT `FK_products_category_id_main_categories_sub_categories_id` FOREIGN KEY (category_id) REFERENCES main_categories_sub_categories (id);

-- migrate:down

