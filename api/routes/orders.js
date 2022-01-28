const express = require('express');
const router =  express.Router();
const mongoose = require('mongoose');
const order = require('../models/order');
const Order = require('../models/order')





router.get('/',(req,res,next) =>{
    order.find()
    .exec()
    .then(docs =>  {
        res.status(200).json(docs);
    })
    .catch(err =>{
        res.status(500).json({
            error: err
        })
    })
    });


router.post('/',(req,res,next) =>{
    const order = new Order({
        _id: mongoose.Types.ObjectId(),
        quantity: req.body.quantity,
        product: req.body.productId
    });
    order
    .save()
    
    .then(result =>{
        console.log(result);
        res.status(201).json(result);
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    })
})

module.exports = router; 