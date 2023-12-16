CREATE TABLE `asscess` (
  `username` String PRIMARY KEY,
  `passwordHash` String,
  `createAt` timeswap DEFAULT "now()",
  `updateAt` timeswap,
  `lastLogin` timeswap,
  `role_id` long
);

CREATE TABLE `roles` (
  `id` long PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(20) UNIQUE,
  `table_asscess` varchar(255)[]
);

CREATE TABLE `company_detail` (
  `id` long PRIMARY KEY AUTO_INCREMENT,
  `comp_name` varchar(255),
  `phone` varchar(10),
  `address` long,
  `mst` varchar(10),
  `license` text,
  `avt` varchar(255),
  `type` int
);

CREATE TABLE `categories` (
  `id` varchar(50) PRIMARY KEY,
  `name` varchar(255),
  `icon` varchar(255)
);

CREATE TABLE `product_variants` (
  `id` long PRIMARY KEY AUTO_INCREMENT,
  `pro_id` long,
  `key` varchar(255),
  `label` varchar(255),
  `type` ENUM ('simple', 'multiple'),
  `default` varchar(255),
  `isVisible` int DEFAULT 1
);

CREATE TABLE `variants_options` (
  `id` long PRIMARY KEY AUTO_INCREMENT,
  `key` varchar(50),
  `label` varchar(50),
  `product_variants_id` long
);

CREATE TABLE `price_change` (
  `id` long PRIMARY KEY AUTO_INCREMENT,
  `type` ENUM ('simple', 'multiple'),
  `amout` double,
  `variants_options_id` long
);

CREATE TABLE `products` (
  `id` long PRIMARY KEY AUTO_INCREMENT,
  `name` String,
  `categoryId` String,
  `description` String
);

CREATE TABLE `produt_image` (
  `id` long PRIMARY KEY DEFAULT "now()",
  `pro_id` long,
  `path` String UNIQUE,
  `alt` String,
  `active` int
);

CREATE TABLE `sale` (
  `id` long PRIMARY KEY AUTO_INCREMENT,
  `amout` double,
  `type` ENUM ('fixed', 'percent'),
  `product_id` long
);

CREATE TABLE `product_price` (
  `id` long PRIMARY KEY AUTO_INCREMENT,
  `price` money,
  `pro_id` long
);

CREATE TABLE `notification` (
  `id` long PRIMARY KEY AUTO_INCREMENT,
  `image` varchar(255),
  `title` varchar(255),
  `content` varchar(255)
);

CREATE TABLE `customer` (
  `id` long PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(50),
  `dob` timeswap,
  `phone` varchar(12),
  `avt` varchar(255),
  `email` varchar(255),
  `address_id` long
);

CREATE TABLE `address` (
  `id` long PRIMARY KEY AUTO_INCREMENT,
  `country` varchar(255),
  `province` varchar(255),
  `district` varchar(255),
  `street` varchar(255)
);

CREATE TABLE `cart_item` (
  `id` long PRIMARY KEY AUTO_INCREMENT
);

ALTER TABLE `asscess` ADD FOREIGN KEY (`role_id`) REFERENCES `roles` (`id`);

ALTER TABLE `company_detail` ADD FOREIGN KEY (`address`) REFERENCES `address` (`id`);

ALTER TABLE `variants_options` ADD FOREIGN KEY (`product_variants_id`) REFERENCES `product_variants` (`id`);

ALTER TABLE `price_change` ADD FOREIGN KEY (`variants_options_id`) REFERENCES `variants_options` (`id`);

ALTER TABLE `product_variants` ADD FOREIGN KEY (`pro_id`) REFERENCES `products` (`id`);

ALTER TABLE `sale` ADD FOREIGN KEY (`product_id`) REFERENCES `products` (`id`);

ALTER TABLE `produt_image` ADD FOREIGN KEY (`pro_id`) REFERENCES `products` (`id`);

ALTER TABLE `product_price` ADD FOREIGN KEY (`pro_id`) REFERENCES `products` (`id`);

ALTER TABLE `products` ADD FOREIGN KEY (`categoryId`) REFERENCES `categories` (`id`);

ALTER TABLE `customer` ADD FOREIGN KEY (`address_id`) REFERENCES `address` (`id`);
