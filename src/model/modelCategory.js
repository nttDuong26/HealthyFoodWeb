const mongoose = require("mongoose");
const moment = require('moment');

const ProductCategoriesSchema = new mongoose.Schema({
    hinhanhDM:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Image'
    },
    tenDM: {
        type: String,
        require: true,
    },
    product: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Product',
        }
    ],
    ngaytao: {
        type: String,
        default:  moment().format('HH:mm, DD/MM/YY'),
    }

});
const ProductCategories = mongoose.model("ProductCategories", ProductCategoriesSchema);
module.exports = { ProductCategories };
