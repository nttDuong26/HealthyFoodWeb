const {  Product } = require("../model/modelProduct");
const {  ProductCategories } = require("../model/modelCategory");
const Image = require("../model/modelImage");
const upload = require('../middleware/imageMiddelware');


const ProductCategoriesController = {
    // ADD ProductCategories
    addProductCategories: async (req, res) => {
        try {
            const newImage = new Image({
                name: req.file.originalname,
                url: req.file.originalname
            });

            const savedImage = await newImage.save();
            // console.log(savedImage);

            const { tenDM } = req.body;
            const productIds = req.body.product;
            const product = await Product.find({ _id: { $in: productIds } });
            const hinhanhDM = savedImage._id;
               
            // Tạo danh mục và liên kết với sản phẩm
            const addProductCategories = new ProductCategories({
                hinhanhDM: savedImage._id,
                tenDM,
                product: product,
            });
            //Lưu danh mục vào CSDL
            const saveProductCategories = await addProductCategories.save();
    
            product.forEach(async (productOne) => {
                productOne.categories.push(saveProductCategories._id);
                await productOne.save();
            });
          
            res.status(200).json(saveProductCategories);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    

    //GET ALL ProductCategories
    getAllProductCategories: async (req, res) => {
        try{
            const AllProductCategories = await ProductCategories.find(); 
            res.status(200).json(AllProductCategories);
        } catch(err){
            res.status(500).json(err);
        }
    },
    //GET ONE ProductCategories
    getOneProductCategories: async (req, res) => {
        try{
            const OneProductCategories = await ProductCategories.findById(req.params.id)
           if (!OneProductCategories){
            return res.status(404).json({error: 'Danh mục không tồn tại'})
           }
            res.status(200).json(OneProductCategories);
        }catch(err){
            res.status(500).json(err);
        }
    },

 

    // PUT /categories/:id
    updateProductCategories: async (req, res) => {
        try {
            const categoryId = req.params.id; // Lấy ID của danh mục cần cập nhật từ URL
            const { tenDM, product, hinhanhDM } = req.body; // Lấy thông tin danh mục và danh sách ID sản phẩm từ request body
        
            const existingCategory = await ProductCategories.findById(categoryId); // Tìm danh mục cần cập nhật dựa trên ID
            if (!existingCategory) {
                return res.status(404).json({ error: 'Không tìm thấy danh mục sản phẩm' });
            }
            const newImage = new Image({
                name: req.file.originalname,
                url: req.file.originalname
            });
            
            const savedImage = await newImage.save();
            // Cập nhật thông tin của danh mục
            existingCategory.tenDM = tenDM;
            existingCategory.hinhanhDM = savedImage._id;
    
            // Lấy danh sách sản phẩm cũ của danh mục
            const oldProducts = existingCategory.product;
        
            // Lấy danh sách (tất cả) sản phẩm mới cần cập nhật
            const newProducts = await Product.find({ _id: { $in: product } });
            
            // Cập nhật danh sách sản phẩm của danh mục
            existingCategory.product = newProducts.map((product) => product._id);
            
            // Lưu danh mục đã cập nhật
            const updatedCategory = await existingCategory.save();

            // Tìm các _id đã bị loại bỏ khỏi danh sách sản phẩm mới
            const removedProductIds = oldProducts.filter((productId) => !updatedCategory.product.includes(productId));

            // Xóa mối quan hệ nhiều-nhiều trong cơ sở dữ liệu
            if(removedProductIds){
                for (const removedProductId of removedProductIds) {
                    const removedProduct = await Product.findById(removedProductId);
                    if (removedProduct) {
                        removedProduct.categories.pull(updatedCategory._id);
                        await removedProduct.save();
                    }
                }
            }
                       

            // Xét danh mục đầu vào rỗng sẽ xóa quan hệ với sản phẩm có trong danh mục
            if (updatedCategory.product.length === 0) {
                oldProducts.forEach(async (oldProductId) => {
                    const oldProduct = await Product.findById(oldProductId);
                        if (oldProduct) {
                            oldProduct.categories.pull(updatedCategory._id);
                            await oldProduct.save();
                        }
                });
            }
            // Cập nhật quan hệ nhiều-nhiều với sản phẩm
            newProducts.forEach(async (newProduct) => {
                if (!newProduct.categories.includes(updatedCategory._id)) {
                    newProduct.categories.push(updatedCategory._id);
                    await newProduct.save();
                }
            });

            res.status(200).json(updatedCategory);
        } catch (err) {
            res.status(500).json(err);
        }
}, 
  
    //DELETE /ProductCategories /:id
    deleteProductCategories: async(req, res) => {
        try{
            const categoriesId = req.params.id; 
            
            //TÌm danh mục cần xóa
            const existingCategories = await ProductCategories.findById(categoriesId);
            if (!existingCategories){
                return res.status(404).json("Không tìm thấy danh mục cần xóa");
            }

            //Lấy danh sách sản phẩm thuộc danh mục
            const productIds = existingCategories.product;

            //xóa danh mục của sanr phẩm 
            for (const productId of productIds){
                const aProduct = await Product.findById(productId);
                if(aProduct){
                    aProduct.categories.pull(categoriesId);
                    await aProduct.save();
                }
            }
            //Xóa danh mục sản phẩm
            await ProductCategories.findByIdAndDelete(categoriesId);
            res.status(200).json("Xóa Danh mục thành công");
        }catch(err){
            res.status(500).json("Xóa Danh mục không thành công");
        }
    }
};

module.exports = ProductCategoriesController;
