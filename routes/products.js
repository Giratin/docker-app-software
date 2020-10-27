const express = require('express');
const router = express.Router();

const productController = require('../controllers/products.controller');
const multer= require('multer')
const path = require('path');

const storage = multer.diskStorage({
    destination: (req,file,cb)=>{
        cb(null, './public/images/');
    },
    filename: (req,file,cb)=>{
        const newFileName = new Date().getTime().toString() + path.extname(file.originalname);
        cb(null,newFileName);
    }
})

const upload = multer({ storage });

router.route('/')
    .get(productController.getAll)
    .post(upload.single('avatar'), productController.createProduct)

router.route('/:id')
    .put(upload.single('avatar'),productController.updateProduct)
    .delete(productController.deleteProduct)
    .get(productController.getProduct);

module.exports = router;