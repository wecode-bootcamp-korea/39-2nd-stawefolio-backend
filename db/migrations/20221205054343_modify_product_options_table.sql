-- migrate:up
ALTER TABLE `product_options`
  MODIFY `check_in_time` time NOT NULL,
  MODIFY `check_out_time` time NOT NULL;

-- migrate:down

