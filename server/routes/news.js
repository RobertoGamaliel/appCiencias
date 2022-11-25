import {response, Router} from 'express';
import {pool} from '../DB.js';

const noticias = Router();


noticias.get('/news',async (req,res)=>{
    if(req.query.date === undefined || isNaN(Date.parse(req.query.date))){
        res.status(500).json("Error");
        return;
    }

    try {
        const [rows] = await pool.query(`SELECT * FROM news WHERE DATE >= '${req.query.date}'`);
        let news={};
        for (let index = 0; index < rows.length; index++) {
            news[`${index}`] = {
                "id" : rows[index]["ID"],
                "date" : rows[index]["DATE"],
                "autor" : rows[index]["AUTOR"],
                "content" : rows[index]["CONTENT"],
                "link" : rows[index]["LINK"]
            }; 
        }
        res.json(news);
    } catch (error) {
        res.status(500).json("Error");
    }
}).
post('/news',async (req,res)=>{
    console.log(req.query.date)
    let date = req.query.date;
    let autor = req.query.autor;
    let content = req.query.content;
    let images = req.query.content;
    let links = req.query.links;

    if( date == undefined ||
        isNaN(Date.parse(req.query.date)) ||
        autor == undefined ||
        content == undefined ||
        images == undefined ||
        links == undefined){
            res.status(500).json("Error");
        return;
    }
    try {
        const resp = await pool.execute(
        `INSERT INTO news (DATE, AUTOR, CONTENT, IMGES, LINK)
        VALUES ('${date}', '${autor}', '${content}', '${images}', '${links}')`);
        res.json("Ok");
    } catch (error) {
        res.status(500).json("Error");
    }
    
    
}).delete('/news',async (req,res)=>{

    if(req.query.id == undefined ){
        res.status(500).json("Error")
        return
    }

    
    try {
        await pool.query(`DELETE FROM news WHERE ID = ${req.query.id}`);
        res.json(("Ok"))
        
        
    } catch (error) {
        res.status(500).json(`Error`);
    }
})

export default noticias;

//correo para github : difusionfc@uabc.edu.mx