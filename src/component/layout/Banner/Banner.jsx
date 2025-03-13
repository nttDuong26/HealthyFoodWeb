import React, { useState, useEffect } from 'react';
import './Banner.css';
import banner1 from './ASSETS/1.png';
import banner2 from './ASSETS/2.png';
import banner3 from './ASSETS/3.png';

import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

const Banner = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = [banner1, banner2, banner3];

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000); // Thay đổi 3000 thành khoảng thời gian trượt tự động mong muốn

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <div className="slider-container">
      <div className="slider" style={{ transform: `translateX(-${currentIndex * 100}%)` }}>
        {images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Image ${index + 1}`}
            className="slide"
          />
        ))}
      </div>
      <button className="prev-button" onClick={handlePrev}><ArrowBackIosNewIcon/></button>
      <button className="next-button" onClick={handleNext}><ArrowForwardIosIcon/></button>
    </div>
  );
};

export default Banner;
