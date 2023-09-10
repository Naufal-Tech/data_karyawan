import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import './App.css';
import LandingPage from './Pages/LandingPage';
import PageNotFound from './components/NotFound'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path='*' element={<PageNotFound />} />
    </Routes>
  </BrowserRouter>

);