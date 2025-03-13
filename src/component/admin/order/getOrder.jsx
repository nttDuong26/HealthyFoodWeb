import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Select } from 'antd';
import OrderDetail from './getOneOder';
// import { Table } from 'antd';
import { Button, Modal } from 'antd';

import {  Popconfirm } from 'antd';

export default function GetOrder() {
    const [orders, setOrder] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [selectedCategoryId, setSelectedCategoryId] = useState(null); // State để lưu ID của danh mục cần xóa
    const [isModalOrder, setIsModalOrder] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);


    const { Option } = Select;
  
    const showModal = () => {
      setIsModalOpen(true);
    };


    const showModalOrder = (orderId) =>{
      setIsModalOrder(true)
      setSelectedOrderId(orderId)
    }


    const showModalXoa = () => {
   
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      // Xử lý logic khi xác nhận xóa danh mục
      setIsModalVisible(false);
    };
  
    const handleCancel = () => {
      setIsModalVisible(false);
    };

    const compareDates = (a, b) => {
      const dateA = new Date(a.createdAt);
      const dateB = new Date(b.createdAt);
      return dateB - dateA; // Sắp xếp từ mới nhất đến cũ nhất
    };

    useEffect(() => {
      async function fetchOrderData() {
        try {
          const response = await axios.get('http://localhost:3000/v1/Order');
          const sortedOrders = response.data.sort(compareDates);
          setOrder(sortedOrders);
          console.log(sortedOrders);
          setIsLoading(false);
        } catch (error) {
          console.error('Lỗi khi gọi API:', error);
        }
      }
  
      fetchOrderData();
    }, []);

    const statusOptions = ['Đang xử lý', 'Xác nhận', 'Đang giao hàng', 'Đã giao', 'Đã hủy'];

    const handleStatusChange = async (orderId, newStatus) => {
      try {
        const response = await axios.put(`http://localhost:3000/v1/Order/${orderId}`, { status: newStatus });
        // console.log('Trạng thái đơn hàng đã được cập nhật:', response.data);
        // Thực hiện các hành động cần thiết sau khi cập nhật trạng thái đơn hàng thành công
        setOrder((prevOrders) =>
        prevOrders.map((order) => (order._id === orderId ? { ...order, status: newStatus } : order))
      );
      } catch (error) {
        console.error('Lỗi khi cập nhật trạng thái đơn hàng:', error);
        // Xử lý lỗi nếu cần thiết
      }
    };


    const handleCateDelete = async (orderId) => {
      try {
        await axios.delete(`http://localhost:3000/v1/Order/${orderId}`);
        setOrder((prevOrders) => prevOrders.filter((order) => order._id !== orderId));
        console.log('Xóa đơn hàng thành công:', orderId);
      } catch (error) {
        console.error('Xóa đơn hàng không thành công', error);
        // Xử lý lỗi nếu cần thiết
      }
    }
     
    
    const columns = [
      {
        title: 'STT',
        dataIndex: '_id',
        key: '_id',
        render: (text, record, index) => index + 1,
      },
      {
        title: 'Mã đơn hàng',
        dataIndex: '_id',
        key: '_id',
       
        // onFilter: (value, record) => record.tenDM === value,
      },
      {
        title: 'Ngày đặt',
        dataIndex: 'createdAt', // Sử dụng 'user.tenND' nếu dữ liệu được trả về chứa trường 'tenND' từ mô hình User
        key: 'createdAt',
      },
      {
        title: 'Giá trị đơn hàng',
        dataIndex: 'totalPrice',
        key: 'totalPrice',
        filters: [
          { text: 'Dưới 50.000đ', value: '50-below' },
          { text: '50.000đ - 100.000đ', value: '50-100' },
          { text: '100.000đ - 200.000đ', value: '100-200' },
          { text: '200.000đ - 500.000đ', value: '200-500' },
          { text: 'Trên 500.000đ', value: '500-above' },
        ],
        onFilter: (value, record) => {
          const totalPrice = record.totalPrice;
          switch (value) {
            case '50-below':
              return totalPrice < 50000;
            case '50-100':
              return totalPrice >= 50000 && totalPrice <= 100000;
            case '100-200':
              return totalPrice > 100000 && totalPrice <= 200000;
            case '200-500':
              return totalPrice > 200000 && totalPrice <= 500000;
            case '500-above':
              return totalPrice > 500000;
            default:
              return false;
          }
        },
        render: (totalPrice) => `${totalPrice}.000đ`,
      },
      {
        title: 'Trạng thái',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => (
          <Select
            value={record.status}
            style={{ width: 120 }}
            onChange={(newStatus) => handleStatusChange(record._id, newStatus)}
          >
            {statusOptions.map((status) => (
              <Option key={status} value={status}>
                {status}
              </Option>
            ))}
          </Select>
        ),
      },
  
  
      {
        title: 'Thao tác',
        key: 'actions',
        align: 'center',
        render: (_, record) => (
          <span>
              <Button onClick={() => showModalOrder(record._id)} type="danger">  Xem</Button> 
            <Popconfirm title="Xác nhận xóa?" onConfirm={() => handleCateDelete(record._id)}>
              <a style={{ color: '', marginLeft: '5px' }}>Xóa</a>
            </Popconfirm> 
            
          </span>
        ),
      },
    ];
  

  
    return (
      <div>
      <h1>Danh sách Đơn hàng</h1>
           <div>
            <Table columns={columns} dataSource={orders} pagination={{ pageSize: 5, showSizeChanger: true }} />

            <Modal 
                title="Chi tiết đơn hàng"
                visible={isModalOrder}
                onCancel={() => setIsModalOrder(false)}
                footer={null}
                style={{ top: '10%'}}
                bodyStyle={{ overflowY: 'auto',overflowX: 'hidden', maxHeight: 'calc(100vh - 200px)' }}
              >
                {selectedOrderId && <OrderDetail id={selectedOrderId} closeModalOrder={() => setIsModalOrder(false)} />}
        </Modal>
          </div>
 
      </div>
    );
  };
  