import pool from '../datos/basededatos.js';

// Admin/Empleado: listar todas las reservas activas
// Reservas activas
export const getAllReservas = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM reservas WHERE activo = 1 ORDER BY reserva_id DESC'
  );
  return rows;
};

// Admin/Empleado: reservar por ID
//Reserva por ID 
export const getReservaById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM reservas WHERE reserva_id = ? AND activo = 1',
    [Number(id)]
  );
  return rows[0];
};

// Cliente: crear su reserva
// Crear reserva (Es para el cliente)
export const crearReservaCliente = async (data) => {
  const {
    usuario_id, salon_id, turno_id, fecha_reserva,
    tematica = null, importe_salon = null, importe_total = null, foto_cumpleaniero = null
  } = data;

  const sql = `
    INSERT INTO reservas
      (fecha_reserva, salon_id, usuario_id, turno_id, tematica,
       importe_salon, importe_total, foto_cumpleaniero, activo)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
  `;
  const params = [
    fecha_reserva, Number(salon_id), Number(usuario_id), Number(turno_id),
    tematica, importe_salon != null ? Number(importe_salon) : null,
    importe_total != null ? Number(importe_total) : null,
    foto_cumpleaniero
  ];

  const [r] = await pool.query(sql, params);
  return r.insertId;
};

// Cliente: listar MIS reservas (por token.user)
// Las reservas del cliente
export const getReservasByUsuario = async (usuario_id) => {
  const [rows] = await pool.query(
    'SELECT * FROM reservas WHERE usuario_id = ? AND activo = 1 ORDER BY reserva_id DESC',
    [Number(usuario_id)]
  );
  return rows;
};

// Admin: update flexible
// Update (admin)
export const updateReserva = async (id, data) => {
  const setParts = [];
  const values = [];

  for (const [k, v] of Object.entries(data)) {
    setParts.push(`${k} = ?`);
    if (['usuario_id','salon_id','turno_id'].includes(k)) {
      values.push(Number(v));
    } else if (['importe_salon','importe_total'].includes(k)) {
      values.push(v != null ? Number(v) : null);
    } else {
      values.push(v ?? null);
    }
  }
  setParts.push('modificado = CURRENT_TIMESTAMP');

  const sql = `UPDATE reservas SET ${setParts.join(', ')} WHERE reserva_id = ? AND activo = 1`;
  values.push(Number(id));

  const [r] = await pool.query(sql, values);
  return r.affectedRows;
};

// Admin: baja lógica
// Baja (admin)
export const deleteReserva = async (id) => {
  const [r] = await pool.query(
    'UPDATE reservas SET activo = 0, modificado = CURRENT_TIMESTAMP WHERE reserva_id = ?',
    [Number(id)]
  );
  return r.affectedRows;
};