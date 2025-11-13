import pool from './basededatos.js';

// Servicios de una reserva
export const findByReserva = async (reserva_id) => {
  const [rows] = await pool.query(
    `SELECT rs.*, s.descripcion 
       FROM reservas_servicios rs
       JOIN servicios s ON s.servicio_id = rs.servicio_id
      WHERE rs.reserva_id = ?`,
    [Number(reserva_id)]
  );
  return rows;
};

// Agregar servicio a una reserva
export const insert = async (data) => {
  const { reserva_id, servicio_id, importe } = data;

  const sql = `
    INSERT INTO reservas_servicios (reserva_id, servicio_id, importe)
    VALUES (?, ?, ?)
  `;

  const [r] = await pool.query(sql, [
    Number(reserva_id),
    Number(servicio_id),
    importe != null ? Number(importe) : 0,
  ]);

  return r.insertId;
};