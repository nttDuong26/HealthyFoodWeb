const Order = require('../model/modelOrder');
const User = require ('../model/modelUser');
const generatePDF = require('./pdfUntil');
const { Product } = require('../model/modelProduct');

const moment = require('moment');
// const Order = require('../models/Order');

const OrderController = {
    // Controller để tạo mới đơn hàng
    createOrder: async (req, res) => {
        try {
            const { user, products, totalPrice, shippingAddress, ghichu, paymentMethod } = req.body;
            const formattedPaymentMethod = paymentMethod === 'COD' ? 'COD' : 'Ví điện tử';

            // Chuyển đối tượng shippingAddress thành chuỗi JSON trước khi lưu vào cơ sở dữ liệu
            const shippingAddressString = JSON.stringify(shippingAddress);
  
            const newOrder = new Order({
                user,
                products,
                totalPrice,
                shippingAddress: shippingAddressString,
                ghichu,
                paymentMethod: formattedPaymentMethod,
            });
            await newOrder.save();
            // const ordersUser = await Order.findOne({ user: user })
            // .sort({ createdAt }) // Sắp xếp theo trường createdAt giảm dần (từ mới nhất đến cũ nhất)
            // .populate('products.product'); // Populate thông tin sản phẩm
              const ordersUser = await Order.findOne({ _id: newOrder._id }).populate('products.product');

              res.status(201).json(ordersUser);

        } catch (error) {
            console.error('Lỗi khi tạo đơn hàng:', error);
            res.status(500).json({ error: 'Lỗi khi tạo đơn hàng' });
        }
    },

    // Controller để lấy danh sách các đơn hàng
    getOrders: async (req, res) => {
        try {
            // const orders = await Order.find();
            const orders = await Order.find().populate('user').populate('products.product').sort({ createdAt: 'desc' });;

            res.status(200).json(orders);
        } catch (error) {
            console.error('Lỗi khi lấy danh sách đơn hàng:', error);
            res.status(500).json({ error: 'Lỗi khi lấy danh sách đơn hàng' });
        }
    },

    // Controller để lấy thông tin chi tiết của một đơn hàng dựa trên ID
        getOrderById: async (req, res) => {
        try {
            const orderId = req.params.id;
            const order = await Order.findById(orderId).populate('user').populate('products.product');
            // const ordersUser = await Order.find({ user: user }).populate('products.product');
            if (!order) {
                return res.status(404).json({ error: 'Không tìm thấy đơn hàng' });
            }
            res.status(200).json(order);
        } catch (error) {
            console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
            res.status(500).json({ error: 'Lỗi khi lấy chi tiết đơn hàng' });
        }
    },

    //Lấy danh sách đơn hàng đã đặt của người dùng
    getOrdersByUser: async (req, res) => {
      try {
        // Lấy ID người dùng từ request hoặc thông tin đăng nhập của người dùng (nếu được xác thực)
        const userId = req.params.id; // Đây là giả sử bạn có thể lấy userId từ request params
    
        // Tìm người dùng trong cơ sở dữ liệu bằng ID
        const user = await User.findById(userId);
        
        if (!user) {
          return res.status(404).json({ error: 'Người dùng không tồn tại' });
        }
    
        // Tìm các đơn hàng của người dùng dựa trên ID người dùng
        const orders = await Order.find({ user: userId }).populate('products.product');
        // if(!orders || orders.length === 0){
        //   return res.json("Không có lịch sử đặt hàng") 
        // }
        // Trả về danh sách đơn hàng đã đặt của người dùng
        return res.status(200).json(orders);

      } catch (error) {
        // Xử lý lỗi nếu có
        console.error(error);
        return res.status(500).json({ error: 'Đã có lỗi xảy ra, vui lòng thử lại sau' });
      }
    },
    
    // Hóa đơn
    createInvoice: async (req, res) => {
      try {
        const { order } = req.body;
    
        // Tạo nội dung hóa đơn từ đơn hàng
        const productsList = order.products.map(item => `  ${item.product.tenSP}: (x ${item.quantity})`).join('');
        const invoiceContent = `
          MÃ HÓA ĐƠN: #${order._id}
          VAT: 0%
          Ngày Đặt: ${order.createdAt}
          Địa Chỉ Giao Hàng: ${order.shippingAddress}
          Phương Thức Thanh Toán: ${order.paymentMethod}
          Giá trị đơn hàng: ${order.totalPrice}.000đ
          MÓN ĂN:
        ${productsList}
          Ghi Chú: ${order.ghichu}
        `;
        
    
        // Tạo tệp PDF từ nội dung hóa đơn
        const pdfBytes = await generatePDF(invoiceContent);
    
        // Trả về tệp PDF cho client
        res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=invoice.pdf');
        res.send(pdfBytes);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Đã có lỗi xảy ra, vui lòng thử lại sau' });
      }
    },

    // Controller để cập nhật trạng thái của đơn hàng dựa trên ID
        updateOrderStatus: async (req, res) => {
        try {
            const orderId = req.params.id;
            const { status } = req.body;
            const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
            if (!order) {
                return res.status(404).json({ error: 'Không tìm thấy đơn hàng' });
            }
            res.status(200).json(order);
        } catch (error) {
            console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
            res.status(500).json({ error: 'Lỗi khi cập nhật trạng thái đơn hàng' });
        }
    },

    // Controller để xóa một đơn hàng dựa trên ID
    deleteOrder: async (req, res) => {
        try {
            const orderId = req.params.id;
            const deletedOrder = await Order.findByIdAndDelete(orderId);
            if (!deletedOrder) {
                return res.status(404).json({ error: 'Không tìm thấy đơn hàng' });
            }
            res.status(200).json({ message: 'Đơn hàng đã được xóa thành công' });
        } catch (error) {
            console.error('Lỗi khi xóa đơn hàng:', error);
            res.status(500).json({ error: 'Lỗi khi xóa đơn hàng' });
        }
    },

    //Thống kê đơn hàng theo tuần

    
    getOrderStatsWeek:async (req, res) => {
      try {
        const { week, year } = req.params;
    
        if (!week || isNaN(week) || week < 1 || week > 53 || !year || isNaN(year) || year < 1970) {
          return res.status(400).json({ message: 'Tuần hoặc năm không hợp lệ.' });
        }
    
        const startOfWeek = moment().year(year).isoWeek(week).startOf('isoWeek');
        const endOfWeek = startOfWeek.clone().endOf('isoWeek');
    
        const orders = await Order.find(); // Lấy tất cả người dùng từ cơ sở dữ liệu
    
        const filteredOrders = orders.filter(order => {
          const orderDate = moment(order.createdAt, 'HH:mm, DD/MM/YYYY');
          return orderDate.isBetween(startOfWeek, endOfWeek, null, '[]');
        });
    
        const totalOrders = filteredOrders.length;
    
    
        return res.status(200).json({ count: totalOrders });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    },
    
    getOrderStatsMonthly: async (req, res) => {
      try {
        // Lấy giá trị tháng từ yêu cầu HTTP (vd: req.params.month)
        const requestedMonth = req.params.month;
        
        // Kiểm tra nếu không có giá trị tháng được yêu cầu hoặc giá trị không hợp lệ
        if (!requestedMonth || isNaN(requestedMonth) || requestedMonth < 1 || requestedMonth > 12) {
          return res.status(400).json({ message: 'Tháng không hợp lệ. Vui lòng chọn tháng từ 1 đến 12.' });
        }
    
        // Tạo ngày bắt đầu của tháng được yêu cầu
        const startDate = moment(`01/${requestedMonth}/${moment().year()}`, 'DD/MM/YYYY');
        const endDate = startDate.clone().endOf('month');
    
        const orders = await Order.find(); // Lấy tất cả đơn hàng từ cơ sở dữ liệu
    
        // Lọc các đơn hàng trong khoảng thời gian từ startDate đến endDate
        const filteredOrders = orders.filter(order => {
          const orderDate = moment(order.createdAt, 'HH:mm, DD/MM/YYYY');
          return orderDate.isBetween(startDate, endDate, null, '[]');
        });
    
        // Đếm số lượng đơn hàng trong tháng
        const totalOrders = filteredOrders.length;
    
        return res.status(200).json({ count: totalOrders });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    },
    
    getOrderStatsYearly: async (req, res) => {
      try {
        // Lấy giá trị năm từ yêu cầu HTTP (vd: req.params.year)
        const requestedOrYear = req.params.year;
        
        // Kiểm tra nếu không có giá trị năm được yêu cầu hoặc giá trị không hợp lệ
        if (!requestedOrYear || isNaN(requestedOrYear) || requestedOrYear < 2023) {
          return res.status(400).json({ message: 'Năm không hợp lệ. Vui lòng chọn năm từ 2023 trở đi.' });
        }
    
        const currentYear = new Date().getFullYear();
    
        // Tính ngày bắt đầu của năm được yêu cầu
        const startDate = new Date(requestedOrYear, 0, 1); // Lấy ngày đầu tiên của năm
    
        // Tính ngày cuối cùng của năm được yêu cầu
        const endDate = new Date(requestedOrYear, 11, 31); // Lấy ngày cuối cùng của năm (11 là tháng cuối cùng của năm)
    
        const OrderStatsY = await Order.aggregate([
          {
            $match: {
              createdAt: {
                $gte: startDate,
                $lte: endDate
              }
            }
          },
          {
            $group: {
              _id: {
                year: { $year: "$createdAt" }
              },
              count: { $sum: 1 }
            }
          },
          {
            $sort: {
              "_id.year": -1
            }
          }
        ]);
    
        return res.status(200).json(OrderStatsY);
      } catch (error) {
        return res.status(500).json("Lỗi");
      }
    },

    getTrafficStatsWeek: async (req, res) => {
      try {
        // Lấy giá trị tuần từ yêu cầu HTTP
        const requestedOrWeek = req.params.week;
    
        // Kiểm tra nếu không có giá trị tuần được yêu cầu
        if (!requestedOrWeek) {
          return res.status(400).json({ message: 'Vui lòng chọn tuần để xem thống kê.' });
        }
    
        // Chuyển giá trị tuần từ chuỗi sang số nguyên
        const requestedOrWeekNumber = parseInt(requestedOrWeek);
        if (isNaN(requestedOrWeekNumber) || requestedOrWeekNumber < 1 || requestedOrWeekNumber > 52) {
          return res.status(400).json({ message: 'Tuần không hợp lệ. Vui lòng chọn tuần từ 1 đến 52.' });
        }
    
        // Tính ngày bắt đầu của tuần được yêu cầu
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const startDate = new Date(currentYear, 0, (requestedOrWeekNumber - 1) * 7 + 1); // Lấy ngày đầu tiên của tuần
        const endDate = new Date(currentYear, 0, requestedOrWeekNumber * 7); // Lấy ngày cuối cùng của tuần
    
        // Thực hiện truy vấn cơ sở dữ liệu để lấy doanh thu theo tuần
        const orderStatsWeek = await Order.aggregate([
          {
            $match: {
              createdAt: {
                $gte: startDate,
                $lte: endDate
              }
            }
          },
          {
            $group: {
              _id: null,
              totalRevenue: { $sum: "$totalPrice" }
            }
          }
        ]);
    
        // Trả về kết quả
        return res.status(200).json(orderStatsWeek);
      } catch (error) {
        // Xử lý lỗi
        return res.status(500).json({ message: 'Đã xảy ra lỗi khi lấy thống kê doanh thu.' });
      }
    },
    
    // Thay đổi hàm backend để trả về dữ liệu doanh thu trong 4 tuần
    getRevenueStatsLastFourWeeks: async (req, res) => {
      try {
        const currentDate = new Date();
        const currentWeekNumber = Math.ceil(
          ((currentDate - new Date(currentDate.getFullYear(), 0, 1)) / 86400000 + 1) / 7
        ); // Tính số tuần của năm hiện tại
    
        const weeksToRetrieve = Array.from({ length: 4 }, (_, index) => currentWeekNumber - index);
    
        const revenueStatsLastFourWeeks = await Promise.all(
          weeksToRetrieve.map(async (weekNumber) => {
            const startDate = new Date(currentDate.getFullYear(), 0, (weekNumber - 1) * 7 + 1);
            const endDate = new Date(currentDate.getFullYear(), 0, weekNumber * 7);
    
            const orderStatsWeek = await Order.aggregate([
              {
                $match: {
                  createdAt: {
                    $gte: startDate,
                    $lte: endDate
                  }
                }
              },
              {
                $group: {
                  _id: {
                    year: { $year: "$createdAt" },
                    week: { $week: "$createdAt" }
                  },
                  totalRevenue: { $sum: "$totalPrice" }
                }
              }
            ]);
    
            return orderStatsWeek;
          })
        );
    
        return res.status(200).json(revenueStatsLastFourWeeks);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    },


    getRevenueMonthly: async (req, res) => {
      try {
        const { month, year } = req.params;
    
        if (!month || isNaN(month) || month < 1 || month > 12 || !year || isNaN(year) || year < 1970) {
          return res.status(400).json({ message: 'Tháng hoặc năm không hợp lệ.' });
        }
    
        const startOfMonth = moment().year(year).month(month - 1).startOf('month');
        const endOfMonth = startOfMonth.clone().endOf('month');
        
        console.log(startOfMonth);
        console.log(endOfMonth);
        
        const orders = await Order.find();
        
        // Lọc ra các đơn hàng trong khoảng thời gian từ startOfMonth đến endOfMonth
        const filteredOrders = orders.filter(order => {
          const orderDate = moment(order.createdAt, 'HH:mm, DD/MM/YYYY');
          return orderDate.isBetween(startOfMonth, endOfMonth, null, '[]');
        });
        
        // Tính tổng doanh thu từ các đơn hàng đã được lọc
        const totalRevenue = filteredOrders.reduce((sum, order) => sum + order.totalPrice, 0);
        const totalOrders = filteredOrders.length;
        
        console.log('Tổng doanh thu: ', totalRevenue);
        console.log('Số lượng đơn hàng trong tháng: ', totalOrders);
        return res.status(200).json({ totalRevenue });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    },

    getRevenueWeekly: async (req, res) => {
      try {
        const { week, year } = req.params;
    
        if (!week || isNaN(week) || week < 1 || week > 4 || !year || isNaN(year) || year < 1970) {
          return res.status(400).json({ message: 'Tuần hoặc năm không hợp lệ.' });
        }
    
        const startOfWeek = moment().year(year).isoWeek(week).startOf('isoWeek');
        const endOfWeek = startOfWeek.clone().endOf('isoWeek');
        
        // console.log(startOfWeek);
        // console.log(startOfWeek);
        
        const orders = await Order.find();
        
        // Lọc ra các đơn hàng trong khoảng thời gian từ startOfMonth đến endOfMonth
        const filteredOrders = orders.filter(order => {
          const orderDate = moment(order.createdAt, 'HH:mm, DD/MM/YYYY');
          return orderDate.isBetween(startOfWeek, endOfWeek, null, '[]');
        });
        
        // Tính tổng doanh thu từ các đơn hàng đã được lọc
        const totalRevenueWeek = filteredOrders.reduce((sum, order) => sum + order.totalPrice, 0);
        const totalOrdersWeek = filteredOrders.length;
        
        // console.log('Tổng doanh thu: ', totalRevenueWeek);
        // console.log('Số lượng đơn hàng trong tháng: ', totalOrdersWeek);
        return res.status(200).json({ totalRevenueWeek });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    },

    //  getRevenueStatsLastFourWeeks: async (req, res) => {
    //   try {
    //     const today = moment();
    //     const weeklyRevenues = [];
    
    //     for (let i = 0; i < 4; i++) {
    //       // Lấy ngày đầu tiên của tuần
    //       const startOfWeek = today.clone().subtract(i, 'weeks').startOf('isoWeek');
    
    //       // Lấy ngày cuối của tuần
    //       const endOfWeek = startOfWeek.clone().endOf('isoWeek');
    
    //       // Lọc ra các đơn hàng trong khoảng thời gian từ startOfWeek đến endOfWeek
    //       const orders = await Order.find();
    //       const filteredOrders = orders.filter(order => {
    //         const orderDate = moment(order.createdAt, 'HH:mm, DD/MM/YYYY');
    //         return orderDate.isBetween(startOfWeek, endOfWeek, null, '[]');
    //       });
    
    //       // Tính tổng doanh thu trong tuần này và thêm vào mảng weeklyRevenues
    //       const weeklyRevenue = filteredOrders.reduce((sum, order) => sum + order.totalPrice, 0);
    //       weeklyRevenues.push(weeklyRevenue);
    //     }
    
    //     console.log('Tổng doanh thu 4 tuần gần nhất:', weeklyRevenues);
    //     res.status(200).json({ weeklyRevenues });
    //   } catch (error) {
    //     console.error(error);
    //     return res.status(500).json({ message: error.message });
    //   }
    // },

// Thống kê số món ăn được bán trong 4 tuần gần nhất
// Thống kê số món ăn được bán trong 4 tuần gần nhất
getWeeklyProductSales: async (req, res) => {
  try {
    const today = moment();
    const weeklyProductSales = [];

    for (let i = 0; i < 4; i++) {
      // Lấy ngày đầu tiên của tuần
      const startOfWeek = today.clone().subtract(i, 'weeks').startOf('isoWeek');

      // Lấy ngày cuối của tuần
      const endOfWeek = startOfWeek.clone().endOf('isoWeek');

      const orders = await Order.find({
        createdAt: {
          $gte: startOfWeek.toDate(),
          $lte: endOfWeek.toDate(),
        },
      }).populate('products.product'); // Sử dụng populate để lấy thông tin sản phẩm từ mỗi đơn hàng

      let totalProductSales = 0;

      orders.forEach(order => {
        order.products.forEach(product => {
          totalProductSales += product.quantity; // Tổng số lượng sản phẩm từ mỗi đơn hàng
    console.log(product.quantity);

        });
      });

      weeklyProductSales.push(totalProductSales);
    }
    // console.log('Tổng doanh thu 4 tuần gần nhất:', totalProductSales);

    res.status(200).json({ weeklyProductSales });
  } catch (error) {
    console.error('Error fetching weekly product sales:', error);
    res.status(500).json({ error: 'Error fetching weekly product sales: ' + error.message });
  }
},

getRevenueStatsLastFourWeeks: async (req, res) => {
  try {
    const today = moment();
    const weeklyStats = [];
    
    for (let i = 0; i < 4; i++) {
      const startOfWeek = today.clone().subtract(i, 'weeks').startOf('isoWeek');
      const endOfWeek = startOfWeek.clone().endOf('isoWeek');
    console.log(startOfWeek);
    console.log(endOfWeek);

      
    const orders = await Order.find().populate('products.product');
    const filteredOrders = orders.filter(order => {
      const orderDate = moment(order.createdAt, 'HH:mm, DD/MM/YYYY');
      return orderDate.isBetween(startOfWeek, endOfWeek, null, '[]') && order.status !== 'Đã hủy';
    });

    const weeklyRevenue = filteredOrders.reduce((sum, order) => sum + order.totalPrice, 0);
    const weeklyProductsSold = filteredOrders.reduce((sum, order) => sum + order.products.length, 0);
    
    weeklyStats.push({
      weekStartDate: startOfWeek.format('DD/MM/YYYY'),
      weekEndDate: endOfWeek.format('DD/MM/YYYY'),
      weeklyRevenue,
      weeklyProductsSold
    });
  }
    
    res.status(200).json({ weeklyStats });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: error.message });
  }
},

countTotalOrders: async (req, res) => {
  try {
      const totalCountOrder = await Order.countDocuments();
      console.log(`Tổng số sản phẩm trong hệ thống: ${totalCountOrder}`);
      res.status(200).json(totalCountOrder);
  } catch (error) {
      console.error('Lỗi khi thống kê số lượng sản phẩm:', error);
      throw error;
  }
},


    // Sử dụng hàm tìm kiếm
    
};

module.exports = OrderController;
