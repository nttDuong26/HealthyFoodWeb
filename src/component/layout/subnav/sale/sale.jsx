import React, { useState } from 'react';
import LoyaltyOutlinedIcon from '@mui/icons-material/LoyaltyOutlined';
import './sale.css';
import Tooltip from '@mui/material/Tooltip';
import Modal from '@mui/material/Modal'; // Import Modal từ thư viện MUI
import GetCode from './code';
import GetDataFromLocalStorage from '../../body/getLocalStorage/getLocalStorage';

const Sale = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false); // State để theo dõi trạng thái của modal
  const userData = GetDataFromLocalStorage('userData');

  const toggleMenu = (event) => {
    setMenuOpen(!isMenuOpen);
    // setAnchorEl(event.currentTarget);
  };

  const openModal = () => {
    if (userData) {
      setModalOpen(true);
    } else {
      alert("Vui lòng đăng nhập để xem khuyến mãi.");
    }
  };


  
  const closeModal = () => {
    setModalOpen(false);
    // alert("Vui lòng đăng nhập để kiểm tra chỉ số cơ thể.");

  };

  return (
    <div>
      <Tooltip title="Khuyến mãi" arrow>
        <div onClick={() => {toggleMenu(); openModal();}} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <LoyaltyOutlinedIcon  size="small">
            <LoyaltyOutlinedIcon sx={{ width: 20, height: 20, color: 'black' }} />
          </LoyaltyOutlinedIcon>
          <span style={{ marginTop: '4px' }}>Khuyến mãi </span>
        </div>
      </Tooltip>

      {/* Modal */}
      <Modal
        
        open={isModalOpen}
        onClose={closeModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
     
      >
        {/* Nội dung của modal */}
        <div className="modal-content1" style = {{
           backgroundColor:' #fefefe',
           margin: '5% auto',
           padding: '20px',
           border: '1px solid #888',
           width: '60%',
        }}>
        <GetCode/>
        </div>
      </Modal>
    </div>
  );
};

export default Sale;
