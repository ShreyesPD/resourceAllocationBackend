
//importing modules
const express = require('express')
const sequelize = require('sequelize')
const dotenv = require('dotenv').config()
const cookieParser = require('cookie-parser')
 const db = require('./Models')
 const userRoutes = require ('./Routes/userRoutes')
 const projectRoutes = require ('./Routes/projectRoutes')
 const worksOnRoutes = require ('./Routes/worksOnRoutes')
 const leaveRoutes = require ('./Routes/leaveRoutes')


//setting up your port
const PORT = process.env.PORT || 8080

//assigning the variable app to express
const app = express()

//middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())

//synchronizing the database and forcing it to false so we dont lose data
db.sequelize.sync({ force: false }).then(() => {
    console.log("db has been re sync")
})

//routes for the user API
app.use('/api/users', userRoutes)
app.use('/api/project', projectRoutes)
app.use('/api/worksOn',worksOnRoutes)
app.use('/api/Leave',leaveRoutes)

//listening to server connection
app.listen(PORT, () => console.log(`Server is connected on ${PORT}`))
