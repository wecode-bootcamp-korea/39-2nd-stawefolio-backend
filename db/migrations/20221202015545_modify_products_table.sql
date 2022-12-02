-- migrate:up
ALTER TABLE `products`
  ADD `address` varchar(255) NOT NULL AFTER `regions`,
  ADD `latitude` decimal(18,10) NOT NULL AFTER `address`,
  ADD `longitude` decimal(18,10) NOT NULL AFTER `latitude`

-- migrate:down

