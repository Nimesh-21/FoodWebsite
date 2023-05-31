const path=require("path")
require('dotenv').config({ path: path.resolve(__dirname,"../.env") })
const ck = require('ckey');
const express=require("express");
const router=express.Router();
const User=require("../models/User")
const { body, validationResult } = require('express-validator');
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken");
const jwtSecret=process.env.SECRET;
const saltRounds=10;

// console.log(jwtSecret);
router.post("/createuser",
body('email',"Invalid Email").isEmail(),
// password must be at least 5 chars long
body('password',"Invalid Password").isLength({ min: 5 }),
body('name',"Invalid Name").isLength({ min: 5 }),
async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hash =await bcrypt.hashSync(req.body.password, salt);
    try{
        await User.create({
            name: req.body.name,
            location: req.body.location,
            email: req.body.email,
            password: hash
        })
    res.json({success : true})
    }

    catch(error){
        console.log(error);
        res.json({success:false});
    }
})

router.post("/login",
body('email',"Invalid Email").isEmail(),
// password must be at least 5 chars long
body('password',"Invalid Password").isLength({ min: 5 }),

async (req, res) => {
  // Finds the validation errors in this request and wraps them in an object with handy functions
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: "Try Logging with correct credentials"});
  }
  
    try{
      const user=  await User.findOne({
           email: req.body.email,
          })
      
      const cmpPass=await bcrypt.compareSync(req.body.password,user.password);
          if(!user){
            return res.status(400).json({ errors: "Try Logging with correct credentials"});
          }

          else if(!cmpPass){
            return res.status(400).json({ errors: "Try Logging with correct credentials"});
          }

          else if(cmpPass){
            const data={
             user: {
                id:user.id
              }
            }
            const authToken=jwt.sign(data,jwtSecret);
            res.json({success : true,authToken:authToken})
          }
    }

    catch(error){
        console.log(error);
        res.json({success:false});
    }
})

module.exports=router;