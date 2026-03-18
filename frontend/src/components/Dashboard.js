import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const navigate = useNavigate();
  const [autorizado, setAutorizado] = useState(false);
  
  const [usuarioLogueado, setUsuarioLogueado] = useState({ nombre: "Cargando...", cargo: "" });
  const [asignaciones, setAsignaciones] = useState([]);
  const [claseSeleccionada, setClaseSeleccionada] = useState(null);
  const [estudiantes, setEstudiantes] = useState([]); // <--- Ahora sí lo usaremos
  const [pestañaActiva, setPestañaActiva] = useState('actividades');

  // --- 1. SEGURIDAD Y PERFIL ---
  useEffect(() => {
    const usuarioGuardado = JSON.parse(localStorage.getItem('usuario'));
    if (!usuarioGuardado) {
      setAutorizado(false);
      setTimeout(() => navigate('/'), 2000); 
    } else {
      setAutorizado(true);
      setUsuarioLogueado(usuarioGuardado);
      cargarMaterias(usuarioGuardado.id); // Pasamos el ID del docente dinámicamente
    }
  }, [navigate]);

  // --- 2. CARGAR MATERIAS DEL DOCENTE ---
  const cargarMaterias = async (docenteId) => {
    try {
      // Ajustado para usar el ID del usuario logueado
      const response = await fetch(`http://localhost:8000/api/asignaciones/${docenteId}`);
      const data = await response.json();
      setAsignaciones(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Error al cargar materias:", error);
    }
  };

  // --- 3. CARGAR ESTUDIANTES (EL MOTOR QUE FALTABA) ---
  useEffect(() => {
    const cargarEstudiantes = async () => {
      // Solo cargamos si hay una clase seleccionada y estamos en la pestaña de estudiantes
      if (claseSeleccionada && pestañaActiva === 'estudiantes') {
        try {
          const gradoEnc = encodeURIComponent(claseSeleccionada.grado);
          const seccionEnc = encodeURIComponent(claseSeleccionada.seccion);
          const response = await fetch(`http://localhost:8000/api/estudiantes/${gradoEnc}/${seccionEnc}`);
          const data = await response.json();
          setEstudiantes(Array.isArray(data) ? data : []);
        } catch (error) {
          console.error("Error cargando alumnos:", error);
          setEstudiantes([]);
        }
      }
    };
    cargarEstudiantes();
  }, [claseSeleccionada, pestañaActiva]); // Se dispara cuando cambias de clase o de pestaña

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/');
  };

  if (!autorizado) {
    return (
      <div className="denied-access">
        <div className="denied-card">
          <h1>🚫 Acceso Denegated</h1>
          <p>No tienes una sesión activa. Redirigiendo al login...</p>
        </div>
      </div>
    );
  }

  const tabStyle = (active) => ({
    padding: '12px 24px',
    cursor: 'pointer',
    backgroundColor: active ? '#e6effd' : 'transparent',
    color: active ? '#0047AB' : '#666',
    border: 'none',
    borderBottom: active ? '3px solid #0047AB' : '3px solid transparent',
    fontWeight: active ? '600' : '500',
    fontSize: '14px',
    borderRadius: '8px 8px 0 0',
    marginRight: '10px'
  });

  return (
    <div className="dashboard-layout">
      <aside className="sidebar">
        <div className="sidebar-logo">Huellitas del Saber</div>
        <p className="menu-section-title">MIS CLASES</p>
        <nav style={{ flex: 1 }}>
          {asignaciones.map((clase) => (
            <div 
              key={clase.id} 
              className={`menu-item ${claseSeleccionada?.id === clase.id ? 'active' : ''}`}
              onClick={() => {
                setClaseSeleccionada(clase);
                setPestañaActiva('actividades');
              }}
            >
              <span className="materia">{clase.materia}</span>
              <span className="grado-seccion">{clase.grado} - {clase.seccion}</span>
            </div>
          ))}
        </nav>
        <div className="sidebar-footer-container">
            <button className="btn-logout" onClick={handleLogout}>Cerrar Sesión</button>
            <div className="sidebar-footer">GUATEMALA 2026</div>
        </div>
      </aside>

      <main className="main-content">
        <header className="dashboard-header">
          <h2>{claseSeleccionada ? `Notas: ${claseSeleccionada.materia}` : 'Panel de Control'}</h2>
          <div className="user-info">
            <div style={{ textAlign: 'right', marginRight: '15px' }}>
              <span style={{ display: 'block', fontWeight: 'bold' }}>{usuarioLogueado.nombre}</span>
              <span style={{ fontSize: '11px', color: '#0047AB' }}>{usuarioLogueado.cargo || 'Docente'}</span>
            </div>
            <div className="user-avatar"></div>
          </div>
        </header>

        <section className="content-card">
          {claseSeleccionada ? (
            <>
              <div className="card-header">
                <h3>{claseSeleccionada.grado} - Sección {claseSeleccionada.seccion}</h3>
                <div className="tabs-container">
                  <button onClick={() => setPestañaActiva('actividades')} style={tabStyle(pestañaActiva === 'actividades')}>📝 Actividades</button>
                  <button onClick={() => setPestañaActiva('estudiantes')} style={tabStyle(pestañaActiva === 'estudiantes')}>👥 Estudiantes</button>
                </div>
              </div>

              <div className="card-body">
                {pestañaActiva === 'actividades' ? (
                  <div className="empty-state">
                    <div style={{ fontSize: '40px' }}>📁</div>
                    <h4>Sin actividades aún</h4>
                    <p>Crea una tarea para empezar a calificar.</p>
                    <button className="btn-primary">+ Crear Actividad</button>
                  </div>
                ) : (
                  // ... dentro del render, en la parte de la tabla de estudiantes:

<div className="table-container fade-in">
  <table className="estudiantes-table">
    <thead>
      <tr>
        <th style={{ width: '80px' }}>No.</th>
        <th>Nombre Completo</th>
        <th>Código Personal</th>
        {/* Columna de Acción eliminada */}
      </tr>
    </thead>
    <tbody>
      {estudiantes.length > 0 ? estudiantes.map((est, index) => (
        <tr key={est.id}>
          <td>{index + 1}</td>
          <td className="nombre-estudiante">{est.nombre}</td>
          <td className="codigo-estudiante">{est.codigo_personal}</td>
        </tr>
      )) : (
        <tr>
          <td colSpan="3" style={{ textAlign: 'center', padding: '40px' }}>
            No hay estudiantes inscritos en este grado.
          </td>
        </tr>
      )}
    </tbody>
  </table>
</div>
                )}
              </div>
            </>
          ) : (
            <div className="welcome-msg">
               <h3>Bienvenido al Sistema de Notas</h3>
               <p>Selecciona una materia del menú lateral para comenzar.</p>
            </div>
          )}
        </section>
      </main>
    </div>
  );
};

export default Dashboard;