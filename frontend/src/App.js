import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        {/* La página principal será el Login */}
        <Route path="/" element={<Login />} />
        
        {/* La ruta del Dashboard */}
        <Route path="/dashboard" element={<Dashboard />} />

        {/* Si alguien escribe cualquier otra cosa, lo manda al Login */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;