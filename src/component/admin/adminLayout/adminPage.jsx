import React, {  useState } from 'react';
// import { Menu, Switch } from 'antd';
import { AppstoreOutlined, UserOutlined, BankOutlined, ContainerOutlined  } from '@ant-design/icons';
import AdminHeader  from './adminHeader/adminHeader';
import GetUser from '../user/User';
import GetProduct from '../product/getProduct';
import AdProduct from '../product/AdProduct';
import GetCategories from '../category/getCategory';
import AdCategories from '../category/adCategory';
import FastfoodIcon from '@mui/icons-material/Fastfood';
import UserStatsWeekly from './userTK/adminChart';
import UserStatsMonthly from './userTK/UserChartMonth';
import UserStatsYearly from './userTK/userChartYearly';
import UserFiveWeek from './userTK/charUserfiveweek';
import TrafficChart from './trafficTK/traficWeek';
import TrafficFourWeekChart from './trafficTK/trafficFourWeek';
import OrderList from '../product/getProduct';
import SignalCellularAltOutlinedIcon from '@mui/icons-material/SignalCellularAltOutlined';
import AcountAdmin from './AcountAdmin/AcountAmin';
import GetOrder from '../order/getOrder';
import StatusOrderComponent from '../order/putOrder';
import MonthlyBestSellingProductsChart from '../product/chartsaleweek';
import DiscountOutlinedIcon from '@mui/icons-material/DiscountOutlined';
import GetDiscountCodes from '../discount/getDiscountCodes';
// import Logo from '../../layout/Banner/';
import { Avatar, Space } from 'antd';
import ProductCount from '../product/TotalProducts';
import TotalCountUser from './userTK/userTotal';
import TotalCountOrder from '../order/ordersTotal';
import { Input } from 'antd';
import { Link } from 'react-router-dom';
import {BarChartOutlined}from '@ant-design/icons'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, Button, theme } from 'antd';
import SearchIcon from '@mui/icons-material/Search';
import MyChartorderComponent from './trafficTK/orderfourweek';
import MyChartProductComponent from './trafficTK/producttrafic';
import StatisticsPage from './thongkePage';
export function getItem(label, key, icon, children, type) {
    return {
      key,
      icon,
      children,
      label,
      type,
    };
  }
const { Header, Sider, Content } = Layout;
const onSearch = (value, _e, info) => console.log(info?.source, value);
const { Search } = Input;

