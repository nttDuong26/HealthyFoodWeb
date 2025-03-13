import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './menuContent.css';


export default function MenuContent() {
  const [menuCategory, setMenuCategory] = useState([]);
  const [menuFood, setMenuFood] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  
  useEffect(() => {
    // Hàm này sẽ được gọi khi component được tạo ra và mỗi khi `data` thay đổi
    async function fectchMenuCategory() {
      try {
        // Thực hiện cuộc gọi API bằng axios
        const response = await axios.get('http://localhost:3000/v1/ProductCategories/');
        setMenuCategory(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    }
    fectchMenuCategory();


    async function fetchMenuFood(){
      try{
        const responseFood = await axios.get(`http://localhost:3000/v1/Product/`);
        setMenuFood(responseFood.data);
      }catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    }fetchMenuFood();
  }, []);



  return (
    <div className ='menuContent'>
        <table className="AllMenu">
        {menuCategory.map((categoriesId) => (
        <ul className="Menu-item-KV" key={categoriesId._id}>
          <li className="KV-item">
            <a href="#" className="khaivi">{categoriesId.tenDM}</a>
            <ul className="khaivi1"> {menuFood
              .filter((product) => product.categoriesId === categoriesId._id)
              .map((product) => (
              <li className="kv1" key = {product._id} >
                <a href="#" >{product.tenSP}</a>
              </li>
              ))}
              <li className="kv1">
                <a href="#" >Món khai vị 2</a>
              </li>
              <li className="kv1">
                <a href="#" >Món khai vị 3</a>
              </li>
            </ul>
          </li>
        </ul>
        ))}
        {/* <ul className="Menu-item_MC">
          <li className="MC-item">
            <a href="#" className="monchinh">Món chính</a>
                
            <ul className="monchinh1">
              <li className="mc1">
                <a href="#" >Món Chính 1</a>
              </li>
              <li className="mc1">
                <a href="#" >Món Chính 2</a>
              </li>
              <li className="mc1">
                <a href="#" >Món Chính 3</a>
              </li>
              <li className="mc1">
                <a href="#" >Món Chính 4</a>
              </li>
              <li className="mc1">
                <a href="#" >Món Chính 5</a>
              </li>
            </ul>
          </li>
        </ul>
        <ul className="Menu-item-TM">
          <li className="TM-item">
            <a href="#" className="trangmieng">Tráng miệng</a>
            <ul className="trangmieng1">
              <li className="TM1">
                <a href="#" >Món tráng miệng 1</a>
              </li>
              <li className="TM1">
                <a href="#" >Món tráng miệng 2</a>
              </li>
              <li className="TM1">
                <a href="#" >Món tráng miệng 3</a>
              </li>
            </ul>
          </li>
        </ul>
        <ul className="Menu-item-DU">
          <li className="DU-item">
            <a href="#" className="douong">Đồ uống</a>
            <ul className="douong1">
              <li className="DU1">
                <a href="#" >Món nước 1</a>
              </li>
              <li className="DU1">
                <a href="#" >Món nước 2</a>
              </li>
              <li className="DU1">
                <a href="#" >Món nước 3</a>
              </li>
            </ul>
          </li>
        </ul>
         */}
      </table>

    </div>
  )
}
