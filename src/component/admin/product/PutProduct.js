import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Select from 'react-select';
import './PutProduct.css';
import { Upload, Input, InputNumber } from 'antd';
import { CloudUploadOutlined } from '@ant-design/icons';
import ImgCrop from 'antd-img-crop';


export default function EditProduct({setIsPutProductpage, closeModalPutProduct, id, updateProductInGetProduct }) {
  // const { id } = useParams();

  // const [productData, setProductData] = useState({
  //   hinhanh: '',
  //   tenSP: '',
  //   giaSP: '',
  //   motaSP: '',
  //   nguyenlieu: '',
  //   trangthai: true,
  //   calo: 0,
  //   cdam: 0,
  //   cxo: 0,
  //   cbeo: 0,
  //   categories: [], // Mảng chứa các danh mục sản phẩm
  // });
  const [productData, setProductData] = useState({
    hinhanh: '',
    tenSP: '',
    giaSP: '',
    motaSP: '',
    nguyenlieu: '',
    trangthai: true,
    calo: 0,
    cdam: 0,
    cxo: 0,
    cbeo: 0,
    categories: [], // Mảng chứa các danh mục sản phẩm
  });
  

  const { TextArea } = Input;
  const [fileList, setFileList] = useState([]);

  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [previewImage,setPreviewImage]= useState('');
  const [fileSelected, setFileSelected] = useState(false);

  

  useEffect(() => {
    async function fetchProductData() {
      try {
        const response = await axios.get(`http://localhost:3000/v1/Product/${id}`);
        const product = response.data;
        setProductData({
          hinhanh: product.hinhanh,
          tenSP: product.tenSP,
          giaSP: product.giaSP,
          motaSP: product.motaSP,
          nguyenlieu: product.nguyenlieu,
          trangthai: product.trangthai,
          calo: product.calo,
          cdam: product.cdam,
          cxo: product.cxo,
          cbeo: product.cbeo,
          categories: product.categories,
        });

        // Lấy danh sách danh mục sản phẩm từ máy chủ
        const categoriesResponse = await axios.get('http://localhost:3000/v1/ProductCategories/');
        const categoryOptions = categoriesResponse.data.map((category) => ({
          value: category._id,
          label: category.tenDM,
        }));
        setCategories(categoryOptions);

        setIsLoading(false);
        setIsPutProductpage(true);
        console.log(response.data);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        setIsLoading(false);
      }
    }

    fetchProductData();
  }, [setIsPutProductpage, closeModalPutProduct, id, updateProductInGetProduct]);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

 

  // const handleFileChange = (e) => {
  //   setProductData((prevData) => ({
  //     ...prevData,
  //     file: e.target.files[0],
  //   }));
  // }
  const handleFileChange = ({ fileList: newFileList, file }) => { // 2 tham số chỗ này là gì?  fileList là state? file là file nhận vào cái nào được nhận?
    if (file.status === 'done') {
      // Handle the case when the file upload is done
      const imageURL = URL.createObjectURL(file.originFileObj);
      setPreviewImage(imageURL);
      setProductData({ ...productData, hinhanh: file.originFileObj}); //file.name
    } else if (file.status === 'removed') {
      // Handle the case when the uploaded file is removed
      setPreviewImage(null);
      setProductData({ ...productData, hinhanh: null });
    }
  
    setFileList(newFileList);
    setFileSelected(fileList.length > 0);
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
 
  // const handleCategoryChange = (selectedCategories) => {
  //   setProductData((prevData) => ({
  //     ...prevData,
  //     categories: selectedCategories.map((category) => category.value),
  //   }));
  // };
  const handleCategoryChange = (selectedCategories) => {
    const categoryIds = selectedCategories.map((category) => category.value);
    setProductData((prevData) => ({
      ...prevData,
      categories: categoryIds,
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
    formData.append('categories', JSON.stringify(productData.categories));
    
    formData.append('giaSP', productData.giaSP);
    formData.append('motaSP', productData.motaSP);
    formData.append('nguyenlieu', productData.nguyenlieu);
    formData.append('trangthai', productData.trangthai);
    formData.append('calo', productData.calo);

    formData.append('cdam', productData.cdam);
    formData.append('cxo', productData.cxo);
    formData.append('cbeo', productData.cbeo);


    for (var pair of formData.entries()) {
      console.log(pair[0]+ ', ' + pair[1]); 
    }  
    try {
      const response = await axios.put(`http://localhost:3000/v1/Product/${id}`, formData ,{
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        updateProductInGetProduct(response.data);

        window.alert('Sản phẩm đã được cập nhật thành công.');
        // Chuyển hướng đến trang chi tiết sản phẩm
        // window.location.href = `/Product/${id}`;
        closeModalPutProduct();

      }
    } catch (error) {
      console.error('Lỗi khi cập nhật sản phẩm:', error);
      window.alert('Lỗi khi cập nhật sản phẩm. Vui lòng thử lại.');
    }
  };

  return (
    <div>
      {isLoading ? (
        <p>Đang tải dữ liệu...</p>
      ) : (
        <div>

          <form onSubmit={handleSubmit}  >
           <div  >
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
                  onChange={handleFileChange}
                  onPreview={onPrPreview}
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
            {fileSelected || productData.hinhanh ? (
                                <img
                                  style={{ width: '87%', height: '87%',
                                }}
                                  src={fileSelected ? URL.createObjectURL(fileList[0].originFileObj) : `http://localhost:3000/v1/Image/${productData?.hinhanh}`}
                                  alt="Hình ảnh sản phẩm"
                                />
                              ) : (
                                <CloudUploadOutlined style={{ fontSize: '36px', color: '#ccc' }} />
                              )}

            </div>
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
            type="number"
            id="giaSP"
            name="giaSP"
            value={productData.giaSP === 0 ? 0 : productData.giaSP}
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
          {/* <Select
            placeholder="Chọn danh mục"
            id="categories"
            name="categories"
            isMulti
            value={categories.filter((option) =>
              productData.categories.includes(option.value)
            )}
            onChange={handleCategoryChange}
            options={categories}
          /> */}
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
            value={ productData.calo === 0 ? 0 : productData.calo}
            // value={ productData.calo}
            title="Nhập giá trị cho calories"

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
            value={productData.cdam === 0 ? 0 :productData.cdam}
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
            value={productData.cxo === 0 ? 0 :productData.cxo}
            // value={productData.cxo}
            title="Nhập giá trị cho chất xơ"

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
            value={productData.cbeo === 0 ? 0 :productData.cbeo}
            // value={productData.cbeo}
            title="Nhập giá trị cho chất béo"
            onChange={handleChange}
          />
        </div>
          </div>

        </div>
        </div>
        <button type="submit"
         style = {{
          marginTop: '3vw', 
          marginLeft: '75%',
          padding: '0.8vw  1vw',
          backgroundColor: '#d69c52',
          border: 'none',
          color: '#fff',
          borderRadius: '5px',
        }}
        >Cập nhật</button>
          </form>
        </div>
      )}
    </div>
  );
}
