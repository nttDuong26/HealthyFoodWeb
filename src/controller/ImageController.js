const Image = require('../model/modelImage');
const path = require('path');

const ImageController =  {

    uploadImage: async (req, res) => {
        try {
         // Lưu thông tin về file vào MongoDB
          const { originalname } = req.file;
          const image = new Image({
            name: originalname,
            url: originalname,
      
            // Thêm các trường khác tùy ý
          });
          await image.save();
    
          res.json(image);
        } catch (err) {
          res.status(500).json({ error: 'Upload failed', message: err.message });
        }
    },

    getAllImage: async (req, res) => {
        try{
            const AllImage = await Image.find();
            res.status(200).json(AllImage);

        }catch (err) {
            res.status(500).json({ error: 'Thất bại', message: err.message });
        }
    },

    //Chưa có api
    getOneImageToData: async(req, res) => {
        try{

            const imageId = req.params.id;
            const OneImage = await Image.findById(imageId);
            if(!OneImage){
                res.status(400).json("Không tìm thấy hình ảnh");
            }
            res.status(200).json(OneImage);

        }catch (err) {
            res.status(500).json({ error: 'Thất bại', message: err.message });
        }
    },

    getOneImage: async (req, res) => {
        try {
            const imageId = req.params.id;
            const OneImage = await Image.findById(imageId);
            if (!OneImage) {
                res.status(404).json({ error: 'Không tìm thấy hình ảnh' });
                return;
            }
    
            // Đường dẫn đến tệp ảnh trên máy chủ
            const imagePath = path.join(__dirname, '..', 'uploads', OneImage.name);
            // const imagePath = path.resolve(__dirname, '..', 'uploads', OneImage.name);

    
            // Trả về tệp ảnh
            res.sendFile(imagePath);
        } catch (err) {
            res.status(500).json({ error: 'Thất bại', message: err.message });
        }
    },

    deleteImage: async(req,res) => {
        try{
            const imageId = req.params.id;
            const existingImage = await Image.findByIdAndDelete(imageId);
            if(!existingImage){
                res.status(401).json("Lỗi");
            }
            res.status(200).json("Xóa ảnh thành công");
        }catch (err) {
            res.status(500).json({ error: 'Thất bại', message: err.message });
        }
    },

    updateImage: async (req, res) => {
        try {
            const imageId = req.params.id;
            const { newName } = req.body; // Giả sử bạn muốn cập nhật tên hình ảnh

            // Kiểm tra xem hình ảnh có tồn tại không
            const existingImage = await Image.findById(imageId);
            if (!existingImage) {
                return res.status(404).json({ error: 'Không tìm thấy hình ảnh' });
            }

            // Cập nhật thông tin hình ảnh
            existingImage.name = newName; // Cập nhật tên hình ảnh, bạn có thể thêm các trường khác tùy ý

            // Lưu hình ảnh đã cập nhật vào cơ sở dữ liệu
            const updatedImage = await existingImage.save();

            res.status(200).json(updatedImage);
        } catch (err) {
            res.status(500).json({ error: 'Thất bại', message: err.message });
        }
    }
};


module.exports = ImageController;