import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Table, Button, Modal } from 'antd';
import {  Popconfirm } from 'antd';

// import AddDiscountCodeModal from './AddDiscountCodeModal';
import UpdateDiscountCode from './putDiscountCode';
import DiscountCodeDetail from './getDiscountCodeDetail';
import CreateDiscountCode from './addDiscountCode';





const GetDiscountCodes = () => {

  const [discountCodes, setDiscountCodes] = useState([]);
  const [isAddModalVisible, setIsAddModalVisible] = useState(false);
  const [isEditModalVisible, setIsEditModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [selectedDiscountCode, setSelectedDiscountCode] = useState(null);
  const [selectedGetDiscountCode, setSelectedGetDiscountCode] = useState(null);

  const [isGetDiscount, setIsGetDiscount] = useState(false);

  const columns = [
    {
      title: 'STT',
      dataIndex: '_id',
      key: '_id',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Mã giảm',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Phần trăm',
      dataIndex: 'discountPercentage',
      key: 'discountPercentage',
      render: (text) => `${text}%`,
    },

    {
      title: 'Thao tác',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <span>
             <Button onClick={() => showGetDiscuntModal(record._id)} type="danger">  Xem</Button>
          <Popconfirm title="Xác nhận xóa?" onConfirm={() => handleDisCountDelete(record._id)}>
            <a style={{ color: '', marginLeft: '5px' }}>Xóa</a>
          </Popconfirm> 
          <Button onClick={() => showEditModal(record._id)} type="danger">  Sửa </Button>

        </span>
      ),
    },
  ];
  const updategetDiscounts = (newDiscountCode) => {
    setDiscountCodes((prevdiscountCodes) => [...prevdiscountCodes, newDiscountCode]);
  };
  const updategetDiscount = (updategetDiscountData) => {
    // Cập nhật state của GetProduct với sản phẩm đã được cập nhật
    setDiscountCodes((prevdiscountCodes) =>
    prevdiscountCodes.map((discountCodes) =>
    discountCodes._id === updategetDiscountData._id ? updategetDiscountData : discountCodes
      )
    );
  };
  useEffect(() => {
    // Gọi API để lấy danh sách mã giảm giá
    async function fetchDiscountCodes() {
      try {
        const response = await axios.get(`http://localhost:3000/v1/DiscountCode/discount-codes`);
        setDiscountCodes(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy danh sách mã giảm giá:', error);
      }
    }

    fetchDiscountCodes();
  }, []); // Chạy một lần khi component được render


  const handleDisCountDelete = async (codeId) => {
    try{
        const response = await axios.delete(`http://localhost:3000/v1/DiscountCode/discount-codes/${codeId}`);
        setDiscountCodes((prevdiscountCodes) => prevdiscountCodes.filter((discountCodes) => discountCodes._id !== codeId));
        console.log('Xóa đơn hàng thành công:',codeId);
         }catch (error) {
          console.error('Lỗi khi xóa sản phẩm:', error);
        }
  }

  const showGetDiscuntModal = (discountCode) => {
    setSelectedGetDiscountCode(discountCode);
    setIsGetDiscount(true);
  };

  // Hiển thị modal thêm mã giảm giá
  const showAddModal = () => {
    setIsAddModalVisible(true);
  };

  // Hiển thị modal cập nhật mã giảm giá
  const showEditModal = (discountCodeId) => {
    setSelectedDiscountCode(discountCodeId);
    setIsEditModalVisible(true);
  };

  // Hiển thị modal xóa mã giảm giá
  const showDeleteModal = (discountCode) => {
    setSelectedDiscountCode(discountCode);
    setIsDeleteModalVisible(true);
  };

  return (
    <div>
     <Button type="primary" 
          style = {{
            backgroundColor: "#d69c52", 
            margin: '0 0 2vw  0',
          }} 
          onClick={() => setIsAddModalVisible(true)}>
        Tạo mã giảm giá +
      </Button>
      <Modal title="Tạo mã giảm giá"
            visible={isAddModalVisible}
            onCancel={() => setIsAddModalVisible(false)}
            footer={null}
            style={{ top: '15%' }}
            bodyStyle={{ overflowY: 'auto',overflowX: 'hidden', maxHeight: 'calc(100vh - 200px)' }}
      >
    
      <CreateDiscountCode closeaddModal={() => setIsAddModalVisible(false)} updategetDiscounts={updategetDiscounts} />

      </Modal>
      <Table dataSource={discountCodes} columns={columns} />
      
      {/* Modal Thêm Mã Giảm Giá */}
      <Modal 
                title="Chi tiết giảm giá"
                visible={isGetDiscount}
                onCancel={() => setIsGetDiscount(false)}
                footer={null}
                style={{ top: '15%'}}
                bodyStyle={{ overflowY: 'auto',overflowX: 'hidden', maxHeight: 'calc(100vh - 200px)' }}
              >
              {selectedGetDiscountCode && <DiscountCodeDetail id={selectedGetDiscountCode} closeGetDCModal={() => setIsGetDiscount(false)}   updategetDiscount={updategetDiscount}/>}

        </Modal>

      {/* Modal Cập Nhật Mã Giảm Giá */}
      <Modal 
              title="Chỉnh sửa danh mục"
              visible={isEditModalVisible}
              onCancel={() => setIsEditModalVisible(false)}
              footer={null}
              style={{ top: '15%'}}
            >
              {selectedDiscountCode && <UpdateDiscountCode id={selectedDiscountCode} closeEditModal={() => setIsEditModalVisible(false)}   updategetDiscount={updategetDiscount}/>}
            </Modal>
    </div> 
  );
};

export default GetDiscountCodes;
