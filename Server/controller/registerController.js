const mongoose = require('mongoose')
const register = require('../models/register')
const bcrypt = require('bcrypt')
const saltRounds = 10;
const jwt = require('jsonwebtoken')

// ============================= Admin and user register =========================== 

exports.register = (async function (req, res, next) {

    try {

        const { email, password, type } = req.body
        const pass = await bcrypt.hash(password, saltRounds)
        const check = await register.findOne({ email: email })

        const data = {
            email: email,
            password: pass,
            type: type
        }

        const mail = '@gmail.com'
        const mail1 = email.slice(-10)

        if (mail != mail1) {
            res.status(200).json({
                message: "Enter vaild Email",
            })
        }
        else if (check != null) {
            res.status(200).json({
                message: "Email already Exists",
            })
        }
        else if (password == "") {
            res.status(200).json({
                message: "Invalid Password",
            })
        }
        else if (type == "") {
            res.status(200).json({
                message: "Invalid Type",
            })
        }
        else {
            const token = jwt.sign({
                data: email
            }, process.env.JWT_SECRET_KEY);
            await register.create(data)
            data.token = token

            res.status(200).json({
                message: "Succesfull",
                // email: email,
                token: token,
                // type: type
            })
        }
    }
    catch (err) {
        res.status(404).json({
            message: err.message,
            message: "fail"
        })
    }
});
