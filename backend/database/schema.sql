-- MySQL Script generated by MySQL Workbench
-- Tue Jun 18 00:16:39 2024
-- Model: New Model    Version: 1.0
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS = @@UNIQUE_CHECKS, UNIQUE_CHECKS = 0;

SET
    @OLD_FOREIGN_KEY_CHECKS = @@FOREIGN_KEY_CHECKS,
    FOREIGN_KEY_CHECKS = 0;

SET
    @OLD_SQL_MODE = @@SQL_MODE,
    SQL_MODE = 'ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema cinereview
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema cinereview
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `cinereview` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci;

USE `cinereview`;

-- -----------------------------------------------------
-- Table `cinereview`.`actors`
-- -----------------------------------------------------

DROP TABLE IF EXISTS `cinereview`.`actors`;

CREATE TABLE IF NOT EXISTS `cinereview`.`actors` (
    `actor_id` INT NOT NULL AUTO_INCREMENT,
    `firstname` VARCHAR(45) NOT NULL,
    `lastname` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`actor_id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `cinereview`.`contents`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cinereview`.`contents`;

CREATE TABLE IF NOT EXISTS `cinereview`.`contents` (
    `content_id` INT NOT NULL AUTO_INCREMENT,
    `type` VARCHAR(45) NOT NULL,
    `name` VARCHAR(45) NOT NULL,
    `description` VARCHAR(255) NOT NULL,
    `release_date` DATETIME NOT NULL,
    `rating` DECIMAL(3, 1) NOT NULL,
    `thumbnail` VARCHAR(255) NOT NULL,
    `genre` VARCHAR(45) NOT NULL,
    PRIMARY KEY (`content_id`)
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `cinereview`.`users`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cinereview`.`users`;

DROP TABLE IF EXISTS `cinereview`.`users`;

CREATE TABLE IF NOT EXISTS `cinereview`.`users` ( 

  `user_id` INT NOT NULL AUTO_INCREMENT,
  `firstname` VARCHAR(45) NOT NULL,
  `lastname` VARCHAR(45) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `password` VARCHAR(245) NOT NULL,
  `telephone` VARCHAR(13) NOT NULL,
  `admin` TINYINT(1) NOT NULL DEFAULT '0',
  `thumbnail` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`user_id`)
) ENGINE = InnoDB
DEFAULT CHARACTER SET = utf8mb4
COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `cinereview`.`reviews`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cinereview`.`reviews`;

CREATE TABLE IF NOT EXISTS `cinereview`.`reviews` (
    `review_id` INT NOT NULL AUTO_INCREMENT,
    `review` VARCHAR(255) NOT NULL,
    `review_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `user_id` INT NOT NULL,
    `content_id` INT NOT NULL,
    PRIMARY KEY (`review_id`), -- Primary key with auto-increment
    INDEX `fk_reviews_users1_idx` (`user_id` ASC), -- Index for user_id (foreign key)
    INDEX `fk_reviews_contents1_idx` (`content_id` ASC), -- Index for content_id (foreign key)
    CONSTRAINT `fk_reviews_users1` FOREIGN KEY (`user_id`) REFERENCES `cinereview`.`users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `fk_reviews_contents1` FOREIGN KEY (`content_id`) REFERENCES `cinereview`.`contents` (`content_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `cinereview`.`watchlisted`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cinereview`.`watchlisted`;

CREATE TABLE IF NOT EXISTS `cinereview`.`watchlisted` (
    `user_id` INT NOT NULL,
    `content_id` INT NOT NULL,
    PRIMARY KEY (`user_id`, `content_id`),
    INDEX `fk_users_has_contents_contents1_idx` (`content_id` ASC) VISIBLE,
    INDEX `fk_users_has_contents_users_idx` (`user_id` ASC) VISIBLE,
    CONSTRAINT `fk_users_has_contents_users` FOREIGN KEY (`user_id`) REFERENCES `cinereview`.`users` (`user_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `fk_users_has_contents_contents1` FOREIGN KEY (`content_id`) REFERENCES `cinereview`.`contents` (`content_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

-- -----------------------------------------------------
-- Table `cinereview`.`contents_actors`
-- -----------------------------------------------------
DROP TABLE IF EXISTS `cinereview`.`contents_actors`;

CREATE TABLE IF NOT EXISTS `cinereview`.`contents_actors` ( 

    `content_id` INT NOT NULL,
    `actor_id` INT NOT NULL,
    PRIMARY KEY (`content_id`, `actor_id`),
    INDEX `fk_contents_has_actors_actors1_idx` (`actor_id` ASC) VISIBLE,
    INDEX `fk_contents_has_actors_contents1_idx` (`content_id` ASC) VISIBLE,
    CONSTRAINT `fk_contents_has_actors_contents1` FOREIGN KEY (`content_id`) REFERENCES `cinereview`.`contents` (`content_id`) ON DELETE NO ACTION ON UPDATE NO ACTION,
    CONSTRAINT `fk_contents_has_actors_actors1` FOREIGN KEY (`actor_id`) REFERENCES `cinereview`.`actors` (`actor_id`) ON DELETE NO ACTION ON UPDATE NO ACTION
) ENGINE = InnoDB DEFAULT CHARACTER SET = utf8mb4 COLLATE = utf8mb4_0900_ai_ci;

SET SQL_MODE = @OLD_SQL_MODE;

SET FOREIGN_KEY_CHECKS = @OLD_FOREIGN_KEY_CHECKS;

SET UNIQUE_CHECKS = @OLD_UNIQUE_CHECKS;