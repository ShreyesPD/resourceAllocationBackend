//importing modules
const express = require("express");
const db = require("../Models");
//Assigning db.users to User variable
const Project = db.project;

//Function to check if username or email already exist in the database
//this is to avoid having two users with the same username and email
const saveProj = async (req, res, next) => {
    //search the database to see if user exist
    try {
        const projname = await Project.findOne({
            where: {
                proj_name: req.body.proj_name,
            },
        });
        //if username exist in the database respond with a status of 409
        if (projname) {
            return res.status(409).send("project already exists");
        }

        next();
    } catch (error) {
        console.log(error);
    }
};

//exporting module
module.exports = {
    saveProj,

};