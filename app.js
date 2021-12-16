const express = require('express');
const app =express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users')

mongoose.connect('mongodb://localhost:27017/test');
mongoose.connection.once('open',function(){
  console.log('DB connected');
}).on('error',function(error){
  console.log('error is:',error)
})

app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
 

app.use('/products', productRoutes);
app.use('/orders', orderRoutes);
app.use('/user', userRoutes)

app.use((req, res, next) => {
    const error =new Error("not found");
    error.status = 404;
    next(error);
});
app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});
module.exports = app;