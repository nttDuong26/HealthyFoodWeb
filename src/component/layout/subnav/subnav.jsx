import React from 'react';
import './subnav.css';
import Menu from './menu/menu.jsx';
import Home from './home/home.jsx';
import Sale from './sale/sale.jsx';
import Book from '../navbar/book/book.jsx';
import Contact from './contact/contact.jsx';

export default function Subnav() {
  return (
    <div className="subnav-menu">
      <ul>
        <li>
          <a href="#"><Home/></a>
        </li>
        <li>
          <a href="#"><Menu /></a>
        </li>
        <li>
          <a href="#"><Sale/></a>
        </li>
        <li>
          <a href="#"><Book/></a>
        </li>
        <li>
          <a href="#"><Contact/></a>
        </li>
      </ul>
    </div>
  );
}
