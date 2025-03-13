// const path = require('path');
// const express = require('express'); // Thêm dòng này để require thư viện express
// const morgan = require('morgan');
// const cors = require("cors");
// const bodyParser = require("body-parser");
// const cookieParser = require ("cookie-parser");
// const dotenv = require("dotenv");
// const multer = require('multer');
// const app = express();
// const port = 3000;

// // Multer setup
// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, 'uploads/');
//   },
//   filename: function (req, file, cb) {
//     cb(null, Date.now() + '-' + file.originalname);
//   }
// });

// const upload = multer({ storage: storage });

// const ProductCategoriesRoute = require("./routes/ProductCategories");
// const ProductRoute = require("./routes/Product");
// const UserRoute = require("./routes/User");
// const CartRoute = require("./routes/Cart");
// const OrderRoute = require ("./routes/Order");
// const ImageRoute = require("./routes/Image");

// const db = require('./config/database');
// // const route = require ('./routes/');

// //Connect database
// db.connect();
// app.use(bodyParser.json({limit:"500mb"}));
// app.use(cors());
// app.use(morgan("common"));
// app.use(cookieParser());

// //ROUTES
// app.use("/v1/ProductCategories", ProductCategoriesRoute);
// app.use("/v1/Product", ProductRoute);
// app.use('/v1/User', UserRoute);
// app.use('/v1/Cart', CartRoute);
// app.use('/v1/Order', OrderRoute );
// app.use('/v1/Image', upload.single('file'), ImageRoute );

// app.listen(port, () => {
//   console.log(`Example app listening on port ${port}`)
// }) cứ comment để đó không cần xóa
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require ("cookie-parser");
const dotenv = require("dotenv");
const app = express();
const port = 3000;
const DecisionTree = require('decision-tree');

const ProductCategoriesRoute = require("./routes/ProductCategories");
const ProductRoute = require("./routes/Product");
const UserRoute = require("./routes/User");
const CartRoute = require("./routes/Cart");
const OrderRoute = require ("./routes/Order");
const ImageRoute = require("./routes/Image");
const Pay = require("./routes/Pay");
const DiscountCodeRoutes = require("./routes/DiscountCode");
const Review = require("./routes/Review");


const db = require('./config/database');

//Connect database
db.connect();

app.use(cors());
app.use(morgan("common"));
app.use(cookieParser());
app.use(bodyParser.json({ limit: "500mb" }));
app.use(bodyParser.json());

//ROUTES
app.use("/v1/ProductCategories", ProductCategoriesRoute);
app.use("/v1/Product", ProductRoute);
app.use('/v1/User', UserRoute);
app.use('/v1/Cart', CartRoute);
app.use('/v1/Order', OrderRoute);
app.use('/v1/Image', ImageRoute);
app.use('/v1/Payment', Pay);
app.use('/v1/DiscountCode', DiscountCodeRoutes);
app.use('/v1/Review',Review );



app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
