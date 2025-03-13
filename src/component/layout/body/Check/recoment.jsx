import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './check.css';
import axios from 'axios';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import {  Link } from 'react-router-dom';
import GetDataFromLocalStorage from '../getLocalStorage/getLocalStorage';


const BMI_CATEGORY = {
  UNDERWEIGHT: 'Thiếu cân',
  NORMAL: 'Cân đối',
  OVERWEIGHT: 'Thừa cân',
  OBESE: 'Béo phì',
};

const ResultComponent = () => {
  const location = useLocation();
  const result = location.state && location.state.result;
  const formData = location.state && location.state.formData;
 
  const scrollToTopChitietsp = () => {
    window.scrollTo(0, 0);
  };

 
  const getBMICategory = (bmi) => {
    if (bmi < 18.5) {
      return BMI_CATEGORY.UNDERWEIGHT;
    } else if (bmi < 24.9) {
      return BMI_CATEGORY.NORMAL;
    } else if (bmi < 29.9) {
      return BMI_CATEGORY.OVERWEIGHT;
    } else {
      return BMI_CATEGORY.OBESE;
    }
  };

  useEffect(() => {
    console.log('Result in ResultComponent', result);
  }, [result]);
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
  return (
    <div style = {{backgroundColor: '#143b36', display: 'flex'}}>
    <div className="resultContent" style = {{paddingTop: '10vw'}}>
        <div className="content-left-title">Kết quả kiểm tra</div>
            <nav className="content-left-product">
                <ul className = "content-left-nav"  style = {{padding: '0.8vw 1.5vw 0.4vw 2vw '}} >
                    
                 {result && result.bmr && result.tdee && result.bmi && result.suggestedCalories && (
                  <>
                    {/* <h2>Kết quả:</h2> */}
                    <p style={{ fontStyle: 'italic' }} >Chỉ số khối cơ thể (BMI) của bạn:</p><h3 style ={{ color:'#d69c52', border: '1px solid #d69c52', borderRadius: '5px', padding: '0.5vw', marginLeft:'70%', display: 'flex', justifyContent: 'center'}}> {result.bmi.toFixed(2)}</h3>
                    <p style={{ fontStyle: 'italic' }}>Kết quả cho thấy bạn thuộc nhóm cơ thể:</p><h3 style ={{ color:'#d69c52', border: '1px solid #d69c52', borderRadius: '5px', padding: '0.5vw', marginLeft:'60%', display: 'flex', justifyContent: 'center'}} > {getBMICategory(result.bmi)}</h3> {/* Display BMI Category */}
                    <p style={{ fontStyle: 'italic' }}>Hệ số trao đổi chất cơ bản (BMR) của bạn:</p><h3 style ={{ color:'#d69c52', border: '1px solid #d69c52', borderRadius: '5px', padding: '0.5vw', marginLeft:'70%', display: 'flex', justifyContent: 'center'}} > {result.bmr.toFixed(2)}</h3>
                    <p style={{ fontStyle: 'italic' }}>Chỉ số năng lượng cần thiết trong ngày (TDEE) bạn cần cho cơ thể:</p><h3 style ={{ color:'#d69c52', border: '1px solid #d69c52', borderRadius: '5px', padding: '0.5vw', marginLeft:'70%', display: 'flex', justifyContent: 'center'}} > {result.tdee.toFixed(2)}</h3>
                    <p style={{ fontStyle: 'italic', display: 'inline'}}>Năng lượng (calories) bạn cần nạp trong ngày để phù hợp với nhu cầu: <span  style ={{ color:'#d69c52'}}>{formData.nhucau}</span > của bạn:</p><h3 style ={{ color:'#d69c52', border: '1px solid #d69c52', borderRadius: '5px', padding: '0.5vw', marginLeft:'70%', display: 'flex', justifyContent: 'center'}} > {result.suggestedCalories.toFixed(2)}</h3>
                    {/* <p>Calories Suggested: {result.suggestedCalories.toFixed(2)}</p> */}
                  </>
                )}

                </ul>
            </nav>
    </div>
    <div className="right1" style = {{marginTop:'6vw', backgroundColor: '#143b36'}}>
      <p className="content-right-title" >Các combo món ăn gợi ý dành cho bạn</p>
      {result &&
        result.mealCombos &&
        result.mealCombos.map((combo, index) => (
          <div  key={index} >
            <div className="" >
              <h3  style = {{display: 'flex', color: '#fff'}} >Combo {index + 1}: 
                <p style = {{color: '#d69c52'}} >Tổng calo: {combo.totalCalories}</p>
              </h3>
            </div>
            <div style ={{ display: 'flex',
                          flexWrap: 'wrap',
                          alignItems: 'center',
                          margin: '0 10px'
                        }}>
            <div className="FeaturedProducts-sp" style = {{margin: '1vw 12px 3vw 12px'}}>
              <div className="FeaturedProductsHinh">                
                  <img src={`http://localhost:3000/v1/Image/${combo.mainDish.hinhanh}`} alt="monga"  />
                  <div className="overlay" onClick={() => addToCart(combo.mainDish._id)} >
                    <span className="cartIcon"><AddShoppingCartOutlinedIcon /></span>
                </div>
                </div>
                <div className="FeaturedProductsTen">
                  <p> {combo.mainDish.tenSP}</p>
                </div>
                <div className="FeaturedProductsGia">
                  <p> {combo.mainDish.giaSP}.000đ</p>
                </div>
                <div className="FeaturedProductsXem">
                    <Link to={`/ProductDetails/${combo.mainDish._id}`} onClick={scrollToTopChitietsp}>
                        <button> Xem Chi Tiết</button>
                    </Link>
                  </div>
            </div>
            <div className="FeaturedProducts-sp" style = {{margin: '1vw 12px 3vw 12px'}} >
              <div className="FeaturedProductsHinh">
                  <img src={`http://localhost:3000/v1/Image/${combo.appetizer.hinhanh}`} alt="monga"  />
                  <div className="overlay" onClick={() => addToCart(combo.appetizer._id)} >
                    <span className="cartIcon"><AddShoppingCartOutlinedIcon /></span>
                </div>
              </div>
              <div className="FeaturedProductsTen">
                <p> {combo.appetizer.tenSP}</p>
              </div>
            <div className="FeaturedProductsGia">
              <p> {combo.appetizer.giaSP}.000đ</p>
            </div>
            <div className="FeaturedProductsXem">
              <Link to={`/ProductDetails/${combo.appetizer._id}`} onClick={scrollToTopChitietsp}>
                <button> Xem Chi Tiết</button>
              </Link>
            </div>

    </div>
        <div className="FeaturedProducts-sp" style = {{margin: '1vw 12px 3vw 12px'}} >
          <div className="FeaturedProductsHinh">
              <img src={`http://localhost:3000/v1/Image/${combo.dessert.hinhanh}`} alt="monga"  />
              <div className="overlay" onClick={() => addToCart(combo.dessert._id)} >
                  <span className="cartIcon"><AddShoppingCartOutlinedIcon /></span>
              </div>
          </div>
          <div className="FeaturedProductsTen">
              <p>{combo.dessert.tenSP}</p>
          </div>
          <div className="FeaturedProductsGia">
              <p>{combo.dessert.giaSP}.000đ</p>
          </div>
          <div className="FeaturedProductsXem">
            <Link to={`/ProductDetails/${combo.dessert._id}`} onClick={scrollToTopChitietsp}>
              <button> Xem Chi Tiết</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
        ))}
  </div>
</div>

  );
};




export default ResultComponent;
