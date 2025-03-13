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
import { useProduct } from '../../context/productContext';
import { useParams, useLocation } from 'react-router-dom';
import { Input, Select, Button } from 'antd';
import {  Modal } from 'antd';
import { PayPalButton } from "react-paypal-button-v2";





export default function AbateByNow() {
    const { Option } = Select;
  const { TextArea } = Input;

    // const { selectedProduct } = useProduct();
    const [selectedProvince] = useState('92'); // Đặt giá trị tỉnh/thành phố mặc định là "Cần Thơ"
    const [selectedDistrict, setSelectedDistrict] = useState('');
    const [selectedWard, setSelectedWard] = useState('');
    const [addressData, setAddressData] = useState(null);
    const userData = GetDataFromLocalStorage('userData');
    const [hoTen, setHoTen] = useState(userData ? userData.user.tenND : ''); // Lấy giá trị từ userData hoặc để trống nếu không có
    const [soDienThoai, setSoDienThoai] = useState(userData ? userData.user.sdt : '');
    const [ghiChu, setGhiChu] = useState('');
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState('');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [sdkReady , setSdkReady] = useState(false)
    const [orderId, setOrderId] = useState('');
    const [totalAmount, setTotalAmount]= useState(null);
    const [initialTotalAmount, setInitialTotalAmount] = useState(null);
    const [discountCode, setDiscountCode] = useState('');
    const [discountAmount, setDiscountAmount] = useState(0);
    const [discountAmountPercentage, setDiscountAmountPercentage] = useState(0);
    const [isDiscountCodeApplied, setIsDiscountCodeApplied] = useState(false);


    const handleAbateChange = (event, newValue) => {
        setSelectedPaymentMethod(newValue);
      };
    
      const userId = userData.user._id;
      const [orders, setOrders] = useState([]);
      const [selectedOrder, setSelectedOrder] = useState([]);

      const { id } = useParams();
      const location = useLocation();
      const searchParams = new URLSearchParams(location.search);
    
     
      const quantity = searchParams.get('quantity');
      const productName = decodeURIComponent(searchParams.get('productName'));
      const productPrice = searchParams.get('productPrice'); 
      const productId = searchParams.get('productId');
      const [productDetail, setProductDetail] = useState([]);
        // const [totalAmounts, setTotalAmounts] = useState(0);
        const [isModalVisible, setIsModalVisible] = useState(false);

      // const totalAmount = quantity * productPrice;
    
      // Định dạng giá thành và số lượng thành chuỗi (nếu cần)
      const formattedQuantity = parseInt(quantity, 10);
      
      const formattedPrice = parseFloat(productPrice);
    // const product = {
    //     tenSP: productName,
    //     quantity: parseInt(quantity), // Chuyển đổi thành số nguyên nếu cần thiết
    //     giaSP: parseFloat(productPrice),
    //   };

    const [redirect, setRedirect] = useState(false);

      const openModal = (order) => {
        setSelectedOrder(order);
      };
    
    const closeModal = () => {
        setSelectedOrder();
      };
 
      const handleCancel = () => {
        setIsModalVisible(false);


    };
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


    useEffect(() => {
        async function getOneProduct(){
            try{
                const responseOneProduct = await axios.get(`http://localhost:3000/v1/Product/${id}`);
                setProductDetail(responseOneProduct.data);
                // console.log(responseOneProduct.data);
            }catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        }getOneProduct();
    }, [id]);

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
    // const districtsChu = useState ([]);




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
                user: userData.user._id,
                products: [
                    {
                        product: productDetail._id, // Sử dụng _id của sản phẩm từ productDetail hoặc lấy từ một trường ID phù hợp
                        quantity: quantity, // Số lượng sản phẩm
                    }
                ],
                totalPrice: totalAmount,
                shippingAddress: `${shippingAddress.ward}, ${shippingAddress.district}, ${shippingAddress.province}`,
                ghichu: ghiChu,
                paymentMethod: selectedPaymentMethod,
              };

            // Gửi yêu cầu tạo đơn hàng đến backend
            const response = await axios.post(`http://localhost:3000/v1/Order/ad`, orderData);
            if(response.status === 201 ){
              window.alert("Đặt hàng thành công. Xem chi tiết đơn hàng");
          }
            // setIsModalOpen(true);
            setIsModalVisible(true);
            // console.log(response.data);
            setSelectedOrder(response.data);
            // console.log(selectedOrder);

            // Xử lý phản hồi từ backend (nếu cần)
            // console.log(response.data);


            
        } catch (error) {
            console.error('Lỗi khi đặt hàng:', error);
            window.alert("Đặt hàng không thành công. vui lòng kiểm tra lại thông tin");

        }
    };
    // const [isModalOpen, setIsModalOpen] = useState(false);
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
            user: userData.user._id,
            products: [
                {
                    product: productDetail._id, // Sử dụng _id của sản phẩm từ productDetail hoặc lấy từ một trường ID phù hợp
                    quantity: quantity, // Số lượng sản phẩm
                }
            ],
            totalPrice: totalAmount,
            shippingAddress: `${shippingAddress.ward}, ${shippingAddress.district}, ${shippingAddress.province}`,
            ghichu: ghiChu,
            paymentMethod: selectedPaymentMethod,
          };

        // Gửi yêu cầu tạo đơn hàng đến backend
        const response = await axios.post(`http://localhost:3000/v1/Order/ad`, orderData);
        if(response.status === 201 ){
          window.alert("Đặt hàng thành công. Xem chi tiết đơn hàng");
      }
        // setIsModalOpen(true);
        setIsModalVisible(true);
        // console.log(response.data);
        setSelectedOrder(response.data);
        // console.log(selectedOrder);

        // Xử lý phản hồi từ backend (nếu cần)
        // console.log(response.data);


        
    } catch (error) {
        console.error('Lỗi khi đặt hàng:', error);
        window.alert("Đặt hàng không thành công. Vui lòng kiểm tra lại thanh toán");

    }
  };

 

