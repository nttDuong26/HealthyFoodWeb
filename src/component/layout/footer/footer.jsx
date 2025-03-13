import React from 'react';
import './footer.css';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import YouTubeIcon from '@mui/icons-material/YouTube';
import Logo from './ASSETS/logo.png';
import { PayPalButton } from "react-paypal-button-v2";


export default function Footer() {
  return (
    <footer className = 'Footer'>
        <div className ='wrapper'> 
            <div className = 'content-container'>
                <div className = 'links'>
                    <a href = "#" className = 'logo-footer'>
                        <img src={Logo} alt="Logo-footer" />
                    </a>  
                    <div className="footer-title">
                        <span >
                            Nhà hàng chúng tôi luôn luôn đặt khách hàng lên hàng đầu, tận tâm phục vụ,
                            mang lại cho khách hàng những trãi nghiệm tuyệt với nhất. 
                            Các món ăn với công thức độc quyền sẽ mang lại hương vị mới mẻ cho thực khách. 
                            Tiệm ăn nhà Táo xin chân thành cảm ơn.
                        </span>
                    </div>    
                </div>
                <div className="footer-right">
                    <div className = 'footer-link1'>
                        <h3>Cửa hàng chính</h3>
                        <ul>
                            <li>
                                <a href = "#">Địa chỉ: Đ.3/2, p.Xuân Khánh, q.Ninh Kiều, tp.Cần Thơ</a>
                            </li>
                            <li>
                                <a href = "#">Email: nttd2603@gmail.com</a>
                            </li>
                            <li>
                                <a href = "#">Hotline: 0523433128</a>
                            </li>
                        </ul>
                    </div>
               
                    <div className = 'footer-link1'>
                        <h3>HƯỚNG DẪN</h3>
                        <ul>
                            <li>
                                <a href = "hd-mh">Hướng dẫn mua hàng</a>
                            </li>
                            <li>
                                <a href = "payfooter">Hưỡng dẫn thanh toán</a>
                            </li>
                            <li>
                                <a href = "#">Đăng kí thành viên</a>
                            </li>
                            <li>
                                <a href = "#">Hỗ trợ khách hàng</a>
                            </li>
                        </ul>
                    </div>

                    <div className = 'footer-link1'>
                        {/* <div className="footer-mxh">
                            <h3>MẠNG XÃ HỘI</h3>
                            <div className="footericon">
                                <a href = "#">
                                    <FacebookIcon/>
                                </a>
                            
                                <a href = "#">
                                    <InstagramIcon/>
                                </a>
                            
                                <a href = "#">
                                    <YouTubeIcon/>
                                </a>
                            </div>
                            </div> */}
                        
                        <div className="footer-pay">
                        <h3>HÌNH THỨC THANH TOÁN</h3>
                        <a href = "#">
                            <PayPalButton/>
                        </a>
                    
                        
                        </div>
                  
                        
                        
                    </div>
                </div>

{/*                     
                    <div className = 'footer-link1'>

                </div>         */}

            
            </div>
        </div>
    </footer>
  )
}


