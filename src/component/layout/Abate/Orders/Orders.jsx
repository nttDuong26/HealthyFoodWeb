import React, { useEffect, useState } from 'react';
import axios from 'axios';
import  GetDataFromLocalStorage  from '../../body/getLocalStorage/getLocalStorage';
import './Orders.css';
import Ga from './ASSETS/monga.png';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { Link } from 'react-router-dom';

export default function Orders() {

    const userData = GetDataFromLocalStorage('userData');
    const [cartItems, setCartItems] = useState([]);
    const totalAmount = cartItems.reduce((total, item) => total + parseFloat(item.product.giaSP), 0).toFixed(3); // Tổng giá trị của tất cả các mục trong giỏ hàng
    
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
    }, [userData.user._id]);


    const handleOrderPlacement = async () => {
        try {
            const orderData = {
                user: userData.user._id,
                products: cartItems.map(item => item.product._id),
                totalPrice: totalAmount,
                shippingAddress: 'Địa chỉ người nhận hàng', // Thay bằng địa chỉ thực của người nhận hàng
                paymentMethod: 'Thanh toán khi nhận hàng', // Hoặc 'Thanh toán trực tuyến' tùy thuộc vào giá trị của value trong RadioGroup
            };

            const response = await axios.post('http://localhost:3000/v1/Order/createOrder', orderData);
            console.log(response.data); // Log response từ server

            // Xử lý logic khi đặt hàng thành công, ví dụ như hiển thị thông báo hoặc chuyển hướng trang
        } catch (error) {
            console.error('Lỗi khi đặt hàng:', error);
            // Xử lý logic khi đặt hàng không thành công, ví dụ như hiển thị thông báo lỗi
        }
    };

  return (
    <div className ='Orders'>
        <div className="Orders-title">
            <span>Đơn hàng của bạn</span>
        </div>
        <div className="Orders-content">
            <div className="Orders-contents">
            {cartItems.map((item) => (
            <div className="Orders-product">
                <img src= {Ga} alt="monan-pic" className="Orders-pic" />
                <div className="Orders-product-span">
                    <span className="Orders-product-name">{item.product.tenSP}</span>
                    <span className="Orders-product-gia">{item.product.giaSP}</span>
                </div>
            </div>
        ))}
            </div>

            <div className="Orders-discount">
                <input type="text" className="discount-input" placeholder='Nhập mã giảm giá' />
                <button className="discount-btn">Áp dụng</button>
            </div>
            <div className="Orders-Provisional">
                <span >Tạm tính</span>
                <span className="Orders-Provisional-gia">{totalAmount}đ</span>
            </div>
            <div className="Orders-ships">
                <span className="Orders-ship">Phí vận chuyển</span>
            </div>
            <div className="Orders-Sum">
                <span>Tổng cộng</span>
                <span className="Orders-Sum-gia">{totalAmount}đ</span>
            </div>
            <div className="Orders-footer"> 
                <div className="back-Cart-icon">
                    <div className="back-icon"> <ArrowLeftIcon/></div>
                    <Link to = {"/cartshop"}
                        className="back-Cart">
                        Quay về giỏ hàng
                    </Link>
                </div>
                      <button className="Orders-footer-btn" onClick={handleOrderPlacement}>Đặt hàng</button>
            </div>
        </div>
    </div>
  )
}
