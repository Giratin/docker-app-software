const mongoose= require('mongoose');

const productSchema = mongoose.Schema({
    title : {
        type: String
    },
    quantity: {
        type: Number
    },
    description: {
        type: String
    },
    image: { 
        type: String
    }
},{
    timestamps : true
});

const Product = mongoose.model('product', productSchema);

module.exports= { Product }