import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StatusOrderComponent = () => {
  const [orderStatus, setOrderStatus] = useState('Đang xử lý');
  const [orderId, setOrderId] = useState('');

  const handleStatusChange = async () => {
    try {
      const response = await axios.put(`http://localhost:3000/v1/Order/${orderId}`, { status: orderStatus });
      console.log('Trạng thái đơn hàng đã được cập nhật:', response.data);
      // Thực hiện các hành động cần thiết sau khi cập nhật trạng thái đơn hàng thành công
    } catch (error) {
      console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
      // Xử lý lỗi nếu cần thiết
    }
  };

  const statusOptions = ['Đang xử lý', 'Đã xác nhận', 'Đang giao hàng', 'Đã giao', 'Đã hủy'];

  return (
    <div>
      <input
        type="text"
        placeholder="Nhập ID đơn hàng"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
      />
      <select value={orderStatus} onChange={(e) => setOrderStatus(e.target.value)}>
        {statusOptions.map((status) => (
          <option key={status} value={status}>
            {status}
          </option>
        ))}
      </select>
      <button onClick={handleStatusChange}>Cập nhật trạng thái đơn hàng</button>
    </div>
  );
};

export default StatusOrderComponent;
