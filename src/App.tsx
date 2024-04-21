// Importaciones
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Details from './pages/Details';
import Add from './pages/Add';

// Definimos el componente principal de nuestra aplicación
const App: React.FC = () => {
  // Retornamos el componente Router que permite el enrutamiento en nuestra aplicación
  return (
    <Router>
      {/* Definimos las rutas de nuestra aplicación */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/detalle/:id" element={<Details />} />
        <Route path="/agregar" element={<Add />} />
      </Routes>
    </Router>
  );
}

export default App;
