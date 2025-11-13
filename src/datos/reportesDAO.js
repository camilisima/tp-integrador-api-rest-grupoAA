import pool from './basededatos.js';

export const getReporteReservas = async () => {
  const [rows] = await pool.query(`CALL sp_reporte_reservas();`);
  return rows[0]; 
};