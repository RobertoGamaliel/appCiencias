CREATE TABLE `SOCIAL_SERVICE` (
  `ID` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID de la entrada',
  `DATE` date NOT NULL COMMENT 'Fecha de creación del registro',
  `MAX_REGISTER_DATE` date NOT NULL COMMENT 'Fecha limite para el registro',
  `DESCRIPTION` text NOT NULL COMMENT 'Descripción del servicio',
  `IMAGES` text NOT NULL COMMENT 'Imagenes asociadas al proyecto',
  `LINK` text NOT NULL COMMENT 'Enlace a la nocticia',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;