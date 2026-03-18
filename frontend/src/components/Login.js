import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importamos el hook para navegar
import '../App.css'; 

const Login = () => {
  // Estados para capturar los datos
  const [correo, setCorreo] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // Inicializamos la función de navegación

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ correo, password })
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        // En lugar de alert, redirigimos directamente al Dashboard
        navigate('/dashboard'); 
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    } catch (error) {
      console.error("Error al conectar con el backend:", error);
      alert("No se pudo establecer conexión con el servidor.");
    }
  };

  return (
    <div className="login-container">
      {/* Lado Izquierdo */}
      <div className="login-sidebar">
        <div>
          <div className="logo-box">
            <div style={{width: '30px', height: '30px', border: '4px solid #001D41', borderRadius: '50%'}}></div>
          </div>
          <h1>Huellitas del Saber</h1>
          <p>Plataforma de Gestión Académica</p>
        </div>
        <p style={{fontSize: '12px', opacity: 0.6}}>GUATEMALA 2026</p>
      </div>

      {/* Lado Derecho */}
      <div className="login-form-section">
        <h2 style={{fontSize: '32px', marginBottom: '10px'}}>Bienvenido</h2>
        <p style={{color: '#888', marginBottom: '30px'}}>Ingresa tus credenciales</p>
        
        <form onSubmit={handleLogin}>
          <div className="input-group">
            <input 
              type="email" 
              placeholder="Correo Electrónico" 
              required
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>
          <div className="input-group">
            <input 
              type="password" 
              placeholder="Contraseña" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="btn-login">
            Entrar al Portal
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;