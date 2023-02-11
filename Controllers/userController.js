//importing modules
const bcrypt = require("bcrypt");
const db = require("../Models");
const jwt = require("jsonwebtoken");

// Assigning users to the variable User
const User = db.employees;

//signing a user up
//hashing users password before its saved to the database with bcrypt
const create_user = async (req, res) => {
    try {
        const { emp_name, email, password , address ,phone ,emp_type } = req.body;
        const data = {
            emp_name,
            email,
            password: await bcrypt.hash(password, 10),
            address,
            phone,
            emp_type
        };

        const user = await User.create(data)

        if (user) {
            let token = jwt.sign({ id: user.id }, process.env.secretKey, {
                expiresIn: 1 * 24 * 60 * 60 * 1000,
            });

            res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
            console.log("user", JSON.stringify(user, null, 2));
            console.log(token);
        
            return res.status(201).send("user added");
        } else {
            return res.status(409).send("Details are not correct");
        }
    } catch (error) {
        console.log(error);
    }
};


//login authentication

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        //find a user by their email
        const user = await User.findOne({
            where: {
                email: email
            }

        });

        //if user email is found, compare password with bcrypt
        if (user) {
            const isSame = await bcrypt.compare(password, user.password);

            //if password is the same
            //generate token with the user's id and the secretKey in the env file

            if (isSame) {
                let token = jwt.sign({ id: user.id }, process.env.secretKey, {
                    expiresIn: 1 * 24 * 60 * 60 * 1000,
                });

                //if password matches wit the one in the database
                //go ahead and generate a cookie for the user
                res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
                console.log("user", JSON.stringify(user, null, 2));
                console.log(token);
                //send user data
                return res.status(201).send(user);
            } else {
                return res.status(401).send("Authentication failed");
            }
        } else {
            return res.status(401).send("Authentication failed");
        }
    } catch (error) {
        console.log(error);
    }
};

const getUsers = async (req, res) => {
    try {
        
        //find a user by their email
        const allUser = await User.findAll();
        console.log({ allUser });
        res.status(200).send(allUser);
        //   const user = await User.findOne({
        //     where: {
        //     email: email
        //   } 

        //   });

        //   //if user email is found, compare password with bcrypt
        //   if (user) {
        //     const isSame = await bcrypt.compare(password, user.password);

        //     //if password is the same
        //      //generate token with the user's id and the secretKey in the env file

        //     if (isSame) {
        //       let token = jwt.sign({ id: user.id }, process.env.secretKey, {
        //         expiresIn: 1 * 24 * 60 * 60 * 1000,
        //       });

        //       //if password matches wit the one in the database
        //       //go ahead and generate a cookie for the user
        //       res.cookie("jwt", token, { maxAge: 1 * 24 * 60 * 60, httpOnly: true });
        //       console.log("user", JSON.stringify(user, null, 2));
        //       console.log(token);
        //       //send user data
        //       return res.status(201).send(user);
        //     } else {
        //       return res.status(401).send("Authentication failed");
        //     }
        //   } else {
        //     return res.status(401).send("Authentication failed");
        //   }
    } catch (error) {
        console.log(error);
    }
};

const getUserbyId = async (req, res) => {
    try {
        
        // const allUser = await User.findAll();
        // console.log({ allUser });
        // res.status(200).send(allUser);
          const user = await User.findOne({
            where: {
            enp_id: req.params['id']
          } 

          });

        //   //if user email is found, compare password with bcrypt
          if (user) {
            todaydate = new Date(); 
            year=todaydate.getFullYear();
            var oneJan =  new Date(todaydate.getFullYear(), 0, 1);   
            // calculating number of days in given year before a given date   
            var numberOfDays =  Math.floor((todaydate - oneJan) / (24 * 60 * 60 * 1000));  
            // adding 1 since to current date and returns value starting from 0   
            var result = Math.ceil(( todaydate.getDay() + 1 + numberOfDays) / 7);
            //var weekNum='201901';
            const { QueryTypes } = require('sequelize');
            //const pro1 = await db.sequelize.query('SELECT * FROM "Projects" ', { type: QueryTypes.SELECT });
            for(i=0;i<4;i++)
            {   weekNum=year.toString()+result.toString();
               // console.log(weekNum)
                const user_data = await db.sequelize.query( `SELECT "proj_id","res_status", sum("hrs_per_week") FROM "worksOns" WHERE "enp_id"=${user.enp_id} AND "week_no"='${weekNum}' GROUP BY "enp_id", "proj_id" , "res_status" ;`, { type: QueryTypes.SELECT });
                result++
             }


              return res.status(201).send(user_data);
          
          } else {
            return res.status(401).send("user not found");
          }
    } catch (error) {
        console.log(error);
    }
};



module.exports = {
    create_user,
    login,
    getUsers,
    getUserbyId,
};