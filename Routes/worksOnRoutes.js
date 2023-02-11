//importing modules
const express = require('express')
const worksOnController = require('../Controllers/worksOnController')
const { assign_project, fetch_res_allo, fetch_res_available,fetch_projects_res } = worksOnController;
//const projAuth = require('../Middlewares/projAuth')

const router = express.Router()


router.post('/assign_project/employee/:emp_id/project/:proj_id',assign_project);

router.get('/fetch_res_allo' ,fetch_res_allo);

router.get('/fetch_res_available' ,fetch_res_available);

router.get('/fetch_projects_res/:id',fetch_projects_res);


module.exports = router