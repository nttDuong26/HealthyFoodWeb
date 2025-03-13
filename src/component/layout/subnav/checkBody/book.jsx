import React, { useState } from 'react';
import './book.css';
import Tooltip from '@mui/material/Tooltip';
import AddTaskIcon from '@mui/icons-material/AddTask';
import GetDataFromLocalStorage from '../../body/getLocalStorage/getLocalStorage';
import { Link } from 'react-router-dom';
import Check from '../../body/Check/check';
import HealthCalculator from '../../body/Check/HealthCalculator';
import { Button, Modal, Table, Popconfirm } from 'antd';


const Book = () => {
  const [isMenuOpen, setMenuOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const userData = GetDataFromLocalStorage('userData');
  const [isModalOpenCheck, setIsModalOpenCheck] = useState(false);
  const [healthResult, setHealthResult] = useState(null);

  const handleResultReceived = (result) => {
    setHealthResult(result);
  };

  const toggleMenu = (event) => {
    setMenuOpen(!isMenuOpen);
    setAnchorEl(event.currentTarget);
  };

  const openModal = () => {
    if (userData) {
      setIsModalOpenCheck(true);
    } else {
      alert("Vui lòng đăng nhập để kiểm tra chỉ số cơ thể.");
    }
  };

  const closeModal = () => {
    setIsModalOpenCheck(false);
  };

  return (
    <div>
      <Tooltip title="Kiểm tra chỉ số cơ thể" arrow>
        <div
          onClick={openModal}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <AddTaskIcon size="small">
            <AddTaskIcon sx={{ width: 20, height: 20, color: 'black' }} />
          </AddTaskIcon>
          <span style={{ marginTop: '4px' }}> Kiểm tra </span>
        </div>
      </Tooltip>
      {/* <Modal >

      {isModalOpenCheck && (
       
        <div className="modal">
          <HealthCalculator onResultReceived={handleResultReceived} onClose={closeModal} />
        </div>
      )}
        </Modal> */}

      <Modal
        title="Kiểm tra chỉ số cơ thể"
        visible={isModalOpenCheck}
        onCancel={closeModal}
        footer={null}
      >
        <HealthCalculator onResultReceived={handleResultReceived} closeModal={closeModal}/>
      </Modal>
    </div>
  );
};

export default Book;
