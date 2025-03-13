import React, { useState, useEffect, useRef  } from 'react';
import axios from 'axios';
import Chart from 'chart.js';

export default function UserChartYearly() {
    const chartRef = useRef(null);
    const [requestedYear, setRequestedYear] = useState(new Date().getFullYear());
    const [userStatsY, setUserStatsY] = useState([]);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChartYearData = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/v1/User/countUsers/year/${requestedYear}`);
                setUserStatsY(response.data);
    
            } catch (error) {
                setError(error.message);
        }
    }
    fetchChartYearData();
    },[requestedYear]);
   
    const handleYearChange = (e) => {
        const year = parseInt(e.target.value);
        if (!isNaN(year) && year >= 2023){
            setRequestedYear(year);
        }
    };

    useEffect(() => {
        if (chartRef.current) {
        const ctx = chartRef.current.getContext('2d');
        new Chart(ctx, {
            type: 'bar', // Đây là loại biểu đồ, ở đây bạn sử dụng biểu đồ cột
            data: {
                labels: userStatsY.map((stat) => `Năm ${stat._id.year}`), // Nhãn trên trục x, được tạo từ dữ liệu userStatsY
                datasets: [{
                    label: 'Số lượng người dùng', // Nhãn của dữ liệu
                    data: userStatsY.map((stat) => stat.count), // Dữ liệu cho biểu đồ, ở đây là số lượng người dùng
                    backgroundColor: 'rgba(75, 192, 192, 0.2)', // Màu nền của cột
                    borderColor: 'rgba(75, 192, 192, 1)', // Màu viền của cột
                    borderWidth: 1, // Độ rộng của viền cột
                }],
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true, // Bắt đầu trục y từ giá trị 0
                    },
                },
            },
        });
        
        }
    }, [userStatsY]);
 

    return (
        <div>
        <h2>Thống kê người dùng theo năm</h2>
        <label>
            Chọn Năm:
            <input type="number" value={requestedYear} onChange={handleYearChange} min="1" max="12" />
        </label>
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <ul>
            {userStatsY.map((stat) => (
            <li key={`${stat._id.year}`}>{`Năm ${stat._id.year}: ${stat.count} người dùng`}</li>
            ))}
        </ul>
        <canvas ref={chartRef} width={400} height={200} />
        </div>
    );
};
