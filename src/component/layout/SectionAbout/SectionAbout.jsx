import React from 'react'
import { Container, Row, Col } from 'react-bootstrap';
import './SectionAbout.css';
import Hinh1 from './ASSETS/1.png';

export default function SectionAbout() {
  return (
        <div className="about">
          <div className="cot1">
            <span className="title-small">
              Về chúng tôi
            </span>
            <span className="title-contain">
              'Tiệm ăn nhà Táo' luôn luôn đặt khách hàng lên hàng đầu, tận tâm phục vụ, 
              mang lại cho khách hàng những trãi nghiệm tuyệt với nhất.
              Các món ăn với công thức được tính toán calories chi tiết, sử dụng nguyên liệu hoàn toàn sạch. 
              Nhà toán luôn mong quý khách sẽ có những bữa ăn tốt cho sức khỏe. Xin chân thành cảm ơn quý khách!
            </span>
          </div>
          <div className="cot2">
            <img src={Hinh1} alt="Hinh" />
          </div>
        </div>

  )
}
