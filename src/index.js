import React from 'react';
import axios from 'axios';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';


export async function createProduct(data) {
  try {
    const url = 'https://ecommerce-backend-fawn-eight.vercel.app';
 const response = await axios.post(`${url}/api/products`, data); 
    return response;

  } catch (err) {
    console.log(err)
  }
  }



const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
