import React, { useEffect } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import './contact.css';

const MapPage = () => {
  useEffect(() => {
    // Khởi tạo bản đồ và thiết lập tọa độ trung tâm
    const map = L.map('map').setView([10.034, 105.772], 13);

    // Sử dụng OpenStreetMap làm lớp nền
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap contributors'
    }).addTo(map);

    // Thêm đánh dấu tại vị trí hiện tại của người dùng
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;

        // Tạo đánh dấu và thêm vào bản đồ
        const marker = L.marker([latitude, longitude]).addTo(map);
        marker.bindPopup('Your current location').openPopup();
      }, (error) => {
        console.error('Error getting current location:', error);
      });
    } else {
      console.error('Geolocation is not supported by your browser.');
    }
  }, []);

  return (
    <div style = {{
    backgroundColor: '#143b36',
    // display: 'flex',
    // justifyontent: 'center'

    }}>
    <div id="map" className="map-container"></div>

    </div>
  );
};

export default MapPage;
