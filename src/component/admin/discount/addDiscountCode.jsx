import React, { useState } from 'react';
import axios from 'axios';
import { Upload, Input, InputNumber } from 'antd';


const CreateDiscountCode = ({closeaddModal, updategetDiscounts }) => {
  const [code, setCode] = useState('');
  const [discountPercentage, setDiscountPercentage] = useState('');
  const [expirationDate, setExpirationDate] = useState('');
  const [startDate, setstartDate] = useState('');


  const handleCreateDiscountCode = async (e) => {
    e.preventDefault();
    try {
      // Gửi yêu cầu POST để tạo mã giảm giá
      const response = await axios.post('http://localhost:3000/v1/DiscountCode/discount-codes', {
        code,
        discountPercentage,
        expirationDate,
        startDate,
      });

      // Xử lý dữ liệu trả về từ API nếu cần
      console.log('Mã giảm giá đã được tạo:', response.data);

      // Reset trạng thái của các trường input nếu cần
      setCode('');
      setDiscountPercentage('');
      setExpirationDate('');
      setstartDate('');
      closeaddModal();
      window.alert('Mã giảm giá đã được tạo thành công.');
      updategetDiscounts(response.data);


    } catch (error) {
      console.error('Lỗi khi tạo mã giảm giá:', error);
      // Xử lý lỗi nếu cần
    }
  };

  return (
    <div>
      <form onSubmit={handleCreateDiscountCode}>
        <label>Mã Giảm Giá:</label>
        <Input style = {{
            marginBottom: '1vw', }} type="text" value={code} onChange={(e) => setCode(e.target.value)} required />
        <label>Phần Trăm Giảm Giá:</label>
        <Input style = {{
            marginBottom: '1vw', }} type="text" value={discountPercentage} onChange={(e) =>setDiscountPercentage (e.target.value)} required />
        <label>Ngày Bắt Đầu:</label>
        <Input style = {{
            marginBottom: '1vw', }} type="text" value={startDate} onChange={(e) =>setstartDate (e.target.value)} required />
        <label>Ngày Hết Hạn:</label>
        <Input style = {{
            marginBottom: '1vw', }} type="text" value={expirationDate} onChange={(e) => setExpirationDate(e.target.value)} required />
        <button type="submit"
         style = {{
            marginTop: '1vw', 
            marginLeft: '80%',
            padding: '0.8vw  1vw',
            backgroundColor: '#d69c52',
            border: 'none',
            color: '#fff',
            borderRadius: '5px',
          }}
        >Tạo mã</button>
      </form>
    </div>
  );
};

export default CreateDiscountCode;
