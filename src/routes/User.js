const UserController = require('../controller/UserController');
const router = require("express").Router();


//Đăng ký
router.post('/signin', UserController.Signin);


//Đăng nhập
router.post('/login', UserController.Login);


//Cập nhật thông tin người dùng
router.put('/updateuser/:id', UserController.updateUser);


//Xem danh sách người dùng
router.get('/getuserlist', UserController.getUserList);


//Xem chi tiết người dùng
router.get('/getuserItem/:id', UserController.getUserItem);


//Xóa người dùng
router.delete('/deleteuser/:id', UserController.deleteUser);


//Thống kê người dùng theo tuần
router.get ('/countUsers/week/:week/:year', UserController.getUserStatsWeekly);

//Thống kê người dùng 5 tuần gần nháa
router.get ('/countUsers/recentWeeks', UserController.getUserStatsLastWeeks);

//Thống kê người dùng theo tháng
router.get ('/countUsers/month/:month', UserController.getUserStatsMonthly);

//Thống kê người dùng theo năm
router.get ('/countUsers/year/:year', UserController.getUserStatsYearly);

router.post ('/calculate', UserController.calculateUser)
//Đăng xuất
router.post('/logout', UserController.Logout);

//Gợi ý món ăn
router.post('/recoment', UserController.suggestMealCombos);

router.post("/usertotalCount", UserController.countTotalUser);




module.exports = router;