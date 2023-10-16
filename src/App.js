import React from 'react';
import { BrowserRouter ,Route, Routes } from "react-router-dom";
import HomePage from './pages/home/index';
import Detail from './pages/detail/index';
import Movie from './pages/movie/index';

function App() {
  return (
    //<HomePage >
    <BrowserRouter >
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="/detail" element={<Detail/>} />
      <Route path="/movie" element={<Movie/>} />
      <Route path="/*" element={<div>NotFound</div>} />
    </Routes>
    </BrowserRouter >
  );
}

export default App;
