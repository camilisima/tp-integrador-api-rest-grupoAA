export const getReporteReservas = async () => {
  const [result] = await pool.query(`CALL sp_reporte_reservas();`);
  return result?.[0] || []; 
};