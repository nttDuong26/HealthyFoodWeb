import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Link } from 'react-router-dom';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import GetDataFromLocalStorage from '../../body/getLocalStorage/getLocalStorage';
import SapXep from '../../mainMenu/SortBy/SortBy';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import IconButton from '@mui/material/IconButton';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Links from '../../mainMenu/Links/Links';
import axios from 'axios';
import ImageNotSupportedOutlinedIcon from '@mui/icons-material/ImageNotSupportedOutlined';
import ErrorOutlinedIcon from '@mui/icons-material/ErrorOutlined';


const ResultSearch = () => {
  const location = useLocation();
  const searchResults = location.state && location.state.searchResults;
  const [IsOpen, setIsOpen] = useState(false);
  const [value1, setValue1] = useState('')
  const [value3, setValue3] = useState('')
  const [getIsProductDetail, setGetIsProductDetail] = useState([]);
  const [getIsOneProductDetail, setGetIsOneProductDetail] = useState([]);
  const [originalProducts, setOriginalProducts] = useState([]);
  const [displayedProducts, setDisplayedProducts] = useState(6); // Số lượng sản phẩm hiển thị mỗi lần
  const [totalProducts, setTotalProducts] = useState(0); // Tổng số lượng sản phẩm

  const handleChange1 = (event, newValue1) => {
      setValue1(newValue1);
  };
 
  const   handleChangeGia = (event, newValue3) => {
      setValue3(newValue3);
  };
  const scrollToTopChitietsp = () => {
    window.scrollTo(0, 0);
  };
  const handleSXClick =(e) =>{
    e.stopPropagation();
    setIsOpen(!IsOpen);
}

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
          alert('Vui lòng đăng nhập để thêm món ăn vào giỏ hàng');

      } catch (error) {
          console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
      }
  };

  useEffect(() => {
    filterProducts(value3);
  }, [value3]);

  
useEffect(() => {

    filterByCalories(value1);
  }, [  value1]);
  
  const resetFilter = () => {
    setDisplayedProducts(6);
    setTotalProducts(originalProducts.length);
    setGetIsProductDetail(originalProducts);
    setValue3(''); // Đặt giá trị filter về trạng thái mặc định
    setValue1('');
  };

const filterProducts = (selectedValue) => {
    let filteredProducts = originalProducts;

if (selectedValue) {
filteredProducts = originalProducts.filter((product) => {
      switch (selectedValue) {
        case 'gia1':
          return product.giaSP < 50;
        case 'gia2':
          return product.giaSP >= 50 && product.giaSP <= 100;
        case 'gia3':
          return product.giaSP > 100 && product.giaSP <= 200;
        case 'gia4':
          return product.giaSP > 200;
        default:
          return getIsProductDetail;
      }
    });
}
    setDisplayedProducts(6); 
    setGetIsProductDetail(filteredProducts);
    setTotalProducts(filteredProducts.length);
  };

  const filterByCalories = (selectedValueFilter) => {
    let filteredByCalories = originalProducts;

if (selectedValueFilter) {
filteredByCalories = originalProducts.filter((product) => {
      switch (selectedValueFilter) {
        case 'ít':
            return  product.calo < 100;
        case 'vddeu':
            return  product.calo >= 100 && product.calo <= 300;
        case 'vdnhieu':
            return product.calo > 300 && product.calo <= 500;
        case 'chuyennghiep':
            return product.calo > 500
        default:
          return getIsProductDetail;
      }
    });
}
    setDisplayedProducts(6); 
    setGetIsProductDetail(filteredByCalories);
    setTotalProducts(filteredByCalories.length);
  };


return (
  <div className ='mainmenu'>
         
          <div className="mainmenu-nav">
              {/* <Navbar/> */}
          </div>
          <div className="mainmenu-link">
              <Links/>
          </div>
          <div className="mainmenu_content">
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
                                          onChange={(e) => handleChangeGia(e, e.target.value)}
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
                           

                          </ul>
                          <div className="chon-btn">
                                    <button type = 'submit' className="chon"  onClick={resetFilter}>Đặt lại</button>
                                </div>
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
                                          onChange={(e) => handleChange1(e, e.target.value)}
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
                                    <button type = 'submit' className="chon"  onClick={resetFilter}>Đặt lại</button>
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
                          <span>Tất cả món ăn</span> 
                          {/* <div className="sapxep">
                              <span>Sắp xếp</span>
                              <IconButton onClick={handleSXClick}>
                                  {IsOpen ? <ExpandLessIcon sx ={{color: 'white'}} /> : <ExpandMoreIcon sx ={{color: 'white'}} />}
                              </IconButton>
                              {IsOpen && (
                                  <SapXep/>
                              )}
                              
                          </div> */}
                      </div>
                      <div className="right">
                      { searchResults && searchResults.length > 0 ? (
                        <div style = {{ display: 'flex'}}>
                        {searchResults &&  searchResults.map((product) => (
                          <div className="FeaturedProducts-sp" key = {product._id}  style = {{margin: '1vw 12px 3vw 12px'}}>
                              <div className="FeaturedProductsHinh" >
                                  {/* <img src={Ga} alt="" /> */}
                          <img src={`http://localhost:3000/v1/Image/${product?.hinhanh}`} alt="monga"  />
                          {/* <div className="overlay">
                              <span className="cartIcon"><AddShoppingCartOutlinedIcon/></span>
                          </div> */}
                           {product.trangthai ? (
                                  <div className="overlay" onClick={() => addToCart(product._id)} >
                                      <span className="cartIcon"><AddShoppingCartOutlinedIcon /></span>
                                  </div>
                                  ) : (
                                      <div className="overlay" onClick={() => addToCart(product._id)} >
                                      <span className="cartIcon" >Hết</span>
                                  </div>
                                  
                              )}
                              </div>
                             
                              <div className="FeaturedProductsTen">
                                  <span> {product.tenSP}</span>
                              </div>
                              <div className="FeaturedProductsGia">
                                  <span>{product.giaSP}.000đ</span>
                              </div>
                              <div className="FeaturedProductsXem">
                                  <Link to = {`/ProductDetails/${product._id}`}onClick ={scrollToTopChitietsp}>
                                      <button> Xem Chi Tiết</button>
                                  </Link>
                              </div>
                          </div>
                          )) }
                          </div>
                          ):(
                            <div className="no-results-message" style = {{
                              color: '#fff',
                             padding: '0 20vw',
                             display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'center',
                            alignItems: 'center',
                             }}>
                              <div style = {{
                                padding: '5vw 0 0 0 ',
                                }}>
                                  <ErrorOutlinedIcon/>
                              </div>
                              <h2>Không tìm thấy sản phẩm</h2>
                              <p>Xin vui lòng thử lại với từ khóa tìm kiếm khác.</p>
                          </div>
                          )}
                      </div>
                      

                  </div>
              </div>

          </div>
  </div>
)
}

export default ResultSearch;
