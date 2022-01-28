const { response } = require('express');
const express = require('express');
const router = express.Router();
const mongoose =require('mongoose');
const multer = require('multer');
const checkAuth = require('../middleware/check-auth')
const productcontroller =require('../controllers/products')


const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,'./uploads/');
    },
    filename: function(req,file,cb){
        cb(null,new Date().toISOString().replace(/:/g,'-') + file.originalname)
    }
});

const upload = multer({storage:storage});  



router.get('/',checkAuth,productcontroller.products_get);

router.post('/',checkAuth,upload.single('productImage'),productcontroller.products_post);

router.get('/:productId',checkAuth,productcontroller.products_get_id);

router.delete('/:productId',checkAuth,productcontroller.product_delete);

router.patch('/:productId',checkAuth,productcontroller.product_update);

module.exports = router; 