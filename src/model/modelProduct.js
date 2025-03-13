const mongoose = require("mongoose");
const moment = require('moment');

const ProductSchema = new mongoose.Schema({
    hinhanh:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    },
    tenSP: {
        type: String,
        require: true,
    },
   
    giaSP: {
        type: Number,
        require: true,
    },
    motaSP: {
        type: String,
        require: true,
    },
    nguyenlieu:{
        type: String,
        require: true,
    },
    trangthai: {
        type: Boolean,
        default: true,
        require: true,
    },
    calo: {
        type: Number,
        require: true,
    },
    cdam: {
        type: Number,
        require: true,
    },
    cxo: {
        type: Number,
        require: true,
    },
    cbeo: {
        type: Number,
        require: true,
    },

    categories: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ProductCategories'
        }
    ],
    ngaythem: {
        type: String,
        default:  moment().format('HH:mm, DD/MM/YY'),
    }, 

    loai: {
        type: String,
        enum: ['monchinh', 'khaivi', 'trangmieng', 'douong'],
        default: 'monchinh',
      },
      reviews: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Review'
        }
    ],

});



const Product = mongoose.model("Product", ProductSchema);
// const ProductRelation = mongoose.model("ProductRelation", ProductRelationSchema);

// module.exports = { ProductCategories, Product, ProductRelation };
module.exports = { Product };
