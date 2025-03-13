import React from 'react';
import './header.css';
import Title from  '../title/title.jsx';
import Navbar from '../navbar/navbar.jsx';
import Banner from '../Banner/Banner.jsx';

export default function header() {
  return (
    <div>
      <div className="nav-head">
        <Navbar />
      </div>
    </div>
   

  )
}
