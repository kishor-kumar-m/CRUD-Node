const Product = require('../models/product');
const Order = require('../models/order');
const mongoose =require('mongoose');

 
exports.products_get= (req,res,next) =>{
    const stats= Product.aggregate([{
        $match : {price :{$gte:10} },
        $group :{_id : null,
            avgRating : {$avg : '$price'},
            minPrice : {$min : '$price'}
        }
    }]) 
    .exec()
    .then(docs => {
        const response ={
            count: docs.length,
            products: docs

        };
    res.status(200).json(response,{
        status : 'Success',
        data : {stats}
    });   
    })
    
    .catch(err =>{
        console.log(err);
        res.status(500).json({error:err});

    })
    
};


exports.products_post =(req,res,next) =>{
    console.log(req.file);
    
    const product = new Product({
        _id: new mongoose.Types.ObjectId(),
        name: req.body.name,
        price: req.body.price,
        productImage : req.file.path
    });
    product.save()
    .then(result =>{
        console.log(result);
        res.status(201).json({
            message:'Handling POST Method',
            createdProduct: result
        });        
    })   
    .catch(err =>{
        console.log(err)
        res.status(500).json({
        error: err
    });  
})
      
}

exports.products_get_id = (req,res,next) =>{
    const id= req.params.productId;
    Product.findById(id)
    .exec()
    .then(doc => {
        console.log(doc);
        if (doc){
            res.status(200).json(doc);
        }else{
            res.status(404).json({message: 'No Matching Id '})
        }
        
    })
    .catch(err => {
        console.log(err);
        res.status(500).json({error:err});
    });
}

exports.product_delete = (req,res,next) =>{
    const id = req.params.productId;
    Product.remove({
        _id : id
    }).exec()
    .then(result => {
        res.status(200).json(result);
    })
    .catch(error => {
        res.status(500).json({
            error : error
        })
    })

}

exports.product_update = (req,res,next) =>{
    const id = req.params.productId;
    // const updateOps = {};
    // // for(const ops of req.body){
    //     updateOps[ops.propName] = ops.value;
    // }
    Product.update({_id : id},{$set: updateOps})
    .exec()
    .then(result => {
        console.log(result);
        res.status(200).json(result);  
    })
    .catch(err => {
        console.log(error);
        res.status(500).json({
            error : err
        });
    });
}