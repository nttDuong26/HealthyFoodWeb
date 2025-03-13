import React, { useState } from 'react';
import './menu.css';
import Tooltip from '@mui/material/Tooltip';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Divider from '@mui/material/Divider';
import RestaurantMenuIcon from '@mui/icons-material/RestaurantMenu';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import Menucontent from './menuContent/menuContent.jsx';
import IconButton from '@mui/material/IconButton';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';



const MenuComponent = () => {
  const [isMenu1Open, setIsMenu1Open] = useState(false);

  const handleMenu1Click = (e) => {
    e.stopPropagation();
    setIsMenu1Open(!isMenu1Open);
    };

    const handleMenu1MouseEnter = () => {
      setIsMenu1Open(true);
    };
  
    const handleMenu1MouseLeave = () => {
      setIsMenu1Open(false);
    };

  return (
    <div  onClick={handleMenu1Click} 
          onMouseEnter={handleMenu1MouseEnter}
          onMouseLeave={handleMenu1MouseLeave} >
      <Tooltip title="Thực đơn" arrow >
        <div style={{ display: 'flex', alignItems: 'center'}} >
          <div  style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <RestaurantMenuIcon  size="small"  >
              <RestaurantMenuIcon sx={{ width: 20, height: 20, color: 'black' }} />
            </RestaurantMenuIcon>
            <span style={{ marginTop: '4px' }}>Thực đơn</span>
          </div>  
          {/* {isMenu1Open ? <ExpandLessIcon sx ={{color: 'white'}} /> : <ExpandMoreIcon sx ={{color: 'white'}} />}   */}
        </div>
      </Tooltip> 
      {/* {isMenu1Open && (   
        <div className="menu-more"
        style={{
          position: 'absolute',
          top: '100%',
          left: "170px",
          padding: '10px',
          zIndex: 1,
        }}>
            <Menucontent/>
        </div>    
      )}    */}
    </div>
  );
};

export default MenuComponent;
