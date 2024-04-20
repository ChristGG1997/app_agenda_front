import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import Add from './pages/Add';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detalle/:id" element={<Details />} />
        <Route path="/agregar" element={<Add />} />
      </Routes>
    </Router>
  );
}

export default App;