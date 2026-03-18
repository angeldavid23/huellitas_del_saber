import React from 'react';
import '../App.css';

const Dashboard = () => {
  // Estos datos vendrán luego de tu fetch al backend
  const asignaciones = [
    { id: 1, grado: 'III Básico', seccion: 'A', materia: 'Informática' },
    { id: 2, grado: 'III Básico', seccion: 'B', materia: 'Programación' },
    { id: 3, grado: 'IV Bachillerato', seccion: 'A', materia: 'Robótica' },
  ];

  return (
    <div className="dashboard-layout">
      {/* Sidebar Fija */}
      <aside className="sidebar">
        <div className="sidebar-logo">
          Huellitas del Saber
        </div>
        
        <p className="menu-section-title">Mis Clases</p>
        
        <nav>
          {asignaciones.map((clase) => (
            <div key={clase.id} className="menu-item">
              <span className="materia">{clase.materia}</span>
              <span className="grado-seccion">{clase.grado} - Sección {clase.seccion}</span>
            </div>
          ))}
        </nav>

        <div style={{ marginTop: 'auto', padding: '10px', fontSize: '12px', opacity: 0.5 }}>
          © 2026 Guatemala
        </div>
      </aside>

      {/* Contenido Principal */}
      <main className="main-content">
        <header style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          background: 'white', 
          padding: '20px 30px', 
          borderRadius: '20px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.05)' 
        }}>
          <h2 style={{ margin: 0 }}>Panel de Control</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span>Víctor Aquino</span>
            <div style={{ width: 35, height: 35, background: '#0047AB', borderRadius: '50%' }}></div>
          </div>
        </header>

        <section style={{ marginTop: '30px', background: 'white', padding: '30px', borderRadius: '20px' }}>
          <h3>Selecciona una materia del menú para ver las notas</h3>
          <p style={{ color: '#666' }}>Aquí se cargarán los estudiantes de la sección seleccionada.</p>
        </section>
      </main>
    </div>
  );
};

export default Dashboard;