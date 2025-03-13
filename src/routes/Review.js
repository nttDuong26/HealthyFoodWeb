const  ReviewController  = require ("../controller/ReviewController");
const router = require("express").Router();


router.post("/products/:productId/reviews", ReviewController.addReview );

router.get("/reviews/:productId", ReviewController.getReview );

router.get("/allreviews", ReviewController.getAllReview );

router.delete("/products/:productId/reviews/:reviewId", ReviewController.deleteReview );


module.exports = router;