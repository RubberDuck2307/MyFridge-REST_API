const user = require("../models/user")
const bcrypt = require("bcrypt")
const webToken = require('jsonwebtoken')
const {json} = require("express");
const {stringify} = require("nodemon/lib/utils");

exports.createNewUser = async (req, res) => {
    if (!req.body.username || !req.body.password || !req.body.email || !req.body.firstName || !req.body.lastName) {
        res.status(500).json({message: "Wrong parameters", success: false})
    } else {
        if (await user.checkUsername(req.body.username)) {
            try {
                let hash = await bcrypt.hash(req.body.password, 10)
                await user.createNewUser(req.body.username, hash)
                let id = await user.getUserId(req.body.username)
                await user.saveNewUserInformation(id[0][0].id,req.body.username, req.body.email, req.body.firstName ,req.body.lastName)
                let token = webToken.sign({id: id[0][0].id},
                    process.env.DB_KEY,
                    {
                        expiresIn: '24h'
                    }
                )

                res.status(201).json({message: "User created", success: true, token: token})
            } catch (err) {
                res.status(500).json({message: "Something went wong", success: false})
            }

        } else {
            res.status(400).json({message: "Username has been already taken", success: false})
        }
    }
}

exports.checkToken = (req, res, next) => {

    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }

    if (token) {
        webToken.verify(token, process.env.DB_KEY, (err, decoded) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: 'Token is not valid'
                });
            } else {
                req.decoded = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({
            success: false,
            message: 'Auth token is not supplied'
        });
    }
};

exports.login = async (req, res) => {
    if (!req.body.username || !req.body.password) {
        res.status(400).json({message: "Wrong parameters", success: false})
    }
    else {
        let username = req.body.username
        let password = req.body.password
        let [hash, _] = await user.getHas(username)
        if (Object.keys(hash).length !== 0) {
            if (await bcrypt.compare(password, hash[0].password)) {
                let [id,_] = await user.getUserId(username)
                id = id[0].id
                let token = webToken.sign({id: id},
                    process.env.DB_KEY,
                    {
                        expiresIn: '24h'
                    })
                res.status(200).json({success: true, message: "Successfully logged in", token: token})
            } else {
                res.status(400).json({message: "Wrong username or password"})
            }
        }
        else {
            res.status(400).json({message: "Wrong username or password"})
        }
    }
}

parseToken = (req) => {
    let token = req.headers['x-access-token'] || req.headers['authorization']; // Express headers are auto converted to lowercase
    if (token.startsWith('Bearer ')) {
        // Remove Bearer from string
        token = token.slice(7, token.length);
    }
    let base64Payload = token.split(".")[1];
    let payloadBuffer = Buffer.from(base64Payload, "base64");
    return JSON.parse(payloadBuffer.toString());
}


exports.checkPermission = (req, res, next) => {
    let id = req.params.id
    let userId = parseToken(req).id
    if (userId != id){
        res.status(403).json({success:false, message:"Access denied"})
    }
    else {
        next()
    }
}

