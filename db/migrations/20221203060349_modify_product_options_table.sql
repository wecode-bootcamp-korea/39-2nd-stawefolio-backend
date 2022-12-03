-- migrate:up
ALTER TABLE `product_options`
  MODIFY `check_in_time` date NOT NULL,
  MODIFY `check_out_time` date NOT NULL;

-- migrate:down

