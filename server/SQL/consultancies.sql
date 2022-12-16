CREATE TABLE `CONSULTANCIES` (
  `ID` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID de la entrada',
  `DATE` date NOT NULL COMMENT 'Fecha de creación del registro',
  `MATTER` varchar(200) NOT NULL COMMENT 'Nombre del la materia de la asesoria',
  `MODE` tinyint NOT NULL COMMENT 'Modalidad de la asesoria',
  `SCHEDULE` text NOT NULL COMMENT 'Horarios de impartición de asesorias',
  `UBICATION` text NOT NULL COMMENT 'Ubicación/enlace donde se imparte la asesoria',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;