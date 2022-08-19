-- MySQL dump 10.13  Distrib 8.0.29, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: nawa
-- ------------------------------------------------------
-- Server version	8.0.29

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `userId` varchar(20) NOT NULL,
  `birth` varchar(10) NOT NULL,
  `emailDomain` varchar(20) NOT NULL,
  `emailId` varchar(20) NOT NULL,
  `endDate` timestamp NULL DEFAULT NULL,
  `gender` varchar(255) NOT NULL,
  `ment` varchar(255) DEFAULT NULL,
  `nickname` varchar(40) NOT NULL,
  `number` varchar(11) NOT NULL,
  `password` varchar(255) NOT NULL,
  `point` float NOT NULL,
  `reportCount` int NOT NULL,
  `state` varchar(255) DEFAULT NULL,
  `profileImg` bigint DEFAULT NULL,
  `refreshTokenId` int DEFAULT NULL,
  PRIMARY KEY (`userId`),
  KEY `FKngoksdc9kvosmkaagbne7rpxa` (`profileImg`),
  KEY `FK8wnfikwqy157dxqr7sgs7fc4n` (`refreshTokenId`),
  CONSTRAINT `FK8wnfikwqy157dxqr7sgs7fc4n` FOREIGN KEY (`refreshTokenId`) REFERENCES `refresh_table` (`id`),
  CONSTRAINT `FKngoksdc9kvosmkaagbne7rpxa` FOREIGN KEY (`profileImg`) REFERENCES `profile_img` (`profileImgid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES ('dummy1','19970101','naver.com','dummy1','2022-01-01 12:00:00','MAN','헬스 좋아합니다','dummy1','01011111111','12345678',0,0,'NORMAL',11,NULL),('test2','19970101','naver.com','sa68120002','2022-01-01 12:10:20','MAN','테스트 22중입니다','hi2','01099136811','$2a$10$kiFvLmeZ/XPYgcqUAOVK5.Y5wRK0XuyOMierUb/ObMYvStC51ozNG',0,1,'NORMAL',5,35),('test3','19970101','naver.com','sa68120003','2022-01-01 12:10:40','MAN','test updateuser','hi3','01099136813','$2a$10$1Zbk9eGOfg9JKVZTpU1e/.wChLefeqUjJppr7YM8LQNAHacGe/xqu',0,1,'NORMAL',6,30),('test4','19970101','naver.com','sa68120004','2022-01-01 12:10:51','MAN','test updateuser','hi4','01099136814','$2a$10$UJ34xLvCEr0i20EIwsGfM.HgxKZfMhDywYPzZ5pLmApHNu0I.xNFy',10,1,'NORMAL',7,NULL),('test5','19970101','naver.com','sa68120007','2022-01-01 05:38:19','MAN','test updateuser','hi78','01099136817','$2a$10$pEtTTOAhjhexMPPVuck/a.r0OZhc6wGOiCmqgoUbT9o6vWAkIxStC',0,0,'NORMAL',10,NULL),('test6','19970101','naver.com','sa68120006','2022-01-01 13:32:17','MAN','test updateuser','hi6','01099136816','$2a$10$RqMk.2Lwcbrldpwi/bo1Huc/wv8nNLIFPOoftF/0aj8wN20KRpy/a',10,0,'NORMAL',9,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2022-08-19  3:47:03
