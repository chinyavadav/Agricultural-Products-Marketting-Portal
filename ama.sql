-- phpMyAdmin SQL Dump
-- version 4.8.3
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 02, 2019 at 02:18 PM
-- Server version: 10.1.26-MariaDB
-- PHP Version: 7.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `ama`
--

-- --------------------------------------------------------

--
-- Table structure for table `tblchats`
--

CREATE TABLE `tblchats` (
  `fldmessageid` int(11) NOT NULL,
  `fldphoneno_sender` int(9) DEFAULT NULL,
  `fldphoneno_receiver` int(9) DEFAULT NULL,
  `fldmessage` varchar(1000) DEFAULT NULL,
  `fldstatus` varchar(20) NOT NULL,
  `fldtimestamp` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblchats`
--

INSERT INTO `tblchats` (`fldmessageid`, `fldphoneno_sender`, `fldphoneno_receiver`, `fldmessage`, `fldstatus`, `fldtimestamp`) VALUES
(25, 712923278, 782135087, 'hie', 'success', 1540719524000),
(26, 712923278, 782135087, 'hie', 'success', 1540719536000),
(27, 771757501, 773910558, 'Hie need  3 kgs of carrots', 'success', 1540978010000),
(28, 772117443, 773910558, 'Hie when  can l get my things', 'success', 1541679582000),
(29, 773910558, 772117443, 'As soon as you pay', 'success', 1541679645000);

-- --------------------------------------------------------

--
-- Table structure for table `tblclients`
--

CREATE TABLE `tblclients` (
  `fldphoneno` int(9) NOT NULL,
  `fldcompany` varchar(15) NOT NULL,
  `fldtype` varchar(20) NOT NULL,
  `fldfirstname` varchar(20) DEFAULT NULL,
  `fldlastname` varchar(20) DEFAULT NULL,
  `flddistrict` varchar(50) DEFAULT NULL,
  `fldlat` varchar(20) NOT NULL,
  `fldlng` varchar(20) NOT NULL,
  `fldstatus` varchar(20) DEFAULT NULL,
  `fldpassword` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblclients`
--

INSERT INTO `tblclients` (`fldphoneno`, `fldcompany`, `fldtype`, `fldfirstname`, `fldlastname`, `flddistrict`, `fldlat`, `fldlng`, `fldstatus`, `fldpassword`) VALUES
(123456789, 'Aggrigator', 'Farmer', 'System', 'Admin', 'Harare', '0', '0', 'Active', '5f4dcc3b5aa765d61d8327deb882cf99'),
(712923278, 'Pick n Pay', 'Buyer', 'Thomas', 'Mikiels', 'Harare', '-20.15', '28.58333', 'Active', '5f4dcc3b5aa765d61d8327deb882cf99'),
(771757501, 'Tea farm', 'Farmer', 'Precious', 'Makuyana', 'Kariba', '-19.5186782', '29.8375493', 'Active', '2645ec467a31d299d6309f39950f6ded'),
(772117443, 'Chavurura', 'Farmer', 'Samuel', 'Musungwini', 'Shurugwi', '0', '0', 'Active', '25d55ad283aa400af464c76d713c07ad'),
(773330328, 'Pee', 'Farmer', 'Pert', 'Taku', 'Buhera', '0', '0', 'Active', '5fa0c0ffb5c10b516643e71646274f02'),
(773910558, 'Stockvella', 'Buyer', 'Takudzwa', 'Sithole', 'Chipinge', '-19.5186927', '29.8375555', 'Active', 'c79db8323c6ae1b4ceadaa519332555e'),
(782135087, 'Irvenes Farm', 'Farmer', 'John', 'Irvenes', 'Gweru', '-17.730007811337', '31.057954462468', 'Active', '5f4dcc3b5aa765d61d8327deb882cf99');

-- --------------------------------------------------------

--
-- Table structure for table `tblorders`
--

CREATE TABLE `tblorders` (
  `fldorderid` int(11) NOT NULL,
  `fldphoneno_farmer` int(9) DEFAULT NULL,
  `fldphoneno_buyer` int(9) DEFAULT NULL,
  `fldproduct` varchar(50) DEFAULT NULL,
  `fldunits` varchar(10) DEFAULT NULL,
  `fldtimestamp` varchar(20) DEFAULT NULL,
  `fldcomplete` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblorders`
--

INSERT INTO `tblorders` (`fldorderid`, `fldphoneno_farmer`, `fldphoneno_buyer`, `fldproduct`, `fldunits`, `fldtimestamp`, `fldcomplete`) VALUES
(6, 782135087, 712923278, 'Carrots', '2', '1540717487000', 'Approved'),
(7, 782135087, 712923278, 'Pumpkins', '100', '1540719770000', 'Pending'),
(8, 782135087, 712923278, 'Carrots', '5', '1540900975000', 'Pending'),
(9, 771757501, 773910558, 'Carrots', '3', '1540971280000', 'Approved'),
(10, 772117443, 773910558, 'Pumpkins', '5', '1541679496000', 'Approved');

-- --------------------------------------------------------

--
-- Table structure for table `tblproduce`
--

CREATE TABLE `tblproduce` (
  `fldphoneno` varchar(9) NOT NULL,
  `fldproduct` varchar(50) NOT NULL,
  `fldcost` int(12) DEFAULT NULL,
  `fldunit` varchar(20) DEFAULT NULL,
  `fldavailable` varchar(3) DEFAULT NULL,
  `fldcomment` varchar(100) DEFAULT NULL,
  `fldtimestamp` varchar(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblproduce`
--

INSERT INTO `tblproduce` (`fldphoneno`, `fldproduct`, `fldcost`, `fldunit`, `fldavailable`, `fldcomment`, `fldtimestamp`) VALUES
('771757501', 'Carrots', 200, 'Kg', 'Yes', 'Fresh', '1540971199000'),
('772117443', 'Pumpkins', 139, 'Kg', 'Yes', 'Top grade Boer Flat', '1541679373000'),
('782135087', 'Carrots', 200, 'Kg', 'Yes', '', '1540715583000'),
('782135087', 'Maize', 2000, 'Bag', 'Yes', '', '1540715790000'),
('782135087', 'Pumpkins', 100, 'kg', 'Yes', 'fresh', '1540719355000');

-- --------------------------------------------------------

--
-- Table structure for table `tblproducts`
--

CREATE TABLE `tblproducts` (
  `fldproduct` varchar(50) NOT NULL,
  `fldtype` varchar(20) DEFAULT NULL,
  `fldavatar` varchar(50) NOT NULL,
  `flddemand` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblproducts`
--

INSERT INTO `tblproducts` (`fldproduct`, `fldtype`, `fldavatar`, `flddemand`) VALUES
('Carrots', 'Vegetable', 'carrots.jpg', 4),
('Maize', 'Crop', 'corn.jpg', 0),
('Milk', 'Dairy', 'milk.jpg', 0),
('Pumpkins', 'Fruits', 'pumpkin.jpg', 2),
('Tomatos', 'Fruit', 'tomatos.jpg', 0),
('wheat', 'Cereals', 'wee.jpg', 0);

-- --------------------------------------------------------

--
-- Table structure for table `tblusers`
--

CREATE TABLE `tblusers` (
  `fldemail` varchar(64) NOT NULL,
  `fldfirstname` varchar(20) DEFAULT NULL,
  `fldlastname` varchar(20) DEFAULT NULL,
  `fldaccesslevel` varchar(20) DEFAULT NULL,
  `fldstatus` varchar(20) DEFAULT NULL,
  `fldpassword` varchar(32) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `tblusers`
--

INSERT INTO `tblusers` (`fldemail`, `fldfirstname`, `fldlastname`, `fldaccesslevel`, `fldstatus`, `fldpassword`) VALUES
('admin@ama.co.zw', 'Precious', 'Makuyana', 'Administrator', 'Active', '5f4dcc3b5aa765d61d8327deb882cf99');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tblchats`
--
ALTER TABLE `tblchats`
  ADD PRIMARY KEY (`fldmessageid`),
  ADD KEY `fldsender` (`fldphoneno_sender`),
  ADD KEY `fldreceiver` (`fldphoneno_receiver`);

--
-- Indexes for table `tblclients`
--
ALTER TABLE `tblclients`
  ADD PRIMARY KEY (`fldphoneno`);

--
-- Indexes for table `tblorders`
--
ALTER TABLE `tblorders`
  ADD PRIMARY KEY (`fldorderid`),
  ADD KEY `fldphoneno_farmer` (`fldphoneno_farmer`),
  ADD KEY `fldphoneno_buyer` (`fldphoneno_buyer`),
  ADD KEY `fldproduct` (`fldproduct`);

--
-- Indexes for table `tblproduce`
--
ALTER TABLE `tblproduce`
  ADD PRIMARY KEY (`fldphoneno`,`fldproduct`),
  ADD KEY `fldproduct` (`fldproduct`);

--
-- Indexes for table `tblproducts`
--
ALTER TABLE `tblproducts`
  ADD PRIMARY KEY (`fldproduct`);

--
-- Indexes for table `tblusers`
--
ALTER TABLE `tblusers`
  ADD PRIMARY KEY (`fldemail`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tblchats`
--
ALTER TABLE `tblchats`
  MODIFY `fldmessageid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=30;

--
-- AUTO_INCREMENT for table `tblorders`
--
ALTER TABLE `tblorders`
  MODIFY `fldorderid` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `tblchats`
--
ALTER TABLE `tblchats`
  ADD CONSTRAINT `tblchats_ibfk_1` FOREIGN KEY (`fldphoneno_sender`) REFERENCES `tblclients` (`fldphoneno`),
  ADD CONSTRAINT `tblchats_ibfk_2` FOREIGN KEY (`fldphoneno_receiver`) REFERENCES `tblclients` (`fldphoneno`);

--
-- Constraints for table `tblorders`
--
ALTER TABLE `tblorders`
  ADD CONSTRAINT `tblorders_ibfk_1` FOREIGN KEY (`fldphoneno_farmer`) REFERENCES `tblclients` (`fldphoneno`),
  ADD CONSTRAINT `tblorders_ibfk_2` FOREIGN KEY (`fldphoneno_buyer`) REFERENCES `tblclients` (`fldphoneno`),
  ADD CONSTRAINT `tblorders_ibfk_3` FOREIGN KEY (`fldproduct`) REFERENCES `tblproducts` (`fldproduct`);

--
-- Constraints for table `tblproduce`
--
ALTER TABLE `tblproduce`
  ADD CONSTRAINT `tblproduce_ibfk_1` FOREIGN KEY (`fldproduct`) REFERENCES `tblproducts` (`fldproduct`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
