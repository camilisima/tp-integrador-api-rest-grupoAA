import pool from './basededatos.js';

export const getEstadisticasMensuales = async () => {
  const [rows] = await pool.query('CALL sp_estadisticas_reservas()');
  return rows[0]; 
};

export const obtenerReservasPorSalon = async () => {
  const [rows] = await pool.query('CALL sp_reservas_por_salon()');
  return rows[0];
};

export const obtenerReservasPorDia = async () => {
  const [rows] = await pool.query('CALL sp_reservas_por_dia()');
  return rows[0];
};

export const obtenerPorcentajeOcupacion = async () => {
  const [rows] = await pool.query('CALL sp_porcentaje_ocupacion()');
  return rows[0];
};

