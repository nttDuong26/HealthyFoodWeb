import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import DelCategory from './DelCategory';
import { Table } from 'antd';
import { Button, Modal } from 'antd';
import AdCategory from './adCategory';
import {  Popconfirm } from 'antd';
import CategoryDetailPage from './getCategories';
import PutCategory from './putCategory';

const GetCategory = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState(null); 
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isDetailModalVisible, setIsDetailModalVisible] = useState(false);
  const [isModalCategoryOpen, setIsModalCategoryOpen] = useState(false);
  const [isModalPutCategoryOpen, setIsModalPutCategoryOpen] = useState(false);
  const [isSelectedPutCategoryId, setSelectedPutCategoryId] = useState(null); 


  

  const showModal = () => {
    setIsModalOpen(true);
  };
  const showModalCategory = (categoryId) => {
    setIsModalCategoryOpen(true);
    setSelectedCategoryId(categoryId)
  }

  const showModalPutCategory = (categoryId) => {
    setIsModalPutCategoryOpen(true);
    setSelectedPutCategoryId(categoryId)
  }
  const showModalXoa = () => {
 
    setIsModalVisible(true);
  };

  const handleOk = () => {
    // Xử lý logic khi xác nhận xóa danh mục
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };


  useEffect(() => {
    async function fetchCategoryData() {
      try {
        const response = await axios.get('http://localhost:3000/v1/ProductCategories/');
        setCategories(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    }

    fetchCategoryData();
  }, []);

  const handleCateDelete = async (categoriesId) => {
    try{
        const response = await axios.delete(`http://localhost:3000/v1/ProductCategories/${categoriesId}`);
        setCategories((prevCategories) => prevCategories.filter((categories) => categories._id !== categoriesId));
        console.log('Xóa đơn hàng thành công:',categoriesId);
         }catch (error) {
          console.error('Lỗi khi xóa sản phẩm:', error);
        }
  }


  const columns = [
    {
      title: 'STT',
      dataIndex: '_id',
      key: '_id',
      render: (text, record, index) => index + 1,
    },
    {
      title: 'Tên Danh Mục',
      dataIndex: 'tenDM',
      key: 'tenDM',
      filters: [
        { text: 'Món khai vị', value: 'Khai vị' },
        { text: 'Món chính', value: 'món chính' },
        { text: 'Món tráng miệng', value: 'tráng miệng' },
        { text: 'Thức uống', value: 'thức uống' },


        // ...Thêm các giá trị lọc khác nếu cần
      ],
      onFilter: (value, record) => record.tenDM === value,
    },
    {
      title: 'Hình Ảnh',
      dataIndex: 'hinhanhDM',
      key: 'hinhanhDM',
      render: (hinhanhDM) => <img style={{ width: '80px', height: '50px' }} src={`http://localhost:3000/v1/Image/${hinhanhDM}`} alt="Hình ảnh sản phẩm" />,
    },

    {
      title: 'Thao tác',
      key: 'actions',
      align: 'center',
      render: (_, record) => (
        <span>
          <Button onClick={() => showModalCategory(record._id)} type="danger">  Xem</Button>
          <Popconfirm title="Xác nhận xóa?" onConfirm={() => handleCateDelete(record._id)}>
            <a style={{ color: '', marginLeft: '5px' }}>Xóa</a>
          </Popconfirm> 
          <Button onClick={() => showModalPutCategory(record._id)} type="danger">  Sửa </Button>

        </span>
      ),
    },
  ];

  // const handleCateDelete = (categoryId) => {
  //   setCategories((prevCategories) => prevCategories.filter((category) => category._id !== categoryId));
  // };

  return (
    <div>
      {isLoading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div>
          <Button type="primary" onClick={showModal} style = {{
            backgroundColor: "#d69c52"
          }}>
            Thêm danh mục +
          </Button>
          <Modal
              title="Thêm Danh Mục"
              visible={isModalOpen}
              onCancel={() => setIsModalOpen(false)}
              footer={null}
              bodyStyle={{
                display: 'flex',
                height: '20vw',
                flexDirection: 'column',
                alignItems: 'stretch', // Dãn các phần tử con theo chiều dọc
                gap: '10px', // Khoảng cách giữa các phần tử
              }}
            >
              <AdCategory closeModal={() => setIsModalVisible(false)} />
            </Modal>
          <h1>Danh sách danh mục</h1>
          <Table columns={columns} dataSource={categories} pagination={false} />

          <Modal 
              title="Chi tiết danh mục"
              visible={isModalCategoryOpen}
              onCancel={() => setIsModalCategoryOpen(false)}
              footer={null}
              style={{ top: '15%'}}
              bodyStyle={{ overflowY: 'auto', overflowX: 'hidden', maxHeight: 'calc(100vh - 200px)' }}
            >
              {selectedCategoryId && <CategoryDetailPage id={selectedCategoryId} closeModalCategory={() => setIsModalCategoryOpen(false)} />}
            </Modal>

            
          <Modal 
              title="Chỉnh sửa danh mục"
              visible={isModalPutCategoryOpen}
              onCancel={() => setIsModalPutCategoryOpen(false)}
              footer={null}
              style={{ top: '15%'}}
              bodyStyle={{ overflowY: 'auto', overflowX: 'hidden', maxHeight: 'calc(100vh - 200px)' }}
            >
              {isSelectedPutCategoryId && <PutCategory id={isSelectedPutCategoryId} closeModalPutCategory={() => setIsModalPutCategoryOpen(false)} />}
            </Modal>

        </div>
      )}
      {/* <Modal title="Xác nhận xóa danh mục" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
        {selectedCategoryId && <DelCategory categoriesId={selectedCategoryId} onCateDelete={handleCateDelete} />}
      </Modal> */}
    </div>
  );
};


export default GetCategory;

