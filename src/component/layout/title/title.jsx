import React from 'react';
import './title.css';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import { Link } from 'react-router-dom';

const Title = () => {
  return (
    <div className="center-banner">
      <div className="shopname">
        <span className='name'>
          TIỆM ĂN NHÀ TÁO
        </span>
        <span className='slogan'>
          Lựa chọn cho sức khỏe
        </span>
        <Link to="/mainMenu">
          <button className='slogan2'>
            CHỌN MÓN NGAY
          </button>
        </Link>

        <span className="time">
          <AccessTimeIcon style={{ verticalAlign: 'middle', marginRight: '2px' }} /> 8:00AM - 10:00PM
        </span>
      </div>
    </div>
  );
};

export default Title;
