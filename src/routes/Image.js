const ImageController = require("../controller/ImageController");
const router = require("express").Router();
const upload = require('../middleware/imageMiddelware');
const imageController = require('../controller/ImageController');

//ADD ProductCategories

// router.post("/ad", upload.single('file'), ImageController.uploadImage );
router.post('/upload', upload.single('file'), imageController.uploadImage);

//GET ProductCategories

router.get("/", ImageController.getAllImage );

//GET OneProductCategories

router.get("/:id", ImageController.getOneImage);


router.delete("/:id", ImageController.deleteImage);

router.put('/update', upload.single('file'), imageController.updateImage);



 
module.exports = router;