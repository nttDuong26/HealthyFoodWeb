import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageDisplay = ({ imageId }) => {
  const [imageData, setImageData] = useState(null);

  useEffect(() => {
    // Gửi yêu cầu GET đến API để lấy thông tin ảnh dựa trên imageId
    axios.get(`http://localhost:3000/images/${imageId}`)
      .then(response => {
        setImageData(response.data);
      })
      .catch(error => {
        console.error('Lỗi khi lấy ảnh từ API:', error);
      });
  }, [imageId]);

  if (!imageData) {
    return <div>Loading...</div>; // Hiển thị thông báo khi đang tải ảnh
  }

  const { filename, path } = imageData;

  return (
    <div>
      <h2>{filename}</h2>
      <img src={path} alt={filename} />
    </div>
  );
};

export default ImageDisplay;
