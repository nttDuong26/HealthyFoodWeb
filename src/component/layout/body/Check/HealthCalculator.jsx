import React, { useState } from 'react';
import Axios from 'axios';
import './check.css';
import { Input, Select, Button } from 'antd';
import { Link } from 'react-router-dom';
import ResultComponent from './recoment';
import { useNavigate } from 'react-router-dom';

const { Option } = Select;

const HealthCalculator = ({ closeModal, onResultReceived, onSubmit  }) => {
  const [formData, setFormData] = useState({
    cannang: '',
    chieucao: '',
    tuoi: '',
    gioitinh: 'Nữ',
    vandong: 'it',
    nhucau: 'Giảm cân',
    
  });

  const navigate = useNavigate();
  const [result, setResult] = useState('');

  const handleInputChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const calculateHealthInfo = () => {
    const { cannang, chieucao, tuoi, gioitinh, vandong, nhucau } = formData;
    if (!cannang || !chieucao || !tuoi || !gioitinh || !vandong || !nhucau) {
      // Hiển thị cảnh báo nếu có thông tin bị rỗng
      alert('Vui lòng nhập đầy đủ thông tin');
      return;
    }
  
    Axios.post(`http://localhost:3000/v1/User/calculate`, formData)
      .then(response => {
        navigate('/recoment', { state: { result: response.data, formData  } });

        closeModal(); 
      })
      .catch(error => {
        console.error('Error:', error);
        alert('Vui lòng nhập đầy đủ thông tin');

      });
  };
  const resetForm = () => {
    setFormData({
      cannang: '',
      chieucao: '',
      tuoi: '',
      gioitinh: 'Nữ',
      vandong: 'it',
      nhucau: 'Giảm cân',
    });

  };

  return (
    <div className="modal2">
      <div className="modal-content2">
        <div className="thongtin" style ={{display: 'flex', marginTop: '1vw'}}>
        <Input
          type="number"
          placeholder="Cân nặng (kg)"
          value={formData.cannang}
          onChange={(e) => handleInputChange('cannang', e.target.value)}
          style= {{margin: '0 1vw 0 0.8vw'}}
        />
        <Input
          type="number"
          placeholder="Chiều cao (cm)"
          value={formData.chieucao}
          onChange={(e) => handleInputChange('chieucao', e.target.value)}
          style= {{marginRight: ' 1vw'}}
        />
        <Input
          type="number"
          placeholder="Tuổi"
          value={formData.tuoi}
          onChange={(e) => handleInputChange('tuoi', e.target.value)}
          // style= {{marginRight: '0 1vw'}}
        />
     
        </div>
        <div className="" >
        <Select
          style={{ width: '100%' }}
          placeholder="Giới tính"
          value={formData.gioitinh}
          onChange={(value) => handleInputChange('gioitinh', value)}
        >
        <Option value="Nu">Nữ</Option>
        <Option value="Nam">Nam</Option>
        </Select>
        <Select
          style={{ width: '100%' }}
          placeholder="Mức độ hoạt động vận động"
          value={formData.vandong}
          onChange={(value) => handleInputChange('vandong', value)}
        >
          <Option value="it">Ít hoạt động</Option>
          <Option value="vua">Hoạt động vừa</Option>
          <Option value="deu">Hoạt động đều đặn</Option>
          <Option value="cao">Hoạt động cường độ cao</Option>
          <Option value="sieu">Hoạt động liên tục</Option>

        </Select>
        <Select
          style={{ width: '100%' }}
          placeholder="Nhu cầu"
          value={formData.nhucau}
          onChange={(value) => handleInputChange('nhucau', value)}
        >
          <Option value="giảm cân">Giảm cân</Option>
          <Option value="giữ cân">Giữ cân</Option>
          <Option value="tăng cân">Tăng cân</Option>
        </Select>
        </div>

      
        {/* <Button type="primary" onClick={calculateHealthInfo}>
          Kiểm tra
        </Button>
    
        {result && (
          <div className="resultContent">
            <h2>Kết quả:</h2>
            <p>BMR: {result.bmr.toFixed(2)}</p>
            <p>TDEE: {result.tdee.toFixed(2)}</p>
            <p>BMI: {result.bmi.toFixed(2)}</p>
            <p>Calories Suggested: {result.suggestedCalories.toFixed(2)}</p>
          </div>
        )} */}
        {/* <Button type="default" onClick={onClose}>
          Đóng
        </Button> */}

      <Button 
      style = {{backgroundColor: '#d69c52', marginLeft: '80%', color: '#fff', marginTop:'1vw'}}
      onClick={() => {
        calculateHealthInfo();
        resetForm(); // Đặt lại giá trị khi đóng modal
      }}>
        Kiểm tra
      </Button>

      {/* <ResultComponent result={result} /> */}



      </div>
    </div>
  );
};

export default HealthCalculator;
