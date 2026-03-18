-- Tabla de Usuarios (Para el Login)
CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    correo TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    rol TEXT DEFAULT 'docente' -- 'docente', 'admin', 'padre'
);

-- Tabla de Actividades (Lo que vimos en la imagen "Crear Nueva Actividad")
CREATE TABLE actividades (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    descripcion TEXT,
    punteo_maximo INTEGER DEFAULT 100,
    fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    id_docente INTEGER REFERENCES usuarios(id)
);

-- Tabla de Estudiantes
CREATE TABLE estudiantes (
    id SERIAL PRIMARY KEY,
    nombre TEXT NOT NULL,
    codigo_personal TEXT UNIQUE
);

-- Tabla de Notas (La que llenaremos con el Excel)
CREATE TABLE notas (
    id SERIAL PRIMARY KEY,
    id_estudiante INTEGER REFERENCES estudiantes(id),
    id_actividad INTEGER REFERENCES actividades(id),
    punteo DECIMAL(5,2),
    comentario TEXT
);