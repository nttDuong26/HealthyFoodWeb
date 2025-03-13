import React, { useState } from 'react';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import './home.css';
import Tooltip from '@mui/material/Tooltip';


const Home = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const toggleMenu = (event) => {
    setMenuOpen(!isMenuOpen);
    setAnchorEl(event.currentTarget);
  };


  return (
    <div>
      <Tooltip title="Trang chủ" arrow>
        <div onClick={toggleMenu} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <HomeOutlinedIcon  size="small">
            <HomeOutlinedIcon sx={{ width: 20, height: 20, color: 'black' }} />
          </HomeOutlinedIcon>
          <span style={{ marginTop: '4px' }}>Trang chủ </span>
        </div>
      </Tooltip>
    </div>
  );
};

export default Home;
