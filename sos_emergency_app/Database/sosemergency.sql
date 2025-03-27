-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Mar 26, 2025 at 11:11 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sosemergency`
--

-- --------------------------------------------------------

--
-- Table structure for table `stations`
--

CREATE TABLE `stations` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `latitude` decimal(10,8) NOT NULL,
  `longitude` decimal(11,8) NOT NULL,
  `type` enum('police','fire','medical','coast_guard','other') NOT NULL DEFAULT 'other',
  `emergency_contact` varchar(20) NOT NULL,
  `staffCount` int(11) DEFAULT 5,
  `activeOperations` int(11) DEFAULT 0
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `firstName` varchar(255) NOT NULL,
  `lastName` varchar(255) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `password` varchar(255) NOT NULL,
  `dob` date DEFAULT NULL,
  `userType` enum('station','super_admin','user') NOT NULL DEFAULT 'user'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `firstName`, `lastName`, `phone`, `password`, `dob`, `userType`) VALUES
(1, 'nazef', 'lague', '+631111111', '$2b$10$GyuavqWIbHG59VbFwesRRev.83HHbqy9nUVQiBGaGyPGS0/vATbrC', '2025-03-19', 'user'),
(2, 'Nazef1', 'Lague1', '+6311111111', '$2b$10$uhKvUKWnpR4LZ0oIxCnQuOEI/kR.kqGHe7ov4EptywCvkIHHN7Mpy', NULL, 'user'),
(3, 'Nazef2', 'Nazef3', '+639167173777', '$2b$10$nJBggy2aY8Y1Ncx3UPP0JOY84CZ1tCLL0D2OR7H16Ffut1epQusHq', '2025-03-19', 'user'),
(4, '123', '123', '123123', '$2b$10$PxJaPNDdabV0XMf7oJmS8uWnffeeMukSFoRAauZDQ6r06aT13wai.', '2025-03-21', 'station'),
(6, '123', '123', '123123123', '$2b$10$klMbHhAVa7cUHE9OhnloTOp.IP2C2lytINEteWlwNNfNJOzHI/I4O', '2025-03-21', 'user'),
(7, '123', '123', '121', '$2b$10$aHnij23BVFOXRtS5tQ27.eN8K1WvCXAbEOCO8Ycnje7DZqWxBCKzG', '2025-03-21', 'user'),
(8, '11', '11', '11', '$2b$10$sN8ZWBtccYNri10qIy2Jlu.HfndEQ5Yvw3JgZRxcbuyFrHST9.vnS', '2025-03-21', 'user'),
(9, '1q', '1q', '111', '$2b$10$PQUta3hGAHsgKSb4yh/DJO25gd6fMr4rVv2IEbxq/R1hVZ07q7ik.', '2025-03-21', 'super_admin'),
(10, '1qq', '1qq', '1qq', '$2b$10$Ijdqo.IEEZyxvvOhNvIrdeyQRlU1emby1c32wQZ1JTQ3EL.UCJ.dC', '2025-03-21', 'user'),
(11, '11', '11', '11q', '$2b$10$rw/tc/PTMPWUJvZtJx.5DOWnWdrgmBQG86PKyZ.Q7fHIwPxSF5s0.', '2025-03-21', 'user'),
(13, '11', '11', '1qqq', '$2b$10$se8TATTBMG2mYrzB05SMxeIcbc/KO7BRMG6OvTyJJmqidyNLwTSK2', '2025-03-21', 'user'),
(14, 'qq', 'qq', 'qq', '$2b$10$0vEF7mPetCBH63/vj7zbieGa4wfg/A6py4/aB6KwCesPyQhFtrk0q', '2025-03-21', 'user'),
(15, '22', '22', '22', '$2b$10$fFFpZ5XSUR0JHGYCkBoGl.k9Gzcn.aryf9gIExs9IymSbygiYXq5y', '2025-03-22', 'user'),
(17, '11', '11', '1111111111', '$2b$10$KZboMpBgopj7zJKBDhQZuO9H7SJErGBLIXRkSavYRzqGfa8Mx.LAu', '2003-02-01', 'user'),
(18, '1234567891', '1234567891', '1234567891', '$2b$10$./GUkUxhdSzZxjDC.KZqhefK63r9SzQw7a04KamchU2wruQkrTQeO', '2003-03-02', 'user'),
(19, 'John', 'Doe', '1234567890', 'hashed_password', '1990-01-01', 'user'),
(20, 'Station', 'One', '0987654321', 'hashed_password', NULL, 'station'),
(21, 'Admin', 'Super', '1122334455', 'hashed_password', NULL, 'super_admin'),
(23, 'John', 'Doe', '1234567892', '$2b$10$5v5Zz7y8e3e4r5t6y7u8i9o0p1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p', '1990-01-01', 'user'),
(25, '11', '11', '1122', '$2b$10$ENgaF0Fmc22i06hIVJ3Kxub1kcrDJ0PQ4YwnI9YXoQBG6gWbql82y', '2025-03-23', 'user'),
(26, '11', '11', '11w', '$2b$10$adNWQarHiOLrVWw4xO5fhej56lfJzKfI1hn4aq0ZKaYe5E34FOC/y', '2025-03-26', 'user');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `stations`
--
ALTER TABLE `stations`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `phone` (`phone`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `stations`
--
ALTER TABLE `stations`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `stations`
--
ALTER TABLE `stations`
  ADD CONSTRAINT `stations_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
