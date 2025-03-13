const bcrypt = require('bcrypt');
const jwt = require ('jsonwebtoken');
const User = require ('../model/modelUser');
require('dotenv').config(); 
const validator = require('validator');
const cookieParser = require ("cookie-parser");
const { MongoClient } = require('mongodb');
const moment = require('moment');
const { Product } = require('../model/modelProduct');



    //Đăng ký
    exports.Signin = async (req, res) => {
      try {
        const { username, phone, password, confirmpassword } = req.body;

        //Kiểm tra người dùng nhập đầy đủ thông tin chưa
        if (!username || !phone || !password || !confirmpassword){
          return res.status(400).json("Vui lòng nhập đầy đủ thông tin");
        }
        const sdt = phone;

        //Kiểm tra số điện thoại có phù hợp không
        if (!validator.isMobilePhone(sdt)){
          return res.status(400).json("Số điện thoại không hợp lệ");
        }
        // Kiểm tra xem người dùng đã tồn tại với số điện thoại đã cho chưa
        const existingUser = await User.findOne({ sdt });
        if (existingUser) {
          return res.status(400).json("Số điện thoại đã tồn tại");
        }

        //Kiểm tra mật khâur xác nhận và mật khẩu có khớp với nhau không
        if (password !== confirmpassword){
          return res.status(400).json("Mật khẩu không trùng khớp");
        }
    
        // Mã hóa mật khẩu
        const hashedPassword = await bcrypt.hash(password, 10); // Sử dụng 10 vòng lặp cho việc mã hóa
  
        
        // Tạo một người dùng mới
        const newUser = new User({
          tenND: username,
          sdt: phone,
          matkhau: hashedPassword,
          xacnhanMK: hashedPassword,
        });
    
        // Lưu người dùng mới vào cơ sở dữ liệu
        await newUser.save();
    
        return res.status(201).json("Đăng ký thành công");
      } catch (error) {
        return res.status(500).json(error);
      }
  };
  
    //Đăng nhập
    exports.Login = async (req, res) => {
        try {
          const { phone, password } = req.body;
      
          const sdt = phone;
          // Tìm người dùng bằng số điện thoại
          const user = await User.findOne({ sdt });
          if (!user) {
            return res.status(401).json("Số điện thoại không đúng");
          }
        // So sánh mật khẩu
        const isPasswordCorrect = await bcrypt.compare(password, user.matkhau);

        if (!isPasswordCorrect) {
            return res.status(400).json({ message: 'Sô điện thoại hoặc mật khẩu không đúng' });
        } ;
        // else{
        //   return res.status(200).json({ message: 'Đăng nhập thành công', user });
        // };

        const accessToken = jwt.sign({
          id: user._id,
          isAdmin: user.role === 'admin',
        }, 
        'accessToken', {expiresIn: '1h'} );
          // res.header("Authorization", accessToken).json({ user, accessToken });

        const RefreshToken = jwt.sign({
          id: user._id, 
          isAdmin: user.role === 'admin',
        }, 'RefreshToken', {expiresIn: '356d'} );
          // res.header("Authorization", RefreshToken).json({ user, accessToken, RefreshToken });
          
          res.json({ user, accessToken, RefreshToken });
        } catch (error) {
          res.status(500).json(error);
        }
      };
    
      
      //Cập nhật thông tin người dùng
        exports.updateUser = async (req, res) => {
      try {
        const  userId = req.params.id; //Lấy id của người dùng cần cập nhật thông tin
        const { tenND, matkhau, xacminhMK } = req.body; // Lấy thông tin người dùng từ request body


        const existingUser = await User.findById(userId);
        if(!existingUser){
            return res.status(400).json({ message: 'Người dùng không tồn tại' });
        };
        if (tenND){
          existingUser.tenND = tenND;
        };

        if(matkhau){

          if (!xacminhMK || matkhau !== xacminhMK) {
            return res.status(400).json('Mật khẩu không trùng khớp');
          };
    
        // Mã hóa mật khẩu
          const hashedPassword = await bcrypt.hash(matkhau, 10);

          //Cập nhật tên người dùng mới
          existingUser.matkhau = hashedPassword;
          existingUser.xacminhMK = hashedPassword;
          }


          //lưu thông tin đăng nhập mới
          await existingUser.save();

          return res.status(201).json("Cập nhật thông tin người dùng thành công");
      } catch (error) {
        return res.status(500).json(error);
      }
  };


    //Xem danh sách người dùng
    exports.getUserList = async (req, res) => {
      try {
        const page = parseInt(req.query.page) || 1; // Trang hiện tại
        const pageSize = parseInt(req.query.pageSize) || 10; // Kích thước trang
        const skip = (page - 1) * pageSize; // Bỏ qua số lượng mục

        const userList = await User.find()
        .skip(skip)
        .limit(pageSize);

        if(!userList|| userList.length === 0){
            return res.status(400).json({ message: 'Danh sách người dùng' });
        };
          return res.status(201).json(userList);
      } catch (error) {
        return res.status(500).json(error);
      }
  };


    //Xem chi tiết người dùng
    exports.getUserItem = async (req, res) => {
      try {
        const userId = req.params.id;

        const UserItem = await User.findById(userId);

        if(!UserItem){
            return res.status(400).json({ message: "Người dùng không tồn tại" });
        };
          return res.status(201).json(UserItem);
      } catch (error) {
        return res.status(500).json(error);
      }
  };

    //Xóa tài khoản người dùng
    exports.deleteUser = async (req, res) => {
      try {
        const  userId = req.params.id; //Lấy id của người dùng cần xóa

        const existingUser = await User.findByIdAndDelete(userId);
        if(!existingUser){
            return res.status(400).json({ message: 'Người dùng không tồn tại' });
        };
        
          return res.status(201).json("Xóa người dùng thành công");
      } catch (error) {
        return res.status(500).json(error);
      }
  };

    //Đăng xuất
    exports.Logout = async (req, res) => {
      try {
        res.clearCookie('accessToken');
        res.clearCookie('refreshToken');
        return res.status(200).json({ message: 'Đăng xuất thành công' });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    };


    exports.getUserStatsWeekly = async (req, res) => {
      try {
        // Lấy giá trị tuần và năm từ yêu cầu HTTP (vd: req.params.week và req.params.year)
        const requestedWeek = req.params.week;
        const requestedYear = req.params.year;
    
        // Kiểm tra nếu không có giá trị tuần hoặc năm được yêu cầu hoặc giá trị không hợp lệ
        if (
          !requestedWeek ||
          isNaN(requestedWeek) ||
          requestedWeek < 1 ||
          requestedWeek > 53 ||
          !requestedYear ||
          isNaN(requestedYear) ||
          requestedYear < 1970
        ) {
          return res.status(400).json({ message: 'Tuần hoặc năm không hợp lệ.' });
        }
    
        // Tạo ngày bắt đầu và kết thúc của tuần được yêu cầu
        const startDate = moment().year(requestedYear).isoWeek(requestedWeek).startOf('isoWeek');
        const endDate = startDate.clone().endOf('isoWeek');
    
        const users = await User.find(); // Lấy tất cả người dùng từ cơ sở dữ liệu
    
        // Lọc người dùng trong khoảng thời gian từ startDate đến endDate
        const filteredUsers = users.filter((user) => {
          const userDate = moment(user.lastAccessedAt, 'HH:mm, DD/MM/YY');
          return userDate.isBetween(startDate, endDate, null, '[]');
        });
    
        // Đếm số lượng người dùng trong tuần
        const totalUsers = filteredUsers.length;
    
        return res.status(200).json({ count: totalUsers });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    };
    

    
    exports.getUserStatsLastWeeks = async (req, res) => {
      try {
        const currentDate = new Date();
        const currentWeekNumber = Math.ceil(
          ((currentDate - new Date(currentDate.getFullYear(), 0, 1)) / 86400000 + 1) / 7
        ); // Tính số tuần của năm hiện tại
    
        const weeksToRetrieve = Array.from({ length: 3 }, (_, index) => currentWeekNumber - index);
    
        const userStatsLastfiveWeeks = await Promise.all(
          weeksToRetrieve.map(async (weekNumber) => {
            const startDate = new Date(currentDate.getFullYear(), 0, (weekNumber - 1) * 7 + 1);
            const endDate = new Date(currentDate.getFullYear(), 0, weekNumber * 7);
            
            const userStatsW = await User.aggregate([
              {
                $match: {
                  lastAccessedAt: {
                    $gte: startDate,
                    $lte: endDate
                  }
                }
              },
              {
                $group: {
                  _id: {
                    year: { $year: "$lastAccessedAt" },
                    week: { $week: "$lastAccessedAt" }
                  },
                  count: { $sum: 1 }
                }
              }
            ]);
    
            return userStatsW;
          })
        );
    
        return res.status(200).json(userStatsLastfiveWeeks);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    };
    
    
    
    exports.getUserStatsMonthly = async (req, res) => {
      try {
        // Lấy giá trị tháng từ yêu cầu HTTP (vd: req.params.month)
        const requestedMonth = req.params.month;
        
        // Kiểm tra nếu không có giá trị tháng được yêu cầu hoặc giá trị không hợp lệ
        if (!requestedMonth || isNaN(requestedMonth) || requestedMonth < 1 || requestedMonth > 12) {
          return res.status(400).json({ message: 'Tháng không hợp lệ. Vui lòng chọn tháng từ 1 đến 12.' });
        }
    
        // Tạo ngày bắt đầu và kết thúc của tháng được yêu cầu
        const startDate = moment(`01/${requestedMonth}/${moment().year()}`, 'DD/MM/YYYY');
        const endDate = startDate.clone().endOf('month');
    
        const users = await User.find(); // Lấy tất cả người dùng từ cơ sở dữ liệu
    
        // Lọc người dùng trong khoảng thời gian từ startDate đến endDate
        const filteredUsers = users.filter(user => {
          const userDate = moment(user.lastAccessedAt, 'HH:mm, DD/MM/YY');
          return userDate.isBetween(startDate, endDate, null, '[]');
        });
    
        // Đếm số lượng người dùng trong tháng
        const totalUsers = filteredUsers.length;
    
        return res.status(200).json({ count: totalUsers });
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    };
    
    exports.getUserStatsYearly = async (req, res) => {
      try {
        // Lấy giá trị năm từ yêu cầu HTTP (vd: req.params.year)
        const requestedYear = req.params.year;
        
        // Kiểm tra nếu không có giá trị năm được yêu cầu hoặc giá trị không hợp lệ
        if (!requestedYear || isNaN(requestedYear) || requestedYear < 2023) {
          return res.status(400).json({ message: 'Năm không hợp lệ. Vui lòng chọn năm từ 2023 trở đi.' });
        }
    
        const currentYear = new Date().getFullYear();
    
        // Tính ngày bắt đầu của năm được yêu cầu
        const startDate = new Date(requestedYear, 0, 1); // Lấy ngày đầu tiên của năm
    
        // Tính ngày cuối cùng của năm được yêu cầu
        const endDate = new Date(requestedYear, 11, 31); // Lấy ngày cuối cùng của năm (11 là tháng cuối cùng của năm)
    
        const userStatsY = await User.aggregate([
          {
            $match: {
              lastAccessedAt: {
                $gte: startDate,
                $lte: endDate
              }
            }
          },
          {
            $group: {
              _id: {
                year: { $year: "$lastAccessedAt" }
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
    
        return res.status(200).json(userStatsY);
      } catch (error) {
        return res.status(500).json({ message: error.message });
      }
    };
    

    const BMI_CATEGORY = {
      UNDERWEIGHT: 'Thiếu cân',
      NORMAL: 'Cân đối',
      OVERWEIGHT: 'Thừa cân',
      OBESE: 'Béo phì',
    };

    const BMR_FORMULAS = {
      Nu: (cannang, chieucao, tuoi) => 88.362 + (13.397 * cannang) + (4.799 * chieucao) - (5.677 * tuoi),
      Nam: (cannang, chieucao, tuoi) => 447.593 + (9.247 * cannang) + (3.098 * chieucao) - (4.330 * tuoi),
    };
    const TDEE_MULTIPLIERS = {
      it: 1.2,
      vua: 1.375,
      deu: 1.55,
      cao: 1.725,
      sieu: 1.9,
    };

    exports.calculateUser = async(req, res) => {
      try{ 
          const { cannang, chieucao, tuoi, gioitinh, nhucau, vandong } = req.body;

          // Tính toán BMR
          // const gender = req.user.gender; // Giả sử bạn có thông tin giới tính từ thông tin người dùng
          const bmr = calculateBMR(cannang, chieucao, tuoi, gioitinh);
      
          // Tính toán TDEE dựa trên mức độ vận động
          const activityLevelMultipliers = {
            it: 1.2,
            vua: 1.375,
            deu: 1.55,
            cao: 1.725,
            sieu: 1.9,
          };
          const activityLevel = vandong;
          const tdee = bmr * activityLevelMultipliers[activityLevel];
      
          // Tính chỉ số BMI
          const bmi = calculateBMI(cannang, chieucao);

        
          function calculateBMI(cannang, chieucao) {
            const heightInMeters = chieucao / 100;
            return cannang / (heightInMeters * heightInMeters);
          }
          
          function calculateBMICategory(bmi) {
            if (bmi < 18.5) {
              return BMI_CATEGORY.UNDERWEIGHT;
            } else if (bmi < 24.9) {
              return BMI_CATEGORY.NORMAL;
            } else if (bmi < 29.9) {
              return BMI_CATEGORY.OVERWEIGHT;
            } else {
              return BMI_CATEGORY.OBESE;
            }
          }
          
          function calculateBMR(cannang, chieucao, tuoi, gioitinh) {
            const formula = gioitinh === 'Nu' ? BMR_FORMULAS.Nu : BMR_FORMULAS.Nam;
            return formula(cannang, chieucao, tuoi);
          }
          
          function calculateTDEE(bmr, activityLevel) {
            const multiplier = TDEE_MULTIPLIERS[activityLevel];
            return bmr * multiplier;
          }
          
      
          // Gợi ý số lượng calories dựa trên nhu cầu
          let suggestedCalories = 0;
          if (nhucau === 'giảm cân') {
            // Gợi ý số lượng calories thấp hơn TDEE
            suggestedCalories = tdee - 300; // Giảm 500 calories mỗi ngày để giảm cân
          } else if (nhucau === 'tăng cân') {
            // Gợi ý số lượng calories cao hơn TDEE
            suggestedCalories = tdee + 300; // Tăng 500 calories mỗi ngày để tăng cân
          } else {
            // Nếu nhu cầu là 'giữ cân', sử dụng TDEE hiện tại
            suggestedCalories = tdee;
          }
         
            
          // }).limit(5); // Giới hạn số lượng sản phẩm trả về
          const mainDishCalories = Math.floor((suggestedCalories) * 0.6); // 60% của suggestedCalories
          const otherDishesCalories = Math.floor(suggestedCalories * 0.3); // 40% của suggestedCalories
          const dessertCalories = Math.floor(suggestedCalories * 0.1);

          // Lưu kết quả vào cơ sở dữ liệu hoặc gửi về frontend
          // Lấy sản phẩm món chính từ cơ sở dữ liệu theo danh mục
          const mainDishes = await Product.aggregate([
            {
              $match: {
                calo: { $gte: (mainDishCalories / 3) - 50, $lte: (mainDishCalories / 3) + 50 },
                loai: 'monchinh' // Thêm điều kiện danh mục ở đây
              }
            },
            { $sample: { size: 2 } } // Lấy ngẫu nhiên 2 sản phẩm
          ]);

          // Lấy sản phẩm món khai vị từ cơ sở dữ liệu theo danh mục
          const appetizers = await Product.aggregate([
            {
              $match: {
                calo: { $gte: (otherDishesCalories / 3) - 50, $lte: (otherDishesCalories / 3) + 50 },
                loai: 'khaivi' // Thêm điều kiện danh mục ở đây
              }
            },
            { $sample: { size: 2 } } // Lấy ngẫu nhiên 2 sản phẩm
          ]);

          // Lấy sản phẩm món tráng miệng từ cơ sở dữ liệu theo danh mục
          const desserts = await Product.aggregate([
            {
              $match: {
                calo: { $gte: (dessertCalories / 3) - 30, $lte: (dessertCalories / 3) + 30 },
                loai: 'trangmieng' // Thêm điều kiện danh mục ở đây
              }
            },
            { $sample: { size: 2 } } // Lấy ngẫu nhiên 2 sản phẩm
          ]);

          
          const mealCombos = [];
          
          for (const mainDish of mainDishes) {
            for (const appetizer of appetizers) {
              for (const dessert of desserts) {
                const totalCalories = mainDish.calo + appetizer.calo + dessert.calo;
                if (totalCalories >= (suggestedCalories / 3) - 50 && totalCalories <= (suggestedCalories / 3) + 50) {
                  mealCombos.push({ mainDish, appetizer, dessert, totalCalories });
                }
              }
            }
          }
          
          // Sắp xếp các combo theo tổng calo tăng dần và giới hạn số lượng combo trả về
          const sortedCombos = mealCombos.sort((a, b) => a.totalCalories - b.totalCalories).slice(0, 4);
          

          res.json({
            bmr,
            tdee,
            bmi,
            suggestedCalories,
            mealCombos,
            // sortedCombos,
          });
        } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
        }
  };


    exports.suggestMealCombos = async (req, res) => {
      try {
          // Lấy thông số chỉ số cơ thể của người dùng từ hàm tính toán
          const { cannang, chieucao, tuoi, gioitinh, nhucau, vandong } = req.body;
          const { tdee } = calculateUser({ cannang, chieucao, tuoi, gioitinh, nhucau, vandong });

          // Tìm các sản phẩm món ăn có số lượng calo gần với giá trị tdee
          const mealCombos = await Product.find({
              calo: { $gte: tdee - 100, $lte: tdee + 100 } // Sử dụng ngưỡng ±100 calo
          }).limit(5); // Giới hạn số lượng sản phẩm trả về

          res.json(mealCombos);
          console.log(mealCombos);
      } catch (error) {
          console.error(error);
          res.status(500).json({ error: 'Internal Server Error' });
      }
  };

  exports.countTotalUser = async (req, res) => {
    try {
        const totalCountUser = await User.countDocuments();
        console.log(`Tổng số sản phẩm trong hệ thống: ${totalCountUser}`);
        res.status(200).json(totalCountUser);
    } catch (error) {
        console.error('Lỗi khi thống kê số lượng sản phẩm:', error);
        throw error;
    }
  };

  //Thống kê người dùng 4 tuần gần nhất
  exports.getUserStatisticsLastFourWeeks = async (req, res) =>{
    try {
      const today = moment();
      const weeklyStats = [];
  
      for (let i = 0; i < 4; i++) {
        const startOfWeek = today.clone().subtract(i, 'weeks').startOf('isoWeek');
        const endOfWeek = startOfWeek.clone().endOf('isoWeek');
  
        const users = await User.find({ createdAt: { $gte: startOfWeek, $lte: endOfWeek } });
  
        const weeklyNewUsers = users.length;
  
        weeklyStats.push({
          weekStartDate: startOfWeek.format('DD/MM/YYYY'),
          weekEndDate: endOfWeek.format('DD/MM/YYYY'),
          weeklyNewUsers
        });
      }
  
      return { weeklyStats };
    } catch (error) {
      console.error(error);
      throw new Error('Error fetching user statistics');
    }
  }
  





