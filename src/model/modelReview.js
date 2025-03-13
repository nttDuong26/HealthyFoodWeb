const mongoose = require('mongoose');
const moment = require('moment');

const reviewSchema = new mongoose.Schema({

userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    },
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  image: {
    type: String,  // Assuming storing image URL as a string
  },
  comment: {
    type: String,
    required: true,
  },
  ngayRV: {
    type: String,
    default:  moment().format('HH:mm, DD/MM/YY'),
  },
});

const Review = mongoose.model('Review', reviewSchema);

module.exports = Review;