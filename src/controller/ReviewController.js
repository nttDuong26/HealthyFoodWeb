const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const {Product} = require('../model/modelProduct');
const Review = require('../model/modelReview');
const Image = require("../model/modelImage");



const ReviewController = {
// Route to add a new review
addReview: async (req, res) => {
    try {
      const productId = req.params.productId;
  
      // Check if the product exists
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ error: 'Product not found' });
      }
  
      // Ensure that a user ID is provided in the request body
      const userId = req.body.userId;
      if (!userId) {
        return res.status(400).json({ error: 'User ID is required' });
      }
  
      // Create a new review with user and product IDs
      const newReview = new Review({
        userId: userId,
        productId: productId,
        rating: req.body.rating,
        comment: req.body.comment,
      });
  
      // Save the review
      const savedReview = await newReview.save();
  
      // Add the review to the product's reviews array
      product.reviews.push(savedReview._id);
  
      // Save the updated product with the new review ID
      await product.save();
  
      res.status(201).json(savedReview);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },  
  

// Route to get all reviews for a product
// router.get('/products/:productId/reviews',
getReview: async (req, res) => {
    try {
      const productId = req.params.productId;
  
      // Tìm tất cả các reviews có productId tương ứng
      const reviews = await Review.find({productId}).populate('userId');;
  
      res.json(reviews);
    } catch (error) {
      console.error('Error fetching reviews:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAllReview: async (req, res) => {
    try{
      const AllReview = await Review.find();
      return res.status(201).json(AllReview);

    }catch (error) {
      console.error('Error fetching reviews:', error.message);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
  

// getReviewsByUsernameAndProduct: async (req, res) => {
//     try {
//       const { username, productId } = req.params;
  
//       // Tìm người dùng theo tên
//       const user = await User.findOne({ username });
  
//       if (!user) {
//         return res.status(404).json({ error: 'User not found' });
//       }
  
//       // Tìm đánh giá của người dùng và sản phẩm
//       const reviews = await Review.find({
//         userId: user._id,
//         productId: mongoose.Types.ObjectId(productId),
//       });
  
//       res.json(reviews);
//     } catch (error) {
//       console.error('Error fetching reviews:', error.message);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   },
  



deleteReview: async (req, res) => {
  try {
    const productId = req.params.productId;
    const reviewId = req.params.reviewId;

    // Check if the product exists
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }

    // Check if the review exists
    const review = await Review.findById(reviewId);
    if (!review) {
      return res.status(404).json({ error: 'Review not found' });
    }

    // Remove the review from the product's reviews array
    product.reviews = product.reviews.filter((review) => review.toString() !== reviewId);
    await product.save();

    // Delete the review from the reviews collection
    await Review.findByIdAndRemove(reviewId);

    res.status(200).json({ message: 'Review deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
},
// Add more routes for updating and deleting reviews if needed

}

module.exports = ReviewController;