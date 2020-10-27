const { Product } = require('../models/produit.model');
const fs = require('fs');

module.exports= {
    createProduct: async (req, res)=>{
        const { title, quantity, description } = req.body;

        let product = new Product({
            title, quantity, description
        });
        if(req.file){
            product.image = req.file.filename;
        }

        await product.save();
        res.json(product);
    },
    updateProduct: async (req, res)=>{
        const { id } = req.params;

        const product = await Product.findOne({ _id: id });
        if(!product){
            return res.status(404).json("Product Not Found")
        }

        const { title, quantity, description } = req.body;
        product.title = title;
        product.quantity = quantity;
        product.description= description;

        if(req.file){
            if(product.image){
                fs.unlink("./public/images/"+product.image, (err)=>{
                    if(err){
                        console.log(err);
                    }
                })
            }
            product.image = req.file.filename;
        }

        await product.save();
        res.json(product)

    },
    deleteProduct: async (req, res)=>{
        const { id } = req.params;

        const product = await Product.findOne({ _id: id });
        if(!product){
            return res.status(404).json("Product not found");
        }

        if(product.image){
            fs.unlink("./public/images/"+product.image, (err)=>{
                if(err) {
                    console.log(err)
                }
            });
        }

        await Product.findByIdAndDelete(id);
        res.json("Product deleted")

    },
    getAll: async (req,res)=>{
        const products = await Product.find();

        products.forEach((el)=>{
            if(el.image){
                el.image = "http://localhost:3000/images/"+el.image
            }
        })
        res.json(products)
    },
    getProduct: async(req, res)=>{
        const { id } = req.params;
        const product = await Product.findOne({ _id : id });
        if(product.image){
            product.image = "http://localhost:3000/images/"+  product.image;
        }
        res.json(product)
    }
}