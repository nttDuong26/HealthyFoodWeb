import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom'; // Import useParams from react-router-dom

const UpdateUser = () => {
  const { userId } = useParams(); // Get the userId from React Router params
 
  const [userData, setUserData] = useState({
    tenND: '',
    matkhau: '',
    xacminhMK: '',
  });

  

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get(`http://localhost:3000/v1/User/getuserItem/${userId}`);
        const user = response.data;
        setUserData({
            tenND: user.tenND,
            matkhau: user.matkhau,
            xacminhMK: user.xacminhMK,
        });

      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        setIsLoading(false);
      }
    }

    fetchUserData();
  }, [userId]);

  const handleUsChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleUpUserSubmit = async (e) => {
    e.preventDefault();
  
    if (userData.matkhau !== userData.xacminhMK) {
      window.alert('Mật khẩu không trùng khớp');
      return;
    }
  
    try {
      const responseUpUser = await axios.put(`http://localhost:3000/v1/User/updateuser/${userId}`, userData);
      if (responseUpUser.status === 201) {
        window.alert('Thông tin người dùng cập nhật thành công.');
        window.location.href = `/getuserItem/${userId}`;
        
      }
    } catch (error) {
      console.error('Lỗi khi cập nhật thông tin người dùng:', error);
      window.alert('Lỗi khi cập nhật thông tin người dùng');
    }
  };


  return (
    <div>
      <h2>Cập Nhật Thông Tin Người Dùng</h2>
      <form onSubmit={handleUpUserSubmit}>
        <div>
            <label htmlFor="tenND">Tên người dùng:</label>
            <input
            type="text"
            id="tenND"
            name="tenND"
            value={userData.tenND}
            onChange={handleUsChange}
            />
        </div>
        <div>
            <label htmlFor="matkhau">Mật khẩu mới:</label>
            <input
            type="password"
            id="matkhau"
            name="matkhau"
            value={userData.matkhau}
            onChange={handleUsChange}
            />
        </div>
        <div>
            <label htmlFor="xacminhMK">Nhập lại mật khẩu:</label>
            <input
            type="password"
            id="xacminhMK"
            name="xacminhMK"
            value={userData.xacminhMK}
            onChange={handleUsChange}
            />
        </div>
        <button type="submit">Cập Nhật</button>
      </form>
      {/* {message && <p>{message}</p>} */}
    </div>
  );
};

export default UpdateUser;
