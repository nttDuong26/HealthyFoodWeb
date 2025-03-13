import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { Image } from 'antd';
import {
  DownloadOutlined,
  RotateLeftOutlined,
  RotateRightOutlined,
  SwapOutlined,
  ZoomInOutlined,
  ZoomOutOutlined,
} from '@ant-design/icons';
import './catygory.css';


export default function CategoryDetailPage({ setIsCategorypage,  closeModalCategory, id }) {
  // const { id } = useParams();
  const [category, setCategory] = useState(null);
  const [productDetail, setProductDetail] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchCategoryDetail() {
      try {
        const response = await axios.get(`http://localhost:3000/v1/ProductCategories/${id}`);
        setCategory(response.data);

        if (response.data.product && response.data.product.length > 0) {
          const productIds = response.data.product;
          const productResponses = await Promise.all(productIds.map(productId => axios.get(`http://localhost:3000/v1/Product/${productId}`)));
          const productData = productResponses.map(response => response.data);
          setProducts(productData);
        }
        setIsLoading(false);
        setIsCategorypage(true);
        closeModalCategory();
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        setIsLoading(false);
      }
    }
    fetchCategoryDetail();
  }, [setIsCategorypage,  closeModalCategory, id]);

  const renderImageToolbar = () => (
    <div className="toolbar-wrapper" style ={{width: '50%'}}>
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
          
          <div style={{ display: 'flex'   }} >
            <Image
             style={{ width: '80%', height: '90%', marginTop: '1vw' }}
              src={`http://localhost:3000/v1/Image/${category?.hinhanhDM}`}
              alt="Hình ảnh sản phẩm"
              preview={{ mask: renderImageToolbar }}
            />
          <div  classname = 'itemimgtengia_nho' style={{ width: '150%'   }}>
          <p>Tên Danh mục {category ? category.tenDM : 'Không có danh mục'}</p>
          <p>Ngày thêm {category.ngaytao }</p>
          <p>Sản phẩm trong danh mục:</p>
          
          <ul style={{
                      maxHeight: '200px', /* Đặt chiều cao tối đa của danh sách */
                      overflowY: 'auto', /* Thêm thanh cuộn dọc khi cần thiết */
                      listStyle: 'none'
                    }}>
            {products.length > 0 ? (
                  products
                    .filter(product => product.categories.includes(category._id))
                    .map(product => (
                      <li key={product._id}>{product.tenSP}</li>
                    ))
                ) : (
                  <li>Không có sản phẩm</li>
                )}
         
          </ul>
          </div>
          </div>
          
        </div>
      )}
    </div>
  );
}
