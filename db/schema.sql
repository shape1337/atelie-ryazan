-- Схема базы данных для ателье
CREATE DATABASE IF NOT EXISTS `atelie` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE `atelie`;

CREATE TABLE IF NOT EXISTS `users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `phone` VARCHAR(50) NOT NULL UNIQUE,
  `email` VARCHAR(200),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `services` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(200) NOT NULL,
  `description` TEXT,
  `price` INT UNSIGNED DEFAULT 0,
  `duration_minutes` INT UNSIGNED DEFAULT 60,
  PRIMARY KEY (`id`)
);

CREATE TABLE IF NOT EXISTS `appointments` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `user_id` INT UNSIGNED NOT NULL,
  `service_id` INT UNSIGNED NOT NULL,
  `date_time` DATETIME NOT NULL,
  `status` VARCHAR(50) NOT NULL DEFAULT 'new',
  `comment` TEXT,
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_appointments_user` FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_appointments_service` FOREIGN KEY (`service_id`) REFERENCES `services`(`id`) ON DELETE RESTRICT
);

-- Примеры данных (опционально)
INSERT INTO services (name, description, price, duration_minutes) VALUES
('Подшивка платья', 'Аккуратная подшивка юбок и платьев', 500, 30),
('Укорачивание рукавов', 'Укорачивание или удлинение рукавов', 700, 45);
