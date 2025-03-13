import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Image } from 'antd';
import './getProductItem.css';

import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';


export default function ProductItem({setIsProductItempage, id, closeModalProductItem }) {
  // const { id } = useParams();
  const [productDetail, setProductDetail] = useState(null);
  const [categoryDetail, setCategoryDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    async function fetchProductDetail() {
      try {
        const response = await axios.get(`http://localhost:3000/v1/Product/${id}`);

        setProductDetail(response.data);
 

        if (response.data.categories && response.data.categories.length > 0) {
          const categoryIds = response.data.categories; // Danh sách các ID danh mục của sản phẩm
          const categoryResponses = await Promise.all(categoryIds.map(async (categoryId) => {
            const categoryResponse = await axios.get(`http://localhost:3000/v1/ProductCategories/${categoryId}`);
            return categoryResponse.data;
          }));
          setCategoryDetail(categoryResponses); // setCategoryDetails là một hàm để lưu danh sách các danh mục của sản phẩm
        }

        setIsLoading(false);
        setIsProductItempage(true);
        closeModalProductItem();
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        setIsLoading(false);
      }
    }

    fetchProductDetail();
  }, [closeModalProductItem, id, setIsProductItempage]);

  const renderImageToolbar = () => (
    <div className="toolbar-wrapper" style={{ width: '50%'}}>
      <DownloadOutlined onClick={onDownload} />
      {/* Các biểu tượng và các hàm xử lý khác tương tự như trong ví dụ App */}
    </div>
  );

  const onDownload = () => {
    // Hàm xử lý tải ảnh tương tự như trong ví dụ App
  };
  return (
    <div>
      {isLoading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div>    
    
          <div classname = 'itemimgtengia'  style={{ display: 'flex'   }}>
            <Image
                style={{ width: '80%', height: '90%', marginTop: '1vw' }}
                src={`http://localhost:3000/v1/Image/${productDetail?.hinhanh}`}
                alt="Hình ảnh sản phẩm"
                preview={{ mask: renderImageToolbar }}
              />

          <div classname = 'itemimgtengia_nho' style={{ width: '75%'   }}> 
             <p >Tên: 
             {/* <br /> */}
                {productDetail.tenSP}
            </p>
             <p>Giá: {productDetail.giaSP} VND</p>
              {/* <p>Trạng thái: {productDetail.trangthai}</p> */}
                    <p>
                      Trạng thái: {productDetail.trangthai ? 'Mở bán' : 'Ngưng phục vụ'}
                    </p>

              {/* <p>Danh mục: {categoryDetail ? categoryDetail.tenDM : 'Không có danh mục'}</p> */}
              <div style = {{display: 'flex'}}>
              <p>Danh mục:</p>
              <div>
              {categoryDetail && categoryDetail.map(category => (
                    <p key={category._id}> {category.tenDM}</p>
                  ))}
                  </div>
                     </div>
              <p>Ngày thêm: {productDetail.ngaythem}</p>

          </div>
          </div>
          <div>
            <span>Giá trị dinh dưỡng:</span>
            <div 
              style={{ 
                display: 'flex',
                justifyContent: 'space-evenly',
                flexWrap: 'nowrap',
                alignItems: 'center', 
                }} 
              >
              <p> Calories: {productDetail.calo}</p>
                <p>Chất xơ: {productDetail.cxo}</p>
                <p>Chất đam: {productDetail.cdam}</p>
                <p>Chất béo: {productDetail.cbeo}</p>
            </div>
             
          </div>
          
          <p>Nguyên liệu: {productDetail.nguyenlieu}</p>

          <p>Mô tả: {productDetail.motaSP}</p>
          
        </div>
      )}
    </div>
  );
}
