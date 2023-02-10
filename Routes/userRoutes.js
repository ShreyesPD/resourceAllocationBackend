//importing modules
const express = require('express')
const userController = require('../Controllers/userController')
const { create_user, login, getUsers, getUserbyId } = userController
const userAuth = require('../Middlewares/userAuth')

const router = express.Router()

//signup endpoint
//passing the middleware function to the signup
router.post('/create_user/', userAuth.saveUser, create_user)


router.post('/login', login)

router.get('/getUsers', getUsers)

router.get('/getUserbyId/:id', getUserbyId)

module.exports = router