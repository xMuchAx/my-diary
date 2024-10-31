// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './layout/Diary';
import MyDiary from './layout/MyDiary';
import './App.css';
import { DiaryProvider } from './context/DiaryContext';

function App() {
  return (
    <DiaryProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/diary" element={<MyDiary />} />
        </Routes>
      </Router>
    </DiaryProvider>
  );
}

export default App;
