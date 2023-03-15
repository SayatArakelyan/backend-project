-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1
-- Время создания: Янв 01 2021 г., 21:20
-- Версия сервера: 10.4.17-MariaDB
-- Версия PHP: 8.0.0

--
-- База данных: `test_project`
--

CREATE DATABASE IF NOT EXISTS test_project;

CREATE TABLE test_project.users(
          `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
          `registrationDate` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP,
          `firstName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
          `lastName` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
          `email` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
          `birthDate` date NOT NULL,
          `ipAddress` varchar(25) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
          `status` enum('lead','demo','client') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
          PRIMARY KEY (`id`),
          KEY `idx-user-firstName` (`firstName`),
          KEY `idx-user-lastName` (`lastName`),
          UNIQUE KEY `idx-user-email` (`email`),
          KEY `idx-user-birthDate` (`birthDate`),
          KEY `idx-user-status` (`status`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

CREATE TABLE test_project.user_files(
          `id` char(36) COLLATE utf8mb4_unicode_ci NOT NULL,
          `createdBy` char(36) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
          `fileName` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
          `originalName` varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL,
          `mime` varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL,
          `size` varchar(10) COLLATE utf8mb4_unicode_ci NOT NULL,
           PRIMARY KEY (`id`),
           KEY `idx-user_file-createdBy` (`createdBy`)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;