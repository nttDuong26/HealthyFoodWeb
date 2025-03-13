import React, { useEffect, useState } from 'react';
import Disk from './ASSETS/disk.png';
import './Mymenu.css';
import Ga from './ASSETS/monga.png';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';
import GetDataFromLocalStorage from '../getLocalStorage/getLocalStorage';


export default function Mymenu() {
    const scrollToTopChitietsp = () => {
        window.scrollTo(0, 0);
      };
      const { id } = useParams();

      const [getProductDetail, setGetProductDetail] = useState([]);
      const [getOneProductDetail, setGetOneProductDetail] = useState([]);


      useEffect(() =>{
        async function getProductName(){
            try{
                const response = await axios.get(`http://localhost:3000/v1/Product?page=1&pageSize=5`);
                setGetProductDetail(response.data);
            }catch (error) {
                console.error('Lỗi khi gọi API:', error);
              }
        }getProductName();


        async function getOneProductName(){
            try{
                const responseOneProduct = await axios.get(`http://localhost:3000/v1/Product/${id}`);
                setGetOneProductDetail(responseOneProduct.data);
            }catch (error) {
                console.error('Lỗi khi gọi API:', error);
              }
        }getOneProductName();
    }, [id]);

    const userData = GetDataFromLocalStorage('userData');
    const [cartCount, setCartCount] = useState(0);

    const [Counter, setCounter] = useState(1)
    const addToCart = async (productId) => {
        try {
            if (userData) {
                const response = await axios.post(`http://localhost:3000/v1/Cart/add`, {
                    userId: userData.user._id,
                    productId: productId,
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

  return (
    <div className = 'Mymenu'>
        <div className="Mymenu-tieude">
            <span>
                <img src= {Disk} alt="disk-logo" />
                    Món ăn nổi bật
                <img src= {Disk} alt="disk-logo" />
            </span>
        </div>
    

        <div className="MenuAll">
        {getOneProductDetail && getProductDetail.map((product) => (
            <div className="Mymenu-sp" key={product._id}>
                <div className="menuHinh">
                
                    <Link to={`/Product/${product._id}`} onClick={scrollToTopChitietsp}>
                        {/* <img src={Ga} alt="" />
                         */}
                         <img src={`http://localhost:3000/v1/Image/${product?.hinhanh}`} alt="Hình ảnh sản phẩm" />
                    </Link>
                    {product.trangthai ? (
                                    <div className="overlay" onClick={() => addToCart(product._id)} >
                                        <span className="cartIcon"><AddShoppingCartOutlinedIcon /></span>
                                    </div>
                                    ) : (
                                        <div className="overlay" onClick={() => addToCart(product._id)} >
                                        <span className="cartIcon" >Hết</span>
                                    </div>
                                    
                                )}
                </div>
                <div className="menuTen">
                    <span>{product.tenSP}</span>
                </div>
                <div className="menuGia">
                    <span>{product.giaSP}.000đ</span>
                </div>
                <div className="menuXem">
                    <Link to={`/ProductDetails/${product._id}`} onClick={scrollToTopChitietsp}>
                        <button> Xem Chi Tiết</button>
                    </Link>
                </div>
            </div>
        ))}
            
        </div>

    </div>
  )
}
 