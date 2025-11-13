API REST – Sistema de Gestion de Salones

Trabajo practico integrador- Entrega final.
Programación III
GRUPO AA 

Es una aplicación desarrollada con Node.js, Express, MySQL y JWT para la gestión de reservas, salones, turnos, servicios y usuarios.


1. Clonar el repositorio

git clone https://github.com/camilisima/tp-integrador-api-rest-grupoAA.git



2. Instalar dependencias

npm install


3. Crear la base de datos y usuario en MySQL (ejecutar en Workbench o terminal):

CREATE DATABASE IF NOT EXISTS reservas;
CREATE USER IF NOT EXISTS 'tp_user'@'localhost' IDENTIFIED BY 'tp123';
GRANT ALL PRIVILEGES ON reservas.* TO 'tp_user'@'localhost';
FLUSH PRIVILEGES;


4. Importar el script SQL ubicado en:
📄 reservas.sql


5. Crear un archivo .env en la raíz del proyecto (usar como referencia .env.example).


6. Ejecutar el servidor

npm run dev


Credenciales de prueba

Rol	Usuario	Contraseña

Administrador	camila@correo.com	admin123

Documentación Swagger

Una vez levantado el servidor:
http://localhost:3000/api/docs

Desde allí se pueden probar todos los endpoints con sus métodos y parámetros.


⚙️ Variables de entorno (archivo .env.example)

DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=tp_user
DB_PASS=tp123
DB_NAME=reservas
PORT=3000
JWT_SECRET=tpintegrador25

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
CORREO=tu_correo@gmail.com
CLAVE=tu_clave_de_aplicacion
MAIL_FROM="Reservas App" <tu_correo@gmail.com>
ADMIN_EMAIL=admin@correo.com


---

 Funcionalidades principales

Autenticación con JWT.

Roles: Cliente, Empleado, Administrador.

CRUD de reservas, salones, servicios, turnos y usuarios.

Envío de correos automáticos con Nodemailer.

Informes PDF/CSV generados con pdfkit y json2csv.

Documentación interactiva con Swagger.







