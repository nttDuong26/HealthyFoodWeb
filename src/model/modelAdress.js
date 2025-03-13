const mongoose = require("mongoose");

const ProductCategoriesSchema = new mongoose.Schema({
    tenHuyen: {
        type: String,
        require: true,
    },
   

});
const ProductCategories = mongoose.model("ProductCategories", ProductCategoriesSchema);
module.exports = { ProductCategories };
