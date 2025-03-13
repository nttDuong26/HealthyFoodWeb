import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js';
import DonutLargeOutlinedIcon from '@mui/icons-material/DonutLargeOutlined';

const WeeklyBestSellingProductsChart = () => {
  const [bestSellingProducts, setBestSellingProducts] = useState([]);
  const [weekNumber, setWeekNumber] = useState(new Date().getWeek()); // Lấy tuần hiện tại

  useEffect(() => {
    const fetchBestSellingProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/v1/Product/countProduct/week/${weekNumber}`);
        setBestSellingProducts(response.data);
      } catch (error) {
        console.error('Error fetching best selling products: ', error);
      }
    };

    fetchBestSellingProducts();
  }, []); 

  useEffect(() => {
    if (bestSellingProducts.length > 0) {
      const labels = bestSellingProducts.map(product => product[0] && product[0].tenSP ? product[0].tenSP : 'Unknown Product');
      const data = bestSellingProducts.map(product => product[1]);

      const ctx = document.getElementById('bestSellingProductsChart').getContext('2d');
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: labels,
          datasets: [{
            data: data,
            backgroundColor: [
              'rgba(255, 99, 132, 0.7)',
              // 'rgba(54, 162, 235, 0.7)',
              'rgb(75, 192, 192)',
              'rgba(255, 206, 86, 0.7)',
              // 'rgba(75, 192, 192, 0.7)',
              'rgba(153, 102, 255, 0.7)',
            ],
          }],
        },
        options: {
          legend: {
            display: true,
            position: 'right',
            labels: {
              usePointStyle: true,
            },
          },
        },
      });
    }
  }, [bestSellingProducts]);

  return (
    <div style = {{padding: '1vw'}}>
           <h3 style = {{display: 'flex', padding: '1vw 0 1vw 2vw'}}> <div><DonutLargeOutlinedIcon/></div>3 món ăn bán chạy trong tuần</h3>

      <canvas id="bestSellingProductsChart" width={350} height={175}></canvas>
    </div>
  );
};

export default WeeklyBestSellingProductsChart;
