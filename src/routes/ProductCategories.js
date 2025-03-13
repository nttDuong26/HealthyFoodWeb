const ProductCategoriesController = require("../controller/ProductCategoriesController");
const router = require("express").Router();
const upload = require('../middleware/imageMiddelware');


//ADD ProductCategories

router.post("/ad", upload.single('file'), ProductCategoriesController.addProductCategories );

//GET ProductCategories

router.get("/", ProductCategoriesController.getAllProductCategories );

//GET OneProductCategories

router.get("/:id", ProductCategoriesController.getOneProductCategories);


//UPDATE OneProductCategories
router.put("/:id",ProductCategoriesController.updateProductCategories);


router.delete("/:id", ProductCategoriesController.deleteProductCategories);


 

module.exports = router;