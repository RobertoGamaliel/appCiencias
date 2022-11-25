import {Router} from 'express';
import {pool} from '../DB.js';

const learninigModalities = Router();

learninigModalities.get('/learning_modalities',async (req,res)=>{
    if(req.query.date === undefined || isNaN(Date.parse(req.query.date))){
        res.status(500).json("Error");
        return;
    }

    try {
        const [rows] = await pool.query(`SELECT * FROM LEARNING_MODALITIES WHERE DATE >= '${req.query.date}'`);
        let news={};
        for (let index = 0; index < rows.length; index++) {
            news[`${index}`] = {
                "id" : rows[index]["ID"],
                "date" : rows[index]["DATE"],
                "date_end" : rows[index]["DATE_END"],
                "description" : rows[index]["DESCRIPTION"],
            }; 
        }
        res.json(news);
    } catch (error) {
        res.status(500).json("Error");
    }
}).
post('/learning_modalities',async (req,res)=>{
    let date = req.query.date;
    let date_end = req.query.date_end;
    let description = req.query.description;

    if( date == undefined ||
        isNaN(Date.parse(req.query.date)) ||
        date_end == undefined ||
        description == undefined){
            res.status(500).json("Error");
        return;
    }

    try {
        const resp = await pool.execute(
        `INSERT INTO LEARNING_MODALITIES (DATE, DATE_END, DESCRIPTION)
        VALUES ('${date}, ${date_end}', '${description}')`);
        res.json("Ok");
    } catch (error) {
        res.status(500).json("Error");
    }
    
    
}).delete('/learning_modalities',async (req,res)=>{

    if(req.query.id == undefined ){
        res.status(500).json("Error")
        return
    }

    try {
        await pool.query(`DELETE FROM LEARNING_MODALITIES WHERE ID = ${req.query.id}`);
        res.json(("Ok"))
    } catch (error) {
        res.status(500).json(`Error`);
    }
})

export default learninigModalities;