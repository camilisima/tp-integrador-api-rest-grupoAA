import pool from '../datos/basededatos.js';

export const getEstadisticas = async () => {
  const [rows] = await pool.query('CALL sp_estadisticas_reservas()');
  return rows[0]; // devuelve la primera parte del resultado
  return rows[0]; 
};
