const  OrderController  = require ("../controller/OrderController");
const router = require("express").Router();


//ADD Product
router.post("/ad", OrderController.createOrder);

//GET ALL Product
router.get("/", OrderController.getOrders);

//GET One Product
router.get("/:id", OrderController.getOrderById);

router.get("/user/:id/order", OrderController.getOrdersByUser);

//get hóa đơn export-invoice
router.post("/export-invoice", OrderController.createInvoice);


//UPDATE Product
router.put("/:id", OrderController.updateOrderStatus);

//DELETE Product
router.delete("/:id", OrderController.deleteOrder);

//Thống kê đơn hàng theo tuần
router.get("/countOrder/week/:week/:year", OrderController.getOrderStatsWeek);

router.get("/countOrder/trafficweek/:week", OrderController.getTrafficStatsWeek);

router.get("/countOrder/salesweek", OrderController.getWeeklyProductSales);


router.get("/countOrder/trafficfourweek", OrderController.getRevenueStatsLastFourWeeks);

//Thống kê đơn hàng theo tháng
router.get("/countOrder/month/:month", OrderController.getOrderStatsMonthly);

router.get("/countOrder/traficmonth/:month/:year", OrderController.getRevenueMonthly);

router.get("/countOrder/traficweek/:week/:month", OrderController.getRevenueWeekly);



//Thóng kê đơn hàng theo năm
router.get("/countOrder/year/:year", OrderController.getOrderStatsYearly);

router.post("/countOrderTotal", OrderController.countTotalOrders);









module.exports = router;