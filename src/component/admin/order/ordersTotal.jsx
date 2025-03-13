
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import InventoryOutlinedIcon from '@mui/icons-material/InventoryOutlined';

const TotalCountOrder = () => {
  const [totalCountOrder, setTotalCountOrder] = useState(null);

  useEffect(() => {
    const fetchTotalCountOrder = async () => {
      try {
        const response = await axios.post(`http://localhost:3000/v1/Order/countOrderTotal`); 
        setTotalCountOrder(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy số lượng sản phẩm:', error);
      }
    };

    fetchTotalCountOrder();
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
      background: 'linear-gradient(to bottom right, #E5E0FF, #FAF8ED 70%, #FFCF96 )',
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
      //  backgroundColor: '#FFCF96',
       backgroundColor: 'rgba(255, 206, 86, 0.4)',
       borderRadius: '50%',
       color: '#ED7D31',
      // color: 'rgba(255, 206, 86)',
       width: '80px', // Điều chỉnh kích thước theo ý muốn
       height: '80px', // Điều chỉnh kích thước theo ý muốn
     }}>
       <InventoryOutlinedIcon style={{ fontSize: '50px' }} />
        </div>
        <div className="count"
        style ={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: 'black',
          display: 'flex',
          flexDirection: 'column',
          
        }}>{totalCountOrder}
            <div style = {{fontSize: '1.5rem', fontWeight: '100'}}>Đơn hàng</div>
        </div>
      </div>
       
     
    </div>
  );
};

export default TotalCountOrder;
