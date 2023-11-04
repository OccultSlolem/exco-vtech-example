-- This table replicates the insecure setup that was used by VTech.
-- It is not intended to be used in production, but rather to demonstrate
-- the vulnerability of the system.

DROP DATABASE IF EXISTS vtech;
CREATE DATABASE IF NOT EXISTS vtech;

USE vtech;

DROP TABLE IF EXISTS `vtech`.`parents`;

CREATE TABLE IF NOT EXISTS `vtech`.`Parents` (
  id INT NOT NULL AUTO_INCREMENT,
  email VARCHAR(255) NOT NULL,
  encrypted_password VARCHAR(255) NOT NULL,
  first_name VARCHAR(255) NOT NULL,
  last_name VARCHAR(255) NOT NULL,
  password_hint VARCHAR(255),
  secret_question VARCHAR(255),
  secret_answer VARCHAR(255),
  email_promotion BOOLEAN DEFAULT false,
  active BOOLEAN DEFAULT false,
  first_login DATETIME,
  last_login DATETIME,
  login_count INT DEFAULT 0,
  free_order_count INT DEFAULT 0,
  pay_order_count INT DEFAULT 0,
  client_ip VARCHAR(255),
  client_location VARCHAR(255),
  registration_url VARCHAR(255),
  country VARCHAR(255),
  address VARCHAR(255),
  city VARCHAR(255),
  state VARCHAR(255),
  zip VARCHAR(255),
  updated_datetime TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id)
)
ENGINE = InnoDB;

DROP TABLE IF EXISTS `vtech`.`children`;

CREATE TABLE IF NOT EXISTS `vtech`.`Children` (
  id INT AUTO_INCREMENT,
  username VARCHAR(255),
  domain VARCHAR(255),
  ll_child_id INT,
  ll_parent_id INT,
  parent_id INT,
  country_lang VARCHAR(255),
  create_datetime DATETIME,
  expired_datetime DATETIME,
  PRIMARY KEY (id),
  FOREIGN KEY (parent_id) REFERENCES Parents(id)
)
ENGINE = InnoDB;
