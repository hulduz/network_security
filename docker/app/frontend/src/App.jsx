import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Components/Login';
import Flag from './Components/Flag';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/flag" element={<Flag />} />
    </Routes>
  );
}

export default App;
