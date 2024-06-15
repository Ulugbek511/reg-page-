import './App.css';
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GeneraLayout from './pages/GeneraLayout';
import Home from './pages/Home';
import Sidebar from './components/SideBar';

const Categories = React.lazy(() => import('./pages/Categories/Categories'))
const ProductPage = React.lazy(() => import('./pages/Product/ProductPage'))
const Register = React.lazy(() => import('./pages/RegisterPage'))

function App() {
  return (
    <BrowserRouter>
      <React.Suspense fallback={<div>Loading...</div>}>
        <Sidebar />
        <Routes>
          <Route path='/' element={<GeneraLayout />}>
            <Route index element={<Home />} />
            <Route path='/category' element={<Categories />} />
            <Route path='/products' element={<ProductPage />} />
          </Route>
          <Route path='/register' element={<Register />} />
        </Routes>
      </React.Suspense>
    </BrowserRouter>
  );
}

export default App;
