import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import { Upload, Input, InputNumber } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';


export default function PutCategory({ setIsPutCategorypage, closeModalCategory, id }) {
    // const { id } = useParams();

    const [categoryData, setCategoryData] = useState({
        hinhanhDM:'',
        tenDM: '',
        product: [], // Mảng chứa sản phẩm
    });
    const [fileList, setFileList] = useState([]);

    const [products, setProducts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [previewImage,setPreviewImage]= useState('');
    const [fileSelected, setFileSelected] = useState(false);
    useEffect(() => {
        async function fetchCategoryData() {
            try {
                const response = await axios.get(`http://localhost:3000/v1/ProductCategories/${id}`);
                const category = response.data;
                setCategoryData({
                    hinhanhDM:category.hinhanhDM,
                    tenDM: category.tenDM,
                    product: category.product,
                });

                // Lấy danh sách sản phẩm từ máy chủ
                const productResponse = await axios.get(`http://localhost:3000/v1/Product`);
                const productOptions = productResponse.data.map((product) => ({
                    value: product._id,
                    label: product.tenSP,
                }));
                setProducts(productOptions);
                setIsLoading(false);
                setIsPutCategorypage(true);
                closeModalCategory();
            } catch (error) {
                console.error('Lỗi khi gọi API:', error);
                setIsLoading(false);
            }
        }
        fetchCategoryData();
    }, [id]);

    const handlePutChange = (e) => {
        const { name, value } = e.target;
        setCategoryData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleProChange = (selectedProducts) => {
        setCategoryData((prevData) => ({
            ...prevData,
            product: selectedProducts.map((product) => product.value),
        }));
    };
    const handleFileChange = (event) => {
      const selectedFile = event.target.files[0];
    
      // Tạo URL tạm thời cho tệp tin được chọn và hiển thị hình ảnh
      const imageURL = URL.createObjectURL(selectedFile);
    
      // Hiển thị hình ảnh trên giao diện người dùng
      setPreviewImage(imageURL);
    
      // Cập nhật giá trị của categoryData.hinhanhDM với tên tệp tin (để sử dụng khi tải lên)
      setCategoryData({ ...categoryData, hinhanhDM: selectedFile.name });
    
      // Đánh dấu rằng người dùng đã chọn một tệp tin mới
      setFileSelected(true);
    };
    
      
      const handleCateFileChange = ({ fileList: newFileList, file }) => {
        if (file.status === 'done') {
          // Handle the case when the file upload is done
          const imageURL = URL.createObjectURL(file.originFileObj);
          setPreviewImage(imageURL);
          setCategoryData({ ...categoryData, hinhanh: file.name });
        } else if (file.status === 'removed') {
          // Handle the case when the uploaded file is removed
          setPreviewImage(null);
          setCategoryData({ ...categoryData, hinhanh: null });
        }
      
        setFileList(newFileList);
        setFileSelected(fileList.length > 0);
      };
      const handlePutCaSubmit = async (e) => {
        e.preventDefault();
      
        try {
          const formData = new FormData();
          formData.append('tenDM', categoryData.tenDM);
          formData.append('product', JSON.stringify(categoryData.product));
          formData.append('hinhanhDM', categoryData.hinhanhDM);
      
          if (fileList.length > 0) {
            formData.append('file', fileList[0].originFileObj);
          }
      
          const response = await axios.put(`http://localhost:3000/v1/ProductCategories/${id}`, formData);
          if (response.status === 200) {
            window.alert('Danh mục đã được cập nhật thành công.');
            window.location.href = `/Category/${id}`;
          }
        } catch (error) {
          console.error('Lỗi khi cập nhật danh mục:', error);
          window.alert('Lỗi khi cập nhật danh mục. Vui lòng thử lại.');
        }
      };
      
    const onCatePreview = async (file) => {
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
    return (
        <div>
            <form onSubmit={handlePutCaSubmit}>
            {/* <div>
          
                <label htmlFor="file">Hình Ảnh:</label>
                {fileSelected && <img style={{ width: '80px', height: '50px' }} src={previewImage} alt="Hình ảnh sản phẩm" />}
                {!fileSelected && categoryData.hinhanhDM && (
                    <img  style={{ width: '80px', height: '50px' }} src={`http://localhost:3000/v1/Image/${categoryData?.hinhanhDM}`} alt="Hình ảnh sản phẩm" />
                )}
                <input type="file" id="file" name="file" onChange={handleFileChange} required />


            </div> */}


<div   style={{ display: 'flex',
                            flexDirection: 'row-reverse',
                            flexWrap: 'nowrap',
                            justifyContent: 'space-evenly',
                            alignItems: 'center',
                            marginLeft: '25%'
                            }} >
           <ImgCrop rotationSlider>
              <Upload
                  action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
                  listType="picture-card"
                  fileList={fileList}
                  onChange={handleCateFileChange}
                  onPreview={onCatePreview}
                  style={{ marginTop: '1vw' }}
                >
                  {fileList.length < 1 && (
                    <>
                      <div>
                        <span style={{ marginRight: '5px' }}><CloudUploadOutlined /></span>
                        <br />
                        <span>Tải ảnh mới lên</span>
                      </div>
                    </>
                  )}
                </Upload>
              </ImgCrop>
            <div className = 'imgUpPrevew'>
            {fileSelected || categoryData.hinhanhDM ? (
                                <img
                                  style={{ width: '87%', height: '87%',
                                }}
                                  src={fileSelected ? URL.createObjectURL(fileList[0].originFileObj) : `http://localhost:3000/v1/Image/${categoryData?.hinhanhDM}`}
                                  alt="Hình ảnh sản phẩm"
                                />
                              ) : (
                                <CloudUploadOutlined style={{ fontSize: '36px', color: '#ccc' }} />
                              )}

            </div>
            </div>
            <div>
          <label htmlFor="tenDM"   style = {{
            marginTop: '1vw', }}>Tên Danh mục:</label>
          <Input placeholder="Nhập tên Danh mục" 
          style = {{
            marginTop: '1vw', }}
            type="text"
            id="tenDM"
            name="tenDM"
            value={categoryData.tenDM}
            onChange={handlePutChange}
          />
        </div>
       
                <div>
                    <label htmlFor="product">Sản phẩm:</label>
                    <Select
                        id="product"
                        name="product"
                        isMulti
                        value={products.filter((option) =>
                            categoryData.product.includes(option.value)
                        )}
                        onChange={handleProChange}
                        options={products}
                    />
                </div>
                <button type="submit"
        style = {{
          marginTop: '2vw', 
          marginLeft: '80%',
          padding: '0.5vw  1vw',
          backgroundColor: '#d69c52',
          border: 'none',
          color: '#fff',
          borderRadius: '10%',
        }}
        >Thêm</button>
            </form>
        </div>
    );
}
