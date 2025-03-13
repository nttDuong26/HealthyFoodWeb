import React from 'react'
import Disk from './ASSETS/disk.png';
import Ga from './ASSETS/monga.png';
import './FeaturedProducts.css';
import { Link } from 'react-router-dom';
import AddShoppingCartOutlinedIcon from '@mui/icons-material/AddShoppingCartOutlined';



export default function FeaturedProducts() {

    const scrollToTopChitietsp = () => {
        window.scrollTo(0, 0);
      };

  return (
    <div className ='FeaturedProducts'>
        <div className="FeaturedProducts-tieude">
            <span>
                <img src= {Disk} alt="disk-logo" />
                    Món ăn nổi bậc
                <img src= {Disk} alt="disk-logo" />
            </span>
        </div>

        <div className="FeaturedProductsAll">    
            <div className="FeaturedProducts-sp">
                <div className="FeaturedProductsHinh">
                    <Link to = {"/ProductDetails"} onClick ={scrollToTopChitietsp}>
                        <img src={Ga} alt="" />
                    </Link>
                </div>
                <div className="FeaturedProductsTen">
                    <span> Salad rau mùa sốt cam</span>
                </div>
                <div className="FeaturedProductsGia">
                    68.000d
                </div>
                <div className="FeaturedProductsXem">
                    <Link to = {"/ProductDetails"}onClick ={scrollToTopChitietsp}>
                        <button> Xem Chi Tiết</button>
                    </Link>
                </div>
            </div>

            <div className="FeaturedProducts-sp">
                <div className="FeaturedProductsHinh">
                    <Link to = {"/ProductDetails"} onClick ={scrollToTopChitietsp}>
                        <img src={Ga} alt="" />
                    </Link>
                </div>
                <div className="FeaturedProductsTen">
                    <span> Salad rau mùa sốt cam</span>
                </div>
                <div className="FeaturedProductsGia">
                    68.000d
                </div>
                <div className="FeaturedProductsXem">
                    <Link to = {"/ProductDetails"}onClick ={scrollToTopChitietsp}>
                        <button> Xem Chi Tiết</button>
                    </Link>
                </div>
            </div>

            <div className="FeaturedProducts-sp">
             <div className="FeaturedProductsHinh">
                    <Link to = {"/ProductDetails"} onClick ={scrollToTopChitietsp}>
                        <img src={Ga} alt="" />
                    </Link>

                </div>
                <div className="FeaturedProductsTen">
                    <span> Salad rau mùa sốt cam</span>
                </div>
                <div className="FeaturedProductsGia">
                    68.000d
                </div>
                <div className="FeaturedProductsXem">
                    <button> Xem Chi Tiết</button>
                </div>
            </div>

            <div className="FeaturedProducts-sp">
                <div className="FeaturedProductsHinh">
                    <Link to = {"/ProductDetails"} onClick ={scrollToTopChitietsp}>
                        <img src={Ga} alt="" />
                    </Link>
                </div>
                <div className="FeaturedProductsTen">
                    <span> Salad rau mùa sốt cam</span>
                </div>
                <div className="FeaturedProductsGia">
                    68.000d
                </div>
                <div className="FeaturedProductsXem">
                    <button> Xem Chi Tiết</button>
                </div>
            </div>

            <div className="FeaturedProducts-sp">
                <div className="FeaturedProductsHinh">
                    <Link to = {"/ProductDetails"} onClick ={scrollToTopChitietsp}>
                        <img src={Ga} alt="" />
                    </Link>
                </div>
                <div className="FeaturedProductsTen">
                    <span> Salad rau mùa sốt cam</span>
                </div>
                <div className="FeaturedProductsGia">
                    68.000d
                </div>
                <div className="FeaturedProductsXem">
                    <button> Xem Chi Tiết</button>
                </div>
            </div>

        </div>
    </div>
  )
}
