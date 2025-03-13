import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, Modal, Table, Popconfirm } from 'antd';
import DeleteProduct from './DelProduct';
import AdProduct from './AdProduct';
import ProductItem from './getProductItem';
import PutProduct from './PutProduct';
import { SearchOutlined } from '@ant-design/icons';


export default function GetProduct() {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalItem, setIsModalItem] = useState(false);
  const [isModalPutItem, setIsModalPutItem] = useState(false);
  const [selectedPutProductId, setSelectedPutProductId] = useState(null);
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [newProduct, setNewProduct] = useState(null);

  const showModalProductItem = (productId) => {
    setSelectedProductId(productId);
    setIsModalItem(true);
  };

  const updateProductInGetProduct = (updatedProductData) => {
    // Cập nhật state của GetProduct với sản phẩm đã được cập nhật
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product._id === updatedProductData._id ? updatedProductData : product
      )
    );
  };
  

  const showModalPutProduct=(productId) => {
    setIsModalPutItem(true);
    setSelectedPutProductId(productId);
  }
  useEffect(() => {
    async function fetchProductData() {
      try {
        const response = await axios.get('http://localhost:3000/v1/Product/');
        setProducts(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    }

    fetchProductData();
  }, []);


  const handlePrDelete = async (productId) => {
    try{
        const response = await axios.delete(`http://localhost:3000/v1/Product/${productId}`);
        setProducts((prevProducts) => prevProducts.filter((products) => products._id !== productId));
        console.log('Xóa Sản phẩm thành công:',productId);
         }catch (error) {
          console.error('Lỗi khi xóa sản phẩm:', error);
        }
  }
  const updateProductList = (newProduct) => {
    setProducts((prevProducts) => [newProduct, ...prevProducts]);
  };

  const columns = [
    {
      title: 'STT',
      dataIndex: '_id',
      key: '_id',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'hinhanh',
      key: 'hinhanh',
      render: (hinhanh) => <img style={{ width: '80px', height: '50px' }} src={`http://localhost:3000/v1/Image/${hinhanh}`} alt="Hình ảnh sản phẩm" />,
    },
    {
      title: 'Tên Món Ăn',
      dataIndex: 'tenSP',
      key: 'tenSP',
    },
    {
      title: 'Giá Món Ăn',
      dataIndex: 'giaSP',
      key: 'giaSP',
      
      filters: [
        { text: 'Dưới 50.000đ', value: '50-below' },
        { text: '50.000đ - 100.000đ', value: '50-100' },
        { text: 'Trên 100.000đ', value: '100-above' },
      ],
      onFilter: (value, record) => {
        const giaSP = record.giaSP;
        switch (value) {
          case '50-below':
            return giaSP < 50;
          case '50-100':
            return giaSP >= 50 && giaSP <= 100;
          case '100-above':
            return giaSP > 100;
          default:
            return false;
        }
      },
      render: (giaSP) => `${giaSP}.000đ`, // Optional: Display the price with currency symbol
    },
    {
      title: 'Thao tác',
      key: 'action',
      align: 'center',
      render: (text, record) => (
        <span>
           <Button onClick={() => showModalProductItem(record._id)} type="danger">  Xem</Button>
          <Popconfirm title="Xác nhận xóa?" onConfirm={() => handlePrDelete(record._id)}>
            <a type="danger">Xóa</a>
          </Popconfirm>
          {/* <Link to={`/Product/Put/${record._id}`}>Sửa</Link> */}
          <Button onClick={() => showModalPutProduct(record._id)} type="danger">Sửa</Button>
        </span>
      ),
    },
  ];

  return (
    <div>
      <Button type="primary" 
          style = {{
            backgroundColor: "#d69c52"
          }} 
          onClick={() => setIsModalVisible(true)}>
        Thêm sản phẩm +
      </Button>
      <Modal title="Thêm Món Ăn"
            visible={isModalVisible}
            onCancel={() => setIsModalVisible(false)}
            footer={null}
            style={{ top: '15%', position: 'relative' }} // Thêm style position: 'relative'
                bodyStyle={{
                  overflowY: 'auto',
                  overflowX: 'hidden',
                  maxHeight: 'calc(100vh - 200px)',
                }}
      >
       <AdProduct closeModal={() => setIsModalVisible(false)} updateProductList={updateProductList} />
      </Modal>
      <h1>Danh sách Món ăn</h1>
      <Table columns={columns} dataSource={products} pagination={{ pageSize: 5, showSizeChanger: true }} />
        <Modal 
                title="Chi tiết món ăn"
                visible={isModalItem}
                onCancel={() => setIsModalItem(false)}
                footer={null}
                style={{ top: '15%'}}
                bodyStyle={{ overflowY: 'auto',overflowX: 'hidden', maxHeight: 'calc(100vh - 200px)' }}
              >
                {selectedProductId && <ProductItem id={selectedProductId} closeModalProductItem={() => setIsModalItem(false)} />}
        </Modal>

        <Modal 
                title="Chỉnh sửa món ăn"
                visible={isModalPutItem}
                onCancel={() => setIsModalPutItem(false)}
                footer={  <button type="submit"
                style = {{
                //  marginTop: '3vw', 
                //  marginLeft: '75%',
                 padding: '0.8vw  1vw',
                 backgroundColor: '#d69c52',
                 border: 'none',
                 color: '#fff',
                 borderRadius: '5px',
               }}
               >Cập nhật</button>}
                style={{ top: '15%'}}
                bodyStyle={{ overflowY: 'auto',overflowX: 'hidden', maxHeight: 'calc(100vh - 200px)' }}
              >
                {selectedPutProductId && <PutProduct id={selectedPutProductId} closeModalPutProduct={() => setIsModalPutItem(false)}  updateProductInGetProduct={updateProductInGetProduct} />}
        </Modal>
    </div>
  );
}
