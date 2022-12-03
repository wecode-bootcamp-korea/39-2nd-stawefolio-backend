-- migrate:up
ALTER TABLE `sub_categories`
  DROP FOREIGN KEY `FK_sub_categories_main_category_id_main_categories_id`,
  DROP `main_category_id`;

CREATE TABLE `main_categories_sub_categories`(
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT, 
  `main_category_id` INT NOT NULL,
  `sub_category_id` INT NOT NULL,
  CONSTRAINT FK_main_categories_sub_categories_main_categories_id FOREIGN KEY (main_category_id) REFERENCES main_categories (id),
  CONSTRAINT FK_main_categories_sub_categories_sub_categories_id FOREIGN KEY (sub_category_id) REFERENCES sub_categories (id)
)

-- migrate:down