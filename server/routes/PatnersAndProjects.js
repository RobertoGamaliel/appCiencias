import {Router} from 'express';
import {pool} from '../DB.js';

const patnersAndProjects = Router();

patnersAndProjects.get('/pat_proj',async (req,res)=>{
    if(req.query.date === undefined || isNaN(Date.parse(req.query.date))){
        res.status(500).json("Error");
        return;
    }

    try {
        const [rows] = await pool.query(`SELECT * FROM PATNERS_AND_PROJECTS WHERE DATE >= '${req.query.date}'`);
        let news={};
        for (let index = 0; index < rows.length; index++) {
            news[`${index}`] = {
                "id" : rows[index]["ID"],
                "date" : rows[index]["DATE"],
                "project_name" : rows[index]["PROJECT_NAME"],
                "project_description" : rows[index]["PROJECT_DESCRIPTION"],
                "managers" : rows[index]["MANAGERS"],
                "alumns" : rows[index]["ALUMNS"],
                "link" : rows[index]["LINK"],
            }; 
        }
        res.json(news);
    } catch (error) {
        res.status(500).json("Error");
    }
}).
post('/pat_proj',async (req,res)=>{
    let date = req.query.date;
    let project_name = req.query.project_name;
    let project_description = req.query.project_description;
    let managers = req.query.managers;
    let alumns = req.query.alumns;
    let link = req.query.link;

    if( date == undefined ||
        isNaN(Date.parse(req.query.date)) ||
        project_name == undefined ||
        project_description == undefined ||
        managers == undefined ||
        alumns == undefined || 
        link == undefined){
            res.status(500).json("Error");
        return;
    }

    try {
        const resp = await pool.execute(
        `INSERT INTO PATNERS_AND_PROJECTS (DATE, PROJECT_NAME, PROJECT_DESCRIPTION, MANAGERS, ALUMNS, LINK)
        VALUES ('${date}, ${project_name}', '${project_description}', '${managers}', '${alumns}', '${links}')`);
        res.json("Ok");
    } catch (error) {
        res.status(500).json("Error");
    }
    
    
}).delete('/pat_proj',async (req,res)=>{

    if(req.query.id == undefined ){
        res.status(500).json("Error")
        return
    }

    try {
        await pool.query(`DELETE FROM PATNERS_AND_PROJECTS WHERE ID = ${req.query.id}`);
        res.json(("Ok"))
    } catch (error) {
        res.status(500).json(`Error`);
    }
})

export default patnersAndProjects;