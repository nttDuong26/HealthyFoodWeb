const  { Product } = require('../model/modelProduct');
const {  ProductCategories } = require("../model/modelCategory");
const  Order = require("../model/modelOrder");
const Image = require("../model/modelImage");
const upload = require('../middleware/imageMiddelware');
const moment = require('moment');
// const mongoose = require('mongoose');


// const { ProductRequest } = require('../Request/ProductRequest')

const ProductController = {
    //ADD Product
    addProduct : async (req, res) => {
        try {
            const newImage = new Image({
                name: req.file.originalname,
                url: req.file.originalname
            });
            const savedImage = await newImage.save();
    
            // Ví dụ: Lưu thông tin sản phẩm với liên kết đến ảnh đã lưu
            const { tenSP, giaSP, motaSP, nguyenlieu, trangthai, calo, cdam, cxo, cbeo } = req.body;
            const categoriesIds = req.body.categories;

            const categories = await ProductCategories.find({ _id: { $in: categoriesIds } });
            const newProduct = new Product({
                hinhanh: savedImage._id, // Liên kết với ID của ảnh
                tenSP,
                giaSP,
                motaSP,
                nguyenlieu,
                trangthai,
                calo,
                cdam,
                cxo,
                cbeo,
                categories: categories
            });
            const savedProduct = await newProduct.save();
           

            // Lặp qua danh mục sản phẩm và thêm sản phẩm vào mỗi danh mục
            categories.forEach(async (category) => {
                category.product.push(savedProduct._id);
                await category.save();
            });           
    
            res.status(201).json(savedProduct); // Trả về sản phẩm đã được lưu
        } catch (error) {
            res.status(500).json({ error: 'Thêm sản phẩm thất bại', message: error.message });
        }
    },
    
    //GET ALLProduct

    getAllProduct: async(req, res) => {
        try{
            const page = parseInt(req.query.page) || 1; // Trang hiện tại
            const pageSize = parseInt(req.query.pageSize)  // Kích thước trang
            const skip = (page - 1) * pageSize; // Bỏ qua số lượng mục

            const AllProduct = await Product.find()
            .skip(skip)
            .limit(pageSize);

            res.status(200).json(AllProduct);
        }catch(err){
            res.status(500).json(err);
        }
    },

    // GET OneProduct
    getOneProduct: async(req, res) => {
        try{
           const OneProduct = await Product.findById(req.params.id);
           if (!OneProduct) {
            return res.status(404).json({ error: 'Sản phẩm không tồn tại' });
          }
            res.status(200).json(OneProduct);
        }catch(err){
            res.status(500).json(err);
        }
    },
 
    // PUT /product/:id
    updateProduct: async (req, res) => {
        
            const productId = req.params.id; // Lấy ID của sản phẩm cần cập nhật từ URL
            const { tenSP, giaSP, motaSP, nguyenlieu, trangthai, calo, cdam, cxo, cbeo, categories } = req.body; // Lấy thông tin sản phẩm và danh sách ID danh mục mới từ request body
            // const categoryId = req.body.categories;
            // const { hinhanh } = req;
        try {
            const existingProduct = await Product.findById(productId); // Tìm sản phẩm cần cập nhật dựa trên ID
            if (!existingProduct) {
                return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
            }
          
            const newImage = new Image({
                name: req.file.originalname,
                url: req.file.originalname
            });
            
            const savedImage = await newImage.save();
          
            existingProduct.hinhanh = savedImage._id;
            existingProduct.tenSP = tenSP;
            existingProduct.giaSP = parseInt(giaSP, 10);
            existingProduct.motaSP = motaSP;
            existingProduct.nguyenlieu = nguyenlieu;
            existingProduct.trangthai = trangthai;
            existingProduct.calo = parseInt(calo, 10);
            existingProduct.cdam = parseInt(cdam, 10);
            existingProduct.cxo = parseInt(cxo, 10);
            existingProduct.cbeo = parseInt(cbeo, 10);
            const newCategories = await ProductCategories.find({ _id: { $in: JSON.parse(categories) } });
            existingProduct.categories = newCategories.map((category) => category._id);

            const updatedProduct = await existingProduct.save();


            const removedCategoryIds = updatedProduct.categories.filter((categories) => !updatedProduct.categories.includes(categories));
    
            for (const removedCategoryId of removedCategoryIds) {
                const removedCategory = await ProductCategories.findById(removedCategoryId);
                if (removedCategory) {
                    removedCategory.product.pull(existingProduct._id); //updatedProduct
                    await removedCategory.save();
                }
            }

            for (const newCategoryId of newCategories) {
                const newCategory = await ProductCategories.findById(newCategoryId);
                if (newCategory) {
                    newCategory.product.push(existingProduct._id); //updatedProduct
                    await newCategory.save();
                }
            }
    
            res.status(200).json(updatedProduct);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    
    // DELETE /product/:id
    deleteProduct: async (req, res) => {
        try {
            const productId = req.params.id; // Lấy ID của sản phẩm cần xóa từ URL
            
            // Tìm sản phẩm cần xóa
            const existingProduct = await Product.findById(productId);
            if (!existingProduct) {
                return res.status(404).json({ error: 'Không tìm thấy sản phẩm' });
            }
    
            // Lấy danh sách danh mục của sản phẩm
            const categoryIds = existingProduct.categories;
    
            // Xóa sản phẩm khỏi danh mục sản phẩm
            for (const categoryId of categoryIds) {
                const category = await ProductCategories.findById(categoryId);
                if (category) {
                    category.product.pull(productId);
                    await category.save();
                }
            }
    
            // Xóa sản phẩm
            // await existingProduct.remove();
            await Product.findByIdAndDelete(productId);
            
            res.status(200).json("Xóa sản phẩm thành công"); // Trả về 204 No Content khi xóa thành công
        } catch (err) {
            res.status(500).json({ error: 'Xóa sản phẩm thất bại', message: err.message });
        }
    },

    getProductWeek: async (req, res) => {
        try {
            const requestedProWeek = req.params.week;
    
            if (!requestedProWeek) {
                return res.status(400).json({ message: 'Vui lòng chọn tuần để xem thống kê.' });
            }
    
            const requestedProWeekNumber = parseInt(requestedProWeek);
            if (isNaN(requestedProWeekNumber) || requestedProWeekNumber < 1 || requestedProWeekNumber > 52) {
                return res.status(400).json({ message: 'Tuần không hợp lệ. Vui lòng chọn tuần từ 1 đến 52.' });
            }
    
            const currentYear = moment().year();
            const startDate = moment().day("Monday").isoWeek(requestedProWeekNumber).year(currentYear).startOf('isoWeek');
            const endDate = startDate.clone().endOf('isoWeek');
    
            const orders = await Order.find({
                createdAt: {
                    $gte: startDate.format("HH:mm, DD/MM/YYYY"),
                    $lte: endDate.format("HH:mm, DD/MM/YYYY")
                }, status: { $ne: 'Đã hủy' }
            }).populate('products.product');
    
            let productsQuantityMap = new Map();
    
            orders.forEach(order => {
                order.products.forEach(product => {
                    const productId = product.product;
                    const quantity = product.quantity;
            
                    // Kiểm tra xem product.product có tồn tại không
                    if (productId && productId.tenSP) {
                        const tenSP = productId.tenSP;
                        // console.log(tenSP);
            
                        if (productsQuantityMap.has(productId)) {
                            productsQuantityMap.set(productId, productsQuantityMap.get(productId) + quantity);
                        } else {
                            productsQuantityMap.set(productId, quantity);
                        }
                    } else {
                        console.error("productId hoặc productId.tenSP không tồn tại.");
                    }
                });
            });
    
            const sortedProducts = Array.from(productsQuantityMap.entries()).sort((a, b) => b[1] - a[1]);
    
            const top5BestSellingProducts = sortedProducts.slice(0, 3);
    
            res.status(200).json(top5BestSellingProducts);
        } catch (error) {
            console.error(error);
            res.status(500).json("Lỗi");
        }
    },
    
    getProductMonth: async (req, res) =>{
        try {
            const requestedProMonth = req.params.month;
            if (!requestedProMonth) {
                return res.status(400).json({ message: 'Vui lòng chọn tháng để xem thống kê.' });
            }
    
            const requestedProMonthNumber = parseInt(requestedProMonth);
            if (isNaN(requestedProMonthNumber) || requestedProMonthNumber < 1 || requestedProMonthNumber > 12) {
                return res.status(400).json({ message: 'Tháng không hợp lệ. Vui lòng chọn tháng từ 1 đến 12.' });
            }
    
            const currentDate = new Date();
            const currentYear = currentDate.getFullYear();
            const startDate = new Date(currentYear, requestedProMonthNumber - 1, 1, 0, 0, 0, 0);
            const endDate = new Date(currentYear, requestedProMonthNumber, 0, 23, 59, 59, 999);


            // Thực hiện truy vấn MongoDB để lấy thông tin sản phẩm bán được trong tuần
            const monthBestSellingProducts = await Order.aggregate([
                {
                $match: {
                    createdAt: { 
                    $gte: startDate,
                    $lte: endDate 
                        },
                    },
                },
                {
                $unwind: "$products",
                },
                {
                $group: {
                    _id: "$products.product",
                    totalQuantity: { $sum: "$products.quantity" },
                },
                },
                {
                $sort: { totalQuantity: -1 },
                },
                {
                $limit: 5, // Lấy 5 sản phẩm được bán nhiều nhất
                },
            ]);
        
            res.status(200).json(monthBestSellingProducts);
            } catch (error) {
            res.status(500).json("Lỗi");
            }
    },

    getProductYear: async (req, res) => {
        try {
            const requestedYear = req.params.year;
            if (!requestedYear || isNaN(requestedYear) || requestedYear < 2023 || requestedYear > 2100) {
                return res.status(400).json({ message: 'Năm không hợp lệ. Vui lòng chọn năm từ 2023 đến 2100.' });
            }
    
            const startDate = new Date(requestedYear, 0, 1, 0, 0, 0, 0);
            const endDate = new Date(requestedYear, 11, 31, 23, 59, 59, 999);
    
            const yearlyBestSellingProducts = await Order.aggregate([
                {
                    $match: {
                        createdAt: {
                            $gte: startDate,
                            $lte: endDate
                        },
                    },
                },
                {
                    $unwind: "$products",
                },
                {
                    $group: {
                        _id: "$products.product",
                        totalQuantity: { $sum: "$products.quantity" },
                    },
                },
                {
                    $sort: { totalQuantity: -1 },
                },
                {
                    $limit: 5, // Lấy 5 sản phẩm được bán nhiều nhất
                },
            ]);
    
            res.status(200).json(yearlyBestSellingProducts);
        } catch (error) {
            res.status(500).json("Lỗi");
        }
    },

    //Tìm kiếm sản phẩm
    searchptoduct: async (req, res) => {
        const { searchTerm } = req.body;
        try {
          const products = await Product.find({
            tenSP: { $regex: searchTerm, $options: "i" }, // i: không phân biệt chữ hoa chữ thường

          });
          res.status(200).json(products);
        } catch (error) {
          res.status(500).json({ error: "Lỗi khi tìm kiếm sản phẩm" });
        }
    },
    


    //Lọc sản phẩm
    getFillerProduct: async (req, res) => {
        const { priceRange } = req.query;
        let filter = {};

        switch (priceRange) {
            case 'gia1':
                filter = { giaSP: { $lt: 50000 } };
                break;
            case 'gia2':
                filter = { giaSP: { $gte: 50000, $lte: 100000 } };
                break;
            case 'gia3':
                filter = { giaSP: { $gt: 100000, $lte: 200000 } };
                break;
            case 'gia4':
                filter = { giaSP: { $gt: 200000 } };
                break;
            default:
                // Nếu không có giá trị nào được chọn, trả về tất cả sản phẩm
                return await Product.find({});
        }

    
        try {
            const filteredProducts = await Product.find(filter);
            res.json(filteredProducts);
        } catch (error) {
            console.error('Lỗi khi lọc sản phẩm: ', error);
            res.status(500).json({ error: 'Lỗi khi lọc sản phẩm' });
        }
    },

    countTotalProducts: async (req, res) => {
        try {
            const totalCount = await Product.countDocuments();
            console.log(`Tổng số sản phẩm trong hệ thống: ${totalCount}`);
            res.status(200).json(totalCount);
        } catch (error) {
            console.error('Lỗi khi thống kê số lượng sản phẩm:', error);
            throw error;
        }
    },

};



module.exports = ProductController;