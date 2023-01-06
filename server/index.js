import { Console } from 'console';
import { PORT } from './config.js';
import express from 'express';
import apiNews from './routes/news.js';
import invP from './routes/investigationProects.js';
import consultancies from './routes/consultances.js';
import formalities from './routes/formalities.js';
import learninigModalities from './routes/learningModalities.js';
import patnersAndProjects from './routes/PatnersAndProjects.js';
import socialService from './routes/socialService.js';
import 'dotenv' ;
//import './keyGenerator.js';
const app = express();

//app.use(querysDB);
app.use(apiNews); //Endpoints de noticias
app.use(invP); //Endponits de proyectos de investigación
app.use(consultancies); //Enponits de asesorias (programas activos e información)
app.use(formalities); //Endpoints de tramites
app.use(learninigModalities); //Endpoints de modalidades de aprendizaje
app.use(patnersAndProjects); //Endpoints de prouectos con alumnos involucrados
app.use(socialService); //Endpoints de servicio social
app.listen(3000 || process.env.PORT);

console.log(`App init in port ${PORT}`);