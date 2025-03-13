import React, { useEffect, useState } from 'react';
import axios from 'axios';
import GetDataFromLocalStorage from '../../../body/getLocalStorage/getLocalStorage';
import OrderDetailModal from './orderHistoryDetail';
import { Button, Modal, Table, Popconfirm } from 'antd';
import './orderHistoryDetail.css';



export default function OrderHistory({onSelectOrder }) {
  const userData = GetDataFromLocalStorage('userData');
  const userId = userData.user._id;
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [isModalOrder, setIsmodalOrder] = useState(false);

  const handleViewDetail = (order) => {
    // Gọi hàm onSelectOrder và truyền thông tin đơn hàng được chọn
    onSelectOrder(order);
  };
  useEffect(() => {
    async function fetchOrderHistory() {
      try {
        const response = await axios.get(`http://localhost:3000/v1/Order/user/${userId}/order`);
        console.log(response.data)
        setOrders(response.data);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        // Xử lý lỗi ở đây, ví dụ: hiển thị thông báo lỗi cho người dùng
      }
    }

    fetchOrderHistory();
  }, []);
  const handleExportInvoice = async (order) => {
    try {
      // Gửi yêu cầu tới API backend để xuất hóa đơn
      const response = await fetch('http://localhost:3000/v1/Order/export-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order }), // Đảm bảo order đã được định nghĩa trước đó trong phạm vi của hàm này
      });
  
      if (response.ok) {
        // Nhận nội dung hóa đơn và hiển thị nó (ví dụ: mở cửa sổ mới hoặc hiển thị modal)
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'invoice.pdf');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        alert('Xuất hóa đơn thành công');

      } else {
        throw new Error('Xuất hóa đơn không thành công');
      }
    } catch (error) {
      console.error(error);
      alert('Đã có lỗi khi xuất hóa đơn');
    }
  };
  const handleCancelOrder = async () => {
    try {
      // Check if the order is in "Đang xử lý" status before attempting to cancel
      if (selectedOrder.status === 'Đang xử lý') {
        const response = await axios.put(`http://localhost:3000/v1/Order/${selectedOrder._id}`, {
          status: 'Đã hủy',
        });
  
        if (response.status === 200) {
          alert('Đã hủy đơn hàng thành công!');
          const updatedOrders = orders.map((order) =>
            order._id === selectedOrder._id ? { ...order, status: 'Đã hủy' } : order
          );
          setOrders(updatedOrders);
          setSelectedOrder({ ...selectedOrder, status: 'Đã hủy' });
        } else {
          throw new Error('Hủy đơn hàng không thành công');
        }
      } else {
        alert('Đơn hàng đã xác nhận. Không thể Hủy!');
      }
    } catch (error) {
      console.error(error);
      alert('Đã có lỗi khi hủy đơn hàng');
    }
  };

  
  
  const openModal = (order) => {
    setSelectedOrder(order);
    setIsmodalOrder(true);
  };

  const closeModalOrder = () => {
    setIsmodalOrder(false);
  };

  return (
    <div>
      {/* <h1>Danh sách đơn hàng của người dùng</h1> */}
      {orders.length > 0 ? (
        <ul style = {{listStyle: 'none'}}>
          {orders && orders.map((order, index) => (
            <li style= {{marginBottom: '2vw', marginTop: '2vw'}} key={order.userId}>
              <p> {index + 1}. Đơn hàng #{order._id}</p>
              <p style = {{marginLeft: '1vw'}}>Ngày đặt: {order.createdAt}</p>
              {/* <p>Địa chỉ giao hàng: {order.shippingAddress}</p> */}
              {/* <p>Hình thức thanh toán: {order.paymentMethod}</p> */}
              <p style = {{marginLeft: '1vw'}}>Tổng giá: {order.totalPrice.toFixed(3)}đ</p>
              <p style = {{marginLeft: '1vw'}}>Trạng thái: {order.status}</p>
             
              <p >Món:</p>
              <ul style = {{listStyle: 'none'}}>
              {order.products.length > 0 && (
                <li  key={order.products[0].product._id} >
                  {/* {order.products[0].product.hinhanh} - {order.products[0].product.tenSP} - x{order.products[0].quantity} */}
                  <img src={`http://localhost:3000/v1/Image/${order.products[0].product?.hinhanh}`} alt="monga" width ='10%'  /> &nbsp;
                       - {order.products[0].product.tenSP} - x{order.products[0].quantity}

                </li>
              )}
              </ul>
              <button  style={{ float: 'right', fontStyle: 'italic', color: '#d69c52' }} onClick={() => openModal(order)}>Xem Chi Tiết</button>
            </li>
          ))}
          
        </ul>
      ) : (
        <p>Không có đơn hàng nào.</p> // Hiển thị thông báo khi không có đơn hàng
      )}
      <Modal 
                title="Chi tiết đơn hàng"
                visible={isModalOrder}
                onCancel={closeModalOrder} 
                footer={(
                  <div>
                    <Button className = "modal-content-button" onClick={ handleCancelOrder}>Hủy đơn hàng</Button> 
                    
                    <Button  className="modal-content-button" onClick={() => handleExportInvoice(selectedOrder)}>
                      Xuất Hóa Đơn
                    </Button>
                    {/* <Button className = "modal-content-button" onClick={ closeModalOrder}>Đóng</Button> */}
                  </div>
                )}
                style={{ top: '5%'}}
                bodyStyle={{ overflowY: 'auto',overflowX: 'hidden', maxHeight: 'calc(100vh - 200px)' }}
              >
                {selectedOrder && <OrderDetailModal order={selectedOrder} closeModalOrder={closeModalOrder}   />}
                
        </Modal>
            {/* {selectedOrder && (
        <OrderDetailModal order={selectedOrder} onClose={closeModal} />
      )} */}

    </div>
  );
}
