# Proyecto "Constructor de Contenidos para un Learning Management System"

**Pasos para poder correr el proyecto sin ningún error**

1. Clonar o descargar el código desde el siguiente enlace
* https://github.com/yessygc/django-pruebas
2. Crear un entorno virtual y activarlo
* Crear entorno virtual: ```virtualenv -p python3 env```
* Activar entorno virtual: ```source env/bin/activate```
3. Instalar las dependencias
* ```pip install -r requirements.txt```
4. Ejecutar el proyecto
* ```python manage.py runserver```
5. Para correr las pruebas ```python manage.py test```
6. Para correr las pruebas y correr el proyecto ```python manage.py test && python manage.py runserver```
7. Para correr las pruebas y correr el proyecto en modo debug ```python manage.py test && python manage.py runserver 0.0.0.0:8000```