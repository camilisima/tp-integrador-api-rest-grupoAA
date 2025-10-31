import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import salonesRutas from './rutas/salonesrutas.js'; 
import pool from './datos/basededatos.js';
import authRutas from './rutas/authRutas.js';

app.use('/api/auth', authRutas);



dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


app.get('/api/ping', (req, res) => {
  res.json({ ok: true, message: 'pong ' });
});


app.use('/api/salones', salonesRutas);

import pool from './datos/basededatos.js';

try {
  const connection = await pool.getConnection();
  console.log(' Conexión a la base de datos establecida correctamente');
  connection.release();
} catch (error) {
  console.error(' Error al conectar con la base de datos:', error);
}

const PORT = process.env.PORT || 3000;

// Prueba de conexión a la base de datos
try {
  const [rows] = await pool.query('SELECT 1 + 1 AS resultado');
  console.log(' Conexión a MySQL exitosa. Resultado:', rows[0].resultado);
} catch (error) {
  console.error(' Error al conectar a MySQL:', error.message);
}

app.listen(PORT, () => {
  console.log(` Servidor corriendo en http://localhost:${PORT}`);
});

