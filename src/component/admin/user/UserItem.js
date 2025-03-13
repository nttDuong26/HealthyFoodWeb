import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GetDataFromLocalStorage from '../../layout/body/getLocalStorage/getLocalStorage';

export default function UserDetail({ setIsUserItemPage, setIsModalUser, id }) {
  const [userDetail, setUserDetail] = useState(null);
  const [userOrders, setUserOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userData = GetDataFromLocalStorage('userData');
  const userId = userData.user._id;

  useEffect(() => {
    async function fetchUserDetail() {
      try {
        // Gọi API để lấy thông tin người dùng
        const userResponse = await axios.get(`http://localhost:3000/v1/User/getuserItem/${id}`);
        setUserDetail(userResponse.data);

        // Gọi API để lấy lịch sử đơn hàng của người dùng
        const orderResponse = await axios.get(`http://localhost:3000/v1/Order/user/${id}/order`);
        setUserOrders(orderResponse.data);
        console.log(orderResponse.data);
        setIsLoading(false);
        setIsUserItemPage(true);
        setIsModalUser();
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        setIsLoading(false);
      }
    }

    fetchUserDetail();
  }, [id, setIsUserItemPage, setIsModalUser]);

  return (
    <div>
      {isLoading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div>
          <h2 style = {{color: '#776B5D'}} >TÊN KHÁCH HÀNG: {userDetail.tenND}</h2>
          <p>Số điện thoại: {userDetail.sdt}</p>
          <p>Ngày tạo: {userDetail.lastAccessedAt}</p>

          {userOrders.length > 0 ? (
            <div>
              <h3 style = {{color: '#776B5D'}}>LỊCH SỬ ĐẶT HÀNG</h3>
              <ul style = {{listStyle: 'none'}}>
                {userOrders.map((order) => (
                  <li key={order._id}>
                    <h2 style = {{color: '#776B5D'}}>ĐƠN HÀNG </h2><p style = {{color: 'black'}} >#{order._id}</p>
                    <p>Ngày đặt: {order.createdAt}</p>
                    <p>Tổng giá: {order.totalPrice}</p>
                    <p>Trạng thái: {order.status}</p>

                    <h3 style = {{color: '#776B5D'}}>MÓN ĂN</h3>
                    <div style = {{overflowY: 'auto',overflowX: 'hidden', height: '100px'}}>
        <ul style = {{listStyle: 'none', }}>
        {order.products && order.products.map((product) => (
        <li style = {{ margin: '7px 0'}} key={product?.product?._id}>
            <img src={`http://localhost:3000/v1/Image/${product.product?.hinhanh}`} alt="monan-pic" className="Orders-pic" />
          {product?.product?.tenSP} - ${product?.product?.giaSP}.000đ x {product?.quantity}

        </li>
        ))}
        </ul>
      </div>

                  </li>
                ))}
              </ul>
            </div>
          ) : (
            <p>Không có đơn hàng nào.</p>
          )}
        </div>
      )}
    </div>
  );
}
