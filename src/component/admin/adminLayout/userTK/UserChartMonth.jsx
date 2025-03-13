import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Chart from 'chart.js';

const UserStatsMonthly = () => {
  const chartRef = useRef(null);
  const [requestedMonth, setRequestedMonth] = useState(new Date().getMonth() + 1);
  const [userStatsM, setUserStatsM] = useState([]);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/v1/User/countUsers/month/${requestedMonth}`);
      setUserStatsM([{ _id: { month: requestedMonth, year: new Date().getFullYear() }, count: response.data.count }]);
    } catch (error) {
      setError(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [requestedMonth]); // Chạy lại khi requestedMonth thay đổi

  const handleMonthChange = (e) => {
    const month = parseInt(e.target.value);
    if (!isNaN(month) && month >= 1 && month <= 12) {
      setRequestedMonth(month);
    }
  };

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'line', // Thay đổi loại biểu đồ thành 'line' để sử dụng biểu đồ đường
        data: {
          labels: userStatsM.map((stat) => `Tháng ${stat._id.month}, ${stat._id.year}`),
          datasets: [{
            label: 'Số lượng người dùng',
            data: userStatsM.map((stat) => stat.count),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }],
        },
        options: {
          scales: {
            y: {
              beginAtZero: true,
            },
          },
        },
      });
    }
  }, [userStatsM]);

  return (
    <div>
      <h2>Thống kê người dùng theo tháng</h2>
      <label>
        Chọn tháng:
        <input type="number" value={requestedMonth} onChange={handleMonthChange} min="1" max="12" />
      </label>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <ul>
        {userStatsM && userStatsM.map((stat) => (
          <li key={`${stat._id.year}-${stat._id.month}`}>{`Tháng ${stat._id.month}, ${stat._id.year}: ${stat.count} người dùng`}</li>
        ))}
      </ul>
      <canvas ref={chartRef} width={400} height={200} />
    </div>
  );
};

export default UserStatsMonthly;
