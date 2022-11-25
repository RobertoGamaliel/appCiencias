CREATE TABLE `LEARNING_MODALITIES` (
  `ID` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID de la entrada',
  `DATE` date NOT NULL COMMENT 'Fecha de creación del registro',
  `DATE_END` date NOT NULL COMMENT 'Fecha maxxima para podder solicitarlo',
  `DESCRIPTION` text NOT NULL COMMENT 'Descripción de la modalidad',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci; 