export default function AdminPage() {

    const items = [
        // getItem('Tổng quan', '1', <BankOutlined />, [
        // ]),
        {
          key: '1',
          icon: <BankOutlined />,
          label: 'Tổng quan',
        },
        {
          key: '2',
          icon: <UserOutlined />,
          label: 'Người dùng',
        },
        {
          key: '3',
          icon: <FastfoodIcon />,
          label: 'Sản phẩm',
        },
        {
          key: '4',
          icon: <AppstoreOutlined />,
          label: 'Danh mục',
        },
        {
          key: '5',
          icon: <ContainerOutlined />,
          label: 'Đơn hàng',
        },
        {
          key: '7',
          icon: <DiscountOutlinedIcon />,
          label: 'Giảm giá',
        },
        {
          key: '6',
          icon: <BarChartOutlined />,
          label: 'Thống kê',
        },
        // getItem('Người dùng', 'user', <UserOutlined />, [
        //   getItem('Xem danh sách người dùng', '2'),
        // ]),
        // getItem('Sản phẩm', 'product', <FastfoodIcon />, [
        //   getItem('Xem danh sách sản phẩm', '3'),
        //   getItem('Thêm sản phẩm mới', '4'),
        // ]),
        // getItem('Danh mục sản phẩm', 'categories', <AppstoreOutlined />, [
        //   getItem('Xem danh sách danh mục', '6'),
        //   getItem('Thêm danh mục mới', '7'),
        // ]),
        // getItem('Đơn hàng', '8', <ContainerOutlined />, [
        //   getItem('Xem danh sách đơn hàng', '9'),
        // ]),
        // getItem('Thống kê', 'thongke', <SignalCellularAltOutlinedIcon />, [
        //   getItem('Xem thống kê người dùng', 'tknd'),
        //   getItem('Xem thống kê sản phẩm bán chạy', 'spbc'),
        //   getItem('Xem thống kê đơn hàng', 'tkdh'),
        //   getItem('Xem thống kê doanh thu', 'tkdt'),

        // ]),
      ];

    const rootSubmenuKeys = ['user', 'product','categories', '1', '8', 'thongke', '6' ];

    const [openKeys, setOpenKeys] = useState([]);
    const [keySelected, setKeySelected] = useState('');

    const renderPage = (key) => {
      switch(key) {

        case '2':
          return (
            <GetUser/>
          )
        case '3':
          return (
            <GetProduct/>
          )
        case '4':
          return (
            <GetCategories/>

          )
        case '5':
          return (
            <GetOrder/>
            // <StatusOrderComponent/>
          ) 
          case '6':
              return (
//                 <div style={{ display: 'flex' }}>
//                   <div style={{ backgroundColor: '#fff', margin: '1vw' }}>
//                     <TrafficFourWeekChart />
//                   </div>
//                   <div style={{ backgroundColor: '#fff', margin: '1vw' }}>
//                     {/* <MonthlyBestSellingProductsChart /> */}
//                 <MyChartorderComponent/>
// <MyChartProductComponent/>
//                   </div>
//                 </div>
<StatisticsPage/>
              )
        case '7':
          return (
            <GetDiscountCodes/>
          ) 
        default:
          return (
            <div >
              
              <h2>TỔNG QUAN</h2>
              <div style = {{
                display: 'flex',
                justifyContent: 'space-evenly',
                margin: '1.5vw 0',
            }} >
                  
                    <ProductCount/>
                    <TotalCountUser/>

                    <TotalCountOrder/>
              </div>
                <div style = {{display: 'flex', justifyContent: 'space-between'}}>
                  <div style = {{ backgroundColor: '#fff', margin:'1vw' }} >
                    <TrafficFourWeekChart/>
                  </div>
                  <div   style = {{ backgroundColor: '#fff', margin:'1vw'}} >
                    <MonthlyBestSellingProductsChart/>
                  </div>
    
                </div>
                {/* <OrderList/> */}
            <GetOrder/>

            </div>
            

          ) 
      }
    }

    const onOpenChange = (keys) => {
      const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
      if (latestOpenKey && rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        setOpenKeys(keys);
      } else {
        setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
      }
    };

    const handleOnclick = ({ key }) => {
        // console.log
        setKeySelected (key);
        console.log('keySelected', keySelected);
    };
    const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken()


  return (
    // <div>
    //   <div className=""></div>
    //   <div style = {{display: 'flex',}}>
    //       <Menu
    //           mode="inline"
    //           openKeys={openKeys}
    //           onOpenChange={onOpenChange}
    //           style={{
    //           width: 256,
    //           }}
    //           items={items}
    //           onClick={handleOnclick}
    //       />
    //       <div>
    //         {renderPage(keySelected)}
    //       </div>
    //   </div>
    // </div>

    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed} style={{
         background: colorBgContainer
      }}>
        
        <div className="demo-logo-vertical"/>
        <AdminHeader/>

        <Menu
          // theme="dark"
          style={{
            // background: '#143b36'
        //  background: '#10302c'
        background: colorBgContainer

         }}
          mode="inline"
          defaultSelectedKeys={['1']}
          items={items}
          onClick={handleOnclick}
        />
      </Sider >
      <Layout>
      <Header
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            // alignItems: 'center',
            padding: '0 6vw 0 0',
            boxShadow: ' rgba(0, 0, 0, 0.3)',
            background: colorBgContainer,
          }}
        >
         
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <Button
              type="text"
              icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
              onClick={() => setCollapsed(!collapsed)}
              style={{
                fontSize: '16px',
                width: 64,
                height: 64,
              }}
            />
           
             
          </div>
          
          <AcountAdmin style={{ marginLeft: '10%' }}  />
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: '0 3vW',
            // minHeight: 280,
            // background: colorBgContainer,
          }}
        >
          {renderPage(keySelected)}
        </Content>
      </Layout>
    </Layout>
  );
};
