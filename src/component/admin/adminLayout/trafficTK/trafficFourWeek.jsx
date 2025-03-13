import React, { useEffect, useState } from 'react';
import { Line } from 'react-chartjs-2';
import LegendToggleOutlinedIcon from '@mui/icons-material/LegendToggleOutlined';

const MyChartComponent = () => {
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
          const productsSoldData = reversedWeeklyStats.map(item => item.weeklyProductsSold);
  
          setChartData({
            labels: labels,
            datasets: [
              {
                label: 'Tổng doanh thu',
                data: revenueData,
                fill: true,
                borderColor: 'rgb(75, 192, 192)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.1,
                yAxisID: 'y-axis-1',
              },
              {
                label: 'Số lượng sản phẩm bán ra',
                data: productsSoldData,
                fill: true,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                tension: 0.1,
                yAxisID: 'y-axis-2',
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
      <h3 style = {{display: 'flex', padding: '1vw 0 1vw 2vw'}}> <div><LegendToggleOutlinedIcon/></div> Doanh thu và số lượng sản phẩm bán ra trong 4 tuần gần nhất</h3>
      <Line

        data={chartData}
        options={{
          scales: {
            yAxes: [
              {
                id: 'y-axis-1',
                type: 'linear',
                position: 'left',
                scaleLabel: {
                  display: true,
                  labelString: 'Tổng doanh thu',

                },
              },
              {
                id: 'y-axis-2',
                type: 'linear',
                position: 'right',
                scaleLabel: {
                  display: true,
                  labelString: 'Số lượng sản phẩm bán ra',
                },
              },
            ],
          },
        }}
        width={700} 
        height={250} 
      />
    </div>
  );
};

export default MyChartComponent;
