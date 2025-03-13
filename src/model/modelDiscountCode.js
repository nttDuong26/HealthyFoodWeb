const mongoose = require('mongoose');
const moment = require('moment');

const DiscountCodeSchema = new mongoose.Schema({
  code: {
    type: String,
    required: true,
    unique: true,
  },
  discountPercentage: {
    type: Number,
    required: true,
  },
  expirationDate: {
    type: String,
    default:  moment().format('HH:mm, DD/MM/YYYY'),
  },
 startDate: {
    type: String,
    default:  moment().format('HH:mm, DD/MM/YYYY'),
  },
  maxUsage: {
    type: Number, // Số lượng tối đa mã có thể được sử dụng
  },
  usageCount: {
    type: Number, // Số lần mã đã được sử dụng
  },
});

const DiscountCode = mongoose.model('DiscountCode', DiscountCodeSchema);

module.exports = DiscountCode;