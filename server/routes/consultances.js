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
                "matter" : rows[index]["MATTER"],
                "mode" : rows[index]["MODE"],
                "schedule" : rows[index]["SCHEDULE"],
                "ubication" : rows[index]["UBICATION"]
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
    let matter = req.query.matter;
    let mode = req.query.mode;
    let schedule = req.query.content;
    let ubication = req.query.ubication;

    if( date == undefined ||
        isNaN(Date.parse(req.query.date)) ||
        matter == undefined ||
        mode == undefined ||
        schedule == undefined ||
        ubication == undefined){
            res.status(500).json("Error");
        return;
    }
    try {
        const resp = await pool.execute(
        `INSERT INTO CONSULTANCIES (DATE, MATTER, MODE, SCHEDULE, UBICATION)
        VALUES ('${date}', '${matter}', ${mode}, '${schedule}', '${ubication}')`);
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

//correo para github : difusionfc@uabc.edu.mx