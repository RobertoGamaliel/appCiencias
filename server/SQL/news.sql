CREATE TABLE `NEWS` (
  `ID` int unsigned NOT NULL AUTO_INCREMENT COMMENT 'ID de la noticia',
  `DATE` date NOT NULL COMMENT 'Fecha de creación d ela noticia',
  `AUTOR` varchar(100) NOT NULL COMMENT 'Autor de la noticia',
  `CONTENT` text NOT NULL COMMENT 'Contenido de la noticia',
  `IMGES` text NOT NULL COMMENT 'Imagenes de la noticia',
  `LINK` text NOT NULL COMMENT 'Enlace a la nocticia',
  PRIMARY KEY (`ID`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;