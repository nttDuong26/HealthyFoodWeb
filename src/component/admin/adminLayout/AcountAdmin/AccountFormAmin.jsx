import React, { useState } from 'react';
// import './AcountForm.css';
import LoginIcon from '@mui/icons-material/Login';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
import { Link } from 'react-router-dom';
// import Login from '../login/login.jsx';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  GetDataFromLocalStorage  from '../../../layout/body/getLocalStorage/getLocalStorage';
import SupervisorAccountOutlinedIcon from '@mui/icons-material/SupervisorAccountOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';


export default function AcountForm() {

    const userData = GetDataFromLocalStorage('userData');
    const [isOpenDN, setIsOpenDN] = useState(false);
    console.log(userData); // Add this line to check the userData object
    const isAdmin = userData && userData.user.role === 'admin';
    const hanleDNClick = () =>{
        setIsOpenDN(!isOpenDN);
    };
    const scrollToTopLogin = () => {
        window.scrollTo(0, 0);
    };
    const scrollToTopRe = () => {
        window.scrollTo(0, 0);
    };

    // đăng xuất khỏi server trái đất
    const handleLogout = () => {
        localStorage.removeItem('userData'); // Xóa dữ liệu người dùng khỏi localStorage
        // setUser(null); // Đặt giá trị người dùng trong state về null
    };

  return (
    <div className ="AcountForm">
        <div className="AcountFormDN "
            // onClick = {hanleDNClick}
           
        >
         {userData ? (
            <Link to={"/body"}
                onClick={scrollToTopLogin}
                className="AcountFormDN-tt"
                style = {{
                    height: '3vw',     color: 'black'         }}>

                <SupervisorAccountOutlinedIcon/> Trang người dùng
            </Link>
        ) : (
            <Link to={"/login"}
                onClick={scrollToTopLogin} 
                className="AcountFormDN-tt"
                style = {{
                    height: '3vw',            }}>
                <LoginIcon/> Đăng nhập
            </Link>
        )}
        </div>

        <div className="AcountFormDK">
            {userData ? 
            (
            <Link to={"/login"} 
                onClick={handleLogout}
                className="AcountFormDN-tt"
                style = {{
                    height: '3vw', 
                    color: 'black'           }}>
                <LogoutOutlinedIcon/>Đăng xuất
            </Link>
            ) : (
            <Link to={"/"} 
                onClick={scrollToTopRe}
                className="AcountFormDN-tt" style = {{
                    height: '3vw',            }}>
                <PersonAddAltIcon/>Đăng ký
            </Link>
            )
            }
        </div>
    </div>
  )
}
