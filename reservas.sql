-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1:3307
-- Tiempo de generación: 06-11-2025 a las 23:08:42
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `reservas`
--

USE reservas;

---------------------------------

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--
CREATE TABLE usuarios (
  usuario_id INT(11) NOT NULL AUTO_INCREMENT,
  nombre VARCHAR(50) NOT NULL,
  apellido VARCHAR(50) NOT NULL,
  nombre_usuario VARCHAR(50) NOT NULL,
  contrasenia VARCHAR(255) NOT NULL,
  tipo_usuario TINYINT(4) NOT NULL,
  celular VARCHAR(20) DEFAULT NULL,
  foto VARCHAR(255) DEFAULT NULL,
  activo TINYINT(1) NOT NULL DEFAULT 1,
  creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  modificado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (usuario_id),
  UNIQUE KEY nombre_usuario (nombre_usuario)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO usuarios (usuario_id, nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, celular, foto, activo, creado, modificado) VALUES
(1, 'Alberto', 'López', 'alblop@correo.com', '$2b$10$SrXpypkxT98dpTTnpyb4wezNK4XRGxgnTXiGDLYtL3hdy7kXRIiZG', 3, NULL, NULL, 1, '2025-08-19 21:37:51', '2025-11-06 19:27:54'),
(2, 'Pamela', 'Gómez', 'pamgom@correo.com', '$2b$10$SS8H2OvbDVYmfSs8eip4Nugba/P1jS12ZAXaMVDZJJ4OsCLdi.MaW', 3, NULL, NULL, 1, '2025-08-19 21:39:45', '2025-11-06 19:29:21'),
(3, 'Esteban', 'Ciro', 'estcir@correo.com', 'da6541938e9afdcd420d1ccfc7cac2c7', 3, NULL, NULL, 1, '2025-08-19 21:41:50', '2025-08-19 21:41:50'),
(4, 'Oscar', 'Ramirez', 'oscram@correo.com', '0ac879e8785ea5b3da6ff1333d8b0cf2', 1, NULL, NULL, 1, '2025-08-19 21:41:50', '2025-08-19 21:41:50'),
(5, 'Claudia', 'Juárez', 'clajua@correo.com', '4f9dbdcf9259db3fa6a3f6164dd285de', 1, NULL, NULL, 1, '2025-08-19 21:41:50', '2025-08-19 21:41:50'),
(6, 'William', 'Corbalán', 'wilcor@correo.com', 'f68087e72fbdf81b4174fec3676c1790', 2, NULL, NULL, 1, '2025-08-19 21:41:50', '2025-08-19 21:41:50'),
(7, 'Anahí', 'Flores', 'anaflo@correo.com', 'd4e767c916b51b8cc5c909f5435119b1', 2, NULL, NULL, 1, '2025-08-19 21:41:50', '2025-08-19 21:41:50'),
(9, 'Admin', 'Principal', 'admin@correo.com', '$2b$10$ZJJir9xxRtqAOChEp12iuun7MCUmiLcQaJK4.U/otYVARIZY2GEDq', 1, NULL, NULL, 1, '2025-11-06 19:34:19', '2025-11-06 19:34:47'),
(10, 'Florencia', 'Saez', 'florencia@correo.com', '$2b$10$hiJEy8.CuUSj17hmv9LawOdBXxYUvhRgNgVPlCCWAJiigGdBKE.6a', 1, NULL, NULL, 1, '2025-11-06 19:48:27', '2025-11-06 19:48:27'),
(11, 'Martina', 'Moledo', 'martina@correo.com', '$2b$10$hiJEy8.CuUSj17hmv9LawOdBXxYUvhRgNgVPlCCWAJiigGdBKE.6a', 1, NULL, NULL, 1, '2025-11-06 19:48:27', '2025-11-06 19:48:27'),
(12, 'Evangelina', 'Romano', 'evangelina.rom@gmail.com', '3d2dab31648970d4dcfde7185e5bac42', 1, NULL, NULL, 1, '2025-11-06 19:48:27', '2025-11-06 19:48:27'),
(13, 'Camila', 'Lewis', 'camila@correo.com', '$2b$10$hiJEy8.CuUSj17hmv9LawOdBXxYUvhRgNgVPlCCWAJiigGdBKE.6a', 1, NULL, NULL, 1, '2025-11-06 19:48:27', '2025-11-06 19:48:27'),
(14, 'Eva', 'Romano', 'soyevaromano@gmail.com', 'c59e6c4ef9ce7e521bdb01544dc41f5f', 3, NULL, NULL, 1, '2025-11-06 19:48:27', '2025-11-06 19:48:27');

-- ===========================
-- TABLA SALONES
-- ===========================
CREATE TABLE salones (
  salon_id INT(11) NOT NULL AUTO_INCREMENT,
  titulo VARCHAR(255) NOT NULL,
  direccion VARCHAR(255) NOT NULL,
  latitud DECIMAL(10,8) DEFAULT NULL,
  longitud DECIMAL(11,8) DEFAULT NULL,
  capacidad INT(11) DEFAULT NULL,
  importe DECIMAL(10,2) NOT NULL,
  activo TINYINT(1) DEFAULT 1,
  creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  modificado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (salon_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO salones VALUES
(1, 'Principal', 'San Lorenzo 1000', NULL, NULL, 200, 95000, 1, '2025-08-19 21:51:22', '2025-08-19 21:51:22'),
(2, 'Secundario', 'San Lorenzo 1000', NULL, NULL, 70, 7000, 1, '2025-08-19 21:51:22', '2025-08-19 21:51:22'),
(3, 'Cancha Fútbol 5', 'Alberdi 300', NULL, NULL, 50, 150000, 1, '2025-08-19 21:51:22', '2025-08-19 21:51:22'),
(4, 'Maquina de Jugar', 'Peru 50', NULL, NULL, 100, 95000, 1, '2025-08-19 21:51:22', '2025-08-19 21:51:22'),
(5, 'Trampolín Play', 'Belgrano 100', NULL, NULL, 70, 200000, 1, '2025-08-19 21:51:22', '2025-08-19 21:51:22');


-- ===========================
-- TABLA TURNOS
-- ===========================
CREATE TABLE turnos (
  turno_id INT(11) NOT NULL AUTO_INCREMENT,
  orden INT(11) NOT NULL,
  hora_desde TIME NOT NULL,
  hora_hasta TIME NOT NULL,
  activo TINYINT(1) NOT NULL DEFAULT 1,
  creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  modificado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (turno_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO turnos VALUES
(1, 1, '12:00:00', '14:00:00', 1, '2025-08-19 21:44:19', '2025-08-19 21:44:19'),
(2, 2, '15:00:00', '17:00:00', 1, '2025-08-19 21:46:08', '2025-08-19 21:46:08'),
(3, 3, '18:00:00', '20:00:00', 1, '2025-08-19 21:46:08', '2025-08-19 21:46:08');


-- ===========================
-- TABLA RESERVAS
-- ===========================
CREATE TABLE reservas (
  reserva_id INT(11) NOT NULL AUTO_INCREMENT,
  fecha_reserva DATE NOT NULL,
  salon_id INT(11) NOT NULL,
  usuario_id INT(11) NOT NULL,
  turno_id INT(11) NOT NULL,
  foto_cumpleaniero VARCHAR(255) DEFAULT NULL,
  tematica VARCHAR(255) DEFAULT NULL,
  importe_salon DECIMAL(10,2) DEFAULT NULL,
  importe_total DECIMAL(10,2) DEFAULT NULL,
  activo TINYINT(1) NOT NULL DEFAULT 1,
  creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  modificado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (reserva_id),
  KEY reservas_salones_fk (salon_id),
  KEY reservas_usuarios_fk (usuario_id),
  KEY reservas_turnos_fk (turno_id),
  CONSTRAINT reservas_salones_fk FOREIGN KEY (salon_id) REFERENCES salones (salon_id),
  CONSTRAINT reservas_usuarios_fk FOREIGN KEY (usuario_id) REFERENCES usuarios (usuario_id),
  CONSTRAINT reservas_turnos_fk FOREIGN KEY (turno_id) REFERENCES turnos (turno_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO reservas VALUES
(1, '2025-10-08', 1, 1, 1, NULL, 'Plim plim', NULL, 200000, 1, '2025-08-19 22:02:33', '2025-08-19 22:02:33'),
(2, '2025-10-08', 2, 1, 1, NULL, 'Messi', NULL, 100000, 1, '2025-08-19 22:03:45', '2025-08-19 22:03:45'),
(3, '2025-10-08', 2, 2, 1, NULL, 'Palermo', NULL, 500000, 1, '2025-08-19 22:03:45', '2025-08-19 22:03:45');


-- ===========================
-- TABLA SERVICIOS
-- ===========================
CREATE TABLE servicios (
  servicio_id INT(11) NOT NULL AUTO_INCREMENT,
  descripcion VARCHAR(255) NOT NULL,
  importe DECIMAL(10,2) NOT NULL,
  activo TINYINT(1) NOT NULL DEFAULT 1,
  creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  modificado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (servicio_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO servicios VALUES
(1,'Sonido',15000,1,'2025-08-19 21:47:55','2025-08-19 21:47:55'),
(2,'Mesa dulce',25000,1,'2025-08-19 21:47:55','2025-08-19 21:47:55'),
(3,'Tarjetas invitación',5000,1,'2025-08-19 21:47:55','2025-08-19 21:47:55'),
(4,'Mozos',15000,1,'2025-08-19 21:47:55','2025-08-19 21:47:55'),
(5,'Video juegos',15000,1,'2025-08-19 21:47:55','2025-08-19 21:47:55'),
(6,'Mago',25000,1,'2025-08-20 21:31:00','2025-08-20 21:31:00'),
(7,'Cabezones',80000,1,'2025-08-20 21:31:00','2025-08-20 21:31:00'),
(8,'Maquillaje infantil',1000,1,'2025-08-20 21:31:00','2025-08-20 21:31:00');


-- ===========================
-- TABLA RESERVAS_SERVICIOS
-- ===========================
CREATE TABLE reservas_servicios (
  reserva_servicio_id INT(11) NOT NULL AUTO_INCREMENT,
  reserva_id INT(11) NOT NULL,
  servicio_id INT(11) NOT NULL,
  importe DECIMAL(10,2) NOT NULL,
  creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  modificado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  PRIMARY KEY (reserva_servicio_id),
  KEY rs_reserva_fk (reserva_id),
  KEY rs_servicio_fk (servicio_id),
  CONSTRAINT rs_reserva_fk FOREIGN KEY (reserva_id) REFERENCES reservas (reserva_id),
  CONSTRAINT rs_servicio_fk FOREIGN KEY (servicio_id) REFERENCES servicios (servicio_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO reservas_servicios VALUES
(1,1,1,50000,'2025-08-19 22:07:31','2025-08-19 22:07:31'),
(2,1,2,50000,'2025-08-19 22:07:31','2025-08-19 22:07:31'),
(3,1,3,50000,'2025-08-19 22:07:31','2025-08-19 22:07:31'),
(4,1,4,50000,'2025-08-19 22:07:31','2025-08-19 22:07:31'),
(5,2,1,50000,'2025-08-19 22:08:08','2025-08-19 22:08:08'),
(6,2,2,50000,'2025-08-19 22:08:08','2025-08-19 22:08:08'),
(7,3,1,100000,'2025-08-19 22:09:17','2025-08-19 22:09:17'),
(8,3,2,100000,'2025-08-19 22:09:17','2025-08-19 22:09:17'),
(9,3,3,100000,'2025-08-19 22:09:17','2025-08-19 22:09:17'),
(10,3,4,200000,'2025-08-19 22:09:17','2025-08-19 22:09:17');


-- ===========================
-- TABLA COMENTARIOS
-- ===========================
CREATE TABLE comentarios (
  comentario_id INT(11) NOT NULL AUTO_INCREMENT,
  reserva_id INT(11) NOT NULL,
  usuario_id INT(11) NOT NULL,
  texto VARCHAR(500) NOT NULL,
  creado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP(),
  modificado TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP() ON UPDATE CURRENT_TIMESTAMP(),
  activo TINYINT(4) DEFAULT 1,
  PRIMARY KEY (comentario_id),
  KEY c_reserva_fk (reserva_id),
  KEY c_usuario_fk (usuario_id),
  CONSTRAINT c_reserva_fk FOREIGN KEY (reserva_id) REFERENCES reservas (reserva_id),
  CONSTRAINT c_usuario_fk FOREIGN KEY (usuario_id) REFERENCES usuarios (usuario_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

INSERT INTO comentarios VALUES
(1,1,12,'El cliente confirmó el pago del 50%.','2025-11-06 21:48:16','2025-11-06 21:59:22',0);

COMMIT;

-- ======================================
-- STORED PROCEDURES
-- ======================================

DELIMITER //

CREATE PROCEDURE sp_estadisticas_reservas()
BEGIN
  SELECT 
    DATE_FORMAT(fecha_reserva, '%Y-%m') AS mes,
    COUNT(*) AS total_reservas,
    SUM(importe_total) AS total_ingresos
  FROM reservas
  WHERE activo = 1
  GROUP BY DATE_FORMAT(fecha_reserva, '%Y-%m')
  ORDER BY mes DESC;
END //

CREATE PROCEDURE sp_reservas_por_salon()
BEGIN
  SELECT
    s.titulo AS salon,
    COUNT(r.reserva_id) AS total_reservas,
    SUM(r.importe_total) AS ingresos
  FROM reservas r
  JOIN salones s ON r.salon_id = s.salon_id
  WHERE r.activo = 1
  GROUP BY s.salon_id;
END //

CREATE PROCEDURE sp_reservas_por_dia()
BEGIN
  SELECT
    fecha_reserva,
    COUNT(*) AS total_reservas
  FROM reservas
  WHERE activo = 1
  GROUP BY fecha_reserva
  ORDER BY fecha_reserva DESC;
END //

CREATE PROCEDURE sp_porcentaje_ocupacion()
BEGIN
  SELECT
    s.titulo AS salon,
    COUNT(r.reserva_id) AS reservas,
    (COUNT(r.reserva_id) / (SELECT COUNT(*) FROM turnos WHERE activo = 1)) * 100 AS porcentaje_ocupacion
  FROM salones s
  LEFT JOIN reservas r ON r.salon_id = s.salon_id AND r.activo = 1
  GROUP BY s.salon_id;
END //

CREATE PROCEDURE sp_datos_notificacion(IN p_reserva_id INT)
BEGIN
  SELECT 
    r.reserva_id,
    r.fecha_reserva,
    s.titulo AS salon,
    t.hora_desde,
    t.hora_hasta,
    u.nombre_usuario AS email_cliente
  FROM reservas r
  JOIN usuarios u ON u.usuario_id = r.usuario_id
  JOIN salones s ON s.salon_id = r.salon_id
  JOIN turnos t  ON t.turno_id = r.turno_id
  WHERE r.reserva_id = p_reserva_id;

  SELECT 
    nombre_usuario AS email_admin
  FROM usuarios
  WHERE tipo_usuario = 1 AND activo = 1;
END //

DELIMITER ;

DELIMITER //

CREATE PROCEDURE sp_reporte_reservas()
BEGIN
  SELECT
    r.reserva_id,
    r.fecha_reserva,
    r.importe_salon,
    r.importe_total,
    u.nombre AS cliente,
    u.apellido AS cliente_apellido,
    s.titulo AS salon,
    t.hora_desde,
    t.hora_hasta
  FROM reservas r
  JOIN usuarios u ON r.usuario_id = u.usuario_id
  JOIN salones s ON r.salon_id = s.salon_id
  JOIN turnos t ON r.turno_id = t.turno_id
  WHERE r.activo = 1
  ORDER BY r.reserva_id DESC;
END //

DELIMITER ;