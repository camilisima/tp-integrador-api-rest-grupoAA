import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import salonesRutas from './rutas/salonesrutas.js';
import pool from './datos/basededatos.js';
import authRutas from './rutas/authRutas.js';

dotenv.config(); //cargar variables de entorno

const app = express(); // declaramos app

// middlewares
app.use(cors());
app.use(express.json());

// rutas
app.use('/api/auth', authRutas);
app.use('/api/salones', salonesRutas);

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

// arrancamos el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
  probarDB(); // ejecutamos la prueba de conexión
});
