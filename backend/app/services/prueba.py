import pandas as pd

def validar_y_procesar_excel(ruta_archivo):
    try:
        # 1. Leer el archivo
        df = pd.read_excel(ruta_archivo)
        
        print("--- Archivo leído exitosamente ---")
        print(df.head()) # Muestra las primeras filas en consola
        
        # 2. Iterar sobre los datos
        for index, fila in df.iterrows():
            carnet = fila['carnet']
            punteo = fila['punteo']
            email = fila['correo_padre']
            
            # Aquí simulamos la lógica que haremos más adelante
            print(f"-> Preparando notificación para: {email} (Nota: {punteo})")
            
            # VALIDACIÓN BÁSICA: Si el punteo es mayor a 20 (suponiendo que es el max), avisar
            if punteo > 20:
                print(f"   [ALERTA] El punteo de {carnet} excede el máximo.")
                
        return True
        
    except Exception as e:
        print(f"Error al procesar el archivo: {e}")
        return False

# Prueba rápida del script
if __name__ == "__main__":
    validar_y_procesar_excel("C:\\Users\\angelpc\\OneDrive\\Documentos\\proyecto de plataforma\\app\\services\\plantilla_notas.xlsx")