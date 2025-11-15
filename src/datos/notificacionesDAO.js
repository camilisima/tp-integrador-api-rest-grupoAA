import pool from './basededatos.js';

export const getDatosNotificacion = async (reservaId) => {
  const [resultSets] = await pool.query(
    'CALL sp_datos_notificacion(?)',
    [Number(reservaId)]
  );

  return {
    cliente: resultSets[0][0],   
    admins: resultSets[1]        
  };
};