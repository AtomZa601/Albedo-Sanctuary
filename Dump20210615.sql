-- MySQL dump 10.13  Distrib 8.0.22, for macos10.15 (x86_64)
--
-- Host: localhost    Database: mdt419
-- ------------------------------------------------------
-- Server version	8.0.22

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
-- Table structure for table `Likes`
--

DROP TABLE IF EXISTS `Likes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `Likes` (
  `Lid` int NOT NULL AUTO_INCREMENT,
  `username` varchar(30) DEFAULT NULL,
  `post_id` int DEFAULT NULL,
  PRIMARY KEY (`Lid`)
) ENGINE=InnoDB AUTO_INCREMENT=124 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `Likes`
--

LOCK TABLES `Likes` WRITE;
/*!40000 ALTER TABLE `Likes` DISABLE KEYS */;
INSERT INTO `Likes` VALUES (63,'putawan',21),(88,'ren',39),(89,'putawan',40),(90,'ren',39),(91,'putawan',21),(92,'putawan',21),(93,'atom',41),(94,'putawan',40),(95,'putawan',40),(96,'putawan',40),(97,'putawan',21),(98,'ren',39),(99,'ren',43),(100,'putawan',42),(101,'atom',44),(102,'putawan',40),(103,'kiroro',45),(104,'ren',43),(105,'atom',44),(106,'putawan',40),(107,'pu2',46),(108,'putawan',42),(109,'atom',44),(110,'pu2',46),(111,'atom',47),(112,'pu2',46),(113,'ren',39),(114,'atom',47),(115,'pu2',46),(116,'pu2',46),(117,'atom',47),(118,'atom',48),(119,'atom',48),(120,'atom',41),(121,'atom',50),(122,'atom',50),(123,'atom',50);
/*!40000 ALTER TABLE `Likes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post`
--

DROP TABLE IF EXISTS `post`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post` (
  `post_id` int NOT NULL AUTO_INCREMENT,
  `post_description` varchar(255) DEFAULT NULL,
  `username` varchar(50) DEFAULT NULL,
  `topic_name` varchar(50) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `likereact` int DEFAULT NULL,
  `post_time` datetime DEFAULT NULL,
  PRIMARY KEY (`post_id`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post`
--

LOCK TABLES `post` WRITE;
/*!40000 ALTER TABLE `post` DISABLE KEYS */;
INSERT INTO `post` VALUES (21,'Welcome to Albedo Webboard for genshin impact community ','putawan',NULL,NULL,NULL,'2021-05-21 05:37:10'),(39,'Hello all traveler here!','ren',NULL,NULL,NULL,'2021-05-21 00:05:23'),(40,'let\'s talk about liyue harbor ','putawan',NULL,NULL,NULL,'2021-05-21 00:05:23'),(41,'I got 30 primogems today sad noise','atom',NULL,NULL,NULL,'2021-05-21 14:27:08'),(42,'So few of them, I got 75 today! ','putawan',NULL,NULL,NULL,'2021-05-21 14:30:22'),(43,'don\'t forget to do daily check-in for free coins!','ren',NULL,NULL,NULL,'2021-05-21 14:32:52'),(44,'I already check-in. today is not much as I expected. ','atom',NULL,NULL,NULL,'2021-05-21 14:41:19'),(45,'here comes the newcomer traveler!','kiroro',NULL,NULL,NULL,'2021-05-21 15:03:28'),(46,'I\'m a new traveler too! hi','pu2',NULL,NULL,NULL,'2021-05-21 15:12:21'),(47,'welcome all traveler here! we\'re announcing new event soon! ','atom',NULL,NULL,NULL,'2021-05-21 15:32:49'),(48,'how can I change character while gliding? guys??','atom',NULL,NULL,NULL,'2021-05-21 15:40:00'),(49,'No you can\'t change character while gliding!!','ren',NULL,NULL,NULL,'2021-05-28 21:44:29'),(50,'I hope Genshin Impact will announce for Nintendo Switch this E3 2021!','atom',NULL,NULL,NULL,'2021-06-15 21:32:00');
/*!40000 ALTER TABLE `post` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_comment`
--

DROP TABLE IF EXISTS `post_comment`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_comment` (
  `cid` int NOT NULL AUTO_INCREMENT,
  `comment_by` varchar(255) DEFAULT NULL,
  `username` varchar(30) DEFAULT NULL,
  `comment_description` varchar(255) DEFAULT NULL,
  `comment_time` datetime DEFAULT NULL,
  PRIMARY KEY (`cid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_comment`
--

LOCK TABLES `post_comment` WRITE;
/*!40000 ALTER TABLE `post_comment` DISABLE KEYS */;
/*!40000 ALTER TABLE `post_comment` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `postDB`
--

DROP TABLE IF EXISTS `postDB`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `postDB` (
  `username` varchar(255) DEFAULT NULL,
  `post` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `postDB`
--

LOCK TABLES `postDB` WRITE;
/*!40000 ALTER TABLE `postDB` DISABLE KEYS */;
INSERT INTO `postDB` VALUES ('putawan','ทดสอบ'),('putawan','น้อง klee น่ารักที่สุดดด '),('putawan','สิบโทกิโรโระ'),('putawan','ฉันเพิ่งจะ สิบตรี เว้ย จาก กิโรโระ ');
/*!40000 ALTER TABLE `postDB` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `topic_list`
--

DROP TABLE IF EXISTS `topic_list`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `topic_list` (
  `topic_ID` varchar(10) DEFAULT NULL,
  `topic_name` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `topic_list`
--

LOCK TABLES `topic_list` WRITE;
/*!40000 ALTER TABLE `topic_list` DISABLE KEYS */;
INSERT INTO `topic_list` VALUES ('TP1','General'),('TP2','Fanart');
/*!40000 ALTER TABLE `topic_list` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `userinfo`
--

DROP TABLE IF EXISTS `userinfo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `userinfo` (
  `id` int NOT NULL AUTO_INCREMENT,
  `username` varchar(50) DEFAULT NULL,
  `password` varchar(50) DEFAULT NULL,
  `email` varchar(50) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `userinfo`
--

LOCK TABLES `userinfo` WRITE;
/*!40000 ALTER TABLE `userinfo` DISABLE KEYS */;
INSERT INTO `userinfo` VALUES (1,'putawan','112','putawan.agpu@mail.kmutt.ac.th','avatar-1621579077693.png'),(2,'atom','123','atom@gmail.com','avatar-1621580647441.png'),(3,'ren','234','tails@hotmail.com','avatar-1621582455256.jpeg'),(4,'kiroro','test','kiroro@gmail.com','avatar.png'),(5,'pu2','1234','pu2@gmail.com','avatar-1621584723225.jpeg');
/*!40000 ALTER TABLE `userinfo` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2021-06-15 21:34:58
