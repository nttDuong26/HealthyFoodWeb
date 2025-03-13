import React, { useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom

const UpdateUser = () => {
  const { id } = useParams(); // Get the userId from React Router params
  const [userData, setUserData] = useState({
    tenND: '',
    matkhau: '',
    xacminhMK: '',
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpUserSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.put(`http://localhost:3000/v1/users/${id}`, userData); // Use the userId from useParams
      if (response.status === 201) {
        setMessage('Cập nhật thông tin người dùng thành công');
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setMessage('Mật khẩu không trùng khớp');
      } else {
        setMessage('Lỗi khi cập nhật thông tin người dùng');
      }
    }
  };

  return (
    <div>
      <h2>Cập Nhật Thông Tin Người Dùng</h2>
      <form onSubmit={handleUpUserSubmit}>
        {/* ... (các trường nhập liệu) ... */}
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default UpdateUser;
