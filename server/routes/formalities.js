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
        let formalities={};
        for (let index = 0; index < rows.length; index++) {
            formalities[`${index}`] = {
                "id" : rows[index]["ID"],
                "date" : rows[index]["DATE"],
                "category" : rows[index]["CATEGORY"],
                "steps" : rows[index]["STEPS"],
                "images": rows[index]["IMAGES"],
                "name" : rows[index]["NAME"],
                "mainImage" : rows[index]["MAINIMAGE"]==undefined? "": rows[index]["MAINIMAGE"],
            }; 
           
        }
        res.json(formalities);
    } catch (error) {
        res.status(500).json(`"Error" ${error}`);
    }
}).
post('/formalities',async (req,res)=>{
    let date = req.query.date;
    let category = req.query.category;
    let steps = req.query.steps;
    let images = req.query.images;
    let name = req.query.name;
    let mainImage = req.query.mainImage;

    if( date == undefined ||
        isNaN(Date.parse(req.query.date)) ||
        category == undefined ||
        steps == undefined ||
        images == undefined ||
        name == undefined ||
        mainImage == undefined){
            res.status(500).json("Error");
        return;
    }

    try {
        const resp = await pool.execute(
        `INSERT INTO FORMALITIES (DATE, CATEGORY, STEPS, IMAGES, NAME, MAIN_IMAGE)
        VALUES ('${date}', '${category}', '${steps}', '${images}', '${name}', '${mainImage}')`);
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