const express = require ("express");
const app = express();
const menuController = require('./controllers/menu.controller');

const offerController = require('./controllers/offer.controller');
const cors = require('cors');
app.use(express.json());    

const mongoose = require("mongoose");
const {Login,Signup} = require("./controllers/auth.controller")
const { body } = require('express-validator');

  
const dotenv = require("dotenv");
 dotenv.config();
const connect =  async() => {
    try  {
        return  mongoose.connect(
            "mongodb+srv://kritika:kritika@cluster0.lbvtd.mongodb.net/KFCclone?retryWrites=true&w=majority"
         )
    }
    catch(err){
        console.log("connection error")
    }
        }

  
app.use(cors({origin: true, credentials: true}));
app.post('/signup', body('username').isString().isLength({ min: 3 }),body('email').isEmail(),
body('password').custom((value) => {
    let pattern = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{4,}$/
  
    if(pattern.test(value)!==true) {
      
        throw new Error('Password is not strong')
    } 
    return true;
   
}) ,Signup);
app.post("/login",Login)
app.use('/menu', menuController);
app.use('/offer', offerController)
        app.listen(process.env.PORT||8800,async() => {
            try{
              await  connect();
                console.log("connected to port 8800")
            }
            catch(err){
                console.log(err.message)
            }
        })