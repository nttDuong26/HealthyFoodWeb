import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js";

const RevenueChart = () => {
  const [weekNumber, setWeekNumber] = useState(new Date().getWeek()); // Lấy tuần hiện tại
  const [totalRevenue, setTotalRevenue] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/v1/Order/countOrder/trafficweek/${weekNumber}`);
        setTotalRevenue(response.data.totalRevenue);
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, [weekNumber]);

  useEffect(() => {
    const ctx = document.getElementById("revenueChart").getContext("2d");
    new Chart(ctx, {
      type: "bar",
      data: {
        labels: [`Tuần ${weekNumber}`],
        datasets: [{
          label: "Doanh Thu (VNĐ)",
          data: [totalRevenue],
          backgroundColor: "rgba(75, 192, 192, 0.2)",
          borderColor: "rgba(75, 192, 192, 1)",
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
  }, [totalRevenue, weekNumber]);

  return (
    <div>
      <h2>Thống kê doanh thu tuần</h2>
      <label>Chọn Tuần: </label>
      <input
        type="number"
        min="1"
        max="52"
        value={weekNumber}
        onChange={(e) => setWeekNumber(parseInt(e.target.value))}
      />
      <canvas id="revenueChart" width={400} height={200}></canvas>
    </div>
  );
};

// Hàm mở rộng Date để lấy số tuần trong năm
Date.prototype.getWeek = function() {
  var onejan = new Date(this.getFullYear(),0,1);
  var millisecsInDay = 86400000;
  return Math.ceil((((this - onejan) / millisecsInDay) + onejan.getDay()+1)/7);
};

export default RevenueChart;
