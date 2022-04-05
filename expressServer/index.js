const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const DBconnexion = require('./Config/DataBase');
require('dotenv').config();

const app = express();
app.use(express.json());
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

DBconnexion;
//INDICATEUR
app.post("/indicator",(req,res)=>{
    const iName = req.body.indicatorName;
    const iDesc = req.body.descritpion;
    const iObj = req.body.objectif;
    const iFaible = req.body.faible;
    const iMoyen = req.body.moyen;
    const iBon = req.body.bon;
    const isExpired = req.body.isExpired;
    const createdAt = req.body.createdAt;
    console.log(iName , iDesc , iObj , iFaible , iMoyen , iBon , isExpired , createdAt);

    let sql="INSERT INTO indicators (indicatorName,indicatorDesc,indicatorObjectif,indicatorFaible,indicatorMoyen,indicatorBon,isExpired,createdAt) VALUES (?,?,?,?,?,?,?,?)";
    DBconnexion.query(sql,[iName,iDesc,iObj,iFaible,iMoyen,iBon,isExpired,createdAt],(err,result)=>{
        if(!err){
            res.json(result)
        }else{
            res.json(err)
        }
    })
});
app.get("/indicator",(req,res)=>{

    let sql="SELECT * FROM indicators";
    DBconnexion.query(sql,(err,result)=>{
        if(!err){
            res.json(result)
        }else{
            res.json(err)
        }
    })
});
app.delete("/indicator/:id",(req,res)=>{
    let sql="DELETE FROM indicators WHERE indicatorID=?";
    DBconnexion.query(sql,parseInt(req.params.id),(err,result)=>{
        if(!err){
            res.json(result)
        }else{
            res.json(err)
        }
    })
})
app.put("/indicator/:id",(req,res)=>{
    const dateUpdate = new Date(Date.now());
    const isExpired = req.body.isExpired;
    console.log(isExpired);
    // let sql="UPDATE indicators SET isExpired=? , expiredAt=? WHERE indicatorID=?";
    // DBconnexion.query(sql,[isExpired,dateFormat(dateUpdate,'YYYY-MM-dd HH:mm:ss'),parseInt(req.params.id)],(err,result)=>{
    //     if(!err){
    //         res.json(result)
    //     }else{
    //         res.json(err)
    //     }
    // })
})

//MOIS

app.get("/data/mois",(req,res)=>{

    let sql="SELECT DISTINCT(Month(`Date_Disponibilité`)) as Mois FROM data GROUP BY Month(`Date_Disponibilité`) ASC";
    DBconnexion.query(sql,(err,result)=>{
        if(!err){
            res.json(result)
        }else{
            res.json(err)
        }
    })
});

//BIG DATA
app.get("/data",(req,res)=>{

    let sql="SELECT * FROM data";
    DBconnexion.query(sql,(err,result)=>{
        if(!err){
            res.json(result)
        }else{
            res.json(err)
        }
    })
});
//POURCENTAGE BSC Par mois
app.get("/data/:mois",(req,res)=>{
let sql="SELECT COUNT(`N°BSC`) as DelayBSCParMois FROM `data` WHERE (((hour(timediff(`Fin_Traitement`,`Date_Disponibilité`))*60+minute(timediff(`Fin_Traitement`,`Date_Disponibilité`))+second(timediff(`Fin_Traitement`,`Date_Disponibilité`))/60)<20) && (Month(`Date_Disponibilité`)=?))";
    DBconnexion.query(sql,parseInt(req.params.mois),(err,result)=>{
        if (!err) {
            const DelayBSCParMois = result[0]['DelayBSCParMois'];
            const SQLbscTotalParMois = "SELECT COUNT(`N°BSC`) as BSCParMois FROM `data` WHERE (Month(`Date_Disponibilité`)=?)";
            DBconnexion.query(SQLbscTotalParMois,parseInt(req.params.mois),(err,response)=>{
                if(!err){
                    bscTotalParMois = response[0]['BSCParMois'];
                    const poucentage = (DelayBSCParMois/bscTotalParMois)*100;
                    poucentageBSC = poucentage.toFixed(2)
                    //Renvoie le pourcentage du bsc
                    res.json({'%':poucentageBSC})
                }
            })
        }else{
            res.json(err)
        }
    })
});
//Delay Moyenne Par Mois en Minutes
app.get("/data/delay_global/:mois",(req,res)=>{
    let sql="SELECT avg(hour(timediff(`Fin_Traitement`,`Date_Disponibilité`))*60+minute(timediff(`Fin_Traitement`,`Date_Disponibilité`))+second(timediff(`Fin_Traitement`,`Date_Disponibilité`))/60) as DelayMoyenParMois FROM `data` WHERE (Month(`Date_Disponibilité`)=?)";
    DBconnexion.query(sql,parseInt(req.params.mois),(err,result)=>{
        if(!err){
            res.json(result)
        }else{
            res.json(err)
        }
    })
});

app.listen(process.env.Port,()=>{
    console.log("Server running!!");
})