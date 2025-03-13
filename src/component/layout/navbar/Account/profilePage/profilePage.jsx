import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GetDataFromLocalStorage from '../../../body/getLocalStorage/getLocalStorage';
import { Link } from 'react-router-dom';
import { Card, Input, Button, Space } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import Avatar from './ASSETS/avatar.png';
import Navbar from '../../navbar';
import Footer from '../../../footer/footer';
import ProfileLinks from './profileLink';
import OrderHistory from './orderHistory';
import OrderDetailModal from './orderHistoryDetail'


export default function ProfilePage() {
    const userData = GetDataFromLocalStorage('userData');
    const userId = userData.user._id;
    const [orders, setOrders] = useState([]);
    const [getUser, setGetUser] = useState({});
    const [isEditing, setIsEditing] = useState(false);
    const [isEditingMK, setIsEditingMK] = useState(false);
    const [editedUser, setEditedUser] = useState({
        tenND: '',
        matkhau: '',
        xacminhMK: ''
    });

    const [isOrderDetailModalVisible, setIsOrderDetailModalVisible] = useState(false);
    // const [selectedOrder, setSelectedOrder] = useState(null);

    // Hàm để mở modal chi tiết đơn hàng khi nhấn vào nút "Xem chi tiết" trong OrderHistory
    const handleViewOrderDetail = (order) => {
    setSelectedOrder(order); // Lưu thông tin đơn hàng được chọn vào state
    setIsOrderDetailModalVisible(true); // Hiển thị modal chi tiết đơn hàng
  };


    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
      async function fetchOrderHistory() {
        try {
          const response = await axios.get(`http://localhost:3000/v1/Order/user/${userId}/order`);
          console.log(response.data)
          setOrders(response.data);
        } catch (error) {
          console.error('Lỗi khi gọi API:', error);
          // Xử lý lỗi ở đây, ví dụ: hiển thị thông báo lỗi cho người dùng
        }
      }
  
      fetchOrderHistory();
    }, []);
    useEffect(() => {
        async function fetchUserDetail() {
            try {
                const response = await axios.get(`http://localhost:3000/v1/User/getuserItem/${userData.user._id}`);
                setGetUser(response.data);
                setEditedUser(response.data);
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        }
        fetchUserDetail();
    }, [userData.user._id]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleSaveChanges = async () => {
        try {
            const updatedUserData = { tenND: editedUser.tenND };

            const response =  await axios.put(`http://localhost:3000/v1/User/updateuser/${userData.user._id}`, updatedUserData);
            setIsEditing(false);
            setGetUser({ ...getUser, tenND: editedUser.tenND });
            if ( response.status === 201){
                window.alert("Cập nhật tên người dùng thành công");
                }
        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
            window.alert("Cập nhật tên người dùng không thành công");

        }
    };

    const handleInputChangeMK = (e) => {
        const { name, value } = e.target;
        setEditedUser({ ...editedUser, [name]: value });
    };

    const handleEditPassword = () => {
        setIsEditingMK(true); // Hiển thị form chỉnh sửa mật khẩu khi nhấn nút "Chỉnh sửa"
        setEditedUser({ ...editedUser, matkhau: '', xacminhMK: '' }); // Đặt giá trị mật khẩu và xác minh mật khẩu về rỗng
    };

    const handleSaveChangesMK = async () => {
        try {
            const updatedMKData = { matkhau: editedUser.matkhau, xacminhMK: editedUser.xacminhMK };

            const response = await axios.put(`http://localhost:3000/v1/User/updateuser/${userData.user._id}`, updatedMKData);
            setIsEditingMK(false);
            if ( response.status === 201){
            window.alert("Cập nhật mật khẩu thành công");
            }
            
                
       

        } catch (error) {
            console.error('Lỗi khi gọi API:', error);
            window.alert("Cập nhật mật khẩu  không thành công");
        }
    };

    return (
        <div>
            <div>
                <Navbar/>
            </div>
            <div  style = {{
                    marginTop: '6vw',
                    backgroundColor: 'black',            
                            }}>
                <ProfileLinks/>
            </div>
       
        <div style = {{
            display: 'flex',
            padding: '5vw 5vw 4vw 5vw',
            backgroundColor: '#143b36',
            justifyContent: 'space-evenly',
        }}>
            
            <div className = 'avatar'  style = {{width: '30%', padding: '4vw 0'}}>
            <img src={Avatar} alt="avatar" style = {{width: '80%', heigth: '80%'}} />
            </div>
            <div className="profileinf">
      <Card title="Thông tin cá nhân">
        <div className="tenNDprofile">
          <p>Tên người dùng: &nbsp;
            {isEditing ? (
              <Input type="text" name="tenND" value={editedUser.tenND} onChange={handleInputChange} style={{ width: '50%', backgroundColor: 'transparent',color: '#d69c52' }} />
            ) : (
              getUser.tenND
            )}
          </p>
          {!isEditing && <Button type="link" style={{ fontStyle: 'italic', color: '#d69c52' }} onClick={() => setIsEditing(true)}>Chỉnh sửa</Button>}
          {isEditing && <Button type="link" style={{ fontStyle: 'italic', color: '#d69c52' }} onClick={handleSaveChanges}>Lưu</Button>}
        </div>
        <p>Số điện thoại: {getUser.sdt}</p>
        <div className="tenNDprofile">
          Mật khẩu: {isEditingMK ? (
            <div style={{ width: '60%', display: 'flex' }}>
              <Input type="password" name="matkhau" value={editedUser.matkhau} onChange={handleInputChangeMK} placeholder="Nhập mật khẩu mới" style={{ backgroundColor: 'transparent', color: '#d69c52', marginRight: '1vw' }} />
              <Input type="password" name="xacminhMK" value={editedUser.xacminhMK} onChange={handleInputChangeMK} placeholder="Xác nhận mật khẩu" style={{ backgroundColor: 'transparent', color: '#d69c52' }} />
            </div>
          ) : (
            '********'
          )}
          {!isEditingMK && <Button type="link" style={{ fontStyle: 'italic', color: '#d69c52' }} onClick={handleEditPassword}>Chỉnh sửa</Button>}
          {isEditingMK && <Button type="link" style={{ fontStyle: 'italic', color: '#d69c52' }} onClick={handleSaveChangesMK}>Lưu</Button>}
        </div>
        <div>
          <p>Lịch sử đặt hàng</p>
          <div style={{ overflowY: 'auto', overflowX: 'hidden', maxHeight: '200px' }}>
            <OrderHistory onSelectOrder={handleViewOrderDetail} />
            {isOrderDetailModalVisible && <OrderDetailModal order={selectedOrder} onClose={() => setIsOrderDetailModalVisible(false)} />}
          </div>
        </div>
      </Card>
    </div>
        </div>
        <Footer/>
    </div>
    );
}
