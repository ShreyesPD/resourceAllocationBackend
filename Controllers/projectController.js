//importing modules
const bcrypt = require("bcrypt");
const db = require("../Models");
const jwt = require("jsonwebtoken");

const Project = db.project;

const WorksOn=db.worksOn;

const create_project = async (req, res) => {
    try {
        const { proj_name , proj_status , mngr_id} = req.body;
        const data = {
            proj_name , 
            proj_status ,
            mngr_id
        };

        const project = await Project.create(data)

        if (project) {
            let token = jwt.sign({ id: project.id }, process.env.secretKey, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            });

            res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
            console.log("project", JSON.stringify(project, null, 2));
            console.log(token);
        
            return res.status(201).send("project added");
        } else {
            return res.status(409).send("Details are not correct");
        }
    } catch (error) {
        console.log(error);
    }
}

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



module.exports={
    create_project,
    assign_project,
}