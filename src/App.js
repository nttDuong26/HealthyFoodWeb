import './App.css';
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation  } from 'react-router-dom';
import Footer from './component/layout/footer/footer.jsx';
import Login from './component/layout/navbar/Account/login/login.jsx';
import MainMenu from './component/layout/mainMenu/mainMenu.jsx';
import ProductDetails from './component/layout/ProductDetails/ProductDetails.jsx';
import ShopCart from './component/layout/shopCart/shopCart.jsx';
import Abate from './component/layout/Abate/Abate.jsx';
import Header from './component/layout/header/header.jsx';
import Navbar from './component/layout/navbar/navbar';
import Body from './component/layout/body/Body.jsx';
import Register from './component/layout/navbar/Account/register/register.jsx';
import User from './component/admin/user/User';
import UserItem from './component/admin/user/UserItem';
import GetProduct from './component/admin/product/getProduct';
import GetProductItem from './component/admin/product/getProductItem';
import AddProduct from './component/admin/product/AdProduct';
import GetCategory from './component/admin/category/getCategory';
import GetCategories from './component/admin/category/getCategories';
import PutProduct from './component/admin/product/PutProduct';
import AdCategory from './component/admin/category/adCategory';
import PutCategory from './component/admin/category/putCategory';
import UpdateUser from './component/admin/user/UpdateUser';
import AdminPage from './component/admin/adminLayout/adminPage';
import Search from './component/layout/searchbar/searchForm/searchContent';
import Profile from './component/layout/navbar/Account/profilePage/profilePage';
import OrderHistory from './component/layout/navbar/Account/profilePage/orderHistory';
import AbateByNow from './component/layout/Abate/AbateByNow';
import AddImage from './component/admin/product/AddImage';
import Bill from './component/layout/Abate/orderHisDetail';
import HealthCalculator from './component/layout/body/Check/HealthCalculator';
import ResultComponent from './component/layout/body/Check/recoment.jsx';
import SearchContent from './component/layout/searchbar/searchForm/searchContent.jsx';
import ProductCategories from './component/layout/body/ProductCategories/ProductCategories.jsx';
import CategoryDetails from './component/layout/body/ProductCategories/CategoriesDetail.jsx';
import Trainbuy from './component/layout/footer/trainbuy.jsx';
import Pay from './component/layout/footer/pay.jsx';
import MapPage from './component/layout/subnav/contact/mapPage.jsx';

function App() {

  const location = useLocation();
  const [isUserItemPage, setIsUserItemPage] = useState(false);
  const [isProductItempage, setIsProductItempage] = useState(false);
  const [isPutProductpage, setIsPutProductpage] = useState(false);
  const [isCategorypage, setIsCategorypage] = useState(false);
  const [isPutCategorypage, setIsPutCategorypage] = useState(false);


  
  // const [isHealthCalculator, setIsHealthCalculator] = useState(false);

 
  



  // const [isProductItemPage, setIsProductItemPage] = useState(false);
  // const [isProductPage, setIsProductPage] = useState(false);


  const isAbatePage = location.pathname === '/abate';
  const isAdminPage = location.pathname === '/adminPage';
  // const isAdminPageTest = location.pathname === '/adminTess';
  // const isAbateNow = location.pathname === '/AbateByNow/:id';
  const isUserPage = location.pathname === '/user';
  const isProductPage = location.pathname === '/Product';
  const isAdProductPage = location.pathname === '/Product/add';
  const isCatePage = location.pathname === '/Category';
  const isAdCatetPage = location.pathname === '/Category/ad';
  const isAdProfilePage = location.pathname === '/profileUser';
  const isAdOrHisPage = location.pathname === '/OrderHis';
  const isHealthCalculator = location.pathname === '/healthCalculator';
  const isAbateNow = location.pathname.startsWith('/abateByNow');
  const isMapPage = location.pathname === '/map';

  

  const role = 'admin';
  return (
    <>
      {!isAbatePage && !isUserPage && !isUserItemPage && !isProductPage && !isAdProductPage && !isCatePage && !isAdCatetPage && !isProductItempage && !isAdOrHisPage && !isPutProductpage && !isCategorypage && !isPutCategorypage && !isAdminPage && !isAdProfilePage && !isHealthCalculator && !isAbateNow &&  <Navbar />}
          <Routes>
            <Route path ="/" element = {<Body/>}/>
            <Route path="/body" element={<Body/>}/>
            <Route path="/shopCart" element={<ShopCart/>}/>
            <Route path="/user" element={<User/>} />
            <Route path="/user/:id" element={<UserItem setIsUserItemPage={setIsUserItemPage}/>} />
            <Route path="/user/:id" element={<UpdateUser/>} />
            <Route path="/Product" element={<GetProduct/>} />
            <Route path="/Product/:id" element={<GetProductItem setIsProductItempage = {setIsProductItempage} />} />
            <Route path="/Product/add" element={<AddProduct />} />
            <Route path="/Product/Put/:id" element={<PutProduct setIsPutProductpage= {setIsPutProductpage} />} />
            <Route path="/Category" element={<GetCategory />} />
            <Route path="/Category/:id" element={<GetCategories setIsCategorypage ={setIsCategorypage} />} />
            <Route path="/Category/ad" element={<AdCategory />} />
            <Route path="/Category/put/:id" element={<PutCategory setIsPutCategorypage ={setIsPutCategorypage} />} />
            <Route path="/updateuser/:id" element={<UpdateUser/>} />
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/mainmenu" element={<MainMenu />}/>
            <Route path="/ProductDetails/:id" element = {<ProductDetails/>}/>
            <Route path="/" element={<ProductCategories />} />
            <Route path="/CategoryDetails/:id" element = {<CategoryDetails/>}/>
            
            {/* <Route path="/category/:id" element = {<CategoryDetail/>}/> */}
            <Route path ="/abate" element ={<Abate/>}/>
            <Route path = "/cartshop" element ={<ShopCart/>}/>
            <Route path = "/searchContent" element ={<Search/>}/>
            <Route path = "/profileUser" element ={<Profile/>}/>
            <Route path = "/OrderHis" element ={<OrderHistory/>}/>
            <Route path="/abateByNow/:id" element={<AbateByNow />} />
            <Route path = "/image" element ={<AddImage/>}/>
            <Route path = "/healthCalculator" element ={<HealthCalculator />}/>
            {/* {authenticatedUserRole === 'admin' && <Route path="/adminPage" element={<AdminPage />} />} */}
              <Route path="/adminPage" element={<AdminPage />} />
              <Route path="/recoment" element={<ResultComponent />} />
              <Route path="/searchContent/:searchTerm" element={<SearchContent />} />
              <Route path="/hd-mh" element={<Trainbuy />} />
              <Route path="/payfooter" element={<Pay />} />
              <Route path="/map" element={<MapPage />} />

              


              

              

          </Routes>
        {!isAbatePage && !isUserPage && !isUserItemPage   && !isProductPage && !isAdProductPage && !isCatePage && !isProductItempage && !isAdCatetPage && !isPutProductpage && !isCategorypage && !isAdOrHisPage && !isPutCategorypage && !isAdminPage && !isAdProfilePage && !isHealthCalculator && !isAbateNow &&  <Footer />}  

    </>

  );
}



export default App;


