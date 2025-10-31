import pool from './datos/basededatos.js';

async function testConnection() {
  try {
    const [rows] = await pool.query('SELECT 1 + 1 AS resultado');
    console.log('Conexión OK:', rows);
  } catch (err) {
    console.error('Error de conexión:', err);
  }
}

testConnection();

