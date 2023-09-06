import React from 'react';
import { BrowserRouter ,Route, Routes } from "react-router-dom";
import HomePage from './pages/home/index';
import Search from './pages/search/index';
import Movie from './pages/movie/index';

const NotFound = function Search(){
  return <div>
      NotFound
  </div>
}

function App() {
  return (
    //<HomePage >
    <BrowserRouter >
    <Routes>
      <Route path="/" element={<HomePage/>} />
      <Route path="/home" element={<HomePage/>} />
      <Route path="/search" element={<Search/>} />
      <Route path="/movie" element={<Movie/>} />
      <Route path="/*" element={<NotFound/>} />
    </Routes>
    </BrowserRouter >
  );
}

export default App;
