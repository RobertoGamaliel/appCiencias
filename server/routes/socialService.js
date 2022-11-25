import {Router} from 'express';
import {pool} from '../DB.js';

const socialService = Router();

socialService.get('/social_service',async (req,res)=>{
    if(req.query.date === undefined || isNaN(Date.parse(req.query.date))){
        res.status(500).json("Error");
        return;
    }

   
    try {
        const [rows] = await pool.query(`SELECT * FROM SOCIAL_SERVICE WHERE DATE >= '${req.query.date}' AND MAX_REGISTER_DATE >= '${req.query.date}'`);
        let news={};
        for (let index = 0; index < rows.length; index++) {
            news[`${index}`] = {
                "id" : rows[index]["ID"],
                "date" : rows[index]["DATE"],
                "max_register_date" : rows[index]["MAX_REGISTER_DATE"],
                "decription" : rows[index]["DESCRIPTION"],
                "images" : rows[index]["IMAGES"],
                "link" : rows[index]["LINK"],
            }; 
        }
        res.json(news);
    } catch (error) {
        res.status(500).json(`ERROR`);
    }
}).
post('/social_service',async (req,res)=>{
    let date = req.query.date;
    let max_register_date = req.query.max_register_date;
    let description = req.query.description;
    let images = req.query.images;
    let link = req.query.link;

    
    if( date == undefined ||
        isNaN(Date.parse(req.query.date)) ||
        max_register_date == undefined ||
        isNaN(Date.parse(max_register_date)) ||
        description == undefined ||
        images == undefined ||
        link == undefined){
            res.status(500).json("Error");
        return;
    }

    let dateMax = Date.parse(max_register_date);
    let now = new Date();
    if(now.getTime() > dateMax){
        res.status(500).json("Error");
        return;
    }

    try {
        const resp = await pool.execute(
        `INSERT INTO SOCIAL_SERVICE (DATE, MAX_REGISTER_DATE, DESCRIPTION, IMAGES,  LINK)
        VALUES ('${date}', '${max_register_date}', '${description}',  '${images}', '${link}')`);
        res.json("Ok");
    } catch (error) {
        res.status(500).json("Error");
    }
    
    
}).delete('/social_service',async (req,res)=>{

    if(req.query.id == undefined ){
        res.status(500).json("Error")
        return
    }

    try {
        await pool.query(`DELETE FROM SOCIAL_SERVICE WHERE ID = ${req.query.id}`);
        res.json(("Ok"))
    } catch (error) {
        res.status(500).json(`Error`);
    }
})

export default socialService;