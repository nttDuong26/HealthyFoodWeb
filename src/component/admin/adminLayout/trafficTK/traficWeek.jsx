import React, { useEffect, useState } from "react";
import axios from "axios";
import Chart from "chart.js";

const TrafficChart = () => {
  const [weekNumber, setWeekNumber] = useState(new Date().getWeek()); // Lấy tuần hiện tại
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/v1/Order/countOrder/trafficweek/${weekNumber}`);
        console.log(response.data);
        setData(response.data); // Thiết lập giá trị của data từ phản hồi của API
      } catch (error) {
        console.error("Lỗi khi lấy dữ liệu:", error);
      }
    };

    fetchData();
  }, [weekNumber]);

  useEffect(() => {
    const ctx = document.getElementById("revenueChart").getContext("2d");
    const labels = data.map((week) => `Tuần ${weekNumber}`);
    const revenueData = data.map((week) => week.totalRevenue);

    new Chart(ctx, {
      type: "bar",
      data: {
        labels: labels,
        datasets: [{
          label: "Doanh Thu (VNĐ)",
          data: revenueData,
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
  }, [data]);

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

Date.prototype.getWeek = function() {
  var onejan = new Date(this.getFullYear(), 0, 1);
  var millisecsInDay = 86400000;
  return Math.ceil((((this - onejan) / millisecsInDay) + onejan.getDay() + 1) / 7);
};

export default TrafficChart;
