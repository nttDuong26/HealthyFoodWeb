const  ProductController  = require ("../controller/ProductController");
const router = require("express").Router();
const upload = require('../middleware/imageMiddelware');


//ADD Product
router.post("/ad", upload.single('file'), ProductController.addProduct);

//GET ALL Product
router.get("/", ProductController.getAllProduct);

//GET One Product
router.get("/:id", ProductController.getOneProduct);

//UPDATE Product
router.put("/:id", upload.single('file'), ProductController.updateProduct);

//DELETE Product
router.delete("/:id", ProductController.deleteProduct);

//Thống kê sản phẩm bán chạy theo tuần
router.get("/countProduct/week/:week", ProductController.getProductWeek);

//Thống kê sản phảma bán chạy theo tháng
router.get("/countProduct/month/:month", ProductController.getProductMonth);

//Thống kê sản phẩm bán chạy theo năm
router.get("/countProduct/year/:year", ProductController.getProductYear);

//Tìm kiếm
router.post("/searchProduct", ProductController.searchptoduct);


router.post("/producttotalCount", ProductController.countTotalProducts);





module.exports = router;