import React, { useState } from 'react';
import './login.css';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';
import axios from 'axios';
import ChangePassword from './updatePass';



export default function Login() {
    function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
    }


    // const apiUrl = "http://localhost:3000/v1/api";


    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const [isShowPass, setIsShowPass] = useState(false);
    const [isShowConfirmPass, setIsShowConfirmPass] = useState(false);
    const [isIconVisible, setIsIconVisible] = useState(false);
    const [isConfirmIconVisible, setIsConfirmIconVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmPassword] = useState('');
    const [userData, setUserData] = useState(null); // Khởi tạo state để lưu dữ liệu người dùng
    const [isRegistered, setIsRegistered] = useState(false); 
    const [user, setUser] = useState(null); // Khởi tạo state để lưu dữ liệu người dùng

    const [isForgotPasswordModalOpen, setIsForgotPasswordModalOpen] = useState(false);

    const handleOnchangeName = (event) => {
        setUsername(event.target.value);
    }
    const handleOnchangePhone = (event) => {
        setPhone(event.target.value);
    }

    const handlePasswordChange = (event) =>{
        setPassword(event.target.value);
    };
    const handleCFPasswordChange = (event) =>{
        setConfirmPassword(event.target.value);
    };
    const handleOpenForgotPasswordModal = () => {
        setIsForgotPasswordModalOpen(true);
      };
      const handleCloseForgotPasswordModal = () => {
        setIsForgotPasswordModalOpen(false);
      };
      

    //     if (phone && password.length === 6) {
    //         try {
    //             // const apiUrl = 'http://localhost:3000/v1';
    //             const response = await axios.post(`http://localhost:3000/v1/User/login`, {
    //                 phone,
    //                 password,
    //             });
    //             if (response.status >= 200 && response.status < 300) {
    //                 const userData = response.data;
    //                 setUserData(userData);
                    

    //                 // console.log ('Đăng nhập thành công', userData);
        
    //                 // alert('Bạn đã đăng nhập thành công');
    //                 window.location.href = '/';
    //                 console.log(response.data);
    //             }
    //         } catch (error) {
    //             console.error('Lỗi đăng nhập');
    //         }
    //     }
    // };

    const handleLogin = async () => {
        if (phone && password.length === 6) {
            try {
                const apiUrl = 'http://localhost:3000/v1';
                const response = await fetch(`${apiUrl}/User/login`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        phone: phone,
                        password: password,
                    }),
                });
    
                const responseData = await response.json();

                if (response.status >= 200 && response.status < 300) {
                    // const data = await response.json();
                    localStorage.setItem('userData', JSON.stringify(responseData));

                    // const token = data.access_token;
                    // localStorage.setItem('data', data);
                    // Gọi API để lấy thông tin người dùng dựa trên token nếu cần
                    // Sau khi lấy thông tin người dùng, cập nhật state user
                    setUser(responseData);
                    console.log(responseData);
                    alert('Bạn đã đăng nhập thành công');
                    window.location.href = '/';
                } else {
                    console.error('Lỗi đăng nhập');
                alert('Đăng nhập thất bại. Vui lòng thử lại');

                }
            } catch (error) {
                console.error('Lỗi đăng nhập:', error);

            }
        }
    };
    const handleKeySiginPress = (event) => {
        if (event.key === 'Enter') {
            handleRegister();
        }
      };
    
    const handleKeyLoginPress = (event) => {
        if (event.key === 'Enter') {
            handleLogin();
        }
      };
    const handleRegister = async () => {
        if (phone && password.length === 6 && confirmpassword.length === 6) {
            try {
                const apiUrl = 'http://localhost:3000/v1';
                const response = await axios.post(`${apiUrl}/User/signin`, {
                    username,
                    phone,
                    password,
                    confirmpassword,
                });
                if (response.status === 201) {
                    const userData = response.data;
                    setUserData(userData);
                    // console.log ('Đăng ký thành công', userData);
                    alert('Đăng ký thành công! Hãy đăng nhập để sử dụng trang web');
                    window.location.href = '/login';
                    // const data = response.data;
                }
            } catch (error) {
                console.error('Lỗi đăng ký');
                alert('Đăng ký thất bại. Vui lòng thử lại');

            }
        }
    };
    

    const renderForm = () => {
        if (value === 0) {
            return (
                <div className="login-form">
                    <div className="login-form-title">
                        <span> ĐĂNG NHẬP </span>
                    </div>
                    <div className="signin-group">
                        <input
                            type="text"
                            name="sdt"
                            className="signin-input"
                            placeholder=" Số điện thoại"
                            value={phone}
                            onChange={handleOnchangePhone}

                        />
                        <div className="input-container">
                            <input
                                type={isShowPass ? "text" : "password"}
                                name="pass"
                                className="signin-input"
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={handlePasswordChange}
                                onKeyPress={handleKeyLoginPress}

                            />
                            <i
                                onClick={() => {
                                    setIsShowPass(!isShowPass);
                                    setIsIconVisible(!isShowPass);
                                }}
                                className="icon"
                            >
                                {/* {isIconVisible ? <VisibilityIcon /> : <VisibilityOffIcon />} */}
                            </i>
                        </div>
                        
                    </div>
                    <div className="sigin_in">
                        <button
                            // className={`submit-button ${!phone.length || !password.length ? 'active-button' : ''}`}
                            disabled = {!phone.length || password.length !== 6 } 
                            style = {{
                                background: (!phone.length || password.length !== 6) ? '#d69c52' : '#c07e28'
                            }}
                            type="button"
                            onClick={handleLogin} //Thêm xử lý đăng nhập ở đây

                        >
                            ĐĂNG NHẬP
                        </button>
                    </div>
                    
                    {/* <div className="signinform-line">
                        <div className="signin-line__line">Hoặc</div>
                    </div>
                    <div className="fogot-pass">
                    <span onClick={handleOpenForgotPasswordModal}>Quên mật khẩu?</span>
                    </div> */}
                    
                    {/* <div className="signin-form__social">
                        <a href="" className="signin__social-f">
                            Kết nối với
                            <FacebookOutlinedIcon />
                        </a>
                        <a href="" className="signin__social-g">
                            Kết nối với
                            <GoogleIcon />
                        </a>
                    </div> */}
                </div>
            );
        } else {
            return (
                <div className="login-form">
                    <div className="login-form-title">
                        <span> ĐĂNG KÝ </span>
                    </div>
                    <div className="signin-group">
                    <input
                            type="text"
                            name="username"
                            className="signin-input"
                            placeholder=" Họ và Tên"
                            value={username}
                            onChange={handleOnchangeName}
                        />
                        <input
                            type="text"
                            name="username"
                            className="signin-input"
                            placeholder=" Số điện thoại"
                            value={phone}
                            onChange={handleOnchangePhone}
                        />
                        <div className="input-container">
                            <input
                                type={isShowPass ? "text" : "password"}
                                name="pass"
                                className="signin-input"
                                placeholder="Nhập mật khẩu"
                                value={password}
                                onChange={handlePasswordChange}
                            />
                            <i onClick={() => {
                                setIsShowPass(!isShowPass)
                                setIsIconVisible(!isIconVisible);
                            }}
                                className="icon">
                                {/* {isIconVisible ? <VisibilityIcon /> : <VisibilityOffIcon />} */}

                            </i>
                        </div>
                        <div className="input-container">
                            <input
                                type={isShowConfirmPass ? "text" : "password"}
                                name="pass"
                                className="signin-input"
                                placeholder="Nhập lại mật khẩu"
                                value = {confirmpassword}
                                onChange={handleCFPasswordChange}
                                onKeyPress={handleKeySiginPress}

                            />
                            <i
                                onClick={() => {
                                    setIsShowConfirmPass(!isShowConfirmPass);
                                    setIsConfirmIconVisible(!isConfirmIconVisible);
                                }}
                                className="icon"
                            >
                                {/* {isConfirmIconVisible ? <VisibilityIcon /> : <VisibilityOffIcon />} */}
                            </i>
                        </div>
                    </div>
                    <div className="sigin_in">
                        <button
                            // disabled = {!phone.length || !password.length || !confirmpassword.length} 
                            disabled = {!phone.length || password.length !== 6 || confirmpassword.length !== 6} 
                            style = {{
                                background: (!phone.length || password.length !== 6 || confirmpassword.length !== 6) ? '#d69c52' : '#c07e28'
                            }}
                            type="button"
                            onClick={handleRegister} //Thêm xử lý đăng ký ở đây
                        >
                            ĐĂNG KÝ
                        </button>
                    </div>

                    {/* <div className="signinform-line">
                        <div className="signin-line__line">Hoặc</div>
                    </div> */}
                    {/* <div className="signin-form__social">
                        <a href="" className="signin__social-f">
                            Kết nối với
                            <FacebookOutlinedIcon />
                        </a>
                        <a href="" className="signin__social-g">
                            Kết nối với
                            <GoogleIcon />
                        </a>
                    </div> */}
                </div>
            );
        }
    };

    return (
        <div className="login">
            <div className="login-link">
                {/* <div role="presentation" onClick={handleClick}>
                    <Breadcrumbs aria-label="breadcrumb">
                        <Link underline="hover" href="#" sx={{ color: '#fff', paddingLeft: 10 }}>
                            Trang chủ
                        </Link>
                        <Typography sx={{ color: '#d69c52' }}>Đăng nhập tài khoản</Typography>
                    </Breadcrumbs>
                </div> */}
            </div>
            <div className="login-content">
                <div className="login-form login_re">
                    <Tabs value={value} onChange={handleChange} centered>
                        <Tab
                            label="Đăng nhập"
                            sx={{
                                color: value === 0 ? '#d69c52' : 'white',
                                '&.Mui-selected': {
                                    color: '#d69c52',
                                    borderBottom: '2px solid #d69c52',
                                },
                            }}
                        />
                        <Tab
                            label="Đăng ký"
                            sx={{
                                color: value === 1 ? '#d69c52' : 'white',
                                '&.Mui-selected': {
                                    color: '#d69c52',
                                    borderBottom: '2px solid #d69c52',
                                },
                            }}
                        />
                    </Tabs>
                    {isForgotPasswordModalOpen && (
  <ChangePassword onClose={handleCloseForgotPasswordModal} />
)}
                    {renderForm()}
                </div>
            </div>
        </div>
    );
}