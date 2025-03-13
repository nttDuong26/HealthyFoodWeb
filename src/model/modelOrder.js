const mongoose = require('mongoose');
const moment = require('moment');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // Tham chiếu đến mô hình User
    required: true,
  },
  products: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product', // Tham chiếu đến mô hình Product
        required: true,
      },
      quantity: {
        type: Number,
        required: true,
      },
    },
  ],
  totalPrice: {
    type: Number,
    required: true,
  },
  shippingAddress: {
    type: String,
    required: true,
  },
  ghichu: {
    type: String,
    require: true,
},
  status: {
    type: String,
    enum: ['Đang xử lý', 'Đã xác nhận', 'Đang giao hàng', 'Đã giao', 'Đã hủy'],
    default: 'Đang xử lý',
  },
  isPaid: {
    type: Boolean,
    default: false, // Mặc định là chưa thanh toán, khi người mua thanh toán thành công, trường này được cập nhật thành true
  },
  paymentMethod: {
    type: String,
    enum: ['COD', 'Ví điện tử'], // Lựa chọn phương thức thanh toán
    // default: 'COD', // Phương thức thanh toán mặc định là COD
  },
  createdAt: {
    type: String,
    default:  moment().format('HH:mm, DD/MM/YYYY'),
    
  },

});

const Order = mongoose.model('Order', orderSchema);

module.exports = Order;
