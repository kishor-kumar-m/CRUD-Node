const express = require('express');
const app =express();
const morgan = require('morgan');

const mongoose = require('mongoose');
const swaggerJsDoc = require('swagger-jsdoc')
const swaggerUi =require('swagger-ui-express')



const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');
const userRoutes = require('./api/routes/users');
const swaggerJSDoc = require('swagger-jsdoc');

mongoose.connect('mongodb://localhost:27017/Storecollections');
mongoose.connection.once('open',function(){
  console.log('DB connected');
}).on('error',function(error){
  console.log('error is:',error)
})
const swaggerOptions = {
  swaggerDefinition :{
      info : {
          title : 'Order API',
          description : "Order Information",
          contact :{
              name : ""                
          },
          servers : ["http://localhost:3000"]
      }
  },
  apis : ["app.js"]
};

const swaggerDocs =swaggerJSDoc(swaggerOptions)
app.use('/api-doc',swaggerUi.serve,swaggerUi.setup(swaggerDocs))

app.use(morgan('dev'));
app.use('/uploads',express.static('uploads'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
 
/**
 * @swagger
 * /orders : 
 *  get:
 *    description : Use to get all orders
 *    responses:
 *      '200' :
 *          description : Success
 */
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