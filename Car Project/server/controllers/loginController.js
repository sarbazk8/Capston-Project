const {User,validateLogin} = require("../models/userdata")
const mongoose = require("mongoose")
const JOi = require("joi");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv")

dotenv.config();

const loginAuth = async (req,res) =>{
    try{
        const {error} = validateLogin(req.body);
        if (error)
            return res.status(400).send({message:error.details[0].message});
        const user = await User.findOne({email:req.body.email});
        if(!user)
            return res.status(401).send({message: "Invalid Email or Passoword"});
        const validPassword =await bcrypt.compare(
            req.body.password,
            user.password,
        );
        if(!validPassword)
            return res.status(401).send({message:"Invalid Email or Password"});
        const token = user.generateAuthToken();
        res.status(200).send({Token:token, message: "Logged in Successfully",name: user.name,email:user.email});
    } catch(error){
        res.status(500).send({message:"Internal Server Error" });
    }
}


module.exports = loginAuth;