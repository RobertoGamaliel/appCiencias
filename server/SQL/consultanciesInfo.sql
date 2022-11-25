CREATE TABLE `CONSULTANCIES_INFO` (
  `ID` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID de la entrada',
  `DATE` date NOT NULL COMMENT 'Fecha de creación del registro',
  `LINK_FORM` varchar(500) NOT NULL COMMENT 'Enlace al formulario',
  `DESCRIPTION` text NOT NULL COMMENT 'Descripción de como solicitar',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;