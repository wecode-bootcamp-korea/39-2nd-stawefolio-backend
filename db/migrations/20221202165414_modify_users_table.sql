-- migrate:up
ALTER TABLE users ADD CONSTRAINT UK_users UNIQUE (kakao_id)

-- migrate:down

