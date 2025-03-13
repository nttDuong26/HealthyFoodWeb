const express = require("express");
const router = express.Router()
const dotenv = require('dotenv');
dotenv.config()


router.get('/pay', (req, res) => {
  return res.status(200).json({
    status: 'OK',
    data: 'AUjbvnGnEt9oA_uMIteaC7O9124kWfHn4bWpTtyKcG8AljMmfgBn7BdI1UB19HcCa3dTAmPPlSAGVdVO'
  })
})


module.exports = router