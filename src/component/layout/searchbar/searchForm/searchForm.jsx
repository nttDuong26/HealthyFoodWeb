import React, { useState, useEffect } from 'react';
import SearchIcon from '@mui/icons-material/Search';
import './searchForm.css';
import { useNavigate } from 'react-router-dom';

export default function SearchForm() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');


  const handleInputChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchFormSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:3000/v1/Product/searchProduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchTerm }),
      });

      if (response.ok) {
        const data = await response.json();
        navigate(`/searchContent/${searchTerm}`, { state: { searchResults: data } });
      } else {
        console.error('Lỗi khi nhận dữ liệu tìm kiếm:', response.statusText);
      }
    } catch (error) {
      console.error('Lỗi khi gửi yêu cầu tìm kiếm:', error);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSearchFormSubmit();
    }
  };
  useEffect(() => {
    setSearchTerm('');
  }, []);


  return (
    <div className='searchForm'>
      <div className="searchForm-title">
        <span>Nhập tìm kiếm của bạn</span>
      </div>
      <div className="searchForm-input">
        <input
          type="text"
          className="timkiem"
          placeholder='Nhập tìm kiếm'
          value={searchTerm}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
        />
        <button className="searchForm-icon" onClick={handleSearchFormSubmit}>
          <SearchIcon />
        </button>
      </div>
    </div>
  );
}
