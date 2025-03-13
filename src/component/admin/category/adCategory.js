import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import ImgCrop from 'antd-img-crop';
import { Upload } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import { Input, Button } from 'antd';

export default function AdCategory(props) {
  const [categoryData, setCategoryData] = useState({
    tenDM: '',
  });

  const [newCategory, setNewCategory] = useState(null);
  const [fileList, setFileList] = useState([]);

  const handleCateChange = (e) => {
    const { name, value } = e.target;
    setCategoryData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const onChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const onPreview = async (file) => {
    // Mã xem trước hình ảnh nếu cần
  };

  const handleCateSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    if (fileList.length > 0) {
      formData.append('file', fileList[0].originFileObj);
    }

    formData.append('tenDM', categoryData.tenDM);

    try {
      const response = await axios.post('http://localhost:3000/v1/ProductCategories/ad', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        window.alert('Danh mục đã được thêm thành công.');
        setCategoryData({
          tenDM: '',
        });
        setNewCategory(response.data);
        props.closeModal();
      }
    } catch (error) {
      console.error('Lỗi khi thêm danh mục:', error);
      window.alert('Lỗi khi thêm danh mục. Vui lòng thử lại.');
    }
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
      gap: '10px',
    }}>
      <form onSubmit={handleCateSubmit}>
        <div style={{ textAlign: 'center' }}>
          <ImgCrop rotationSlider>
            <Upload
              action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
              listType="picture-card"
              fileList={fileList}
              onChange={onChange}
              onPreview={onPreview}
              style={{
                marginTop: '1vw',
              }}
            >
              {fileList.length < 1 && (
                <>
                  <div >
                    <span style={{ marginRight: '5px' }}><CloudUploadOutlined /></span>
                    <br />
                    <span>Tải ảnh lên</span>
                  </div>
                </>
              )}
            </Upload>
          </ImgCrop>
        </div>
        <div>
          <label htmlFor="tenDM" style={{
            marginTop: '1vw',
          }}>Tên Danh mục:</label>
          <Input placeholder="Nhập tên Danh mục"
            style={{
              marginTop: '1vw',
            }}
            type="text"
            id="tenDM"
            name="tenDM"
            value={categoryData.tenDM}
            onChange={handleCateChange}
          />
        </div>
        <button type="submit"
          style={{
            marginTop: '2vw',
            marginLeft: '80%',
            padding: '0.5vw  1vw',
            backgroundColor: '#d69c52',
            border: 'none',
            color: '#fff',
            borderRadius: '10%',
          }}
        >Thêm</button>
        {/* <div>
          {newCategory &&
            <Link to={`/Category/${newCategory._id}`} style={{
              color: 'black',
              marginLeft: '78%',
              marginTop: '5vw'
            }}>Xem chi tiết</Link>}
        </div> */}
      </form>
    </div>
  );
}
