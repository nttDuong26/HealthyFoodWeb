import React, { useState } from 'react';
import './SortBy.css';


const SortBy = () => {
  const [sortBy, setSortBy] = useState('default');

  const handleSortByClick = (sortOption) => {
    setSortBy(sortOption);
    // Thực hiện các thao tác khác liên quan tới việc sắp xếp theo 'sortOption'
    // Ví dụ: gọi API để lấy dữ liệu đã sắp xếp.
  };

  return (
    <div className="sort-by">
      <ul className="sortBy">
            <li>
              <a href="#" onClick={() => handleSortByClick('default')} title="Mặc định">
                Mặc định
              </a>
            </li>
            <li>
              <a href="#" onClick={() => handleSortByClick('alpha-asc')} title="A → Z">
                A → Z
              </a>
            </li>
            <li>
              <a href="#" onClick={() => handleSortByClick('alpha-desc')} title="Z → A">
                Z → A
              </a>
            </li>
            <li>
              <a href="#" onClick={() => handleSortByClick('price-asc')} title="Giá tăng dần">
                Giá tăng dần
              </a>
            </li>
            <li>
              <a href="#" onClick={() => handleSortByClick('price-desc')} title="Giá giảm dần">
                Giá giảm dần
              </a>
            </li>
        </ul>
    </div>
  );
};

export default SortBy;
