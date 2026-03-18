# backend/app/models.py
from sqlalchemy import Column, Integer, String, ForeignKey 
from .database import Base

class Usuario(Base):
    __tablename__ = "usuarios"
    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String)
    correo = Column(String, unique=True, index=True)
    password = Column(String)

class Asignacion(Base):
    __tablename__ = "asignaciones"

    id = Column(Integer, primary_key=True, index=True)
    grado = Column(String)
    seccion = Column(String)
    materia = Column(String)
    # Ahora que ya importamos ForeignKey, esta línea funcionará:
    id_docente = Column(Integer, ForeignKey("usuarios.id"))

# backend/app/models.py (Continuación)

class Estudiante(Base):
    __tablename__ = "estudiantes"

    id = Column(Integer, primary_key=True, index=True)
    nombre = Column(String)
    codigo_personal = Column(String, unique=True, index=True)
    grado = Column(String)
    seccion = Column(String)

class Nota(Base):
    __tablename__ = "notas"

    id = Column(Integer, primary_key=True, index=True)
    id_estudiante = Column(Integer, ForeignKey("estudiantes.id"))
    id_actividad = Column(Integer) # Aquí podrías conectar con una tabla de 'Actividades'
    punteo = Column(Integer)
    comentario = Column(String)