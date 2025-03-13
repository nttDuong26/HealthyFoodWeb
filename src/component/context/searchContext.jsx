import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext();

export const SearchProvider = ({ children }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchProductByName = async (searchTerm) => {
    try {
      const response = await fetch(`http://localhost:3000/v1/Product/searchProduct`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ searchTerm }),
      });
  
      const data = await response.json();
  
      // Kiểm tra xem data có phải là mảng không
      if (Array.isArray(data)) {
        setSearchResults(data);
      } else {
        // Xử lý khi data không phải là mảng, ví dụ như hiển thị thông báo lỗi hoặc xử lý theo cách khác tùy thuộc vào yêu cầu của bạn
        console.error('Dữ liệu nhận được không phải là một mảng:', data);
      }
    } catch (error) {
      console.error('Lỗi khi nhận dữ liệu tìm kiếm:', error);
    }
  };
  

  return (
    <SearchContext.Provider value={{ searchTerm, setSearchTerm, searchResults, setSearchResults, searchProductByName }}>
      {children}
    </SearchContext.Provider>
  );
};

export const useSearch = () => {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error('useSearch must be used within a SearchProvider');
  }
  return context;
};
