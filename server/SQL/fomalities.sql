CREATE TABLE `FORMALITIES` (
  `ID` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID de la investigación',
  `DATE` date NOT NULL COMMENT 'Fecha de creación del registro',
  `CATEGORY` varchar(200) NOT NULL COMMENT 'Categoria del tramite',
  `STEPS` text NOT NULL COMMENT 'Pasos a seguir para relizar el trmaite',
  `IMAGES` text NOT NULL COMMENT 'Imagenes asociadas',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;