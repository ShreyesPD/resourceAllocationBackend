//importing modules
const bcrypt = require("bcrypt");
const db = require("../Models");
const jwt = require("jsonwebtoken");

const WorksOn=db.worksOn;

const assign_project = async (req, res) => {
    try {
        const {res_status, week_no, hrs_per_week} = req.body;
        // console.log("helloooooo");
        const enp_id= req.params['emp_id'];
        const proj_id= req.params['proj_id'];
        // console.log("enp_id"+enp_id);
        const data = {
            enp_id, 
            proj_id,
            res_status, 
            week_no, 
            hrs_per_week
        };

        const worksOn = await WorksOn.create(data)

        if (worksOn) {
            let token = jwt.sign({ id: worksOn.id }, process.env.secretKey, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            });

            res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
            console.log("worksOn", JSON.stringify(worksOn, null, 2));
            console.log(token);
        
            return res.status(201).send("project assigned");
        } else {
            return res.status(409).send("Details are not correct");
        }
    } catch (error) {
        console.log(error);
    }
}

const fetch_res_allo = async (req, res) => {
    try {

        const allReso = await WorksOn.findAll();
        console.log({ allReso });
        res.status(200).send(allReso);
    
       
    } catch (error) {
        console.log(error);
    }
};

const fetch_res_available = async (req, res) => {
    try{
            
        const { QueryTypes } = require('sequelize');
        const pro1 = await db.sequelize.query('SELECT ab.enp_id, sum("hrs_per_week") FROM "worksOns" as ab, "Employees" as ba where ba.enp_id = ab.enp_id GROUP BY ab.enp_id having sum("hrs_per_week") < 40 ;', { type: QueryTypes.SELECT });

        console.log(pro1);
        res.status(200).send(pro1);

    }catch (error) {
        console.log(error);
    }
};

const fetch_projects_res = async (req, res) => {
    try{
        var id= req.params['id']; 
        todaydate = new Date(); 
            var oneJan =  new Date(todaydate.getFullYear(), 0, 1); 
            var year=todaydate.getFullYear(); 
            year=2019
            // calculating number of days in given year before a given date   
            var numberOfDays =  Math.floor((todaydate - oneJan) / (24 * 60 * 60 * 1000));  
            // adding 1 since to current date and returns value starting from 0   
            var result = Math.ceil(( todaydate.getDay() + 1 + numberOfDays) / 7);
        const { QueryTypes } = require('sequelize');  
        const pid = await db.sequelize.query(`SELECT "proj_id" from "Projects" where "mngr_id"='${id}'` , { type: QueryTypes.SELECT });
        var pro1=new Array();
        for(o of pid)
            {   
                weekNum='201901'
                pro1 = await db.sequelize.query(`SELECT * FROM "worksOns" as ab where ab.proj_id=2 and "week_no"='${weekNum}' ;`, { type: QueryTypes.SELECT });
                result++
             }
            //  weekNum=(result<10)?year.toString()+"0"+result.toString() : year.toString()+result.toString();
         // const pro1 = await db.sequelize.query(`SELECT ab.proj_id, ba.proj_id FROM "worksOns" as ab , "Projects" as ba   ;`, { type: QueryTypes.SELECT });

        // const pro1 = await db.sequelize.query(`SELECT ab.proj_id, enp_id, week_no, hrs_per_week FROM "worksOns" as ab where ab.proj_id in (select DISTINCT ba.proj_id from "Projects" as ba where mngr_id='${id}') ;`, { type: QueryTypes.SELECT });
        console.log(pro1);
        res.status(200).send(pro1);

    }catch (error) {
        console.log(error);
    }
};


module.exports={
    assign_project,
    fetch_res_allo,
    fetch_res_available,
    fetch_projects_res
}

