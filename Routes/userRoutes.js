//importing modules
const express = require('express')
const userController = require('../Controllers/userController')
const { signup, login, getUsers } = userController
const userAuth = require('../Middlewares/userAuth')

const router = express.Router()

//signup endpoint
//passing the middleware function to the signup
router.post('/signup', userAuth.saveUser, signup)


router.post('/login', login)

router.get('/getUsers', getUsers)

module.exports = router