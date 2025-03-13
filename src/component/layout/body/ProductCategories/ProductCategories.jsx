import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProductCategories.css';
import Disk from './ASSETS/disk.png';
import CropSquareRoundedIcon from '@mui/icons-material/CropSquareRounded';
import {  Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';


export default function ProductCategories() {

  const [iscategory, setIsCategory] = useState([]);
  const [isLoading, setIsLoading] =  useState(true);
  const { id } = useParams();
  const [category, setCategory]=  useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const nextSlide = () => {
    setCurrentSlide(currentSlide === iscategory.length - 1 ? 0 : currentSlide + 1);
  };
  
  const prevSlide = () => {
    setCurrentSlide(currentSlide === 0 ? iscategory.length - 1 : currentSlide - 1);
  };
  const scrollToTopChitietDM = () => {
    window.scrollTo(0, 0);
  };
  

  useEffect(() => {
    async function categoryData(){
      const response = await axios.get('http://localhost:3000/v1/ProductCategories/');
      setIsCategory(response.data);
      setIsLoading(false);
    }categoryData();

}, []);

  return (
    <div className='ProductCategories'>
      <div className='Categories-title'>
        <span>
          <img src= {Disk} alt="disk-logo" />
            Danh mục nổi bật
          <img src= {Disk} alt="disk-logo" />
        </span>
      </div>
      <div className="CategoriesAll">
        <div className='Categories'>
          { category && iscategory.map((categories) => (
                  <div className="allProductCategories" key = {categories._id}>
                   
                  <div className="Pro-contain" >
                  <a  href={`/CategoryDetails/${categories._id}`} onClick={scrollToTopChitietDM}>
                    <div className="Pro-contain_img">
                  
                        <img  src={`http://localhost:3000/v1/Image/${categories?.hinhanhDM}`} alt="Hình ảnh sản phẩm" />

                    </div>
                    </a >
                    <div className="contain-inf">
                      <span className = 'tieude' >
                        {categories.tenDM}
                      </span>
                      {/* <span className = 'chunho'> Các món ăn được chế biến từ gà, hương vị tươi ngon</span> */}
                    </div> 
                  </div>
                </div>
            ))}
        </div>
      </div>

      <div className="CategoriesAll_Mobile">
        <div className='Categories'>
          {iscategory.map((categories, index) => (
                  <div
                  className={`allProductCategories_mb ${index === currentSlide ? 'activeSlide' : ''}`}
                  key={categories._id}
                >
                  <div className="Pro-contain">
                    <div className="Pro-contain_img">
                        <img  src={`http://localhost:3000/v1/Image/${categories?.hinhanhDM}`} alt="Hình ảnh sản phẩm" />
                    </div>
                    <div className="contain-inf">
                      <span className = 'tieude' >
                        {categories.tenDM}
                      </span>
                      {/* <span className = 'chunho'> Các món ăn được chế biến từ gà, hương vị tươi ngon</span> */}
                    </div> 
                  </div>
                  
                </div>
            ))}
        </div>
        <button className="prevButton" onClick={prevSlide}>‹</button>
        <button className="nextButton" onClick={nextSlide}>›</button>

      </div>
      <div className="CategoriesAll_Tablet">
        <div className='Categories_TL'>
          {iscategory.map((categories, index) => (
                  <div
                  className={`allProductCategories_tl`}
                  key={categories._id}
                >  <Link to={`/CategoryDetails/${categories._id}`} onClick={scrollToTopChitietDM}>
                  <div className="Pro-contain">
                    <div className="Pro-contain_img">
                        <img  src={`http://localhost:3000/v1/Image/${categories?.hinhanhDM}`} alt="Hình ảnh sản phẩm" />
                    </div>
                    <div className="contain-inf">
                      <span className = 'tieude' >
                        {categories.tenDM}
                      </span>
                    </div> 
                  </div>
                  </Link>
                </div>
            ))}
        </div>

      </div>
    </div>
  );
}
