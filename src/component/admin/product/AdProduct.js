import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Select from 'react-select';
import { Link } from 'react-router-dom';
import ImgCrop from 'antd-img-crop';
import { Upload, Input, InputNumber } from 'antd';

import { CloudUploadOutlined } from '@ant-design/icons';
import './adProduct.css';

export default function AddProduct({ closeModal, updateProductList }) {
  const [productData, setProductData] = useState({
    hinhanh: '',
    tenSP: '',
    giaSP: 0,
    motaSP: '',
    nguyenlieu: '',
    trangthai: true,
    calo: 0,
    cdam: 0,
    cxo: 0,
    cbeo: 0,
    categories: [], // Mảng chứa các danh mục sản phẩm
    // file: null
  });
  const { TextArea } = Input;
  const [categories, setCategories] = useState([]); // Danh sách danh mục
  const [products, setProducts] = useState([]); // Danh sách sản phẩm
  const [newProduct, setNewProduct] = useState(null);
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');
  const [fileSelected, setFileSelected] = useState(false);
  const [previewImage,setPreviewImage]= useState('');
  const [fileList, setFileList] = useState([]);
  const [showOnlyActive, setShowOnlyActive] = useState(false);

 
  useEffect(() => {
    // Lấy danh sách danh mục sản phẩm từ máy chủ khi component được tạo ra
    async function fetchCategories() {
      try {
        const response = await axios.get(`http://localhost:3000/v1/ProductCategories/`);
        const categoryOptions = response.data.map((category) => ({
          value: category._id,
          label: category.tenDM,
        }));
        setCategories(categoryOptions);
      } catch (error) {
        console.error('Lỗi khi lấy danh mục sản phẩm:', error);
      } 
    }

    fetchCategories();   

 }, []);

  // const handleFileChange = (e) => {
  //   setProductData((prevData) => ({
  //     ...prevData,
  //     file: e.target.files[0],
  //   }));
  //   setFileSelected(true)

  // }
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
  
    // Tạo URL tạm thời cho tệp tin được chọn và hiển thị hình ảnh
    const imageURL = URL.createObjectURL(selectedFile);
  
    // Hiển thị hình ảnh trên giao diện người dùng
    setPreviewImage(imageURL);
  
    // Cập nhật giá trị của productData.hinhanh với tên tệp tin (để sử dụng khi tải lên)
    setProductData({ ...productData, file: event.target.files[0]  });
  
    // Đánh dấu rằng người dùng đã chọn một tệp tin mới
    setFileSelected(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
      
    }));
    
  };

  const onPrChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
    
  };
  const onPrPreview = async (file) => {
    let src = file.url;
    if (!src && file.originFileObj) {
      src = await new Promise((resolve) => {
        const reader = new FileReader();
        reader.readAsDataURL(file.originFileObj);
        reader.onload = () => resolve(reader.result);
      });
    }
    const imgWindow = window.open(src);
    imgWindow?.document.write(`<img src="${src}" alt="Hình ảnh sản phẩm" style="width:100%" />`);
  };

  const handleCategoryChange = (selectedCategories) => {
    setProductData((prevData) => ({
      ...prevData,
      categories: selectedCategories.map((category) => category.value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    if (fileList.length > 0) {
      formData.append('file', fileList[0].originFileObj);

    }
    // formData.append('file', fileList[0].originFileObj);
    formData.append('tenSP', productData.tenSP);
    formData.append('categories',productData.categories);
    
    formData.append('giaSP', productData.giaSP);
    formData.append('motaSP', productData.motaSP);
    formData.append('nguyenlieu', productData.nguyenlieu);
    formData.append('trangthai', productData.trangthai);
    formData.append('calo', productData.calo);

    formData.append('cdam', productData.cdam);
    formData.append('cxo', productData.cxo);
    formData.append('cbeo', productData.cbeo);



    try {
      const response = await axios.post('http://localhost:3000/v1/Product/ad', formData,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 201) {
        // Nếu thành công, hiển thị thông báo thành công bằng cửa sổ alert
        window.alert('Sản phẩm đã được thêm thành công.');

        // Đặt lại giá trị các trường dữ liệu trong biểu mẫu thành giá trị rỗng
        setProductData({
          // hinhanh: '',
          file: null,
          tenSP: '',
          giaSP: '',
          motaSP: '',
          nguyenlieu: '',
          trangthai: true,
          calo: 0,
          cdam: 0,
          cxo: 0,
          cbeo: 0,
          categories: [],
        });

        // Lưu thông tin sản phẩm mới vào state để chuyển đến trang chi tiết
        setNewProduct(response.data);
        setFileList([]);
        setProducts((prevProducts) => [response.data, ...prevProducts]);
        closeModal();
        updateProductList(response.data);
      }
    } catch (error) {
      console.error('Lỗi khi thêm sản phẩm:', error);
      // Nếu có lỗi, hiển thị thông báo lỗi bằng cửa sổ alert
      // window.alert('Lỗi khi thêm sản phẩm. Vui lòng thử lại.');
    }

  };
  // Thêm vào đầu component
useEffect(() => {
  // Kiểm tra nếu có sản phẩm mới được thêm
  if (newProduct) {
    // Cập nhật danh sách sản phẩm trong component GetProduct
    setProducts((prevProducts) => [newProduct, ...prevProducts]);
  }
}, [newProduct]);


  return (
    <div>
      <form onSubmit={handleSubmit} 
      // encType="multipart/form-data"
      >
        
        {/* <div>
            <label htmlFor="file">Hình Ảnh:</label>            
              {fileSelected && <img  style={{ width: '70px', height: '60px' }} src={previewImage} alt="Hình ảnh sản phẩm" />}
            <input type="file" id="file" name="file" onChange={handleFileChange} required />          
        </div> */}
      <div style={{ textAlign: 'center', height: '20%' }}>
      <ImgCrop rotationSlider>
      <Upload
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture-card"
        fileList={fileList}
        // onChange={onPrChange}
        // onPreview={onPrPreview}
        onChange={({ fileList: newFileList }) => setFileList(newFileList)}
        style = {{
          marginTop: '1vw', }}
      >
       {fileList.length < 1 && (
        <>
           <div >
            <span style={{ marginRight: '5px' }}><CloudUploadOutlined /></span>
            <br/>
            <span>Tải ảnh lên</span>
          </div>
        </>
      )}
      </Upload>
    </ImgCrop>
    </div>
        <div>
          <label htmlFor="tenSP" style ={{
          color: 'black'}}>Tên Món Ăn </label>
          <Input placeholder= "Nhập tên món ăn *"
          style ={{
            color: 'black'}}
            type="text"
            id="tenSP"
            name="tenSP"
            value={productData.tenSP}
            onChange={handleChange}
          />
        </div>
        <div className = 'adProductgia-Tt'> 
          <div className = 'adProductgia'   >
          <label htmlFor="giaSP" >Giá Món Ăn</label>
          <input
            type="number" min = {0}
            id="giaSP"
            name="giaSP"
            value={productData.giaSP}
            onChange={handleChange}
          />
        </div>
          <div style ={{marginLeft: '23%', marginTop: '1vw'}} >
            <label htmlFor="trangthai">Trạng Thái</label>
            <div style ={{display:'flex'}} >
            <input
              type="checkbox"
              id="trangthai"
              name="trangthai"
              checked={productData.trangthai}
              onChange={() =>
                setProductData((prevData) => ({
                  ...prevData,
                  trangthai: !prevData.trangthai,
                }))
              }
            />
          <span>{productData.trangthai  ? 'Món ăn mở bán' : 'Món ăn ngưng phục vụ'}</span>
          </div>
         
        </div>
        </div>
       
        <div style ={{ marginTop: '1.3vw'}} >
          <label htmlFor="categories">Danh Mục:</label>
          <Select
            placeholder="Chọn danh mục"
            id="categories"
            name="categories"
            isMulti
            value={categories.filter((option) =>
              productData.categories.includes(option.value)
            )}
            onChange={handleCategoryChange}
            options={categories}
          />
        </div>

        <div  style ={{ marginTop: '1.3vw'}}>
          <label htmlFor="motaSP">Mô Tả:</label>
          <TextArea rows={4} placeholder = 'Nhập mô tả món ăn'
            id="motaSP"
            name="motaSP"
            value={productData.motaSP}
            onChange={handleChange}
          />
        </div>
        <div style ={{ marginTop: '1.3vw'}}>
          <label htmlFor="nguyenlieu">Thành phần</label>
          <TextArea rows={4} placeholder = 'Nhập thành phần món ăn'
            type="text"
            id="nguyenlieu"
            name="nguyenlieu"
            value={productData.nguyenlieu}
            onChange={handleChange}
          />
        </div>
        <div style ={{ marginTop: '1.3vw'}} > 
          <span>Giá trị dinh dưỡng</span>
          <div className = 'dinhduong' style ={{display:'flex'}}> 
          <div>
          <label htmlFor="calo"></label>
          <input
            type="number"
            placeholder="Caolories"
            id="calo"
            name="calo"
            value={ productData.calo === 0 ? '' : productData.calo}
            // value={ productData.calo}

            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="cdam"></label>
          <input
            type="number"
            placeholder="Chất đạm"

            id="cdam"
            name="cdam"
            value={productData.cdam === 0 ? '' :productData.cdam}
            // value={productData.cdam}

            onChange={handleChange}
          />
        </div>
        <div >
          <label htmlFor="cxo"></label>
          <input
            type="number"
            placeholder="Chất xơ"
            id="cxo"
            name="cxo"
            value={productData.cxo === 0 ? '' :productData.cxo}
            // value={productData.cxo}

            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="cbeo"></label>
          <input
            type="number"
            placeholder="Chất béo"

            id="cbeo"
            name="cbeo"
            value={productData.cbeo === 0 ? '' :productData.cbeo}
            // value={productData.cbeo}

            onChange={handleChange}
          />
        </div>
          </div>

        </div>

       

        <button type="submit"
         style = {{
          marginTop: '3vw', 
          marginLeft: '75%',
          padding: '0.8vw  2.2vw',
          backgroundColor: '#d69c52',
          border: 'none',
          color: '#fff',
          borderRadius: '5px',
       
        }}
        >Thêm</button>
       

      </form>
    </div>
  );
}
