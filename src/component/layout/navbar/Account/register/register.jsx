import React, { useState } from 'react';
import './register.css';
import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import FacebookOutlinedIcon from '@mui/icons-material/FacebookOutlined';
import GoogleIcon from '@mui/icons-material/Google';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';


export default function Register() {

    function handleClick(event) {
        event.preventDefault();
        console.info('You clicked a breadcrumb.');
        }
        const [value, setValue] = React.useState(0);

        const handleChange = (event, newValue) => {
          setValue(newValue);
        };
        

        const [isShowPass, setIsShowPass] = useState(false);

        const [isShowConfirmPass, setIsShowConfirmPass] = useState(false);

        const [isIconVisible, setIsIconVisible] = useState(false);

        const [isConfirmIconVisible, setIsConfirmIconVisible] = useState(false);


        
        
    const renderForm = () =>{
        if (value ===0)
            return (
<div className="login-form">
                        <div className="login-form-title">
                            <span> ĐĂNG KÝ </span>
                        </div>

                        <div class="signin-group">
                        <input
                            type="text"
                            name="username"
                            className="signin-input"
                            placeholder=" Họ và Tên"
                            // value={username}
                            // onChange={handleOnchangeName}
                        />
                            <input type="text" name="username" class="signin-input" placeholder =  " Số điện thoại"/>
                            <div class="input-container">
                                <input type={isShowPass ? "text" : "password"} name="pass" className="signin-input" placeholder="Nhập mật khẩu" />
                                <i
                                    onClick={() => {
                                        setIsShowPass(!isShowPass);
                                        setIsIconVisible(!isIconVisible);
                                    }}
                                    className="icon"
                                    >
                                    {isIconVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </i>

                            </div>

                            <div class="input-container">
                            <input type={isShowConfirmPass ? "text" : "password"} name="pass" className="signin-input" placeholder="Nhập lại mật khẩu" />
                                {/* <i onClick={() => setIsShowConfirmPass(!isShowConfirmPass)} className="icon"><VisibilityOffIcon /></i> */}
                                <i
                                    onClick={() => {
                                        setIsShowConfirmPass(!isShowConfirmPass);
                                        setIsConfirmIconVisible(!isConfirmIconVisible);
                                    }}
                                    className="icon"
                                    >
                                    {isConfirmIconVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </i>
                            </div>
                        </div>
                        <div class="sigin_in">
                            <button type="submit">ĐĂNG KÝ</button>
                        </div> 

                        <div class="signinform-line">
                            <div class="signin-line__line">Hoặc</div>
                        </div>
                        <div class="signin-form__social">
                            <a href="" class="signin__social-f">Kết nối với
                                <FacebookOutlinedIcon/>
                            </a>
                            <a href="" class="signin__social-g">Kết nối với 
                                <GoogleIcon/>
                            </a>
                        </div>
                        
                    </div>
                
            )
            else{
                return (
                    <div className="login-form ">
                    <div className="login-form-title">
                        <span> ĐĂNG NHẬP </span>
                    </div>
                    {/* <div className="login-form-input">
                        <input type="text" className="phone" placeholder = 'Nhập số điện thoại' />
                        <input type="pass" className="pass" placeholder = 'Nhập mật khẩu' />
                        <button type="submit">ĐĂNG NHẬP</button>
                        <span> <hr className="gach" />Hoặc</span>
                        <button type="submit">Đăng nhập bằng Facebook <FacebookOutlinedIcon/> </button>
                        <button type="submit">Dăng nhâp bằng Google <GoogleIcon/> </button>
                    </div> */}
                        <div class="signin-group">
                            <input type="text" name="username" class="signin-input" placeholder =  " Số điện thoại"/>
                            
                            <div class="input-container">
                                <input type={isShowPass ? "text" : "password"} name="pass" className="signin-input" placeholder="Nhập mật khẩu" />
                                <i
                                    onClick={() => {
                                        setIsShowPass(!isShowPass);
                                        setIsIconVisible(!isShowPass);
                                    }}
                                    className="icon"
                                    >
                                    {isIconVisible ? <VisibilityIcon /> : <VisibilityOffIcon />}
                                </i>

                            </div>
                        </div>
                    <div class="sigin_in">
                        <button type="submit">ĐĂNG NHẬP</button>
                    </div> 

                    <div class="signinform-line">
                        <div class="signin-line__line">Hoặc</div>
                    </div>
                    <div class="signin-form__social">
                        <a href="" class="signin__social-f">Kết nối với
                            <FacebookOutlinedIcon/>
                        </a>
                        <a href="" class="signin__social-g">Kết nối với 
                            <GoogleIcon/>
                        </a>
                    </div>

                </div>
                    
                )
            } 
    };
    return (
        <div className = 'login'>
            <div className="login-link">
                <div role="presentation" onClick={handleClick}>
                    <Breadcrumbs aria-label="breadcrumb" >
                        <Link underline="hover"  href="#" sx = {{color: '#fff', paddingLeft: 10}}>
                        Trang chủ 
                        </Link>
                        <Typography sx = {{color: '#d69c52'}}>Đăng ký tài khoản</Typography>
                    </Breadcrumbs>
                </div>
            </div>
            <div className="login-content">
                <div className=" login-form login_re">
                    <Tabs  value={value} onChange={handleChange} centered>
                        <Tab label="Đăng ký" 
                         sx={{
                            color: value === 0 ? '#d69c52' : 'white',
                            '&.Mui-selected': {
                              color: '#d69c52',
                              borderBottom: '2px solid #d69c52',
                            },
                          }}/>
                        <Tab label="Đăng nhập" 
                         sx={{
                            color: value === 1 ? '#d69c52' : 'white',
                            '&.Mui-selected': {
                              color: '#d69c52',
                              borderBottom: '2px solid #d69c52',
                            },
                          }}/>
                    </Tabs>
                    {renderForm()}
                </div>
            </div>
            
        </div>

    )
}
