-- phpMyAdmin SQL Dump
-- version 4.1.6
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: Jun 18, 2014 at 01:07 PM
-- Server version: 5.6.16
-- PHP Version: 5.5.9

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8 */;

--
-- Database: `scrum-manager`
--

-- --------------------------------------------------------

--
-- Table structure for table `clients`
--

CREATE TABLE IF NOT EXISTS `clients` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `address` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `telephone` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=2 ;

--
-- Dumping data for table `clients`
--

INSERT INTO `clients` (`id`, `name`, `email`, `address`, `telephone`) VALUES
(1, 'Sergio Daniel Xalambrí', 'sergio@xalambri.com.ar', 'Av. La Plata 1117 6 18', 33939239);

-- --------------------------------------------------------

--
-- Table structure for table `projects`
--

CREATE TABLE IF NOT EXISTS `projects` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `owner` int(11) NOT NULL,
  `scrumMaster` int(11) NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `releaseDate` date NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=4 ;

--
-- Dumping data for table `projects`
--

INSERT INTO `projects` (`id`, `name`, `owner`, `scrumMaster`, `description`, `releaseDate`) VALUES
(1, 'Task Manager', 1, 2, 'Crear una webapp para administrar tareas por proyectos, con la posibilidad de tener múltiples usuarios con distintas tareas asignadas.', '2014-09-29');

-- --------------------------------------------------------

--
-- Table structure for table `tasks`
--

CREATE TABLE IF NOT EXISTS `tasks` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text COLLATE utf8mb4_unicode_ci NOT NULL,
  `project` int(11) NOT NULL,
  `priority` int(11) NOT NULL,
  `estimatedTime` int(11) NOT NULL,
  `requiredTime` int(11) DEFAULT NULL,
  `userAssigned` int(11) NOT NULL,
  `state` int(11) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=7 ;

--
-- Dumping data for table `tasks`
--

INSERT INTO `tasks` (`id`, `name`, `description`, `project`, `priority`, `estimatedTime`, `requiredTime`, `userAssigned`, `state`) VALUES
(1, 'Módulo de usuarios', 'Crear un módulo que permita obtener una lista de usuarios, obtener los detalles de todos, agregar un nuevo usuario, modificar uno existente o borrar un usuario.', 1, 1, 2, 2, 1, 3),
(2, 'Módulo de tareas', 'Crear un módulo que permita obtener todas las tareas, el detalle de una, todas las asignadas a un usuario o todas los asignadas a un proyecto, agregar una nueva, modificar una existente o borrar una.', 1, 2, 2, 2, 1, 2),
(3, 'Crear módulo de conexión', 'Crear un módulo de Node.js que recibe un callback al que le envía un pool de conexiones y se conecte a la base de datos permitiendo realizar queries facilmente.', 1, 1, 1, 1, 1, 4),
(4, 'Módulo de proyectos', 'Crear un módulo que permite obtener una lista de todos los proyectos, los detalles de un proyecto, los proyectos de un cliente, crear nuevos proyectos, modificar proyectos existentes o eliminar proyectos.', 1, 3, 2, NULL, 1, 1);

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `pass` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `token` int(11) DEFAULT NULL,
  `firstName` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `lastName` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  `position` varchar(120) COLLATE utf8mb4_unicode_ci NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `usuario` (`userName`)
) ENGINE=InnoDB  DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci AUTO_INCREMENT=5 ;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `userName`, `pass`, `token`, `firstName`, `lastName`, `email`, `position`) VALUES
(1, 'sergio', '1234', NULL, 'Sergio', 'Xalambrí', 'sergio@tech-solutions.com', 'Frontend Lead'),
(2, 'marco', '1234', NULL, 'Marco', 'Lopez', 'marco@tech-solutions.com', 'ScrumMaster'),
(3, 'miguel', '1234', NULL, 'Miguel', 'Pinella', 'miguel@tech-solutions.com', 'Backend Lead'),
(4, 'daniel', '1234', NULL, 'Daniel', 'Xalambrí', 'daniel@tech-solutions.com', 'Frontend');

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
