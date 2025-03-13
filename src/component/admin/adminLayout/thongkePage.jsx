import React, { useState } from 'react';
import Button from '@mui/material/Button';
import TrafficFourWeekChart from './trafficTK/trafficFourWeek';
import MonthlyBestSellingProductsChart from '../product/chartsaleweek';
import MyChartProductComponent from './trafficTK/producttrafic';
import MyChartOrderComponent from './trafficTK/orderfourweek';
import ProductCount from '../product/TotalProducts';
import TotalCountUser from './userTK/userTotal';
import TotalCountOrder from '../order/ordersTotal';

const StatisticsPage = () => {
  const [currentPage, setCurrentPage] = useState('bothCharts');

  const handleSwitchPage = (page) => {
    setCurrentPage(page);
  };

  const isMonthlyBestSellingActive = currentPage === 'monthlyBestSelling';
  const isTrafficFourWeekActive = currentPage === 'trafficFourWeek';

  return (
    <div>
      <h1>Thống kê</h1>
      <div>
        <Button
          onClick={() => handleSwitchPage('monthlyBestSelling')}
          color="primary"
          style={{
            margin: '4px',
            backgroundColor: isMonthlyBestSellingActive ? '#1976D2' : 'inherit',
            color: isMonthlyBestSellingActive ? 'white' : 'black',
          }}
        >
          Sản phẩm bán chạy
        </Button>
        <Button
          onClick={() => handleSwitchPage('trafficFourWeek')}
          color="primary"
          style={{
            margin: '4px',
            backgroundColor: isTrafficFourWeekActive ? '#1976D2' : 'inherit',
            color: isTrafficFourWeekActive ? 'white' : 'black',
          }}
        >
          Doanh thu
        </Button>
      </div>

      <div style={{ backgroundColor: '#fff', margin: '1vw' }}>
        {currentPage === 'monthlyBestSelling' && (
          <>
            <MyChartProductComponent />
          </>
        )}
        {currentPage === 'trafficFourWeek' && (
          <>
            <MyChartOrderComponent />
          </>
        )}
        {currentPage === 'bothCharts' && (
          <>
            {/* <MonthlyBestSellingProductsChart />
            <TrafficFourWeekChart /> */}
            <div style = {{
                display: 'flex',
                justifyContent: 'space-evenly',
                // margin: '1.5vw 0',
            }} >
                  
                    <ProductCount/>
                    <TotalCountUser/>

                    <TotalCountOrder/>
              </div>
                <div style = {{display: 'flex'}}>
                  <div style = {{ backgroundColor: '#fff' }} >
                    <TrafficFourWeekChart/>
                  </div>
                  <div   style = {{ backgroundColor: '#fff'}} >
                    <MonthlyBestSellingProductsChart/>
                  </div>
    
                </div>
          </>
        )}
      </div>
    </div>
  );
};

export default StatisticsPage;
