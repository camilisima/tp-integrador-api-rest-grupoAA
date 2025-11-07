import dotenv from 'dotenv';
dotenv.config(); 
import express from 'express';
import cors from 'cors';
import salonesRutas from './rutas/salonesrutas.js';
import pool from './datos/basededatos.js';
import authRutas from './rutas/authRutas.js';
import turnosRutas from './rutas/turnosRutas.js';
import reservasRutas from './rutas/reservasrutas.js';
import serviciosRutas from './rutas/serviciosrutas.js';
import usuariosRutas from './rutas/usuariosRutas.js';
import estadisticasRutas from './rutas/estadisticasRutas.js';
import reportesRutas from './rutas/reportesRutas.js';
import comentariosRutas from './rutas/comentariosRutas.js';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import { verifyMailer } from './utils/mail.js';
verifyMailer();



const app = express(); 



// middlewares
app.use(cors());
app.use(express.json());
const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Reservas',
      version: '1.0.0',
      description: 'Documentación de la API REST del sistema de reservas de salones y servicios',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor local',
      },
    ],
  },
  apis: ['./src/rutas/*.js'], 
};

const swaggerSpecs = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpecs));

// rutas
app.use('/api/auth', authRutas);
app.use('/api/salones', salonesRutas);
app.use('/api/turnos', turnosRutas);
app.use('/api/reservas', reservasRutas);
app.use('/api/servicios', serviciosRutas);
app.use('/api/usuarios', usuariosRutas);
app.use('/api/estadisticas', estadisticasRutas);
app.use('/api/reportes', reportesRutas);
app.use('/api/comentarios', comentariosRutas);



// ruta de prueba
app.get('/api/ping', (req, res) => {
  res.json({ ok: true, message: 'pong' });
});

// probar la base de datos

async function probarDB() {
  try {
    const connection = await pool.getConnection();
    console.log('Conexión a la base de datos establecida correctamente');
    connection.release();
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  }

  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS resultado');
    console.log('Conexión a MySQL exitosa. Resultado:', rows[0].resultado);
  } catch (error) {
    console.error('Error al conectar a MySQL:', error.message);
  }
}

// servidor

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  probarDB(); 
});
