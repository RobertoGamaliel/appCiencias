import {Router} from 'express';
import {pool} from '../DB.js';

const consultancies = Router();

//ASESORIAS  E INFORMACION DE ASESORIAS
consultancies.get('/consultancies',async (req,res)=>{
    if(req.query.date === undefined || isNaN(Date.parse(req.query.date))){
        res.status(500).json("Error");
        return;
    }

    try {
        const [rows] = await pool.query(`SELECT * FROM CONSULTANCIES WHERE DATE >= '${req.query.date}'`);
        let news={};
        for (let index = 0; index < rows.length; index++) {
            news[`${index}`] = {
                "id" : rows[index]["ID"],
                "date" : rows[index]["DATE"],
                "subject" : rows[index]["SUBJECT"],
                "modality" : rows[index]["MODALITY"],
                "schedule" : rows[index]["SCHEDULE"],
                "location" : rows[index]["LOCATION"],
                "tutor" : rows[index]["TUTOR"]
            }; 
        }
        res.json(news);
    } catch (error) {
        res.status(500).json("Error");
    }
}).get('/consultancies_info',async (req,res)=>{
    if(req.query.date === undefined || isNaN(Date.parse(req.query.date))){
        res.status(500).json("Error");
        return;
    }

    try {
        const [rows] = await pool.query(`SELECT * FROM CONSULTANCIES_INFO WHERE DATE >= '${req.query.date}'`);
        if(rows.length===0){
            res.json({});
        }
        let info = {
            "date" : rows[0]["DATE"],
            "link_form" : rows[0]["LINK_FORM"],
            "desciption" : rows[0]["DESCRIPTION"],
        }; 
        res.json(info);
    } catch (error) {
        res.status(500).json("Error");
    }
}).
post('/consultancies',async (req,res)=>{
    let date = req.query.date;
    let subject = req.query.subject;
    let modality = req.query.modality;
    let schedule = req.query.schedule;
    let location = req.query.location;
    let tutor = req.query.tutor;

    if( date == undefined ||
        isNaN(Date.parse(req.query.date)) ||
        subject == undefined ||
        modality == undefined ||
        schedule == undefined ||
        location == undefined ||
        tutor == undefined){
            res.status(500).json("Error");
        return;
    }
    try {
        const resp = await pool.execute(
        `INSERT INTO CONSULTANCIES (DATE, SUBJECT, MODALITY, SCHEDULE, LOCATION, TUTOR)
        VALUES ('${date}', '${subject}', ${modality}, '${schedule}', '${location}', '${tutor}')`);
        res.json("Ok");
    } catch (error) {
        res.status(500).json("Error");
    }
    
    
}).post('/consultancies_info',async (req,res)=>{
    console.log(req.query.date)
    let date = req.query.date;
    let link_form = req.query.link_form;
    let description = req.query.description;

    if( date == undefined ||
        isNaN(Date.parse(req.query.date)) ||
        link_form == undefined ||
        description == undefined){
            res.status(500).json("Error");
        return;
    }
    try {
        await pool.execute("DELETE FROM CONSULTANCIES_INFO");
        const resp = await pool.execute(
        `INSERT INTO CONSULTANCIES_INFO (DATE, LINK_FORM, DESCRIPTION)
        VALUES ('${date}', '${link_form}', ${description})`);
        res.json("Ok");
    } catch (error) {
        res.status(500).json("Error");
    }
    
    
}).delete('/consultancies',async (req,res)=>{

    if(req.query.id == undefined ){
        res.status(500).json("Error")
        return
    }

    
    try {
        await pool.query(`DELETE FROM CONSULTANCIES WHERE ID = ${req.query.id}`);
        res.json(("Ok"))
        
        
    } catch (error) {
        res.status(500).json(`Error`);
    }
})

export default consultancies;

//correo para github : g,