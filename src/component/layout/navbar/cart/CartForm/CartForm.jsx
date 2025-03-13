import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './CartForm.css';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import ShopCart from '../../../shopCart/shopCart';
import GetDataFromLocalStorage from '../../../body/getLocalStorage/getLocalStorage';

export default function CartForm({ cartItems, setCartItems }) {
  const userData = GetDataFromLocalStorage('userData');
  const [Countercart, setCountercart] = useState(1);

  useEffect(() => {
    async function fetchCartItems() {
      try {
        const response = await axios.get(`http://localhost:3000/v1/Cart/get/${userData.user._id}`);
        setCartItems(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy giỏ hàng:', error);
      }
    }
    fetchCartItems();
  }, []);

  const handleAddToCart = async (productId) => {
  try {
    // Thực hiện thêm sản phẩm vào giỏ hàng
    const response = await axios.post(`http://localhost:3000/v1/Cart/add/${userData.user._id}`, {
      productId: productId,
      quantity: 1,
    });

    // Cập nhật giỏ hàng với dữ liệu mới
    setCartItems(response.data);
  } catch (error) {
    console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
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

  const handleDecreaseQuantity = async (userId, cartId) => {
    try {
      const response = await axios.put(`http://localhost:3000/v1/Cart/putde/${userId}/cart/${cartId}`);
      setCartItems(response.data);
    } catch (error) {
      console.error('Lỗi khi giảm số lượng sản phẩm trong giỏ hàng:', error);
    }
  };

  const handleIncreaseQuantity = async (userId, cartId) => {
    try {
      const responseIn = await axios.put(`http://localhost:3000/v1/Cart/putin/${userId}/cart/${cartId}`);
      setCartItems(responseIn.data);
    } catch (error) {
      console.error('Lỗi khi tăng số lượng sản phẩm trong giỏ hàng:', error);
    }
  };

  const calculateTotalPrice = (cartItems) => {
    return cartItems.reduce((total, item) => total + item.product.giaSP * item.quantity, 0);
  };

  const isEmptyCart = cartItems && cartItems.length === 0;

  return (
    <div className="CartForm">
      {isEmptyCart ? (
        <div className="cartForm-Icon" style = {{display: 'flex'}}>
          <ProductionQuantityLimitsIcon />
          <span className="EmptyCart">Giỏ hàng rỗng</span>
        </div>
      ) : (
        <div>
          {cartItems && cartItems.map(item => (
            <div key={item.product._id}  style={{
              display: 'flex',
              // margin: '1vw',
              alignItems: 'center',
              justifyConten: 'center'
            }}>
              <div className='tableCart-inf' style={{
                display: 'flex',
                margin: '1vw',
                alignItems: 'center',
                // justifyConten: 'center'
              }}>
                <img src={`http://localhost:3000/v1/Image/${item.product?.hinhanh}`} alt="mon-img" className="shopCart-tbl-main-pic" />
                <div className="shopCart-tbl">
                  <span className="shopCart-tbl-inf">{item.product.tenSP}</span>
                </div>
                <div className="shopCart-tbl">
                <span className="shopCart-tbl-inf">{item.product.giaSP}.000đ</span>
                </div>
                <div className="shopCart-tbl">
                <span className="shopCart-tbl-inf">x{item.quantity}</span>
                </div>

              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
