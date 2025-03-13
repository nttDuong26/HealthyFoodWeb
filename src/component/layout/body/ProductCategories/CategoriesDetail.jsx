// CategoryDetails.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import {  Link } from 'react-router-dom';
import Links from '../../mainMenu/Links/Links';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import GetDataFromLocalStorage from '../../body/getLocalStorage/getLocalStorage';
import Button from '@mui/material/Button';
import './ProductCategories.css';


const CategoryDetails = () => {
 const { id } = useParams();
 const [category, setCategory] = useState(null);
 const [productDetail, setProductDetail] = useState(null);
 const [isLoading, setIsLoading] = useState(true);
 const [products, setProducts] = useState([]);
 const [displayedProducts, setDisplayedProducts] = useState(6); // Số lượng sản phẩm hiển thị mỗi lần
const [totalProducts, setTotalProducts] = useState(0); // Tổng số lượng sản phẩm
const [loadMore, setLoadMore] = useState(false)
const [getIsProductDetail, setGetIsProductDetail] = useState([]);
const [getIsOneProductDetail, setGetIsOneProductDetail] = useState([]);
const [originalProducts, setOriginalProducts] = useState([]);

 const [value1, setValue1] = React.useState(0);
 const [value3, setValue3] = React.useState(0);

 const handleChange1 = (event, newValue1) => {
     setValue1(newValue1);
 };

 const   handleChangeGia = (event, newValue3) => {
     setValue3(newValue3);
 };
    

 useEffect(() => {
  async function fetchCategoryDetail() {
    try {
      const response = await axios.get(`http://localhost:3000/v1/ProductCategories/${id}`);
      setCategory(response.data);
      setGetIsProductDetail(response.data);

      if (response.data.product && response.data.product.length > 0) {
        const productIds = response.data.product;
        const productResponses = await Promise.all(productIds.map(productId => axios.get(`http://localhost:3000/v1/Product/${productId}`)));
        const productData = productResponses.map(response => response.data);
        setProducts(productData);
        setTotalProducts(productData.length); // Cập nhật tổng số lượng sản phẩm
      }
      setIsLoading(false);
    } catch (error) {
      console.error('Lỗi khi gọi API:', error);
      setIsLoading(false);
    }
  }
  fetchCategoryDetail();
}, [id]);


 const userData = GetDataFromLocalStorage('userData');
 const [cartCount, setCartCount] = useState(0);
 const [Counter, setCounter] = useState(1)


 const addToCart = async (productId) => {
  try {
      if (userData) {
          const response = await axios.post(`http://localhost:3000/v1/Cart/add`, {
              userId: userData.user._id,
              productId: productId,
              quantity: Counter,
          });
          console.log(response.data);
          // console.log('Them dc r fen');
          
          setCartCount(cartCount + Counter);
          alert('Thêm giỏ hàng thành công');
          
          // window.location.href = '/';
      } else {
          // Xử lý khi không có thông tin người dùng, có thể chuyển hướng đến trang đăng nhập
          console.log('Không có thông tin người dùng');
      }
  } catch (error) {
      console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
  }
};
const resetFilter = () => {
    setDisplayedProducts(8);
    setTotalProducts(originalProducts.length);
    setGetIsProductDetail(originalProducts);
    setValue3(''); // Đặt giá trị filter về trạng thái mặc định
    setValue1('');
  };
 return (
  <div>
        <div className="mainmenu-link">
          <Links/>
      </div>
      
      <div className='mainmenu_content'>
      <div className="mainmenu_content-left">
                    <div className="content-left">
                        <div className="content-left-title">Chọn mức giá</div>
                        <nav className="content-left-product">
                            <ul className = "content-left-nav">
                                <li className="nav-item ">
                                    {/* <a title="Trang chủ" className="nav-link" href="/">Trang chủ</a> */}
                                    <FormControl>
                                        <RadioGroup
                                            sx={{color:'white' }}
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            value={value3}
                                            onChange={handleChangeGia}
                                        >
                                            <FormControlLabel value="gia1" control={<Radio
                                                sx={{
                                                    color: 'white', // Thay đổi màu tại đây
                                                    '&.Mui-checked': {
                                                    color: '#d69c52', // Thay đổi màu khi nút radio được chọn
                                                    },
                                                }}
                                                />} label="Dưới 50.000d"  />
                                            <FormControlLabel value="gia2" control={<Radio
                                                sx={{
                                                    color: 'white', // Thay đổi màu tại đây
                                                    '&.Mui-checked': {
                                                    color: '#d69c52', // Thay đổi màu khi nút radio được chọn
                                                    },
                                                }}
                                                />} label="Từ 50.000d - 100.000d"  />
                                            <FormControlLabel value="gia3" control={<Radio   sx={{
                                                    color: 'white', // Thay đổi màu tại đây
                                                    '&.Mui-checked': {
                                                    color: '#d69c52', // Thay đổi màu khi nút radio được chọn
                                                    },
                                                }}/>} label="Từ 100.000d - 200.000d" />
                                                <FormControlLabel value="gia4" control={<Radio   sx={{
                                                    color: 'white', // Thay đổi màu tại đây
                                                    '&.Mui-checked': {
                                                    color: '#d69c52', // Thay đổi màu khi nút radio được chọn
                                                    },
                                                }}/>} label="Trên 200.000d" />
                                        </RadioGroup>
                                        </FormControl>
                                </li>
                                <div className="chon-btn">
                                    <button type = 'submit' className="chon" onClick ={resetFilter}>Đặt lại</button>
                                </div>

                            </ul>
                        </nav>
                    </div>
                    <div className="content-left">
                        <div className="content-left-title">Chọn khoảng năng lượng</div>
                            <nav className="content-left-inf">
                                <ul className="tuoi">
                                    <li className="vandong">
                                        <FormControl>
                                        <RadioGroup
                                            aria-labelledby="demo-controlled-radio-buttons-group"
                                            name="controlled-radio-buttons-group"
                                            value={value1}
                                            onChange={handleChange1}
                                        >
                                            <FormControlLabel value="ít" control={<Radio   sx={{
                                                    color: 'white', // Thay đổi màu tại đây
                                                    '&.Mui-checked': {
                                                    color: '#d69c52', // Thay đổi màu khi nút radio được chọn
                                                    },
                                                }} />} label="Dưới 100 calo" />
                                           
                                            <FormControlLabel value="vddeu" control={<Radio   sx={{
                                                    color: 'white', // Thay đổi màu tại đây
                                                    '&.Mui-checked': {
                                                    color: '#d69c52', // Thay đổi màu khi nút radio được chọn
                                                    },
                                                }} />} label="Tù 100 calo - 300 calo" />
                                            <FormControlLabel value="vdnhieu" control={<Radio   sx={{
                                                    color: 'white', // Thay đổi màu tại đây
                                                    '&.Mui-checked': {
                                                    color: '#d69c52', // Thay đổi màu khi nút radio được chọn
                                                    },
                                                }}/>} label="Từ 300 calo - 500 calo " />
                                            <FormControlLabel value="chuyennghiep" control={<Radio   sx={{
                                                    color: 'white', // Thay đổi màu tại đây
                                                    '&.Mui-checked': {
                                                    color: '#d69c52', // Thay đổi màu khi nút radio được chọn
                                                    },
                                                }}/>} label=" Trên 500 calo" />
                                        </RadioGroup>
                                        </FormControl>
                                    </li>
                                </ul>
                                <div className="chon-btn">
                                    <button type = 'submit' className="chon" onClick ={resetFilter}>Đặt lại</button>
                                </div>
                            </nav>
                    </div>
                </div>
                <label className="nav_content-leftMBopen"  htmlFor="nav_content-leftMB-inputt">
                {/* <FilterAltIcon sx={{ width: '15vw', height: '5vw', color: '#d69c52' }} /> */}
                {/* <img src="bizweb.dktcdn.net/100/469/097/themes/882205/assets/icon-filter-bg.png?1680244293674" alt="" className="" /> */}
            </label>
           <input type="checkbox" hidden className="nav_content-leftMBopenIP" id = "nav_content-leftMB-inputt" />
            <label class="nav_content-leftMBOverlay" htmlFor="nav_content-leftMB-inputt"></label>

            <div className="mainmenu_content-leftMB">
            <label className="nav_content-leftMBClose"htmlFor="nav_content-leftMB-inputt" >
                    {/* <CloseOutlinedIcon /> */}
            </label>
            <div className="content-leftMB">
                        <div className="content-left-title">Danh mục</div>
                        <nav className="content-left-product">
                            <ul className = "content-left-nav">
                                <li className="nav-item ">

                                    <a title="Giới thiệu" className="nav-link" href="/">Giới thiệu</a>
                                </li>
                                <li className="nav-item3 ">
                                    
                                        <a title="Thực đơn" arrow className="nav-link" href="#">
                                            Thực đơn
                                        </a>
                                      
                                <li className="nav-item4 ">
                                    <a title=" Khuyến mãi" className="nav-link" href="/">Khuyến mãi</a>
                                </li>
                                <li className="nav-item ">
                                    <a title=" Cẩm nang" className="nav-link" href="/">Kiểm tra</a>
                                </li>
                                <li className="nav-item ">
                                    <a title=" Liên hệ" className="nav-link" href="/">Liên hệ</a>
                                </li>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="content-leftMB">
                        <div className="content-left-title">Chọn mức giá</div>
                        <nav className="content-left-product">
                            <ul className = "content-left-nav">
                                <li className="nav-item ">
                                    {/* <a title="Trang chủ" className="nav-link" href="/">Trang chủ</a> */}
                                    <FormControl>
                                        <RadioGroup
                                            sx={{color:'white' }}
                                            row
                                            aria-labelledby="demo-row-radio-buttons-group-label"
                                            name="row-radio-buttons-group"
                                            value={value3}
                                            onChange={handleChangeGia}
                                        >
                                            <FormControlLabel value="gia1" control={<Radio
                                                sx={{
                                                    color: 'white', // Thay đổi màu tại đây
                                                    '&.Mui-checked': {
                                                    color: '#d69c52', // Thay đổi màu khi nút radio được chọn
                                                    },
                                                }}
                                                />} label="Dưới 50.000d"  />
                                            <FormControlLabel value="gia2" control={<Radio
                                                sx={{
                                                    color: 'white', // Thay đổi màu tại đây
                                                    '&.Mui-checked': {
                                                    color: '#d69c52', // Thay đổi màu khi nút radio được chọn
                                                    },
                                                }}
                                                />} label="Từ 50.000d -- 100.000d"  />
                                                  <FormControlLabel value="gia3" control={<Radio   sx={{
                                                    color: 'white', // Thay đổi màu tại đây
                                                    '&.Mui-checked': {
                                                    color: '#d69c52', // Thay đổi màu khi nút radio được chọn
                                                    },
                                                }}/>} label="Từ 100.000d -- 200.000d" />
                                                <FormControlLabel value="gia4" control={<Radio   sx={{
                                                    color: 'white', // Thay đổi màu tại đây
                                                    '&.Mui-checked': {
                                                    color: '#d69c52', // Thay đổi màu khi nút radio được chọn
                                                    },
                                                }}/>} label="Trên 200.000d" />
                                        </RadioGroup>
                                        </FormControl>
                                </li>
                            </ul>
                        </nav>
                    </div>
                    <div className="content-leftMB">
                        <div className="content-left-title">Chọn khoảng năng lượng</div>
                            <nav className="content-left-inf">
                                <ul className="tuoi">
                                    <li className="vandong">
                                        <FormControl>
                                        <RadioGroup
                                            aria-labelledby="demo-controlled-radio-buttons-group"
                                            name="controlled-radio-buttons-group"
                                            value={value1}
                                            onChange={handleChange1}
                                        >
                                            <FormControlLabel value="ít" control={<Radio   sx={{
                                                    color: 'white', // Thay đổi màu tại đây
                                                    '&.Mui-checked': {
                                                    color: '#d69c52', // Thay đổi màu khi nút radio được chọn
                                                    },
                                                }} />} label="Dưới 100 calo" />
                                           
                                            <FormControlLabel value="vddeu" control={<Radio   sx={{
                                                    color: 'white', // Thay đổi màu tại đây
                                                    '&.Mui-checked': {
                                                    color: '#d69c52', // Thay đổi màu khi nút radio được chọn
                                                    },
                                                }} />} label="Tù 100 calo -- 300 calo" />
                                            <FormControlLabel value="vdnhieu" control={<Radio   sx={{
                                                    color: 'white', // Thay đổi màu tại đây
                                                    '&.Mui-checked': {
                                                    color: '#d69c52', // Thay đổi màu khi nút radio được chọn
                                                    },
                                                }}/>} label="Từ 300 calo -- 500 calo " />
                                            <FormControlLabel value="chuyennghiep" control={<Radio   sx={{
                                                    color: 'white', // Thay đổi màu tại đây
                                                    '&.Mui-checked': {
                                                    color: '#d69c52', // Thay đổi màu khi nút radio được chọn
                                                    },
                                                }}/>} label=" Trên 500 calo" />
                                        </RadioGroup>
                                        </FormControl>
                                    </li>
                                </ul>
                                <div className="chon-btn">
                                    <button type = 'submit' className="chon">Chọn</button>
                                </div>
                            </nav>
                    </div>

                </div>
        <div className="mainmenu_content-right">
          <div className="content-right">
                          
          <div className="content-right-title">
            {category && ( 
              <span>Món ăn thuộc: {category.tenDM}  </span> 
            )}          
          </div>
              <div  className = 'right'>
                {products.length > 0 ? (
                  products
                    .filter(product => product.categories.includes(category._id))
                    .slice(0, displayedProducts)
                    .map(product => (
                      <div key={product._id} style = {{    margin:' 0 1vw 2vw 1vw'}}>
                        
                        <div className="FeaturedProducts-sp" >
                          <div className="FeaturedProductsHinh">
                            <img src={`http://localhost:3000/v1/Image/${product?.hinhanh}`} alt="Hình ảnh sản phẩm" />
                                <div className="overlay" onClick={() => addToCart(product._id)} >
                                    <span className="cartIcon"><AddShoppingCartOutlinedIcon /></span>
                                </div>
                          </div>
                         
                          <div className="FeaturedProductsTen">
                            <span>{product.tenSP}</span>
                          </div>
                          <div className="FeaturedProductsGia">
                            <span>{product.giaSP}.000đ</span>
                          </div>
                          <div className="FeaturedProductsXem">
                            <Link to={`/ProductDetails/${product._id}`}>
                              <button>Xem Chi Tiết</button>
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))
                ) : (
                  <li>Không có sản phẩm</li>
                )}
               
              </div>
              {displayedProducts < totalProducts && (
                  <div  className="signin-line__line1" style = {{fontStyle: 'italic', color: '#d69c52',  backgroundColor: 'transparent', border: 'none'}} onClick={() => setDisplayedProducts(prev => prev + 5)}>
                    Xem thêm 
                  </div>
                )}
                 
            </div>
          </div>
      </div>
      
  </div>
);
}


export default CategoryDetails;
