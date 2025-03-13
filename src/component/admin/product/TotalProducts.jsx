// ProductCount.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import FastfoodOutlinedIcon from '@mui/icons-material/FastfoodOutlined';

const ProductCount = () => {
  const [totalCount, setTotalCount] = useState(null);

  useEffect(() => {
    const fetchProductCount = async () => {
      try {
        const response = await axios.post(`http://localhost:3000/v1/Product/producttotalCount`); 
        setTotalCount(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy số lượng sản phẩm:', error);
      }
    };

    fetchProductCount();
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
      background: 'linear-gradient(to bottom right, #FF8080, #FAF8ED 70%, #E5E0FF )',
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
      //  backgroundColor: '#E5E0FF',
       backgroundColor: 'rgba(75, 192, 192, 0.3)',
       borderRadius: '50%',
      //  color: '#7286D3',
      color: 'rgb(75, 192, 192)',
       width: '80px', // Điều chỉnh kích thước theo ý muốn
       height: '80px', // Điều chỉnh kích thước theo ý muốn
     }}>
       <FastfoodOutlinedIcon style={{ fontSize: '50px' }} />
        </div>
        <div className="count"
        style ={{
          fontSize: '24px',
          fontWeight: 'bold',
          color: 'black',
          display: 'flex',
          flexDirection: 'column',
          
        }}>{totalCount}
            <div style = {{fontSize: '1.5rem', fontWeight: '100'}}>Sản phẩm</div>
        </div>
      </div>
       
     
    </div>
  );
};

export default ProductCount;
