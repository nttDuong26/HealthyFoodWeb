import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import LegendToggleOutlinedIcon from '@mui/icons-material/LegendToggleOutlined';

const MyChartorderComponent = () => {
  const [chartData, setChartData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/v1/Order/countOrder/trafficfourweek`);
        const data = await response.json();

        if (data && data.weeklyStats && data.weeklyStats.length > 0) {
          const reversedWeeklyStats = data.weeklyStats.reverse();

          const labels = reversedWeeklyStats.map((_, index) => `Tuần ${index + 1}`);
          const revenueData = reversedWeeklyStats.map(item => item.weeklyRevenue);

          setChartData({
            labels: labels,
            datasets: [
              {
                label: 'Tổng doanh thu',
                data: revenueData,
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgb(75, 192, 192)',
                borderWidth: 1,
              },
            ],
          });
        } else {
          setError('Không có dữ liệu để hiển thị.');
        }
      } catch (error) {
        console.error('Lỗi khi lấy dữ liệu:', error);
        setError('Có lỗi xảy ra khi tải dữ liệu.');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Đang tải dữ liệu...</div>;
  }

  if (error) {
    return <div style={{ color: 'red' }}>{error}</div>;
  }

  return (
    <div>
      <h3 style={{ display: 'flex', padding: '1vw 0 1vw 2vw' }}>
        <div><LegendToggleOutlinedIcon /></div> Doanh thu trong tháng
      </h3>
      <Bar
        data={chartData}
        options={{
          scales: {
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: 'Giá trị',
              },
            },
            x: {
              title: {
                display: true,
                text: 'Tuần',
              },
            },
          },
        }}
        width={700}
        height={250}
      />
    </div>
  );
};

export default MyChartorderComponent;
