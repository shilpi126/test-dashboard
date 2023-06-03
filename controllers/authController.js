
const express = require("express");
const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken")
const bcrypt=require('bcrypt');



//register user
module.exports.register = async function register(req, res) {
  try {
    let dataObj = req.body;
    let user = await userModel.create(dataObj);
    
    if (user) {
      return res.json({
        message: "user register successfully",
        data: user,
      });
    } else {
      res.json({
        message: "error while register",
      });
    }
    
  } catch (err) {
    res.json({
      message: err.message,
    });
  }
};

//login
module.exports.login = async function login(req,res){
    try {
        let { email, password } = req.body;
        let user = await userModel.findOne({ email: email });
        if (user) {
        
        const passMatch = await bcrypt.compare(password,user.password);

        if (passMatch) {
            let uid = user["_id"];
            var token = jwt.sign({ payload: uid }, process.env.SECRET_KEY);
            res.cookie("login", token);
            res.json({
                msg: "user logged in",
                user
            });
        } else {
            res.json({
                msg: "wrong credentials",
            });
            }
        } else {
            res.json({
            msg: "user not found",
            });
        }
        } catch (err) {
        res.json({
            msg: err.message,
        });
        }
}