CREATE TABLE `PATNERS_AND_PROJECTS` (
  `ID` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID de la entrada',
  `DATE` date NOT NULL COMMENT 'Fecha de creación del registro',
  `PROJECT_NAME` varchar(300) NOT NULL COMMENT 'Nombre del proyecto',
  `PROJECT_DESCRIPTION` text NOT NULL COMMENT 'Descripción del proyecto',
  `MANAGERS` text NOT NULL COMMENT 'Encargado(s) del proyecto',
  `ALUMNS` text NOT NULL COMMENT 'Alumnos participantes',
  `LINK` text NOT NULL COMMENT 'Enlace a la nocticia',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;