const addPaypalScript = async () => {
  // const {data} = await axios.get(`http://localhost:3000/v1/Payment/pay`);
  // console.log(data);
  const data ='AUjbvnGnEt9oA_uMIteaC7O9124kWfHn4bWpTtyKcG8AljMmfgBn7BdI1UB19HcCa3dTAmPPlSAGVdVO'
  const script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
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
  const totalAmount = quantity * productPrice;
  setTotalAmount(totalAmount);
  setInitialTotalAmount(totalAmount);
}, []);

const applyDiscountCode = async () => {
  try {
    // Gửi mã giảm giá đến server để kiểm tra tính hợp lệ
    const disresponse = await axios.post('http://localhost:3000/v1/DiscountCode/discount-codes/validate', {
      discountCode: discountCode, // Sử dụng giá trị mới nhập từ trường input
    });
    console.log(disresponse.data.valid);
    // Kiểm tra nếu mã giảm giá hợp lệ
    if (disresponse.data.valid) {
      // Nhận được giá trị giảm giá từ server
      const serverDiscountAmount = disresponse.data.discountAmount;
      const discountAmountPercentage = (totalAmount * serverDiscountAmount) / 100;

      // Tính lại totalAmount sau khi áp dụng mã giảm giá
      const discountedTotalAmount = totalAmount - discountAmountPercentage;

      // Cập nhật giảm giá vào state
      setDiscountAmount(serverDiscountAmount);

      // Cập nhật totalAmount trong state sau khi áp dụng mã giảm giá
      setTotalAmount(discountedTotalAmount);
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

        {/* Nút Lưu (nếu cần) */}
        {/* <Button
          className="save-button"
          type="primary"
          onClick={() => {
            // Xử lý dữ liệu đã chọn ở đây
            console.log("Tỉnh/Thành phố:", selectedProvince);
            console.log("Quận/Huyện:", selectedDistrict);
            console.log("Phường/Xã:", selectedWard);
          }}
        >
          Lưu
        </Button> */}

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

        <div className="Orders-form1">
            {/* <Orders/> */}
            <div className ='Orders1'>
        <div className="Orders-title">
            <span>Đơn hàng của bạn</span>
        </div>
        <div className="Orders-content">
            <div className="Orders-contents1">
                {quantity && productName && (
                <div className="Orders-product">
                    {/* Hiển thị thông tin sản phẩm từ tham số URL */}
                    {/* <img src={selectedProduct.hinhanh} alt="monan-pic" className="Orders-pic" /> */}
                <img src={`http://localhost:3000/v1/Image/${productDetail?.hinhanh}`} alt="monan-pic" className="Orders-pic" />
                    
                    <div className="Orders-product-span">
                    <span className="Orders-product-name">{productName}</span>
                    <span className="Orders-product-gia">{formattedPrice}.000đ</span>
                    <span className="Orders-product-quality">x{formattedQuantity}</span>
                    </div>
                </div>
                )}
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
                <span className="Orders-Provisional-gia">{initialTotalAmount}.000đ</span>
            </div>
            
            <div className="Orders-ships">
                <span className="Orders-ship">Khuyến mãi</span>
                <span className="Orders-Provisional-gia">{discountAmountPercentage}.000đ</span>

            </div>
            
            <div className="Orders-Sum">
                <span>Tổng cộng</span>
                <span className="Orders-Sum-gia">{totalAmount}.000đ</span>
            </div>
            <div className="Orders-footer"> 
                <div className="back-Cart-icon">
                    <div className="back-icon"> <ArrowLeftIcon/></div>
                    <Link to = {`/`}
                        className="back-Cart">
                        Quay về Trang chủ
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
            {/* {isModalOpen && (
                
                <OrderDetailModal order={selectedOrder} onClose={closeModal} />
            )} */}

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

        </div>
    </div>
        </div>
    </div>
  )
}
