import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Table, Button, Popconfirm, Modal } from 'antd';
import DeleteUser from './DelUser';
import  GetDataFromLocalStorage  from '../../layout/body/getLocalStorage/getLocalStorage';
import UserDetail from './UserItem';


export default function User() {
  const [Users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const userData = GetDataFromLocalStorage('userData');
  const [isModalUser, setIsModalUser] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState(null);

  const showModalUser = (userId) => {
    setSelectedUserId(userId);
    setIsModalUser(true);
  };


  useEffect(() => {
    async function fetchUserData() {
      try {
        const response = await axios.get('http://localhost:3000/v1/User/getuserlist');
        const filteredUsers = response.data.filter(user => user.role !== 'admin' );
        setUsers(filteredUsers); 
        setIsLoading(false);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    }

    fetchUserData();
  }, []);

  const handleUserDelete = async (userId) => {
    try{
      const response = await axios.delete(`http://localhost:3000/v1/User/deleteuser/${userId}`);
      setUsers((prevUser) => prevUser.filter((Users) => Users._id !== userId));
      console.log('Xóa đơn hàng thành công:',userId);
       }catch (error) {
        console.error('Lỗi khi xóa sản phẩm:', error);
      }
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: '_id',
      key: 'stt',
      align: 'center',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Tên người dùng',
      dataIndex: 'tenND',
      key: 'tenND',
      align: 'center',
    },
    {
      title: 'Số điện thoại',
      dataIndex: 'sdt',
      key: 'sdt',
      align: 'center',
    },
    {
      title: 'Thao tác',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <span>
          <Button onClick={() => showModalUser(record._id)} type="danger">  Xem</Button>
          <Popconfirm title="Xác nhận xóa?" onConfirm={() => handleUserDelete(record._id)}>
            <a style={{ color: '', marginLeft: '5px' }}>Xóa</a>
          </Popconfirm> 
        </span>
      ),
    },
  ];

  return (
    <div>
      {isLoading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div>
          <h1>Danh sách người dùng</h1>
          <Table columns={columns} dataSource={Users} pagination={{ pageSize: 10, showSizeChanger: true }} />
          <Modal 
                title="Thông tin người dùng"
                visible={isModalUser}
                onCancel={() => setIsModalUser(false)}
                footer={null}
                style={{ top: '15%'}}
                bodyStyle={{ overflowY: 'auto',overflowX: 'hidden', maxHeight: 'calc(100vh - 200px)' }}
              >
                {selectedUserId && <UserDetail id={selectedUserId} closeModalUser={() => setIsModalUser(false)} />}
        </Modal>
        </div>
      )}
    </div>
  );
}
