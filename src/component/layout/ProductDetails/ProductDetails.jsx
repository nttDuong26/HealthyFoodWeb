import React, { useEffect, useState } from 'react';
import './ProductDetails.css';
import Navbar from '../navbar/navbar.jsx';
import Ga from './ASSETS/monga.png';
import Links from './LinksCT/LinksCT.jsx';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import GetDataFromLocalStorage from '../body/getLocalStorage/getLocalStorage';
import { Image } from 'antd';
import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';

export default function ProductDetails({productId, setIsAbateNow}) {

    const [Counter, setCounter] = useState(1)
    const { id } = useParams();
    const [getProductDetail, setGeOProductDetail] = useState([]);


    const handleBuyNow = () => {
        // Lấy thông tin sản phẩm
        const productId = id;
        const quantity = Counter;
        const productName = getProductDetail.tenSP;
        const productPrice = getProductDetail.giaSP;
      
        // const encodedProductPrice = encodeURIComponent(productPrice.toString()); // Chuyển đổi thành chuỗi
        const url = `/abateByNow/${productId}?quantity=${quantity}&productName=${encodeURIComponent(productName)}&productPrice=${productPrice}`;

      if(userData){
   // Chuyển hướng đến trang AbateByNow với thông tin sản phẩm qua URL parameter
   window.location.href = url;
      }
      alert('Vui lòng đăng nhập để mua hàng');
     
      };
  

    const handleIncrement=() => {
        setCounter (Counter + 1)
    };
    const handleDecrement=() => {
        if (Counter > 1){
            setCounter (Counter - 1)
        }   
    };
    const [cartCount, setCartCount] = useState(0);


    useEffect(() => {
        async function getOneProduct(){
            try{
                const responseOneProduct = await axios.get(`http://localhost:3000/v1/Product/${id}`);
                setGeOProductDetail(responseOneProduct.data);
            }catch (error) {
                console.error('Lỗi khi gọi API:', error);
            }
        }getOneProduct();
    }, [id]);

    const userData = GetDataFromLocalStorage('userData');

    const addToCart = async () => {
        try {
            if (userData) {
                const response = await axios.post('http://localhost:3000/v1/Cart/add', {
                    userId: userData.user._id,
                    productId: id,
                    quantity: Counter,
                });
                console.log(response.data);
                // console.log('Them dc r fen');
                
                setCartCount(cartCount + Counter);
                alert('Thêm giỏ hàng thành công');
                
                // window.location.href = '/';
            } else {
                // Xử lý khi không có thông tin người dùng, có thể chuyển hướng đến trang đăng nhập
                console.log('Không có thông tin người dùng');
            alert('Vui lòng đăng nhập để thêm món ăn vào giỏ hàng');

            }

        } catch (error) {
            console.error('Lỗi khi thêm sản phẩm vào giỏ hàng:', error);
        }
    };
    const renderImageToolbar = () => (
        <div className="toolbar-wrapper">
          <DownloadOutlined onClick={onDownload} />
          {/* Các biểu tượng và các hàm xử lý khác tương tự như trong ví dụ App */}
        </div>
      );
   
      const onDownload = () => {
        // Hàm xử lý tải ảnh tương tự như trong ví dụ App
      };
  return (
    <div className ='ProductDetails'>
        <div className="ProductDetails-nav">
            <Navbar/>
        </div>
        <div className="mainmenu-link">
            <Links/>
        </div>
        
        
        <div className="ProductDetails-content" >
            <div className="ProductDetailsLeft" style = {{paddingLeft: '7vw'}}>
                <div className="ProductDetails-pic" >
                        <img src={`http://localhost:3000/v1/Image/${getProductDetail?.hinhanh}`} alt="monga"  />
{/* 
                        <Image
            
              src={`http://localhost:3000/v1/Image/${getProductDetail?.hinhanh}`}
              alt="Hình ảnh sản phẩm"
              preview={{ mask: renderImageToolbar }}
              
            /> */}
                </div>
                <div className="ProductDetails-inf">
                    <div className="ProductDetails-title">
                        {/* <span className="ten-mon">Tên món ăn: </span>     */}
                        <span className="ten-monan" >{getProductDetail.tenSP}</span>
                    </div>
                    <div className="ProductDetails-title">
                        <span className="gia-mon">$:{getProductDetail.giaSP}.000đ</span>
                    </div>
                    <div className="soluong-mon">
                        <span className="sl-mon">Số lượng</span>
                        <div className="soluong-monbtn">
                            <button className="giam-sl" onClick ={handleDecrement} >-</button>
                            <input type="value" className="sl" value = {Counter} />
                            <button className="tang-sl" onClick={handleIncrement}>+</button>
                        </div>
                        
                    </div>
                    <div className="ProductDetails-btn">    
                        <button className="them-giohang"  onClick={addToCart} >Thêm vào giỏ hàng</button>
                        {/* <Link to = {"/abateByNow/${id}"}> */}
                        <button className="muangay" onClick={handleBuyNow} >Mua ngay</button>

                        {/* </Link> */}
                    </div>
                </div>
            </div>
             
                {/* <div className="ProductDetails-right">
                    <div className="ProductDetails-right-title">CÓ THỂ BẠN CHƯA BIẾT </div>
                    <nav>
                        <ul>
                            <li className="ProductDetails-item">
                                <img src={Ga} alt="công thức món gà" className="item-pic1"/>
                                <span>Mách bạn công thức làm món chả ức gà siêu ngon</span>
                            </li>
                            <li className="ProductDetails-item">
                                <img src={Ga} alt="công thức món gà" className="item-pic1"/>
                                <span>Mách bạn công thức làm món chả ức gà siêu ngon</span>
                            </li>
                            <li className="ProductDetails-item">
                                <img src={Ga} alt="công thức món gà" className="item-pic1"/>
                                <span>Mách bạn công thức làm món chả ức gà siêu ngon</span>
                            </li>
                            <li className="ProductDetails-item">
                                <img src={Ga} alt="công thức món gà" className="item-pic1"/>
                                <span>Mách bạn công thức làm món chả ức gà siêu ngon</span>
                            </li>
                            <li className="ProductDetails-itemend">
                                <img src={Ga} alt="công thức món gà" className="item-pic1"/>
                                <span>Mách bạn công thức làm món chả ức gà siêu ngon</span>
                            </li>
                        </ul>
                    </nav>
                </div> */}
                
            </div>
            {/* ))} */}


        <div className="ProductDetails-Mota">
            <div className="Mota-title">
                <span className="Mota"> MÔ TẢ MÓN ĂN </span>
            </div>
            <div className="Mota-content">
                <p>
                   {getProductDetail.motaSP}
                </p>
                <h3>Thành phần: :</h3>
                <p> {getProductDetail.nguyenlieu}</p>
                <h3>Khẩu phần:</h3>
                <p>1 người</p>
                <h3>Năng lượng: </h3>
                <p>Protein - {getProductDetail.cxo}, Carbs - 55.2, Fat - { getProductDetail.cbeo} (Total Kcal -  {getProductDetail.calo})</p>
            </div>
        </div>
    </div>
  )
}
