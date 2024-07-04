const UserRepository = require("../repository/UserRepository");
const User= require("../models/user");
const bycrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const {check, vaildationResult, validationResult} = require("express-validator");

const repo=new UserRepository();

class AuthController{
    constructor(){

    }
    checkLogin = [
        check("email","Please Enter a valid Email").isEmail(),
        check("password","Please enter a valid passowrd").isLength({min:6}),
    ];

    doLogin(req,res){
        const errors=validationResult(req);
        if(!errors.isEmpty()){
            return res.status(422).json({errors:errors.array()});
        }
        const { email, password } = req.body;
        try{
            repo.UserByEmail(email,function(err,user){
                if(err) throw err;

                if(!user){
                    return res.status(400).json({message:"User not found"});
                }

                bycrypt.compare(password,user.password, function(err,isMatch){
                    if(err) throw err;
                    if(!isMatch){
                        return res.status(400).json({message:"Invalid Credentials"});
                    }

                    const payload={
                        user:{
                            id:user.id,
                        },
                    };

                    jwt.sign(payload,"randomString", {expiresIn:3600}, function(err,token){
                        if(err) throw err;
                        res.status(200).json({token});
                    });
                });
            });
        }catch(e){
            console.log(e);
            res.status(500).json({message:"Server Error"});
        }
    }
}

module.exports=AuthController;

