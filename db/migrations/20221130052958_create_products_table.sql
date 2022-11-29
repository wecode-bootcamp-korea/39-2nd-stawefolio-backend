-- migrate:up
CREATE TABLE `main_categories` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL
);

CREATE TABLE `features` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL
);

CREATE TABLE `amenities` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL
);

CREATE TABLE `sub_categories` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `main_category_id` INT NOT NULL,
  CONSTRAINT FK_sub_categories_main_category_id_main_categories_id FOREIGN KEY (main_category_id) REFERENCES main_categories (id)
);

CREATE TABLE `products` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `thumbnail_image_url` varchar(2083),
  `regions` varchar(50) NOT NULL,
  `description` text,
  `sub_category_id` INT NOT NULL,
  `created_at` TIMESTAMP NOT NULL DEFAULT (CURRENT_TIMESTAMP),
  `updated_at` TIMESTAMP,
  CONSTRAINT FK_products_sub_category_id_sub_categories_id FOREIGN KEY (sub_category_id) REFERENCES sub_categories (id)
);

CREATE TABLE `product_options` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `thumbnail_image_url` varchar(2083),
  `description` varchar(255) NOT NULL,
  `size` INT NOT NULL,
  `price` decimal NOT NULL,
  `number_of_guests` INT NOT NULL,
  `check_in_time` datetime,
  `check_out_time` datetime,
  `product_id` INT NOT NULL,
  CONSTRAINT FK_product_options_product_id_products_id FOREIGN KEY (product_id) REFERENCES products (id)
);

CREATE TABLE `available_product_options` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `available_date` datetime NOT NULL,
  `product_option_id` INT NOT NULL,
  `is_available` boolean NOT NULL,
  CONSTRAINT FK_available_product_options_product_option_id_product_options FOREIGN KEY (product_option_id) REFERENCES product_options (id)
);

CREATE TABLE `product_option_image_url` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `image_url` varchar(2083),
  `product_option_id` INT NOT NULL,
  CONSTRAINT FK_product_option_image_url_product_option_id_product_options_id FOREIGN KEY (product_option_id) REFERENCES product_options (id)
);

CREATE TABLE `product_option_amenity` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `amenity_id` INT NOT NULL,
  `product_option_id` INT NOT NULL,
  CONSTRAINT FK_product_option_amenity_product_option_id_product_options FOREIGN KEY (product_option_id) REFERENCES product_options (id),
  CONSTRAINT FK_product_option_amenity_amenity_id_amenities_id FOREIGN KEY (amenity_id) REFERENCES amenities (id)
);

CREATE TABLE `product_options_features` (
  `id` INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
  `feature_id` INT NOT NULL,
  `product_option_id` INT NOT NULL,
  CONSTRAINT FK_product_options_features_feature_id_features_id FOREIGN KEY (feature_id) REFERENCES features (id),
  CONSTRAINT FK_product_options_features_product_option_id_product_options_id FOREIGN KEY (product_option_id) REFERENCES product_options (id)
);

-- migrate:down
DROP TABLE products
DROP TABLE product_options
DROP TABLE product_option_image_url
DROP TABLE features
DROP TABLE product_options_features
DROP TABLE available_product_options
DROP TABLE main_categories
DROP TABLE sub_categories
DROP TABLE amenities
DROP TABLE product_option_amenity