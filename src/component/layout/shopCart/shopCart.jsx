import React, { useEffect, useState } from 'react';
import Navbar from '../navbar/navbar.jsx';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Links from './shopCartLink/shopCartLink.jsx';
import './shopCart.css';
import Ga from './ASSETS/monga.png';
import { Link } from 'react-router-dom';
import  GetDataFromLocalStorage  from '../body/getLocalStorage/getLocalStorage.jsx';
// import CartForm from '../navbar/cart/CartForm/CartForm.jsx';
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';





export default function ShopCart() {


    const userData = GetDataFromLocalStorage('userData');
   
    const [cartItems, setCartItems] = useState([]);
    const [Countercart, setCountercart] = useState(1);


    useEffect(() => {
        async function fetchCartItems() {
            try {
                const response = await axios.get(`http://localhost:3000/v1/Cart/get/${userData.user._id}`, {
                    // params: {
                    //     userId: userData.user._id, // Thay USER_ID_HERE bằng ID của người dùng đã đăng nhập hoặc lấy từ state của LocalStorage
                    // }
                });
                setCartItems(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy giỏ hàng:', error);
            }
        }
        fetchCartItems();
    }, []);

    const handleRemoveItem = async (userId, cartId) => {
        try {
            const responseRe = await axios.delete(`http://localhost:3000/v1/Cart/putRe/${userId}/cart/${cartId}`);
            setCartItems(responseRe.data);
        } catch (error) {
            console.error('Lỗi khi xóa sản phẩm khỏi giỏ hàng:', error);
        }
    };
    

    // const DecreaseQuantityButton = ({ userId, cartId, onUpdateCart }) => {
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
        <div className='shopCart'>
            <div className="ProductDetails-nav">
                <Navbar/>
            </div>
            <div className="mainmenu-link">
                <Links/>
            </div>
            {isEmptyCart ? (
          <div className="ShopcartForm-Icon">
            <ProductionQuantityLimitsIcon />
            <span className="EmptyCart">Không có sản phẩm nào trong giỏ hàng</span>
        </div>
      ) : (
            <div className="shopCart-content">
                <div className="shopCart-title">
                    <span>Giỏ hàng của bạn</span>
                </div>
                <div className="shopCart-tbl-head">    
                    <table>
                        <thead>
                            <tr>
                                <th className="shopCart-tbl-th">Thông tin sản phẩm</th>
                                <th className="shopCart-tbl-th">Đơn giá</th>
                                <th className="shopCart-tbl-th">Số lượng</th>
                                <th className="shopCart-tbl-th">Thành tiền</th>
                            </tr>
                        </thead>
                        <tbody>
                            {cartItems.map(item => (
                                <tr key={item.product._id}>
                                    <td className='table-inf'>
                                        {/* <img src={item.product?.hinhanh} alt="mon-img" className="shopCart-tbl-main-pic"/> */}
                                        <img src={`http://localhost:3000/v1/Image/${item.product?.hinhanh}`} alt="monga" className="shopCart-tbl-main-pic"/>

                                        <div className="shopCart-tbl">
                                            <span className="shopCart-tbl-inf">{item.product.tenSP}</span>
                                            <button className="shopCart-tbl-dl" onClick={() => handleRemoveItem(userData.user._id, item._id)}>Xóa</button>
                                        </div>
                                    </td>
                                    <td className="shopCart-tbl-th">
                                        {item.product.giaSP}.000đ
                                    </td>
                                    <td className="shopCart-tbl-th">
                                        <div className="soluong-mon">
                                            <div className="soluong-monbtn">
                                                <button className="giam-sl" onClick={() => handleDecreaseQuantity(userData.user._id, item._id)}>-</button>
                                                <input type="value" className="sl" value={item.quantity} />
                                                <button className="tang-sl" onClick={() => handleIncreaseQuantity(userData.user._id, item._id)}>+</button>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="shopCart-tbl-th">
                                        <span className="thanhtien">{item.product.giaSP * item.quantity}.000đ</span>
                                    </td>
                                </tr>
                            ))}
                              {/* <CartForm cartItems={cartItems} /> */}
                        </tbody>
                    </table>
                    <div className="shopCart-price">
                        <div className="price-spn">
                            <span>Tổng tiền:</span>
                            <span className='sotien'>{calculateTotalPrice(cartItems)}.000đ</span>
                        </div>
                        <Link to="/abate">
                            <button className="shopCart-btn">
                                Đặt hàng
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
      )}
            <div className="shopCart-contentMB">
                <div className="shopCart-title">
                    <span>Giỏ hàng của bạn</span>
                </div>
                <div className="shopCart-tbl-headMB">    
                    <table>
                        {/* <thead>
                            <tr>
                                <th className="shopCart-tbl-th">Thông tin sản phẩm</th>
                                <th className="shopCart-tbl-th">Đơn giá</th>
                                <th className="shopCart-tbl-th">Số lượng</th>
                                <th className="shopCart-tbl-th">Thành tiền</th>
                            </tr>
                        </thead> */}
                        <tbody>
                            {cartItems.map(item => (
                                <tr key={item.product._id}>
                                    <td className='table-infMB'>
                                        {/* <img src={item.product?.hinhanh} alt="mon-img" className="shopCart-tbl-main-pic"/> */}
                                        <img src={`http://localhost:3000/v1/Image/${item.product?.hinhanh}`} alt="monga" className="shopCart-tbl-main-pic"/>
                                        <td className="shopCart-tbl-thMB">
                                            <span className="shopCart-tbl-infMB">{item.product.tenSP}</span>
                                            <div className="soluong-mon">
                                                <div className="soluong-monbtn">
                                                    <button className="giam-sl" onClick={() => handleDecreaseQuantity(userData.user._id, item._id)}>-</button>
                                                    <input type="value" className="sl" value={item.quantity} />
                                                    <button className="tang-sl" onClick={() => handleIncreaseQuantity(userData.user._id, item._id)}>+</button>
                                                </div>
                                            </div>
                                        </td>
     
                                    </td>
 
                                    <td className="shopCart-tbl-thMB">
                                        <div className="shopCart-tbl">  
                                            <button className="shopCart-tbl-dlMB" onClick={() => handleRemoveItem(userData.user._id, item._id)}>Xóa</button>
                                        </div>
                                        {item.product.giaSP}đ
                                    </td>
                                    
                                    {/* <td className="shopCart-tbl-th">
                                        <span className="thanhtien">{item.product.giaSP * item.quantity}đ</span>
                                    </td> */}
                                </tr>
                            ))}
                              {/* <CartForm cartItems={cartItems} /> */}
                        </tbody>
                    </table>
                    <div className="shopCart-priceMB">
                        <div className="price-spnMB">
                            <span>Tổng tiền:</span>
                            <span className='sotienMB'>{calculateTotalPrice(cartItems)}.000đ</span>
                        </div>
                        <Link to="/abate">
                            <button className="shopCart-btnMB">
                                Đặt hàng
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}    