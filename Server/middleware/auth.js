const jwt = require('jsonwebtoken');
require("dotenv").config();
const User = require("../models/User");

exports.auth = async (req, res, next) => {
    try {
        //extract token
        console.log("entered in auth middleware");
        const token = req.cookies.token
            || req.body.token
            || req.header("Authorisation").replace("Bearer ", "");
        console.log(token);
        //if token missing, then return response
        if (!token) {
            return res.status(401).json({
                success: false,
                message: 'TOken is missing',
            });
        }

        //verify the token
        try {
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            console.log(decode);
            req.user = decode;
        }
        catch (err) {
            //verification - issue
            return res.status(401).json({
                success: false,
                message: 'token is invalid',
                tokenExpire: true,
            });
        }
        next();
    }
    catch (err) {
        console.log(err.message);
        return res.status(401).json({
            success: false,
            message: 'Something went wrong while validating the token',
            tokenExpire: true,
        });
    }
}