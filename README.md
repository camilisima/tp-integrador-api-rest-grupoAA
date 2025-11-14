 API REST – Sistema de Gestión de Salones

Trabajo Práctico Integrador – Entrega Final
Programación III – Grupo AA

Este proyecto es una API REST desarrollada con Node.js, Express, MySQL y JWT, diseñada para gestionar reservas, salones, turnos, servicios y usuarios. Incluye autenticación por roles, envío de correos, generación de informes y documentación con Swagger.

- Clonar el repositorio

git clone https://github.com/camilisima/tp-integrador-api-rest-grupoAA.git


-Instalación de dependencias

npm install

Configuración de la base de datos

Ejecutar en MySQL Workbench o terminal:

CREATE DATABASE IF NOT EXISTS reservas;

CREATE USER IF NOT EXISTS 'tp_user'@'localhost' IDENTIFIED BY 'tp123';

GRANT ALL PRIVILEGES ON reservas.* TO 'tp_user'@'localhost';

FLUSH PRIVILEGES;

-Luego importar el archivo:

reservas.sql (ubicado en la raíz del proyecto)


-Archivo .env

-Crear un archivo .env en la raíz del proyecto tomando como referencia el archivo:

.env.example

Variables necesarias:

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
MAIL_FROM="Reservas App" tu_correo@gmail.com
ADMIN_EMAIL=admin@correo.com

-Ejecutar el servidor

npm run dev


-Credenciales de prueba

Rol	Usuario	Contraseña

Administrador	camila@correo.com	admin123


-Documentación de la API

Una vez levantado el servidor:

http://localhost:3000/api/docs

Desde Swagger podés probar todos los endpoints con sus métodos, parámetros y seguridad JWT.

Funcionalidades principales

Autenticación y autorización con JWT
Roles: Cliente, Empleado, Administrador
CRUD completo de:

Reservas

Salones

Turnos

Servicios

Usuarios


-Envío automático de correos con Nodemailer
-Generación de informes PDF y CSV
-Documentación interactiva con Swagger 
-Middleware de autenticación y validación



-Tecnologías utilizadas

Node.js

Express

MySQL

JWT

Nodemailer

pdfkit

json2csv

Swagger UI

Express Validator









