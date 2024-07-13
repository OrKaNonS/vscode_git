import React from 'react';
import ReactDOM from 'react-dom/client';
import '../src/css/index.css';
import Header from '../src/sub/Header';
import ListProduct from '../src/sub/ListProduct';
import Footer from '../src/sub/Footer';
import DetailProduct from '../src/sub/DetailProduct';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NotFound from '../src/sub/NotFound';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <BrowserRouter>
        <Header />
        <Routes>
            <Route path="/" element={<ListProduct />} />
            <Route path="/product/:id" element={<DetailProduct />} />
            <Route path="*" element={<NotFound />} />
        </Routes>
        <Footer />
    </BrowserRouter>
);
