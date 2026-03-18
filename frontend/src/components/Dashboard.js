import React, { useState, useEffect } from 'react';
import '../App.css';

const Dashboard = () => {
  const [asignaciones, setAsignaciones] = useState([]);
  // Estado para saber qué clase está seleccionada actualmente
  const [claseSeleccionada, setClaseSeleccionada] = useState(null);

  const cargarMaterias = async () => {
    try {
      const response = await fetch('http://localhost:8000/api/asignaciones/1');
      const data = await response.json();
      setAsignaciones(data);
    } catch (error) {
      console.error("Error al cargar materias:", error);
    }
  };

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
          {asignaciones.map((clase) => (
            <div 
              key={clase.id} 
              // Si el ID coincide con la seleccionada, añadimos la clase 'active'
              className={`menu-item ${claseSeleccionada?.id === clase.id ? 'active' : ''}`}
              onClick={() => setClaseSeleccionada(clase)}
              style={{ cursor: 'pointer' }}
            >
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
          <h2 style={{ margin: 0, fontSize: '18px' }}>
            {/* Título dinámico */}
            {claseSeleccionada ? `Notas: ${claseSeleccionada.materia}` : 'Panel de Control'}
          </h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ textAlign: 'right', marginRight: '10px' }}>
                <span style={{ display: 'block', fontWeight: 'bold', fontSize: '14px' }}>Víctor Aquino</span>
                <span style={{ display: 'block', fontSize: '11px', color: '#0047AB' }}>Asesor de III Básico</span>
            </div>
            <div style={{ width: 35, height: 35, background: '#0047AB', borderRadius: '50%' }}></div>
          </div>
        </header>

        <section style={{ marginTop: '20px', background: 'white', padding: '30px', borderRadius: '20px', minHeight: '400px' }}>
          {claseSeleccionada ? (
            <>
              <h3 style={{ color: '#001D41', marginBottom: '5px' }}>
                {claseSeleccionada.grado} - Sección {claseSeleccionada.seccion}
              </h3>
              <p style={{ color: '#666' }}>Listado de alumnos y gestión de calificaciones.</p>
              
              <hr style={{ border: '0', borderTop: '1px solid #eee', margin: '20px 0' }} />
              
              {/* Espacio reservado para la tabla de alumnos */}
              <div style={{ 
                marginTop: '40px', 
                padding: '60px', 
                border: '2px dashed #D0E0F0', 
                borderRadius: '20px',
                textAlign: 'center',
                color: '#A0B0C0'
              }}>
                <p>Aquí aparecerán los estudiantes de <b>{claseSeleccionada.materia}</b></p>
                <small>Próximo paso: Cargar lista desde PostgreSQL</small>
              </div>
            </>
          ) : (
            <div style={{ textAlign: 'center', paddingTop: '50px' }}>
              <h3 style={{ color: '#001D41' }}>Bienvenido al Sistema de Notas</h3>
              <p style={{ color: '#666' }}>Selecciona una materia del menú a la izquierda para comenzar.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;