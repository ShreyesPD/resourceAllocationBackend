//importing modules
const { Sequelize, DataTypes } = require('sequelize')

//Database connection with dialect of postgres specifying the database we are using
//port for my database is 5433
//database name is discover
const sequelize = new Sequelize(`postgres://dbadmin:dbadpassword@localhost:5432/resourcemgmt`, { dialect: "postgres" })

//checking if connection is done
sequelize.authenticate().then(() => {
    console.log(`Database connected to discover`)
}).catch((err) => {
    console.log(err)
})

const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize

//connecting to model
db.users = require('./userModel')(sequelize, DataTypes)
db.employees = require('./employeeModel')(sequelize, DataTypes)
db.project = require('./projectModel')(sequelize, DataTypes)
db.worksOn = require('./worksOn')(sequelize, DataTypes)
// db.leave = require('./laveModel')(sequelize, DataTypes)
// db.activity = require('./activityLog')(sequelize, DataTypes)


//exporting the module
module.exports = db