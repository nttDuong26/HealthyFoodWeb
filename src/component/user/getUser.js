import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


export default function GetUserDetail({setIsUserItemPage}) {
  const { id } = useParams(); // Lấy tham số userId từ URL

  const [userDetail, setUserDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchUserDetail() {
      try {
        const response = await axios.get(`http://localhost:3000/v1/User/getuserItem/${id}`);
        setUserDetail(response.data);
        console.error(response.data);
        setIsLoading(false);
        setIsUserItemPage(true);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    }

    fetchUserDetail();
  }, [id]);

  return (
    <div>
      {isLoading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div>
          <h1>Dữ liệu từ API:</h1>
          <h2>Tên người dùng: {userDetail.tenND}</h2>
          <p>Số điện thoại: {userDetail.sdt}</p>
          {/* <p>Vai trò: {userDetail.role}</p> */}
          
        </div>
      )}
    </div>

      );
    }



