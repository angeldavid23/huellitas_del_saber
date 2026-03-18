import pandas as pd

def procesar_notas_excel(archivo_path):
    # Leemos el archivo que sube el maestro
    df = pd.read_excel(archivo_path)
    
    # Supongamos que el Excel tiene columnas: 'carnet', 'punteo', 'comentario'
    for index, row in df.iterrows():
        estudiante_id = row['carnet']
        nota = row['punteo']
        
        # Aquí irá la lógica para:
        # 1. Guardar en la base de datos
        # 2. Disparar el correo al padre
        print(f"Procesando nota de {estudiante_id}: {nota}")
    
    return True