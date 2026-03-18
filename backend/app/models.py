# backend/app/models.py

# MODIFICA ESTA LÍNEA (Agrega ForeignKey al final)
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