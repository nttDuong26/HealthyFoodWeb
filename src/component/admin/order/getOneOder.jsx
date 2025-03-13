import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const OrderDetail = ({ closeModalOrder, id }) => {
    // const { id } = useParams();
  const [order, setOrder] = useState(null);
//   const orderId = match.params.id;

  useEffect(() => {
    async function fetchOrderDetail() {
      try {
        const response = await axios.get(`http://localhost:3000/v1/Order/${id}`);
        setOrder(response.data);
        // closeModalOrder();
        console.log(response.data)
      } catch (error) {
        console.error('Lỗi khi lấy chi tiết đơn hàng:', error);
      }
    }

    fetchOrderDetail();
  }, [ closeModalOrder, id]);

  if (!order) {
    return <p>Đang tải dữ liệu...</p>;
  }

  const handleExportAdInvoice = async () => {
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

  return (
    <div>

      <h2 style = {{color: '#776B5D'}} >THÔNG TIN KHÁCH HÀNG</h2>
      <p>Tên Khách Đặt Hàng: {order.user.tenND}</p>
      <p>Số điện thoại: {order.user.sdt}</p>
      <p>Địa Chỉ Giao Hàng: {order.shippingAddress}</p>
      <h3 style = {{color: '#776B5D'}}>MÓN ĂN:</h3>
      <div style = {{overflowY: 'auto',overflowX: 'hidden', height: '100px'}}>
        <ul style = {{listStyle: 'none', }}>
        {order.products && order.products.map((product) => (
        <li style = {{ margin: '7px 0'}} key={product?.product?._id}>
            <img src={`http://localhost:3000/v1/Image/${product.product?.hinhanh}`} alt="monan-pic" className="Orders-pic" />
          {product?.product?.tenSP} - ${product?.product?.giaSP}.000đ x {product?.quantity}: ${product?.product?.giaSP * product?.quantity}.000đ

        </li>
        ))}
        </ul>
      </div>
      <h2 style = {{color: '#776B5D'}} >THÔNG TIN ĐƠN HÀNG</h2>
      <p>Tổng Tiền: {order.totalPrice}</p>
      <p>Trạng Thái Đơn Hàng: {order.status}</p>
      <p>Phương Thức Thanh Toán:{order.paymentMethod}</p>
      <p>Thời Gian Đặt Hàng: {order.createdAt}</p>
      <p>Ghi Chú: {order.ghichu}</p>


      <button   style = {{
        //   marginTop: '0.3vw', 
          marginLeft: '70%',
          padding: '0.7vw  0.7vw',
          backgroundColor: '#d69c52',
          border: 'none',
          color: '#fff',
          borderRadius: '8px',
        }}onClick={handleExportAdInvoice}>
            Xuất Hóa Đơn
          </button>
    </div>
  );

};

export default OrderDetail;
