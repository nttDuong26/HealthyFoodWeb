const express = require('express');
const router = express.Router();
const DiscountCodeController = require('../controller/DiscountCodeController');

// Routes cho DiscountCode
router.post('/discount-codes', DiscountCodeController.createDiscountCode);
router.get('/discount-codes', DiscountCodeController.getAllDiscountCodes);
router.get('/discount-code/:id', DiscountCodeController.getOneDiscountCode);
router.put('/discount-codes/:id', DiscountCodeController.updateDiscountCode);
router.delete('/discount-codes/:id', DiscountCodeController.deleteDiscountCode);
router.post('/discount-codes/validate', DiscountCodeController.validateDiscountCode);


module.exports = router;
