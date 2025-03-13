const cartController = require ('../controller/CartController');
const router = require("express").Router();



//ADD To Cart
router.post("/add", cartController.addToCart);



// Get Cart
router.get("/get/:id", cartController.getCart);


//Update To Cart
router.put("/putde/:id/cart/:cartId", cartController.decreaseQuantityCart);
router.put("/putin/:id/cart/:cartId", cartController.increaseQuantityCart);
router.delete("/putRe/:id/cart/:cartId", cartController.removeItemFromCart);
router.delete("/:userId", cartController.deleteCart);




module.exports = router;
