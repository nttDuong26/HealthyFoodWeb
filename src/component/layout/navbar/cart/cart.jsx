import React, { useEffect, useState } from 'react';
import './cart.css';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Tooltip from '@mui/material/Tooltip';
import CartForm from './CartForm/CartForm.jsx';
import GetDataFromLocalStorage from '../../body/getLocalStorage/getLocalStorage';
import { Badge, Space  } from 'antd';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import axios from 'axios';
import ShopCart from '../../shopCart/shopCart.jsx';


// Import các thư viện và component cần thiết

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);
  const [cartItemCount, setCartItemCount] = useState(0);
  const [isOpenCart, setisOpenCart] = useState(false);
  const userData = GetDataFromLocalStorage('userData');
  const [isLoggedIn, setIsLoggedIn] = useState(!!userData);

  const handleCartMouseEnter = () => {
    if (isLoggedIn) {
      setisOpenCart(true);
    }
  };

  const handleCartMouseLeave = () => {
    setisOpenCart(false);
  };

  const handleCartClick = () => {
    if (isLoggedIn) {
      setisOpenCart(true);
    } else {
      alert("Vui lòng đăng nhập để xem giỏ hàng!");
      setisOpenCart(false);
    }
  };
  const handleRemoveItem = async (userId, cartId) => {
    try {
      const responseRe = await axios.delete(`http://localhost:3000/v1/Cart/putRe/${userId}/cart/${cartId}`);
      setCartItems(responseRe.data);
    } catch (error) {
      console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
    }
  };
  useEffect(() => {
    setCartItemCount(cartItems.length);
  }, [cartItems]);


  return (
    <div className="Cart"
      onClick={handleCartClick}
      onMouseEnter={handleCartMouseEnter}
      onMouseLeave={handleCartMouseLeave}>
      <Tooltip title="Giỏ hàng" arrow>
        <div className="cartclick">
          <Badge count={cartItemCount}>
            <ShoppingCartOutlinedIcon style={{ color: '#fff' }} />
          </Badge>
        </div>
      </Tooltip>
      {isOpenCart && isLoggedIn && (
        <div className="cart-content">
{/*       
            {cartItems.length > 0 ? (
              <div>
                {cartItems.map((item, index) => (
                  <div key={index}>
                    <div className='tableCart-inf' style={{
                          display: 'flex',
                          margin: '1vw',
                          alignItems: 'center'
                        }}>
                          <img src={`http://localhost:3000/v1/Image/${item.product?.hinhanh}`} alt="mon-img" className="shopCart-tbl-main-pic" />
                          <div className="shopCart-tbl">
                            <span className="shopCart-tbl-inf">{item.product.tenSP}</span>
                          </div>
                          <span className="shopCart-tbl-inf">{item.product.giaSP}</span>
                          <span className="shopCart-tbl-inf">x{item.quantity}</span>
                        </div>
                  </div>
                ))}
              </div>
            ) : ( */}
              <CartForm cartItems={cartItems} setCartItems={setCartItems}  />
              
            {/* )} */}
        </div>
      )}
    </div>
  );
};

export default Cart;

