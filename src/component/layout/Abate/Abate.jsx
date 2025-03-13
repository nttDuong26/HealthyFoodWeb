import React, { useEffect, useState } from 'react';
import './Abate.css';
import Logo from './ASSETS/logo.png';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import Orders from './Orders/Orders.jsx';
import { Link } from 'react-router-dom';
import GetDataFromLocalStorage from '../body/getLocalStorage/getLocalStorage';
import axios from 'axios';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
// import {  InputLabel, Select, MenuItem, Button, Typography } from '@mui/material';
import OrderDetailModal from './orderHisDetail';
import { PayPalButton } from "react-paypal-button-v2";
import { Input, Select, Button } from 'antd';
import {  Modal } from 'antd';



export default function Abate() {
    const [valuuserDatatransformDataForAddressSelectore, setValue] = React.useState(0);

    const [selectedProvince] = useState('92'); // Đặt giá trị tỉnh/thành phố mặc định là "Cần Thơ"
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [isDiscountCodeApplied, setIsDiscountCodeApplied] = useState(false);
    const [addressData, setAddressData] = useState(null);
    const [totalAmount, setTotalAmount]= useState(null);
    const [cartItems, setCartItems] = useState([]);
    // const totalAmount = cartItems.reduce((total, item) => total + parseFloat(item.product.giaSP) * item.quantity, 0).toFixed(3);
    const userData = GetDataFromLocalStorage('userData');
    const [hoTen, setHoTen] = useState(userData ? userData.user.tenND : ''); // Lấy giá trị từ userData hoặc để trống nếu không có
    const [soDienThoai, setSoDienThoai] = useState(userData ? userData.user.sdt : '');
    // const [diaChi, setDiaChi] = useState([]); // Địa chỉ
    const [ghiChu, setGhiChu] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [orderId, setOrderId] = useState('');

    const [sdkReady , setSdkReady] = useState(false)

    const [isModalOpen, setIsModalOpen] = useState(false);
    // const [selectedAbOrder, setSelectedAbOrder] = useState('');
    const { Option } = Select;
  const { TextArea } = Input;

    const handleAbateChange = (event, newValue) => {
        setSelectedPaymentMethod(newValue);
      };
    
  
      const userId = userData.user._id;
      const [orders, setOrders] = useState([]);
      const [selectedOrder, setSelectedOrder] = useState([]);

      const [discountCode, setDiscountCode] = useState('');
      const [discountAmount, setDiscountAmount] = useState(0);
      const [discountAmountPercentage, setDiscountAmountPercentage] = useState(0);

      const [initialTotalAmount, setInitialTotalAmount] = useState(null);
      const [isModalVisible, setIsModalVisible] = useState(false);


      const handleCancel = () => {
        setIsModalVisible(false);
      }
      const openModal = (order) => {
        setSelectedOrder(order);
      };
    
    const closeModal = () => {
        setSelectedOrder();
      };

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
        async function fetchCartItems() {
            try {
                const response = await axios.get(`http://localhost:3000/v1/Cart/get/${userData.user._id}`, {
                    // params: {
                    //     userId: userData.user._id, // Thay USER_ID_HERE bằng ID của người dùng đã đăng nhập hoặc lấy từ state của LocalStorage
                    // }
                });
                setCartItems(response.data);
            } catch (error) {
                console.error('Lỗi khi lấy giỏ hàng:', error);
            }
        }
        fetchCartItems();

    }, [userData.user._id]);


    useEffect(() => {
      if (isDiscountCodeApplied) {
        applyDiscountCode();
      }
    }, [isDiscountCodeApplied]);

    useEffect(() => {
        // Tải dữ liệu từ API
        fetch(`https://raw.githubusercontent.com/madnh/hanhchinhvn/master/dist/tree.json`)
            .then((response) => response.json())
            .then((data) => {
                // Biến đổi dữ liệu thành cấu trúc phù hợp cho AddressSelector
                const transformedData = transformDataForAddressSelector(data, selectedProvince, selectedDistrict);
                setAddressData(transformedData);
            })
            .catch((error) => {
                console.error('Lỗi khi tải dữ liệu từ API: ', error);
            });
    }, [selectedProvince, selectedDistrict]); // Chạy một lần khi component được tạo

    const transformDataForAddressSelector = (inputData, selectedProvince, selectedDistrict) => {
        const transformedData = { ...inputData };
    
        if (selectedProvince) {
            // Lọc các quận/huyện
            if (selectedDistrict) {
                transformedData[selectedProvince][selectedDistrict] = { ...inputData[selectedProvince][selectedDistrict] };
            }
        }
  
        return transformedData;
    };

    // Lấy danh sách quận/huyện dựa trên tỉnh/thành phố đã chọn
    const getDistricts = (selectedProvince, addressData) => {
        if (addressData  && selectedProvince && addressData[selectedProvince] && addressData[selectedProvince]['quan-huyen']) {
            return Object.values(addressData[selectedProvince]['quan-huyen']);
        }
        return [];
    };

  
    // Lấy danh sách phường/xã dựa trên quận/huyện đã chọn
    const getWards = (selectedProvince, selectedDistrict, addressData) => {
        if (addressData && selectedProvince && selectedDistrict && addressData[selectedProvince] && addressData[selectedProvince]['quan-huyen'][selectedDistrict] && addressData[selectedProvince]['quan-huyen'][selectedDistrict]['xa-phuong']) {
            return Object.values(addressData[selectedProvince]['quan-huyen'][selectedDistrict]['xa-phuong']);
        }
        return [];
    };


  
    // Sử dụng hàm để lấy danh sách quận/huyện và xã/phường
    const districts = getDistricts(selectedProvince, addressData);
    const wards = getWards(selectedProvince, selectedDistrict, addressData);


    const handlePlaceOrder = async () => {
        try {
            const shippingAddress = {
                province: addressData[selectedProvince]["name"],
                district: addressData[selectedProvince]["quan-huyen"][selectedDistrict]["name"],
                ward: addressData[selectedProvince]["quan-huyen"][selectedDistrict]["xa-phuong"][selectedWard]["name"],
                // specificAddress: diaChi
            };
            // Tạo dữ liệu đơn hàng từ state hoặc các giá trị khác trên trang
            const orderData = {
                user:  userData.user._id,
                products: cartItems,
                totalPrice: totalAmount,
                shippingAddress: `${shippingAddress.ward}, ${shippingAddress.district}, ${shippingAddress.province}`,
                ghichu: ghiChu,
                paymentMethod: selectedPaymentMethod,  // Sử dụng giá trị selectedPaymentMethod
            };

            // Gửi yêu cầu tạo đơn hàng đến backend
            const response = await axios.post(`http://localhost:3000/v1/Order/ad`, orderData);
                        
            if(response.status === 201 ){
              window.alert("Đặt hàng thành công. Xem chi tiết đơn hàng");
          }
            const newOrderId = response.data.orderId;
            setIsModalOpen(true);
            // console.log(response.data);
            setSelectedOrder(response.data);
            // console.log(selectedOrder);
            setIsModalVisible(true);
            // Xử lý phản hồi từ backend (nếu cần)
            // console.log(response.data);
            setOrderId(newOrderId); 


            
        } catch (error) {
            console.error('Lỗi khi đặt hàng:', error);
            window.alert("Đặt hàng không thành công. vui lòng kiểm tra lại thông tin");

        }
    };

    

    const onSuccessPaypal = async () => {
        try {
            const shippingAddress = {
                province: addressData[selectedProvince]["name"],
                district: addressData[selectedProvince]["quan-huyen"][selectedDistrict]["name"],
                ward: addressData[selectedProvince]["quan-huyen"][selectedDistrict]["xa-phuong"][selectedWard]["name"],
                // specificAddress: diaChi
            };
            // Tạo dữ liệu đơn hàng từ state hoặc các giá trị khác trên trang
            const orderData = {
                user:  userData.user._id,
                products: cartItems,
                totalPrice: totalAmount,
                shippingAddress: `${shippingAddress.ward}, ${shippingAddress.district}, ${shippingAddress.province}`,
                ghichu: ghiChu,
                paymentMethod: selectedPaymentMethod,  // Sử dụng giá trị selectedPaymentMethod
            };

            // Gửi yêu cầu tạo đơn hàng đến backend
            const response = await axios.post(`http://localhost:3000/v1/Order/ad`, orderData);
           
            const newOrderId = response.data.orderId;
           
            setIsModalOpen(true);
            // console.log(response.data);
         
            setSelectedOrder(response.data);
            // console.log(selectedOrder);
            setIsModalVisible(true);
            // Xử lý phản hồi từ backend (nếu cần)
            // console.log(response.data);
            setOrderId(newOrderId); 
        


            
        } catch (error) {
            console.error('Lỗi khi đặt hàng:', error);
        window.alert("Đặt hàng không thành công. Vui lòng kiểm tra lại thanh toán");

        }
    };

   

  const addPaypalScript = async () => {
    // const {data} = await axios.get(`http://localhost:3000/v1/Payment/pay`);
    // console.log(data);
    // const data ='AUjbvnGnEt9oA_uMIteaC7O9124kWfHn4bWpTtyKcG8AljMmfgBn7BdI1UB19HcCa3dTAmPPlSAGVdVO'
    const script = document.createElement('script')
    script.type = 'text/javascript'
    script.src = `https://www.paypal.com/sdk/js?client-id=AUjbvnGnEt9oA_uMIteaC7O9124kWfHn4bWpTtyKcG8AljMmfgBn7BdI1UB19HcCa3dTAmPPlSAGVdVO`
    script.async = true;
    script.onload = () => {
      setSdkReady(true)
    }
    document.body.appendChild(script)
  }

  useEffect(() => {
    if(!window.paypal) {
        addPaypalScript()
      }else {
        setSdkReady(true)
      }
    addPaypalScript()
  }, [])

  useEffect(() => {
    const totalAmount = cartItems.reduce((total, item) => total + parseFloat(item.product.giaSP) * item.quantity, 0).toFixed(3);
    setTotalAmount(totalAmount);
    setInitialTotalAmount(totalAmount);
  }, [cartItems]);
  
  const applyDiscountCode = async () => {
    try {
      // Gửi mã giảm giá đến server để kiểm tra tính hợp lệ
      const response = await axios.post('http://localhost:3000/v1/DiscountCode/discount-codes/validate', {
        discountCode: discountCode, // Sử dụng giá trị mới nhập từ trường input
      });
  
      // Kiểm tra nếu mã giảm giá hợp lệ
      if (response.data.valid) {
        // Nhận được giá trị giảm giá từ server
        const serverDiscountAmount = response.data.discountAmount;
        const discountAmountPercentage = (initialTotalAmount * serverDiscountAmount) / 100;
  
        // Cập nhật giảm giá vào state
        setDiscountAmount(serverDiscountAmount);
  
        // Tính lại totalAmount sau khi áp dụng mã giảm giá
      const newTotalAmount = cartItems.reduce((total, item) => {
        const productPrice = parseFloat(item.product.giaSP);
        const discountedPrice = productPrice * (1 - serverDiscountAmount / 100); // Giảm giá dưới dạng phần trăm
        return total + discountedPrice * item.quantity;
      }, 0).toFixed(3);

  
        // Cập nhật totalAmount trong state
        setTotalAmount(newTotalAmount);
        setIsDiscountCodeApplied(true);
        setDiscountAmountPercentage(discountAmountPercentage);
      } else {
        // Nếu mã giảm giá không hợp lệ, hiển thị thông báo lỗi cho người dùng
        alert('Mã giảm giá không hợp lệ.');
      }
    } catch (error) {
      // Xử lý lỗi khi gửi yêu cầu đến server
      console.error('Lỗi khi gửi yêu cầu đến server:', error);
      // Hiển thị thông báo lỗi cho người dùng
      alert('Đã xảy ra lỗi khi kiểm tra mã giảm giá.');
    }
  };
  
  const handleExportInvoice = async (order) => {
    try {
      // Gửi yêu cầu tới API backend để xuất hóa đơn
      const response = await fetch('http://localhost:3000/v1/Order/export-invoice', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ order }), // Đảm bảo order đã được định nghĩa trước đó trong phạm vi của hàm này
      });
  
      if (response.ok) {
        // Nhận nội dung hóa đơn và hiển thị nó (ví dụ: mở cửa sổ mới hoặc hiển thị modal)
        const blob = await response.blob();
        const url = window.URL.createObjectURL(new Blob([blob]));
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', 'invoice.pdf');
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
        alert('Xuất hóa đơn thành công');

      } else {
        throw new Error('Xuất hóa đơn không thành công');
      }
    } catch (error) {
      console.error(error);
      alert('Đã có lỗi khi xuất hóa đơn');
    }
  };

  const handleCancelOrder = async () => {
    try {
      // Check if the order is in "Đang xử lý" status before attempting to cancel
      if (selectedOrder.status === 'Đang xử lý') {
        const response = await axios.put(`http://localhost:3000/v1/Order/${selectedOrder._id}`, {
          status: 'Đã hủy',
        });
  
        if (response.status === 200) {
          alert('Đã hủy đơn hàng thành công!');
          const updatedOrders = orders.map((order) =>
            order._id === selectedOrder._id ? { ...order, status: 'Đã hủy' } : order
          );
          setOrders(updatedOrders);
          setSelectedOrder({ ...selectedOrder, status: 'Đã hủy' });
        } else {
          throw new Error('Hủy đơn hàng không thành công');
        }
      } else {
        alert('Đơn hàng đã xác nhận. Không thể Hủy!');
      }
    } catch (error) {
      console.error(error);
      alert('Đã có lỗi khi hủy đơn hàng');
    }
  };
  

  return (
    <div className = 'Abate'>
        <div className="Abate-form">
            <div className="Abate-logo">
                <Link to = {"/body"}>
                    <img src={Logo} alt="logo" className="logo-abate"/>
                </Link>
            </div>
            <div className="Abate-title">
                <span>Nhập thông tin khách hàng</span>
                {/* <a href="#" className="Abate-login">Đăng nhập</a> */}
            </div>
            
            <div className="Abate-input">
        {userData && (
          <Input
            className="hoten"
            placeholder="Họ và tên *"
            value={hoTen}
            onChange={(e) => setHoTen(e.target.value)}
          />
        )}
        {userData && (
          <Input
            className="sdt"
            placeholder="Số điện thoại *"
            value={soDienThoai}
            onChange={(e) => setSoDienThoai(e.target.value)}
          />
        )}

        <Select style={{ width: '90%' }}
          className="select-province"
          value={selectedProvince}
          disabled
        >
          <Option value="92">Cần Thơ</Option>
        </Select>

        <Select style={{ width: '90%' }} 
          className="select-district"
          value={selectedDistrict}
          onChange={(value) => setSelectedDistrict(value)}
        >
          <Option value="">Chọn quận/huyện</Option>
          {districts.map((district) => (
            <Option key={district.code} value={district.code}>
              {district.name}
            </Option>
          ))}
        </Select>

        <Select style={{ width: '90%' }}

          className="select-ward"
          value={selectedWard}
          onChange={(value) => setSelectedWard(value)}
        >
          <Option value="">Chọn phường/xã</Option>
          {wards.map((ward) => (
            <Option key={ward.code} value={ward.code}>
              {ward.name}
            </Option>
          ))}
        </Select>

        <TextArea rows={4} placeholder = 'Ghi chú'
        style={{ width: '90%' }}
          className="ghichu"
        //   placeholder="Ghi chú"
          value={ghiChu}
          onChange={(e) => setGhiChu(e.target.value)}
        />
      </div>
            <div className="Abate-method">
                <span className="Abate-method-span">Chọn phương thức thanh toán</span>
                <div className="Abate-method-label">
                    <FormControl>
                    <RadioGroup
                        aria-labelledby="demo-controlled-radio-buttons-group"
                        name="controlled-radio-buttons-group"
                        value={selectedPaymentMethod} // Kết nối giá trị của RadioGroup với biến state 'value'
                        onChange={handleAbateChange}
                    >
                        <FormControlLabel value ="COD" control={<Radio   sx={{
                                color: '#143b36', // Thay đổi màu tại đây
                                '&.Mui-checked': {
                                color: '#d69c52', // Thay đổi màu khi nút radio được chọn
                                },
                            }} />} label="Thanh toán khi nhận hàng (Ship Cod)" />
                        <FormControlLabel value ="paypal" control={<Radio   sx={{
                                color: '#143b36', // Thay đổi màu tại đây
                                '&.Mui-checked': {
                                color: '#d69c52', // Thay đổi màu khi nút radio được chọn
                                },
                            }}/>} label="Thanh toán trực tuyến (PayPal)" />
                        
                    </RadioGroup>
                    </FormControl>
                </div>
                
            </div>
        </div>

        <div className="Orders-form">
            {/* <Orders/> */}
            <div className ='Orders'>
        <div className="Orders-title">
            <span>Đơn hàng của bạn</span>
        </div>
        <div className="Orders-content">
            <div className="Orders-contents">
            {cartItems.map((item) => (
            <div className="Orders-product">
                <img src={`http://localhost:3000/v1/Image/${item.product?.hinhanh}`} alt="monan-pic" className="Orders-pic" />
                <div className="Orders-product-span">
                    <span className="Orders-product-name">{item.product.tenSP}</span>
                    <span className="Orders-product-gia">{item.product.giaSP.toFixed(3)}</span>
                    <span className="Orders-product-quality"> x{item.quantity}</span>

                </div>
            </div>
        ))}
            </div>

            <div className="Orders-discount">
                <input
                  type="text"
                  className="discount-input"
                  placeholder='Nhập mã giảm giá'
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <button className="discount-btn" onClick={applyDiscountCode}>Áp dụng</button>
              </div>
            
            <div className="Orders-Provisional">
                <span >Tạm tính</span>
                <span className="Orders-Provisional-gia">{initialTotalAmount}đ</span>
            </div>
            
            <div className="Orders-ships">
                <span className="Orders-ship">Khuyến mãi</span>
                <span className="Orders-Provisional-gia">{discountAmountPercentage.toFixed(3)}đ</span>
            </div>
            
            <div className="Orders-Sum">
                <span>Tổng cộng</span>
                <span className="Orders-Sum-gia">{totalAmount}đ</span>
            </div>
            <div className="Orders-footer"> 
                <div className="back-Cart-icon">
                    <div className="back-icon"> <ArrowLeftIcon/></div>
                    <Link to = {"/cartshop"}
                        className="back-Cart">
                        Quay về giỏ hàng
                    </Link>
                    
                </div>
                {selectedPaymentMethod === 'paypal' && sdkReady ? (
                    // <button className="Orders-footer-btn1" onClick = {handlePayment} >Thanh tóan qua PayPal</button>
                    
                        <PayPalButton
                        amount={totalAmount / 20}
                        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                        onSuccess={onSuccessPaypal}                      
                        onError={() => {
                            alert("Thanh toán thất bại" );
                        }}
                  />
                  

                ) : (
                    <button className="Orders-footer-btn"  onClick = {handlePlaceOrder}>Đặt hàng</button>

                )}
                    {/* <button className="Orders-footer-btnXem" onClick={ openModal} >Xem lại đơn hàng</button> */}

            </div>
            <Modal
                    title="Đặt hàng thành công!"
                    visible={isModalVisible}
                    onCancel={handleCancel}
                    footer={(
                      <div>
                        <Button className = "modal-content-button" onClick={ handleCancelOrder}>Hủy đơn hàng</Button> 
                        <Button key="export"onClick={() => handleExportInvoice(selectedOrder)}>
                          Xuất Hóa Đơn
                        </Button>
                        {/* <Button className = "modal-content-button1" onClick={handleCancel}>Đóng</Button> */}
                      </div>
                    )}
                    style={{ top: '5%'}}
                    bodyStyle={{ overflowY: 'auto',overflowX: 'hidden', maxHeight: 'calc(100vh - 200px)' }}
                >
                    {selectedOrder && <OrderDetailModal order={selectedOrder} onClose={handleCancel} />}
                </Modal>

            
            {/* {isModalOpen && (
                
                <OrderDetailModal order={selectedOrder} onClose={closeModal} />
            )} */}
        </div>
    </div>
        </div>
    </div>
  )
}
