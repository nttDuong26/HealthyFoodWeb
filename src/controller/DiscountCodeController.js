const DiscountCode = require('../model/modelDiscountCode');

const DiscountCodeController = {
  createDiscountCode: async (req, res) => {
    try {
      const { code, discountPercentage, expirationDate, startDate } = req.body;

      const newDiscountCode = new DiscountCode({
        code,
        discountPercentage,
        expirationDate,
        startDate
      });

      await newDiscountCode.save();
      res.status(201).json(newDiscountCode);
    } catch (error) {
      console.error('Lỗi khi tạo mã giảm giá:', error);
      res.status(500).json({ error: 'Lỗi khi tạo mã giảm giá' });
    }
  },

  getAllDiscountCodes: async (req, res) => {
    try {
      const discountCodes = await DiscountCode.find();
      res.status(200).json(discountCodes);
    } catch (error) {
      console.error('Lỗi khi lấy danh sách mã giảm giá:', error);
      res.status(500).json({ error: 'Lỗi khi lấy danh sách mã giảm giá' });
    }
  },
  getOneDiscountCode: async (req, res) => {
    try{
      const discountCodes = await DiscountCode.findById(req.params.id);
      if (!discountCodes) {
       return res.status(404).json({ error: 'Sản phẩm không tồn tại' });
     }
       res.status(200).json(discountCodes);
    } catch (error) {
      console.error('Lỗi khi lấy thông tin mã giảm giá:', error);
      res.status(500).json({ error: 'Lỗi khi lấy thông tin mã giảm giá' });
    }
  },
  
  deleteDiscountCode: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedDiscountCode = await DiscountCode.findByIdAndDelete(id);

      if (!deletedDiscountCode) {
        return res.status(404).json({ error: 'Mã giảm giá không tồn tại' });
      }

      res.status(200).json({ message: 'Xóa mã giảm giá thành công' });
    } catch (error) {
      console.error('Lỗi khi xóa mã giảm giá:', error);
      res.status(500).json({ error: 'Lỗi khi xóa mã giảm giá' });
    }
  },
  updateDiscountCode: async (req, res) => {
    try {
      const { id } = req.params;
      const { code, discountPercentage, expirationDate, startDate } = req.body;

      const updatedDiscountCode = await DiscountCode.findByIdAndUpdate(
        id,
        { code, discountPercentage, expirationDate, startDate },
        { new: true }
      );

      if (!updatedDiscountCode) {
        return res.status(404).json({ error: 'Mã giảm giá không tồn tại' });
      }

      res.status(200).json(updatedDiscountCode);
    } catch (error) {
      console.error('Lỗi khi cập nhật mã giảm giá:', error);
      res.status(500).json({ error: 'Lỗi khi cập nhật mã giảm giá' });
    }
  },

  validateDiscountCode: async (req, res) => {
    try {
      const { discountCode } = req.body;
  
      // Kiểm tra xem mã giảm giá có tồn tại trong cơ sở dữ liệu không
      const existingDiscountCode = await DiscountCode.findOne({ code: discountCode });
  
      if (existingDiscountCode) {
        // Nếu mã giảm giá tồn tại, trả về giá trị giảm giá cho client
        return res.status(200).json({
          valid: true,
          discountAmount: existingDiscountCode.discountPercentage, // Giả sử lấy giảm giá theo phần trăm từ cơ sở dữ liệu
        });
      } else {
        // Nếu mã giảm giá không tồn tại, trả về thông báo cho client
        return res.status(200).json({
          valid: false,
          message: 'Mã giảm giá không hợp lệ.',
        });
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Lỗi khi kiểm tra mã giảm giá:', error);
      return res.status(500).json({
        valid: false,
        message: 'Đã xảy ra lỗi khi kiểm tra mã giảm giá.',
      });
    }
  },
};

module.exports = DiscountCodeController;
