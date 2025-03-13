import React from 'react';
import './navbar.css';
import logo from './ASSETS/logo.png';
import Cart from './cart/cart.jsx';
import Account from './Account/Account.jsx';
import SearchAppBar from '../searchbar/searchbar';
import Menu from '../subnav/menu/menu.jsx';
import Home from '../subnav/home/home.jsx';
import Sale from '../subnav/sale/sale.jsx';
import Book from '../subnav/checkBody/book.jsx';
import Contact from '../subnav/contact/contact.jsx';
import { Link } from 'react-router-dom';
import { useLayoutEffect } from 'react';
import GetDataFromLocalStorage from '../body/getLocalStorage/getLocalStorage';
import ListRoundedIcon from '@mui/icons-material/ListRounded';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';




export default function Navbar() {

  const handleShopCartClick = (event) => {
    if (!userData) {
      event.preventDefault(); // Ngăn chặn chuyển hướng khi không đăng nhập
    }
  };

    const scrollToTop = () => {
        window.scrollTo(0, 0);
      };
      const scrollToTopTC = () => {
        window.scrollTo(0, 0);
      };
        const scrollToTopMenu = () => {
        window.scrollTo(0, 0);
      };
    const userData = GetDataFromLocalStorage('userData');

    return (
        /* PC */
        <div className="nav">
            <nav className="navbar">
                <div className="navbarPC" >
                    <div className='logo-header'>
                        <Link to={"/body"} onClick={scrollToTop}>
                            <img src={logo} alt="Logo" />
                        </Link>
                    </div>
    
                <div className="subnav-menu">
                    <ul>
                        <li>
                            <Link to={"/body"} onClick={scrollToTopTC}>
                                <Home />
                            </Link>
                        </li>
                        <li>
                            <Link to={"/mainmenu"} onClick={scrollToTopMenu}>
                                <Menu />
                            </Link>
                        </li>
                        <li>
                            <a href="#"><Sale /></a>
                        </li>
                        <li>
                            <a href="#"><Book /></a>
                        </li>
                        <li>
                            <a href="#"><Contact /></a>
                        </li>
                    </ul>
                </div>
                </div>
                
                <label className="nav_mobile"  htmlFor="navbaeBb-input">
                    <ListRoundedIcon sx={{ width: '15vw', height: '5vw', color: 'white' }} />
                </label>
                
                <div className='icons-header'>
                    <a href="#" className='icons-search'>
                        <SearchAppBar />
                    </a>
    
                    <Link to={userData ? '/shopCart' : '/'} onClick={handleShopCartClick} className='icons-cart'>
                        <Cart />
                    </Link>
                    {userData ? (
                        <a href="#" className="icons-acc">
                            <Account />
                            <span>{userData.user.tenND}</span>
                        </a>
                    ) : (
                        <a href="#" className='icons-acc'>
                            <Account />
                        </a>
                    )}
                </div>

            </nav>



            <input type = "checkbox" hidden name = "" id = "navbaeBb-input" className = "navInput"/>
            <label className="overLay" htmlFor="navbaeBb-input" ></label>

            <div className="navbarMb" >
                <label className="navMb_close" htmlFor="navbaeBb-input" >
                        <ClearOutlinedIcon sx={{ width: '15vw', height: '5vw'}}/>
                </label>
                    <div className='logo-headerMb'>
                        <Link to={"/body"} onClick={scrollToTop}>
                            <img src={logo} alt="Logo" />
                        </Link>
                    </div>
    
                <div className="subnav-menuMb">
                    <ul>
                        <li>
                            <Link to={"/body"} onClick={scrollToTopTC}>
                                Trang chủ
                            </Link>
                        </li>
                        <li>
                            <Link to={"/mainmenu"} onClick={scrollToTopMenu}>
                                Thực đơn
                            </Link>
                        </li>
                        <li>
                            <a href="#">Khuyến mãi </a>
                        </li>
                        <li>
                            <a href="#">Kiểm tra </a>
                        </li>
                        <li>
                            <a href="#">Liên hệ</a>
                        </li>
                    </ul>
                </div>
                </div>
            
        </div>
    );
}