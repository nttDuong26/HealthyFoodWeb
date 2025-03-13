import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {  Input, InputNumber } from 'antd';


const UpdateDiscountCode = ({ id, closeEditModal, updategetDiscount  }) => {
  const [code, setCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [startDate, setstartDate] = useState('');


  useEffect(() => {
    // Gọi API endpoint để lấy thông tin mã giảm giá dựa trên id khi component được tạo ra
    const fetchDiscountCode = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/v1/DiscountCode/discount-code/${id}`);
        const { code, discountPercentage, expirationDate, startDate } = response.data;
        // Cập nhật state variables với thông tin mã giảm giá từ API
        setCode(code);
        setDiscountPercentage(discountPercentage);
        setExpirationDate(expirationDate);
        setstartDate(startDate);
      } catch (error) {
        console.error('Lỗi khi lấy thông tin mã giảm giá:', error);
      }
    };

    // Gọi hàm fetchDiscountCode khi component được tạo ra
    fetchDiscountCode();
  }, [id, closeEditModal, updategetDiscount ]); // Thực hiện lại khi id thay đổi

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      // Gửi yêu cầu PUT để cập nhật thông tin mã giảm giá
      const response = await axios.put(`http://localhost:3000/v1/DiscountCode/discount-codes/${id}`, {
        code,
        discountPercentage,
        expirationDate,
        startDate,
      });
      closeEditModal();
      updategetDiscount(response.data);
      window.alert('Mã giảm giá đã được cập nhật thành công.');

    } catch (error) {
      setSuccessMessage('');
      setErrorMessage('Lỗi khi cập nhật mã giảm giá. Vui lòng thử lại.');
    }
  };

  return (
    <div>
      <form onSubmit={handleUpdate}>
        <label >Mã Giảm Giá:</label>
        <Input style = {{
            marginBottom: '1vw', }} type="text" value={code} onChange={(e) => setCode(e.target.value)} required />
        <label>Phần Trăm Giảm Giá:</label>
        <Input style = {{
            marginBottom: '1vw', }} type="text" value={discountPercentage} onChange={(e) => setDiscountPercentage(e.target.value)} required />
         <label>Ngày Bắt Đầu:</label>
        <Input style = {{
            marginBottom: '1vw', }} type="text" value={startDate} onChange={(e) =>setstartDate (e.target.value)} required />
        <label>Ngày Hết Hạn:</label>
        <Input style = {{
            marginBottom: '1vw', }} type="text" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} required />
        <button type="submit"   style = {{
          marginTop: '2vw', 
          marginLeft: '80%',
          padding: '0.5vw  1vw',
          backgroundColor: '#d69c52',
          border: 'none',
          color: '#fff',
          borderRadius: '8px',
        }}>Cập Nhật</button>
      </form>

    </div>
  );
};

export default UpdateDiscountCode;
