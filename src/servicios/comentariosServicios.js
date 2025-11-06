import pool from '../datos/basededatos.js';

// 🔹 Listar todos los comentarios de una reserva
export const getComentariosPorReserva = async (reservaId) => {
  const [rows] = await pool.query(
    `SELECT c.*, u.nombre, u.apellido
     FROM comentarios c
     JOIN usuarios u ON c.usuario_id = u.usuario_id
     WHERE c.reserva_id = ? AND c.activo = 1
     ORDER BY c.creado DESC`,
    [reservaId]
  );
  return rows;
};

// 🔹 Crear un nuevo comentario
export const crearComentario = async ({ reserva_id, usuario_id, texto }) => {
  const [result] = await pool.query(
    `INSERT INTO comentarios (reserva_id, usuario_id, texto)
     VALUES (?, ?, ?)`,
    [reserva_id, usuario_id, texto]
  );
  return result.insertId;
};

// 🔹 Borrado lógico
export const deleteComentario = async (id) => {
  const [result] = await pool.query(
    `UPDATE comentarios
     SET activo = 0, modificado = CURRENT_TIMESTAMP
     WHERE comentario_id = ?`,
    [id]
  );
  return result.affectedRows;
};

// 🔹 Listar todos los comentarios activos (sin filtrar por reserva)
export const getComentariosActivos = async () => {
  const [rows] = await pool.query(
    `SELECT c.*, u.nombre, u.apellido, r.reserva_id
     FROM comentarios c
     JOIN usuarios u ON c.usuario_id = u.usuario_id
     JOIN reservas r ON c.reserva_id = r.reserva_id
     WHERE c.activo = 1
     ORDER BY c.creado DESC`
  );
  return rows;
};
