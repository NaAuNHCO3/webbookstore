-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Dec 12, 2022 at 06:11 AM
-- Server version: 8.0.27
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `webbookstore`
--

-- --------------------------------------------------------

--
-- Table structure for table `book`
--

DROP TABLE IF EXISTS `book`;
CREATE TABLE IF NOT EXISTS `book` (
  `bookid` int NOT NULL AUTO_INCREMENT,
  `bookname` varchar(20) NOT NULL,
  `author` varchar(50) DEFAULT NULL,
  `press` varchar(50) NOT NULL,
  `bookabstract` varchar(100) DEFAULT NULL,
  `bookprice` float NOT NULL,
  `bookinvent` int DEFAULT NULL,
  PRIMARY KEY (`bookid`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `book`
--

INSERT INTO `book` (`bookid`, `bookname`, `author`, `press`, `bookabstract`, `bookprice`, `bookinvent`) VALUES
(1, '数学物理的几何方法', 'Bernard Schutz', '世界图书出版公司', 'This book introduced some geometrical methods constantly used or useful in solving physics problems ', 58, 10),
(2, '力学（物理类）', '舒幼生', '北京大学出版社', 'The textbook contains basic mechanic knowledge including classical mechanics, wave mechanics and a b', 50, 10),
(3, '奇点临近', 'Ray Kurzweil', '机械工业出版社', NULL, 69, 10),
(4, '计算概论', '许卓群;李文新;罗英伟;汪小林', '清华大学出版社', 'Introduction to computer calculation. It illustrated some computer functioning principals and basic ', 50, 10),
(5, '神们自己', 'Isaac Asimov', '江苏凤凰文艺', 'A science fiction.', 40, 10),
(6, '社会心理学', '侯玉波', '北京大学出版社', NULL, 45, 10),
(7, '前进中的首都卫生防疫事业', '张殿余;孙贤理', '北京出版社', NULL, 30, 10),
(8, '商业企业财务管理学', '刘恩禄', '中国商业出版社', NULL, 30, 10),
(9, '中国水稻害虫天敌名录', '农业部全国植物保护总站', '科学出版社', NULL, 35, 10),
(10, '温江县志', '四川省温江县志编纂委员会', '四川人民出版社', '本志断限起于1911年辛亥革命,止于1985年底。', 43, 10),
(11, '高等数学解题指南', '周建莹; 李正元', '北京大学出版社', NULL, 48, 10),
(12, '数据库系统概论(第5版）', '王珊; 萨师煊', '高等教育出版社', NULL, 42, 20),
(13, '数据与计算机通信（第十版）', 'William Stallings', '电子工业出版社', NULL, 100, 20),
(14, '简明线性代数', '丘维声', '北京大学出版社', NULL, 30, 20),
(15, '大陆 台湾计算机英汉名词对照', ' 中国计算机报社', '电子工业出版社', '\r\n收编海峡两岸有关计算机技术及其应用等方面的技术用语和缩写词译名对照条目近4000条,并对台湾信息业的部分厂商公司作了介绍。', 40, 20),
(16, '现代计算机技术博览', ' 中国计算机报社', '电子工业出版社', '本书包括:计算机图形处理、并行处理、神经计算机与模糊计算机以及未来计算机、网络技术、数据库标准与应用、RISC技术与工作站、光盘技术、计算机系统与信息安全以及安全标准、计算机病毒的危害及其防范、汉语语', 25, 20),
(17, '微计算机速成. 下, 软件基础·应用', '北京计算机用户协会', '中国计量出版社', '本书主要介绍数据结构,汇编、解释和编译程序及计算机控制系统、管理信息系统等。', 20, 10),
(18, '微计算机速成. 中, 硬件基础', ' 北京计算机用户协会', ':中国计量出版社', '本书为计算机硬件基础,包括数字电路、模型计算机、微型机的外部设备等。', 20, 15),
(19, '计算机组成原理教程', ' 白中英; 韩兆轩', '科学出版社', '本书包括计算机系统概论、运算方法和运算器、存贮系统、指令系统等9章。', 30, 10),
(20, '计算机硬件技术基础', ' 邹逢兴', '高等教育出版社', '国家教委工科计算机基础课程系列教材', 30, 15),
(21, '新编计算机基础', ' 王宇川; 高劲松; 章俊', '国防工业出版社', '本书介绍了计算机基础知识、Windows操作系统、Word、PowerPoint、Access、Excel、计算机网络基础知识及其应用。', 25, 20),
(22, '计算机应用基础', ' 坚葆林', '高等教育出版社', '本书共分为7个项目，包括计算机基础知识、Windows XP操作系统、计算机网络、Word 2003的应用、Excel 2003的应用、介绍PowerPoint 2003、多媒体软件的应用。', 35, 5),
(23, '计算机应用基础', ' 刘青云; 张剑林', '浙江大学出版社', '高职高专计算机精品课程系列规划教材', 25, 10),
(24, '计算机导论', ' 王平立; 王玲', '国防工业出版社', '本书分为计算机发展史、计算机的组成、从汇编语言到多媒体、信息系统、计算机网络、计算机科学等6章。', 25, 10),
(25, '计算机组装与维护操作教程', '《计算机组装和维护操作教程》编委会', '西北工业大学出版社', '本书内容包括: 计算机基础知识; 中央处理器(CPU); 主板; 内存; 硬盘驱动器......', 25, 5),
(26, '全国专业技术人员计算机应用能力考试标准教', ' 全国专业技术人员计算机应用能力考试命题研究组', '清华大学出版社', '本书循序渐进地讲解了Internet应用考试中应该掌握、熟悉和了解的考点，并结合了大量精简的案例操作演示。具体内容包括大纲中要求的9个模块，包括Internet的接入方式、局域网的应用等。', 35, 10),
(27, '算法通关之路', ' 路志鹏', ':电子工业出版社', '这本书通过算法题解的形式讲解了基本数据结构和算法知识，包括分治、贪心、回溯和动态规划等算法思想，二分查找、深度优先遍历和广度优先遍历、双指针、滑动窗口、位运算、并查集等解题思路和技巧，以及通用解题“套', 25, 15),
(28, '计算机基础知识教程', ' 姜爱群', '清华大学出版社', '介绍计算机基础知识、操作系统、文字处理和数据库应用4方面内容。', 35, 10),
(29, '计算机通信网', ' 刘后铭; 洪福明', '西安电子科技大学出版社', '本书论述了计算机通信网的分析方法和设计原理。', 25, 10),
(30, '算法 : 人工智能在“想”什么', ' 王静; 王轩', '国家行政学院出版社', '本书从算法想什么入手, 试图想更多算法所未想。本书从多角度、多学科系统的介绍了算法的特征, 从社会科学角度回应了算法问题。不仅是一本专业性的学术著作, 也探讨了算法技术在具体领域中的诸多应用实践, 可', 25, 10),
(31, '算法 : C语言实现. 基础知识、数据结', 'Sedgewick', '机械工业出版社', '本书分为四部分, 共16章。第一部分“基础知识”介绍基本算法分析原理。第二部分“数据结构”讲解算法分析中必须掌握的数据结构知识, 主要包括基本数据结构、抽象数据结构、递归和树。第三部分“排序”按章节顺', 35, 10),
(32, '图解算法. 使用Python. 第2版', '吴灿铭; 胡昭民', '清华大学出版社', '本书从算法的基本概念开始讲解, 接着介绍各个经典的算法, 包括分治法、递归法、贪心法、动态规划法、迭代法、枚举法、回溯法等, 随后讲述核心的数据结构, 即数组、链表、堆栈、队列、树结构、图结构、哈希表', 30, 10),
(33, '算法', ' 全球华语科幻星云奖组委会', '万卷出版公司', '全球华语科幻星云奖组委会，全球华语科幻星云奖于2009年成立，由世界华人科幻协会支持评选。组委会核心成员为中国科普作家协会荣誉理事董仁威、南方科技大学教授吴岩、《科幻世界》副总编姚海军。自成立之日起，', 30, 10),
(34, '图解算法', '吴灿铭，胡昭民', '清华大学出版社', '本书采用丰富的图例来阐述算法的基本概念，包括了分治法、递归法、贪心法、动态规划法、迭代法、枚举法、回溯法等，并应用不同算法延伸出重要数据结构，例如数组、链表、堆栈、队列、树形结构、图形、排序、查找、哈', 35, 10),
(35, '算法趣学', ' 英昌盛', ':清华大学出版社', '本书介绍程序设计中常用的基础算法及典型案例，包括排序算法、递归算法、数论基础、组合数学基础、贪心算法、分治算法、动态规划算法和回溯算法等内容。', 35, 10),
(37, '漫画算法. 2, 小灰的算法进阶', ' 魏梦舒', '电子工业出版社', '本书通过主人公小灰的心路历程，用漫画的形式讲述了多个数据结构、算法及复杂多变的算法面试题目。第1章介绍了几种典型的排序算法，包括选择排序、插入排序、希尔排序、归并排序、基数排序。第2章介绍了“树”结构', 60, 10),
(38, '轻松学算法 : 互联网算法面试宝典', '赵烨', '电子工业出版社', '本书分为三大部分，分别是基础数据结构与算法、工作面试中常用的算法、高级算法。每一章几乎都会包含这么几个部分，首先会简单有趣地介绍各个算法及其实现原理、复杂度，接着会介绍其适用场景，部分小节会举些实际例', 40, 10),
(39, '深度学习算法实践', ' 吴岸城', '电子工业出版社', '本书以一位软件工程师在工作中遇到的问题为主线，阐述了如何从软件工程思维向算法思维转变、如何将任务分解成算法问题，并结合程序员在工作中经常面临的产品需求，详细阐述了应该怎样从算法的角度看待、分解需求，并', 40, 10),
(40, '算法之道. 2版', '邹恒明', '机械工业出版社', '本书将算法的讨论分为五篇：算法基础篇、算法设计篇、算法分析篇、经典算法篇、难解与无解篇。每篇分别讨论算法的一个方面：基础、设计、分析、经典和难解问题。', 40, 10),
(41, '程序员必会的40种算法', '艾哈迈德', '机械工业出版社', '本书通过实例探索如何实现不同类型的算法，学习线性规划算法、PageRank算法和图算法以及机器学习算法等更复杂的算法，理解它们背后的数学知识和逻辑。此外，通过天气预测、推文聚类和电影推荐引擎等案例分析', 30, 10),
(42, '算法分析导论', '塞奇威克; 弗拉若莱', '电子工业出版社', '本书全面介绍了算法的数学分析所涉及的主要技术。涵盖的内容来自经典的数学课题（包括离散数学、初等实分析、组合数学），以及经典的计算机科学课题（包括算法和数据结构）。本书的重点是“平均情况”或“概率性”分', 30, 10),
(43, '从算法到程序. 第2版', ' 徐子珊', ':清华大学出版社', '本书共11章，第1章讨论算法设计、分析的基本概念，第2章讨论算法设计中最常用的几个数据结构，第3章讨论了算法设计的两个基本策略：渐增策略与分支策略。第4章讨论了几个代数计算的基本问题及其算法，包括矩阵', 50, 10),
(44, '算法问题实战策略', '具宗万著', '人民邮电出版社', '本书收录程序设计竞赛经典试题, 在解题过程中讲解各种算法设计技巧和数据结构, 培养读者的解题能力。读者可亲自编写各章习题程序并获得评分, 所有示例均附有解题过程及详细说明。本书主要内容。第一部分, 开', 60, 10),
(45, '数据结构与算法 : Python语言实现', '古德里奇等', '机械工业出版社', '本书采用Python语言讨论数据结构和算法，详细讲解其设计、分析与实现过程。书中将面向对象视角贯穿始终，充分利用Python语言优美而简洁的特点，强调代码的健壮性和可重用性，关注各种抽象数据类型以及不', 40, 20),
(46, '《数据结构》算法实现及解析. 第2版', ' 高一凡', '西安电子科技大学出版社', '配合严蔚敏、吴伟民编著的《数据结构》(C语言版)', 20, 15),
(47, '真实世界的算法 : 初学者指南', '卢里达斯', '机械工业出版社', '本书在介绍了伪代码规范、基本术语和数据结构的背景知识之后, 讨论了压缩、加密、图、搜索和排序、哈希、分类、字符串和随机等算法。每章都描述了实际问题, 然后给出了解决这些问题的算法。示例说明了算法的广泛', 30, 10),
(48, '数据结构与算法分析. Java版', '王世民', '清华大学出版社', '本书以Java语言为基础，讨论了数据结构的线性结构和非线性结构及其实现，并以Java语言作为数据结构的算法描述。', 30, 10),
(49, '疯狂Java面试讲义 : 数据结构、算法', '李刚', '电子工业出版社', '本书分为四个部分，其中第一部分主要介绍Java内存管理，这部分是大多数Java程序员最容易忽略的地方——因为Java不像C语言，而且Java提供了垃圾回收机制，因此导致许多Java程序员对内存管理重视', 30, 10),
(50, '系统模型与计算机算法', '林少培; 杨晓峰', '上海交通大学出版社', '本书分析了土木工程中规划、设计和施工等方面的问题,介绍了系统分析模型的建立和常用的计算机方法。', 30, 20);

-- --------------------------------------------------------

--
-- Table structure for table `orderdetail`
--

DROP TABLE IF EXISTS `orderdetail`;
CREATE TABLE IF NOT EXISTS `orderdetail` (
  `detailid` int NOT NULL AUTO_INCREMENT,
  `orderid` int NOT NULL,
  `bookid` int NOT NULL,
  `buynum` int NOT NULL,
  PRIMARY KEY (`detailid`),
  KEY `bookid` (`bookid`),
  KEY `orderid` (`orderid`)
) ENGINE=InnoDB AUTO_INCREMENT=61 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `orderdetail`
--

INSERT INTO `orderdetail` (`detailid`, `orderid`, `bookid`, `buynum`) VALUES
(1, 1, 46, 1),
(2, 1, 9, 2),
(3, 1, 26, 1),
(4, 11, 32, 2),
(5, 11, 45, 1),
(6, 21, 49, 1),
(7, 2, 41, 1),
(8, 2, 47, 1),
(9, 2, 13, 2),
(10, 12, 37, 2),
(11, 12, 49, 1),
(12, 22, 40, 1),
(13, 3, 20, 1),
(14, 3, 50, 1),
(15, 3, 27, 1),
(16, 13, 28, 1),
(17, 13, 26, 2),
(18, 23, 27, 1),
(19, 4, 33, 2),
(20, 4, 24, 1),
(21, 4, 31, 1),
(22, 14, 23, 1),
(23, 14, 20, 1),
(24, 24, 38, 1),
(25, 5, 1, 3),
(26, 5, 2, 3),
(27, 5, 9, 2),
(28, 15, 46, 3),
(29, 15, 38, 2),
(30, 25, 4, 1),
(31, 6, 11, 1),
(32, 6, 11, 3),
(33, 6, 29, 2),
(34, 16, 41, 3),
(35, 16, 32, 4),
(36, 26, 19, 2),
(37, 7, 23, 3),
(38, 7, 35, 2),
(39, 7, 12, 2),
(40, 17, 7, 2),
(41, 17, 4, 2),
(42, 27, 4, 3),
(43, 8, 50, 4),
(44, 8, 44, 2),
(45, 8, 25, 1),
(46, 18, 22, 1),
(47, 18, 1, 1),
(48, 28, 2, 1),
(49, 9, 48, 1),
(50, 9, 9, 1),
(51, 9, 48, 2),
(52, 19, 45, 2),
(53, 19, 1, 2),
(54, 29, 15, 2),
(55, 10, 32, 2),
(56, 10, 9, 2),
(57, 10, 8, 2),
(58, 20, 29, 2),
(59, 20, 15, 2),
(60, 30, 23, 2);

-- --------------------------------------------------------

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
CREATE TABLE IF NOT EXISTS `orders` (
  `orderid` int NOT NULL AUTO_INCREMENT,
  `ordernum` int NOT NULL DEFAULT '1',
  `orderstatus` varchar(50) NOT NULL DEFAULT 'distributing',
  `accountid` int NOT NULL,
  PRIMARY KEY (`orderid`)
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `orders`
--

INSERT INTO `orders` (`orderid`, `ordernum`, `orderstatus`, `accountid`) VALUES
(1, 3, 'processing', 1),
(2, 3, 'processing', 2),
(3, 3, 'processing', 3),
(4, 3, 'processing', 4),
(5, 3, 'processing', 5),
(6, 3, 'processing', 6),
(7, 3, 'processing', 7),
(8, 3, 'processing', 8),
(9, 3, 'processing', 9),
(10, 3, 'processing', 10),
(11, 2, 'failed', 1),
(12, 2, 'failed', 2),
(13, 2, 'failed', 3),
(14, 2, 'failed', 4),
(15, 2, 'failed', 5),
(16, 2, 'finished', 6),
(17, 2, 'finished', 7),
(18, 2, 'finished', 8),
(19, 2, 'finished', 9),
(20, 2, 'finished', 10),
(21, 1, 'processing', 1),
(22, 1, 'processing', 2),
(23, 1, 'processing', 3),
(24, 1, 'finished', 4),
(25, 1, 'finished', 5),
(26, 1, 'finished', 6),
(27, 1, 'finished', 7),
(28, 1, 'failed', 8),
(29, 1, 'failed', 9),
(30, 1, 'failed', 10);

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

DROP TABLE IF EXISTS `user`;
CREATE TABLE IF NOT EXISTS `user` (
  `accountid` int NOT NULL AUTO_INCREMENT,
  `password` varchar(16) NOT NULL,
  `username` varchar(16) NOT NULL,
  `abstract` text,
  `email` varchar(100) NOT NULL DEFAULT '@',
  `telephone` varchar(16) DEFAULT NULL,
  `address` varchar(100) DEFAULT '',
  `userclass` varchar(16) NOT NULL DEFAULT 'client',
  PRIMARY KEY (`accountid`),
  KEY `userclass` (`userclass`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`accountid`, `password`, `username`, `abstract`, `email`, `telephone`, `address`, `userclass`) VALUES
(1, '1111', '小王', '我叫小王', 'xiaowang@111.com', '11111111111', '北京', 'client'),
(2, '2222', '王二', '我叫王二', 'wanger@222.com', '22222222222', '北京', 'client'),
(3, '3333', '王三', '我叫王三', 'wangsan@333.com', '33333333333', '北京', 'client'),
(4, '4444', '王四', '我叫王四', 'wangsi@444.com', '44444444444', '北京', 'client'),
(5, '5555', '王五', '我叫王五', 'wangwu@555.com', '55555555555', '北京', 'client'),
(6, '6666', '王六', '我叫王六', 'wangliu@666.com', '66666666666', '北京', 'client'),
(7, '7777', '王七', '我叫王七', 'wangqi@777.com', '77777777777', '北京', 'client'),
(8, '8888', '王八', '我叫王八', 'wangba@888.com', '88888888888', '北京', 'client'),
(9, '9999', '陈一', '我叫陈一', 'chenyi@999.com', '99999999999', '北京', 'staff'),
(10, '1010', '陈十', '我叫陈十', 'chenshi@10.com', '10101010101', '北京', 'staff');

-- --------------------------------------------------------

--
-- Table structure for table `userlimits`
--

DROP TABLE IF EXISTS `userlimits`;
CREATE TABLE IF NOT EXISTS `userlimits` (
  `userclass` varchar(16) NOT NULL DEFAULT 'client',
  `limits` varchar(50) NOT NULL DEFAULT '',
  PRIMARY KEY (`userclass`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `userlimits`
--

INSERT INTO `userlimits` (`userclass`, `limits`) VALUES
('client', ''),
('staff', '');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `orderdetail`
--
ALTER TABLE `orderdetail`
  ADD CONSTRAINT `orderdetail_ibfk_1` FOREIGN KEY (`bookid`) REFERENCES `book` (`bookid`),
  ADD CONSTRAINT `orderdetail_ibfk_2` FOREIGN KEY (`orderid`) REFERENCES `orders` (`orderid`);

--
-- Constraints for table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `user_ibfk_1` FOREIGN KEY (`userclass`) REFERENCES `userlimits` (`userclass`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
