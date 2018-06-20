const User          = require('../models/user');
const bcrypt        = require('bcrypt');
const jwt           = require('jsonwebtoken');

exports.getUsers = (req, res, next) => {
    User.find()
    .then( doc =>{
        res.json(doc);
    })
    .catch(err => {
       console.log(err); 
    });
};

exports.getUser = (req, res) => {
    const id = req.params.id; 
    res.status(200).send(`User: ${id}`);
};

exports.userSignup = (req, res, next) =>{
    
    User.find({ email: req.body.email}, (err, doc) => {
        if(doc.length === 0) {
            bcrypt.hash(req.body.password, 10, (err, hash) => {
                User.create({
                    email: req.body.email,
                    name: req.body.name,
                    password: hash
                })
                .then( result => {
                    return res.status(201).json(
                        {message : "user created"}
                    )
                })
                .catch(err => {
                    return res.status(500).json({
                        error: err
                    })
                });
            });
        } else { 
            return res.status(409).json({
                error : "Invalid email"
            });
        }
    });
};

exports.userSignin = (req, res, next) =>{
    User.find({email: req.body.email})
    .exec()
    .then(doc => {
        if(doc.length > 0) {
            bcrypt.compare(req.body.password, doc[0].password, (err, result) => {
                if(err) {
                    return res.status(401).json({
                        error: "Auth error"
                    });
                } 
                if(result) {
                    const token = jwt.sign(
                        {
                            id: doc[0]._id,
                            email: doc[0].email
                        }, 
                        process.env.JWT_KEY,
                        {
                            expiresIn: '1m'
                        }
                    );
                    const refreshToken = jwt.sign(
                        {
                            id: doc[0]._id,
                            email: doc[0].email
                        }, 
                        process.env.JWT_KEY,
                        {
                            expiresIn: '1h'
                        }  
                    );
                    return res.status(200).json({
                        token: token,
                        refreshToken: refreshToken
                    });
                } else {
                    return res.status(409).json({
                        error: "Auth error"
                    });
                }
            });
        } else { 
            return res.status(409).json({
                error: "Auth error"
            });
        } 
    })
    .catch( error => {
        res.status(501).json({
            error: error
        });
    });
};