import pool from './basededatos.js';

export const getEstadisticasMensuales = async () => {
  const [rows] = await pool.query('CALL sp_estadisticas_reservas()');
  return rows[0]; 
};