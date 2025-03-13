
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';

const TotalCountUser = () => {
  const [totalCountUser, setTotalCountUser] = useState(null);

  useEffect(() => {
    const fetchTotalCountUser = async () => {
      try {
        const response = await axios.post(`http://localhost:3000/v1/User/usertotalCount`); 
        setTotalCountUser(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy số lượng sản phẩm:', error);
      }
    };

    fetchTotalCountUser();
  }, []);

  return (
    <div className="product-count-box" style = {{
      border: 'none',
      padding: '10px',
      width: '25%',
      margin: '10px',
      textAlign: 'center',
      // backgroundColor: '#fff',
      borderRadius: '8px',
      // background: '#fff',
      background: 'linear-gradient(to bottom right, #FFDD88, #FAF8ED 70%, #FFC6AC )',

      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',

    }}>
      <div style ={{display: 'flex', alignItems: 'center',}}>
        <div  style = {{  display: 'flex',
       display: 'flex',
       alignItems: 'center',
       justifyContent: 'center', // Để căn giữa theo chiều ngang
       backgroundColor: 'rgb(255, 99, 132)',
       backgroundColor: '#FFC6AC',

       borderRadius: '50%',
       color: 'rgb(255, 99, 132)',
       width: '80px', // Điều chỉnh kích thước theo ý muốn
       height: '80px', // Điều chỉnh kích thước theo ý muốn
     }}>
       <PeopleAltOutlinedIcon style={{ fontSize: '50px' }} />
        </div>
        <div className="count"
        style ={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: 'black',
          display: 'flex',
          flexDirection: 'column',
          
        }}>{totalCountUser}
            <div style = {{fontSize: '1.5rem', fontWeight: '100'}}>Người dùng</div>
        </div>
      </div>
    </div>
  );
};

export default TotalCountUser;
