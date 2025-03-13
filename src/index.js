import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
// import * as serviceWorker from "./servieceWorker";
import { BrowserRouter } from 'react-router-dom';
import { SearchProvider } from './component/context/searchContext';
import { ProductProvider } from './component/context/productContext';
import {DataProvider } from './component/context/calculContext';

const container = document.getElementById('root');
const root = ReactDOM.createRoot(container);
root.render(
  <DataProvider>
  <SearchProvider>
        <BrowserRouter>
        <ProductProvider>

            <App />
            
    </ProductProvider>

        </BrowserRouter>
      </SearchProvider>
  </DataProvider>
  

);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
