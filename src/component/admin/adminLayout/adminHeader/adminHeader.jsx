import React from 'react';
import Logo from './ASSET/logo.png';
import { Link } from 'react-router-dom';
// import {  UserOutlined } from '@ant-design/icons';
import Account from '../AcountAdmin/AcountAmin';
import './adminHeader.css';
import GetDataFromLocalStorage from '../../../layout/body/getLocalStorage/getLocalStorage';



export default function AdminHeader() {

    const userData = GetDataFromLocalStorage('userData');
   
    const scrollToTop = () => {
        window.scrollTo(0, 0);
      };
    //   const scrollToTopTC = () => {
    //     window.scrollTo(0, 0);
    //   };
    //     const scrollToTopMenu = () => {
    //     window.scrollTo(0, 0);
    //   };

  return (
   <nav className = 'AdHeader'>
        <div className = 'logo-headerAd'>
            <Link to={"/adminPage"} onClick={scrollToTop} >
                <img src={Logo} alt="Logo" />
            </Link>   
            {/* <UserOutlined/> */}
        </div>

       
    </nav>
  )
}


