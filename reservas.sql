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
  JOIN usuarios u   ON r.usuario_id = u.usuario_id
  JOIN salones s    ON r.salon_id  = s.salon_id
  JOIN turnos t     ON r.turno_id  = t.turno_id
  WHERE r.activo = 1
  ORDER BY r.reserva_id DESC;
END //
DELIMITER ;---------------------------------

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `comentarios`
--

CREATE TABLE `comentarios` (
  `comentario_id` int(11) NOT NULL,
  `reserva_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `texto` varchar(500) NOT NULL,
  `creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `modificado` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp(),
  `activo` tinyint(4) DEFAULT 1
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `comentarios`
--

INSERT INTO `comentarios` (`comentario_id`, `reserva_id`, `usuario_id`, `texto`, `creado`, `modificado`, `activo`) VALUES
(1, 1, 12, 'El cliente confirmó el pago del 50%.', '2025-11-06 21:48:16', '2025-11-06 21:59:22', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas`
--

CREATE TABLE `reservas` (
  `reserva_id` int(11) NOT NULL,
  `fecha_reserva` date NOT NULL,
  `salon_id` int(11) NOT NULL,
  `usuario_id` int(11) NOT NULL,
  `turno_id` int(11) NOT NULL,
  `foto_cumpleaniero` varchar(255) DEFAULT NULL,
  `tematica` varchar(255) DEFAULT NULL,
  `importe_salon` decimal(10,2) DEFAULT NULL,
  `importe_total` decimal(10,2) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `modificado` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `reservas`
--

INSERT INTO `reservas` (`reserva_id`, `fecha_reserva`, `salon_id`, `usuario_id`, `turno_id`, `foto_cumpleaniero`, `tematica`, `importe_salon`, `importe_total`, `activo`, `creado`, `modificado`) VALUES
(1, '2025-10-08', 1, 1, 1, NULL, 'Plim plim', NULL, 200000.00, 1, '2025-08-19 22:02:33', '2025-08-19 22:02:33'),
(2, '2025-10-08', 2, 1, 1, NULL, 'Messi', NULL, 100000.00, 1, '2025-08-19 22:03:45', '2025-08-19 22:03:45'),
(3, '2025-10-08', 2, 2, 1, NULL, 'Palermo', NULL, 500000.00, 1, '2025-08-19 22:03:45', '2025-08-19 22:03:45');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `reservas_servicios`
--

CREATE TABLE `reservas_servicios` (
  `reserva_servicio_id` int(11) NOT NULL,
  `reserva_id` int(11) NOT NULL,
  `servicio_id` int(11) NOT NULL,
  `importe` decimal(10,2) NOT NULL,
  `creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `modificado` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `reservas_servicios`
--

INSERT INTO `reservas_servicios` (`reserva_servicio_id`, `reserva_id`, `servicio_id`, `importe`, `creado`, `modificado`) VALUES
(1, 1, 1, 50000.00, '2025-08-19 22:07:31', '2025-08-19 22:07:31'),
(2, 1, 2, 50000.00, '2025-08-19 22:07:31', '2025-08-19 22:07:31'),
(3, 1, 3, 50000.00, '2025-08-19 22:07:31', '2025-08-19 22:07:31'),
(4, 1, 4, 50000.00, '2025-08-19 22:07:31', '2025-08-19 22:07:31'),
(5, 2, 1, 50000.00, '2025-08-19 22:08:08', '2025-08-19 22:08:08'),
(6, 2, 2, 50000.00, '2025-08-19 22:08:08', '2025-08-19 22:08:08'),
(7, 3, 1, 100000.00, '2025-08-19 22:09:17', '2025-08-19 22:09:17'),
(8, 3, 2, 100000.00, '2025-08-19 22:09:17', '2025-08-19 22:09:17'),
(9, 3, 3, 100000.00, '2025-08-19 22:09:17', '2025-08-19 22:09:17'),
(10, 3, 4, 200000.00, '2025-08-19 22:09:17', '2025-08-19 22:09:17');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `salones`
--

CREATE TABLE `salones` (
  `salon_id` int(11) NOT NULL,
  `titulo` varchar(255) NOT NULL,
  `direccion` varchar(255) NOT NULL,
  `latitud` decimal(10,8) DEFAULT NULL,
  `longitud` decimal(11,8) DEFAULT NULL,
  `capacidad` int(11) DEFAULT NULL,
  `importe` decimal(10,2) NOT NULL,
  `activo` tinyint(1) DEFAULT 1,
  `creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `modificado` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `salones`
--

INSERT INTO `salones` (`salon_id`, `titulo`, `direccion`, `latitud`, `longitud`, `capacidad`, `importe`, `activo`, `creado`, `modificado`) VALUES
(1, 'Principal', 'San Lorenzo 1000', NULL, NULL, 200, 95000.00, 1, '2025-08-19 21:51:22', '2025-08-19 21:51:22'),
(2, 'Secundario', 'San Lorenzo 1000', NULL, NULL, 70, 7000.00, 1, '2025-08-19 21:51:22', '2025-08-19 21:51:22'),
(3, 'Cancha Fútbol 5', 'Alberdi 300', NULL, NULL, 50, 150000.00, 1, '2025-08-19 21:51:22', '2025-08-19 21:51:22'),
(4, 'Maquina de Jugar', 'Peru 50', NULL, NULL, 100, 95000.00, 1, '2025-08-19 21:51:22', '2025-08-19 21:51:22'),
(5, 'Trampolín Play', 'Belgrano 100', NULL, NULL, 70, 200000.00, 1, '2025-08-19 21:51:22', '2025-08-19 21:51:22');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `servicios`
--

CREATE TABLE `servicios` (
  `servicio_id` int(11) NOT NULL,
  `descripcion` varchar(255) NOT NULL,
  `importe` decimal(10,2) NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `modificado` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `servicios`
--

INSERT INTO `servicios` (`servicio_id`, `descripcion`, `importe`, `activo`, `creado`, `modificado`) VALUES
(1, 'Sonido', 15000.00, 1, '2025-08-19 21:47:55', '2025-08-19 21:47:55'),
(2, 'Mesa dulce', 25000.00, 1, '2025-08-19 21:47:55', '2025-08-19 21:47:55'),
(3, 'Tarjetas de invitación', 5000.00, 1, '2025-08-19 21:47:55', '2025-08-19 21:47:55'),
(4, 'Mozos', 15000.00, 1, '2025-08-19 21:47:55', '2025-08-19 21:47:55'),
(5, 'Sala de video juegos', 15000.00, 1, '2025-08-19 21:47:55', '2025-08-19 21:47:55'),
(6, 'Mago', 25000.00, 1, '2025-08-20 21:31:00', '2025-08-20 21:31:00'),
(7, 'Cabezones', 80000.00, 1, '2025-08-20 21:31:00', '2025-08-20 21:31:00'),
(8, 'Maquillaje infantil', 1000.00, 1, '2025-08-20 21:31:00', '2025-08-20 21:31:00');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `turnos`
--

CREATE TABLE `turnos` (
  `turno_id` int(11) NOT NULL,
  `orden` int(11) NOT NULL,
  `hora_desde` time NOT NULL,
  `hora_hasta` time NOT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `modificado` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `turnos`
--

INSERT INTO `turnos` (`turno_id`, `orden`, `hora_desde`, `hora_hasta`, `activo`, `creado`, `modificado`) VALUES
(1, 1, '12:00:00', '14:00:00', 1, '2025-08-19 21:44:19', '2025-08-19 21:44:19'),
(2, 2, '15:00:00', '17:00:00', 1, '2025-08-19 21:46:08', '2025-08-19 21:46:08'),
(3, 3, '18:00:00', '20:00:00', 1, '2025-08-19 21:46:08', '2025-08-19 21:46:08');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `usuario_id` int(11) NOT NULL,
  `nombre` varchar(50) NOT NULL,
  `apellido` varchar(50) NOT NULL,
  `nombre_usuario` varchar(50) NOT NULL,
  `contrasenia` varchar(255) NOT NULL,
  `tipo_usuario` tinyint(4) NOT NULL,
  `celular` varchar(20) DEFAULT NULL,
  `foto` varchar(255) DEFAULT NULL,
  `activo` tinyint(1) NOT NULL DEFAULT 1,
  `creado` timestamp NOT NULL DEFAULT current_timestamp(),
  `modificado` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`usuario_id`, `nombre`, `apellido`, `nombre_usuario`, `contrasenia`, `tipo_usuario`, `celular`, `foto`, `activo`, `creado`, `modificado`) VALUES
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
(12, 'Evangelina', 'Romano', 'evangelina@correo.com', '$2b$10$hiJEy8.CuUSj17hmv9LawOdBXxYUvhRgNgVPlCCWAJiigGdBKE.6a', 1, NULL, NULL, 1, '2025-11-06 19:48:27', '2025-11-06 19:48:27'),
(13, 'Camila', 'Lewis', 'camila@correo.com', '$2b$10$hiJEy8.CuUSj17hmv9LawOdBXxYUvhRgNgVPlCCWAJiigGdBKE.6a', 1, NULL, NULL, 1, '2025-11-06 19:48:27', '2025-11-06 19:48:27');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD PRIMARY KEY (`comentario_id`),
  ADD KEY `reserva_id` (`reserva_id`),
  ADD KEY `usuario_id` (`usuario_id`);

--
-- Indices de la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD PRIMARY KEY (`reserva_id`),
  ADD KEY `reservas_fk2` (`salon_id`),
  ADD KEY `reservas_fk3` (`usuario_id`),
  ADD KEY `reservas_fk4` (`turno_id`);

--
-- Indices de la tabla `reservas_servicios`
--
ALTER TABLE `reservas_servicios`
  ADD PRIMARY KEY (`reserva_servicio_id`),
  ADD KEY `reservas_servicios_fk1` (`reserva_id`),
  ADD KEY `reservas_servicios_fk2` (`servicio_id`);

--
-- Indices de la tabla `salones`
--
ALTER TABLE `salones`
  ADD PRIMARY KEY (`salon_id`);

--
-- Indices de la tabla `servicios`
--
ALTER TABLE `servicios`
  ADD PRIMARY KEY (`servicio_id`);

--
-- Indices de la tabla `turnos`
--
ALTER TABLE `turnos`
  ADD PRIMARY KEY (`turno_id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`usuario_id`),
  ADD UNIQUE KEY `nombre_usuario` (`nombre_usuario`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `comentarios`
--
ALTER TABLE `comentarios`
  MODIFY `comentario_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `reservas`
--
ALTER TABLE `reservas`
  MODIFY `reserva_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `reservas_servicios`
--
ALTER TABLE `reservas_servicios`
  MODIFY `reserva_servicio_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `salones`
--
ALTER TABLE `salones`
  MODIFY `salon_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT de la tabla `servicios`
--
ALTER TABLE `servicios`
  MODIFY `servicio_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT de la tabla `turnos`
--
ALTER TABLE `turnos`
  MODIFY `turno_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `usuario_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=14;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `comentarios`
--
ALTER TABLE `comentarios`
  ADD CONSTRAINT `comentarios_ibfk_1` FOREIGN KEY (`reserva_id`) REFERENCES `reservas` (`reserva_id`),
  ADD CONSTRAINT `comentarios_ibfk_2` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`);

--
-- Filtros para la tabla `reservas`
--
ALTER TABLE `reservas`
  ADD CONSTRAINT `reservas_fk2` FOREIGN KEY (`salon_id`) REFERENCES `salones` (`salon_id`),
  ADD CONSTRAINT `reservas_fk3` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios` (`usuario_id`),
  ADD CONSTRAINT `reservas_fk4` FOREIGN KEY (`turno_id`) REFERENCES `turnos` (`turno_id`);

--
-- Filtros para la tabla `reservas_servicios`
--
ALTER TABLE `reservas_servicios`
  ADD CONSTRAINT `reservas_servicios_fk1` FOREIGN KEY (`reserva_id`) REFERENCES `reservas` (`reserva_id`),
  ADD CONSTRAINT `reservas_servicios_fk2` FOREIGN KEY (`servicio_id`) REFERENCES `servicios` (`servicio_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;


-- Procedimiento almacenado para estadísticas
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
DELIMITER ;
