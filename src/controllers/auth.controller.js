 
const express = require('express');
require('dotenv').config()
const { validationResult } = require('express-validator');
const Users = require('../models/user.model');
var jwt = require('jsonwebtoken');

const newToken = (user) => {
    return jwt.sign({user},"3f68e07d4d6a4d168f94163122de0be6dcb683137aa5cb03519a14b347ca14c8f5f9b77ab542680697ea1b085b96de0ede3ecf3a843b94ccac21f662d7b43f2a")
}

const Signup = async (req, res) => {
    try {
        let errors = validationResult(req);
        console.log(errors)
        if(!errors.isEmpty()) {
            return res.status(400).send("not strong");
        }

        let user = await Users.findOne({email: req.body.email}).lean().exec();

        if(user) {
            return res.send('User already exists')
        }
        user = await Users.create(req.body)
        return res.send(user)
    } catch(err) {
        return res.send(err.message)
    }
}

const Login = async(req, res) => {
    try {
        let user = await Users.findOne({email: req.body.email});

        if(!user) 
        return res.send('Either user id or password is incorrect');

        const match = user.checkPassword(req.body.password);
    if (!match) {
      return res.send({ message: "Either email or password is incorrect" });
    }

    const Token = newToken(user);
    return res.send({token: Token, id: user._id})

    } catch(err) {
        return res.send(err.message)
    }
}

module.exports = { Signup, Login }

