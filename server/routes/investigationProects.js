import {Router} from 'express';
import {pool} from '../DB.js';

const invP = Router();

invP.get('/investigation_projects',async (req,res)=>{
    if(req.query.date === undefined || isNaN(Date.parse(req.query.date))){
        res.status(500).json("Error");
        return;
    }

   
    try {
        const [rows] = await pool.query(`SELECT * FROM INVESTIGATION_PROJECTS WHERE DATE >= '${req.query.date}'`);
        let news={};
        for (let index = 0; index < rows.length; index++) {
            news[`${index}`] = {
                "id" : rows[index]["ID"],
                "date" : rows[index]["DATE"],
                "project_name" : rows[index]["PROJECT_NAME"],
                "project_description" : rows[index]["PROJECT_DESCRIPTION"],
                "managers": rows[index]["MANAGERS"],
                "link" : rows[index]["LINK"]
            }; 
        }
        res.json(news);
    } catch (error) {
        res.status(500).json("Error");
    }
}).
post('/investigation_projects',async (req,res)=>{
    let date = req.query.date;
    let name = req.query.name;
    let description = req.query.description;
    let managers = req.query.managers;
    let link = req.query.link;

    if( date == undefined ||
        isNaN(Date.parse(req.query.date)) ||
        name == undefined ||
        description == undefined ||
        managers == undefined ||
        link == undefined){
            res.status(500).json("Error");
        return;
    }

    try {
        const resp = await pool.execute(
        `INSERT INTO INVESTIGATION_PROJECTS (DATE, PROJECT_NAME, PROJECT_DESCRIPTION, MANAGERS, LINK)
        VALUES ('${date}', '${name}', '${description}', '${managers}', '${link}')`);
        res.json("Ok");
    } catch (error) {
        res.status(500).json("Error");
    }
    
    
}).delete('/investigation_projects',async (req,res)=>{

    if(req.query.id == undefined ){
        res.status(500).json("Error")
        return
    }

    
    try {
        await pool.query(`DELETE FROM INVESTIGATION_PROJECTS WHERE ID = ${req.query.id}`);
        res.json("Ok")
        
    } catch (error) {
        res.status(500).json(`Error`);
    }
})

export default invP;
