-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='TRADITIONAL,ALLOW_INVALID_DATES';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `kog_db` DEFAULT CHARACTER SET utf8 ;
-- -----------------------------------------------------
-- Schema kog_db
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema kog_db
-- -----------------------------------------------------


-- -----------------------------------------------------
-- Table `mydb`.`products`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kog_db`.`products` (
  `product_id` INT NULL AUTO_INCREMENT,
  `title` VARCHAR(45) NULL,
  `price` DECIMAL(11) NULL,
  `category` VARCHAR(100) NULL,
  `description` VARCHAR(1000) NULL,
  `quantity` INT NULL,
  `product_img` BLOB NULL, 
  PRIMARY KEY (`product_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `kog_db`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kog_db`.`users` (
  `user_id` INT NULL AUTO_INCREMENT,
  `fname` VARCHAR(45) NULL,
  `lname` VARCHAR(45) NULL,
  `address` VARCHAR(45) NULL,
  `city` VARCHAR(45) NULL,
  `state` VARCHAR(45) NULL,
  `zip` VARCHAR(45) NULL,
  `phone` INT NULL,
  `access` INT NULL,
  `email` VARCHAR(45) NULL,
  `password` VARCHAR(255) NULL,
  `notes` VARCHAR(1000) NULL,
  `credit` VARCHAR(1000) NULL,
  `img_url` VARCHAR(1000) NULL,
  PRIMARY KEY (`user_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`cart`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kog_db`.`cart` (
  `cart_id` INT NULL AUTO_INCREMENT,
  `user_id` INT NULL,
  `cart_date` TIMESTAMP NULL DEFAULT current_timestamp,
  PRIMARY KEY (`cart_id`),
  INDEX `fk_cart_user_idx` (`user_id` ASC),
  CONSTRAINT `fk_cart_user`
    FOREIGN KEY (`user_id`)
    REFERENCES `kog_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`employee`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kog_db`.`employee` (
  `employee_id` INT NULL,
  `position` VARCHAR(100) NULL,
  `is_admin` TINYINT(1) NULL,
  PRIMARY KEY (`employee_id`),
  UNIQUE INDEX `employee_id_UNIQUE` (`employee_id` ASC),
  CONSTRAINT `fk_emplyee_user`
    FOREIGN KEY (`employee_id`)
    REFERENCES `kog_db`.`users` (`user_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`cart_item`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kog_db`.`cart_item` (
  `cart_id` INT NULL,
  `product_id` INT NULL,
  `quantity` INT NULL,
  PRIMARY KEY (`cart_id`, `product_id`),
  INDEX `fk_cart_items_product_idx` (`product_id` ASC),
  CONSTRAINT `fk_cart_items_cart`
    FOREIGN KEY (`cart_id`)
    REFERENCES `mydb`.`cart` (`cart_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_cart_items_product`
    FOREIGN KEY (`product_id`)
    REFERENCES `mydb`.`products` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kog_db`.`category` (
  `cat_id` INT NULL AUTO_INCREMENT,
  `cat_name` VARCHAR(45) NULL,
  `description` VARCHAR(255) NULL,
  PRIMARY KEY (`cat_id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`product_category`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `kog_db`.`product_category` (
  `product_id` INT NOT NULL,
  `cat_id` INT NOT NULL,
  PRIMARY KEY (`product_id`, `cat_id`),
  INDEX `fk_product_category_category_idx` (`cat_id` ASC),
  CONSTRAINT `fk_product_cat_product`
    FOREIGN KEY (`product_id`)
    REFERENCES `mydb`.`products` (`product_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_product_category_category`
    FOREIGN KEY (`cat_id`)
    REFERENCES `mydb`.`category` (`cat_id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;

USE `kog_db` ;

SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
