-- ---------------- mysql ---------------
-- -- create db
-- CREATE DATABASE IF NOT EXISTS ecommerce CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
-- USE ecommerce;

-- -- users
-- CREATE TABLE IF NOT EXISTS users (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   name VARCHAR(100) NOT NULL,
--   email VARCHAR(100) NOT NULL UNIQUE,
--   password VARCHAR(255) NOT NULL,
--   is_admin TINYINT(1) DEFAULT 0,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- products
-- CREATE TABLE IF NOT EXISTS products (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   title VARCHAR(255) NOT NULL,
--   description TEXT,
--   price DECIMAL(10,2) NOT NULL DEFAULT 0.00,
--   stock INT NOT NULL DEFAULT 0,
--   image VARCHAR(255),
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- orders
-- CREATE TABLE IF NOT EXISTS orders (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   user_id INT NOT NULL,
--   total DECIMAL(10,2) NOT NULL,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--   FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
-- );

-- -- order_items
-- CREATE TABLE IF NOT EXISTS order_items (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   order_id INT NOT NULL,
--   product_id INT NOT NULL,
--   quantity INT NOT NULL,
--   price DECIMAL(10,2) NOT NULL,
--   FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
--   FOREIGN KEY (product_id) REFERENCES products(id)
-- );








-- --------------- here is what i used in the sequelace currentcode  = ---------------
-- USE ecommerce;

-- SELECT * FROM orders ORDER BY created_at DESC LIMIT 5;
-- SELECT * FROM order_items ORDER BY id DESC LIMIT 10;



-- CREATE TABLE products (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   name VARCHAR(255),
--   price INT,
--   description TEXT,
--   image VARCHAR(255)
-- );


-- INSERT INTO products (name, price, description, image) VALUES
-- ('Classic White T-Shirt', 499, 'Soft cotton T-shirt', '👕'),
-- ('Plant', 1299, 'Indoor decorative plant', '🪴'),
-- ('Sneakers', 2499, 'Comfortable running sneakers', '👟'),
-- ('Leather Wallet', 799, 'Stylish and durable wallet', '👛'),
-- ('Smart ring', 6999, 'Track fitness and do payments easily', '💍'),
-- ('Casual Jacket', 1999, 'Perfect for cool evenings', '🧥');

-- select * from products;


-- CREATE TABLE cart (
--   id INT AUTO_INCREMENT PRIMARY KEY,
--   product_id INT NOT NULL,
--   quantity INT NOT NULL DEFAULT 1,
--   created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

--   FOREIGN KEY (product_id) REFERENCES products(id)
-- );












-- --------------- postgress ---------------
-- create db (in Postgres you usually create db via Render UI, so you can skip this)
-- CREATE DATABASE ecommerce;

-- users
CREATE TABLE IF NOT EXISTS users (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  is_admin BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- products
CREATE TABLE IF NOT EXISTS products (
  id SERIAL PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  description TEXT,
  price NUMERIC(10,2) NOT NULL DEFAULT 0.00,
  stock INT NOT NULL DEFAULT 0,
  image VARCHAR(255),
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- orders
CREATE TABLE IF NOT EXISTS orders (
  id SERIAL PRIMARY KEY,
  user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  total NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- order_items
CREATE TABLE IF NOT EXISTS order_items (
  id SERIAL PRIMARY KEY,
  order_id INT NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id INT NOT NULL REFERENCES products(id),
  quantity INT NOT NULL,
  price NUMERIC(10,2) NOT NULL
);

-- cart
CREATE TABLE IF NOT EXISTS cart (
  id SERIAL PRIMARY KEY,
  product_id INT NOT NULL REFERENCES products(id),
  quantity INT NOT NULL DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

-- sample products (optional)
INSERT INTO products (title, price, description, image) VALUES
('Classic White T-Shirt', 499, 'Soft cotton T-shirt', '👕'),
('Plant', 1299, 'Indoor decorative plant', '🪴'),
('Sneakers', 2499, 'Comfortable running sneakers', '👟'),
('Leather Wallet', 799, 'Stylish and durable wallet', '👛'),
('Smart ring', 6999, 'Track fitness and do payments easily', '💍'),
('Casual Jacket', 1999, 'Perfect for cool evenings', '🧥');

-- example query
-- SELECT * FROM orders ORDER BY created_at DESC LIMIT 5;
-- SELECT * FROM order_items ORDER BY id DESC LIMIT 10;
-- SELECT * FROM products;









