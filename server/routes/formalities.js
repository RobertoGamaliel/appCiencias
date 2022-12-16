import {Router} from 'express';
import {pool} from '../DB.js';
import  encrypt  from '../encrypt.js';
import decrypt from '../decrypt.js';

const formalities = Router();

formalities.get('/formalities',async (req,res)=>{
    if(req.query.date === undefined || isNaN(Date.parse(req.query.date))){
        res.status(500).json("Error");
        return;
    }

   
    try {
        const [rows] = await pool.query(`SELECT * FROM FORMALITIES WHERE DATE >= '${req.query.date}'`);
        //Le damos formato al renglon recibido de la base de datos en un json y enviamos
        let news={};
        for (let index = 0; index < rows.length; index++) {
            news[`${index}`] = {
                "id" : rows[index]["ID"],
                "date" : rows[index]["DATE"],
                "category" : rows[index]["CATEGORY"],
                "steps" : rows[index]["STEPS"],
                "images": rows[index]["IMAGES"]
            }; 
        }
        let resp = await encrypt("jfjfjjf");
        console.log(resp)
        res.json(news);
    } catch (error) {
        res.status(500).json("Error");
    }
}).
post('/formalities',async (req,res)=>{
    let date = req.query.date;
    let category = req.query.category;
    let steps = req.query.steps;
    let images = req.query.images;

    if( date == undefined ||
        isNaN(Date.parse(req.query.date)) ||
        category == undefined ||
        steps == undefined ||
        images == undefined){
            res.status(500).json("Error");
        return;
    }

    try {
        const resp = await pool.execute(
        `INSERT INTO FORMALITIES (DATE, CATEGORY, STEPS, IMAGES)
        VALUES ('${date}', '${category}', '${steps}', '${images}')`);
        res.json("Ok");
    } catch (error) {
        res.status(500).json("Error");
    }
    
    
}).delete('/formalities',async (req,res)=>{

    if(req.query.id == undefined ){
        res.status(500).json("Error")
        return
    }

    
    try {
        await pool.query(`DELETE FROM FORMALITIES WHERE ID = ${req.query.id}`);
        res.json(("Ok"))
    } catch (error) {
        res.status(500).json(`Error`);
    }
})

export default formalities;