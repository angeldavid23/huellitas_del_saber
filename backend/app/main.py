from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from . import models, database
# Esto es lo que crea las tablas usando el motor
models.Base.metadata.create_all(bind=database.engine)
app = FastAPI()

# Permitir comunicación con el frontend de React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/api/login")
def login(datos: dict, db: Session = Depends(database.get_db)):
    correo = datos.get("correo")
    password = datos.get("password")
    
    user = db.query(models.Usuario).filter(
        models.Usuario.correo == correo,
        models.Usuario.password == password
    ).first()
    
    if not user:
        raise HTTPException(status_code=401, detail="Credenciales incorrectas")
    
    return {"success": True, "user": {"nombre": user.nombre, "id": user.id}}

@app.get("/api/asignaciones/{docente_id}")
def obtener_asignaciones(docente_id: int, db: Session = Depends(database.get_db)):
    # Buscamos solo las materias que te pertenecen a ti
    clases = db.query(models.Asignacion).filter(models.Asignacion.id_docente == docente_id).all()
    return clases

# Agrega esto a backend/app/main.py

@app.get("/api/estudiantes/{grado}/{seccion}")
def obtener_estudiantes(grado: str, seccion: str, db: Session = Depends(database.get_db)):
    # Buscamos en la base de datos alumnos que coincidan con ambos criterios
    alumnos = db.query(models.Estudiante).filter(
        models.Estudiante.grado == grado,
        models.Estudiante.seccion == seccion
    ).all()
    
    # Si no hay alumnos, devolvemos una lista vacía [] en lugar de un error
    return alumnos