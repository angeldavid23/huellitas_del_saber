from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Aquí pondrás tus datos cuando termine la instalación de Postgres
# Formato: postgresql://usuario:contraseña@localhost:5432/nombre_db
SQLALCHEMY_DATABASE_URL = "postgresql://postgres:Angel2020m*/@localhost:5432/huellitas"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()