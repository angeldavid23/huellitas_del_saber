import React, { useState, useEffect } from 'react';
import '../App.css';

const Dashboard = () => {
  // 1. Estado para guardar las materias que vienen de la DB
  const [asignaciones, setAsignaciones] = useState([]);

  // 2. Función para pedir los datos al Backend
  const cargarMaterias = async () => {
    try {
      // Usamos el ID 1 de momento (luego lo haremos dinámico con el Login)
      const response = await fetch('http://localhost:8000/api/asignaciones/1');
      const data = await response.json();
      setAsignaciones(data); // Guardamos los datos en el estado
    } catch (error) {
      console.error("Error al cargar materias:", error);
    }
  };

  // 3. useEffect ejecuta la función al cargar la página
  useEffect(() => {
    cargarMaterias();
  }, []);

  return (
    <div className="dashboard-layout">
      {/* Sidebar Fija */}
      <aside className="sidebar">
        <div className="sidebar-logo">Huellitas del Saber</div>
        
        <p className="menu-section-title">MIS CLASES</p>
        
        <nav>
          {/* 4. Mapeamos los datos reales de la base de datos */}
          {asignaciones.map((clase) => (
            <div key={clase.id} className="menu-item">
              <span className="materia">{clase.materia}</span>
              <span className="grado-seccion">{clase.grado} - Sección {clase.seccion}</span>
            </div>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', padding: '10px', fontSize: '10px', opacity: 0.5 }}>
          GUATEMALA 2026
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="main-content">
        <header className="card dashboard-header" style={{ display: 'flex', justifyContent: 'space-between', background: 'white', padding: '20px', borderRadius: '20px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
          <h2 style={{ margin: 0, fontSize: '18px' }}>Panel de Control</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>Víctor Aquino</span>
            <div style={{ width: 35, height: 35, background: '#0047AB', borderRadius: '50%' }}></div>
          </div>
        </header>

        <section style={{ marginTop: '20px', background: 'white', padding: '30px', borderRadius: '20px' }}>
          <h3 style={{ color: '#001D41' }}>Bienvenido al Sistema de Notas</h3>
          <p style={{ color: '#666' }}>Selecciona una materia del menú a la izquierda para comenzar a gestionar las calificaciones de tus estudiantes.</p>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;