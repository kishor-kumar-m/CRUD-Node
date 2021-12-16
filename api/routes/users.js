const express = require('express');
const router =  express.Router();
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const jwt = require('jsonwebtoken')


router.post('/signup',(req,res,next)=>{
    bcrypt.hash(req.body.password,10,(error,hash)=>{
        if(error){
            return res.status(500).json({
                error:err
            });            
        }else{
            const user = new User({
                _id : mongoose.Types.ObjectId(),
                email : req.body.email,
                password :hash
        });
        user
        .save()
        .then(result=>{
            console.log(result);
            res.status(201).json({                
                message :'User Created',               
                createduser : result
            });
        })
        .catch(err=>{
            console.log(err);
            res.status(500).json({
                error : err
            })
         
        
        });
    }
});
});


router.post('/login',(req,res,next) => {
    User.find({email : req.body.email})
    .exec()
    .then(user => {
        if(user.length <1){
            return res.status(401).json({
                message : 'Auth failed'

            });
            
        }
        bcrypt.compare(req.body.password,user[0].password,(err,result) =>{
            
            if(result){
               const token = jwt.sign({
                    email:user[0].email,
                    userId : user[0]._id
                },process.env.JWT_KEY,
                {
                    expiresIn : "1h"
                });
                return res.status(200).json({
                    message : "Auth Successful",
                    token : token
                })
            }
            res.status(401).json({
                message :'Invalid Password  '
            })

        });   
    })  
    .catch(err => {
        console.log(err);
        res.status(500).json({
            error : err
        })

    });


});



module.exports = router















module.exports = router;