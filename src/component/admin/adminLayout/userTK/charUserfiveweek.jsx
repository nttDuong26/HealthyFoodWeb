import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Chart from 'chart.js';

const ChartComponent = () => {
  const [userStats, setUserStats] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/v1/User/countUsers/recentWeeks`);
        // console.log(response.data);
        setUserStats(response.data);
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
      }
    };

    fetchData();
  }, []); // Chạy useEffect một lần khi component được mount

  useEffect(() => {
    // Chỉ vẽ biểu đồ khi có dữ liệu
    if (userStats.length > 0) {
        const ctx = document.getElementById('userStatsChart').getContext('2d');
        const numColumnsToShow = 3; // Số cột bạn muốn hiển thị
        const labels = userStats.slice(0, numColumnsToShow).map(stat => `Tuần ${stat[0].id.week}, ${stat[0].id.year}`);
        const data = userStats.slice(0, numColumnsToShow).map(stat => {
            const count = stat[0]?.count ?? 0;
            return { y: count, originalCount: count};
          });
    
        new Chart(ctx, {
          type: 'bar',
          data: {
            labels: labels,
            datasets: [{
              label: 'Thống kê người dùng',
              data: data,
              backgroundColor: 'rgba(75, 192, 192, 0.2)',
              borderColor: 'rgba(75, 192, 192, 1)',
              borderWidth: 1,
            }],
          },
          options: {
            scales: {
              y: {
                beginAtZero: true,
                }
            },
          },
        });
      }
    }, [userStats]); // Chạy lại khi userStats thay đổi

  return (
    <div>
      <h2>Thống kê người dùng trong 4 tuần qua</h2>
      <canvas id="userStatsChart" width={400} height={200} />
    </div>
  );
};

export default ChartComponent;



