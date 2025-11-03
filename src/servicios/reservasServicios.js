import pool from '../datos/basededatos.js';

//Obtener todas las reservas activas 
export const getAllReservas = async () => {
    const sql = `SELECT * FROM reservas WHERE activo = 1`;
    const [rows] = await pool.query(sql);
    return rows;
};

//Obtener una reserva por ID 
export const getReservaById = async (id) => {
    const sql = `SELECT * FROM reservas WHERE reserva_id = ? AND activo = 1`;
    const [rows] = await pool.query(sql, [id]);
    return rows[0];
};

//Crear una nueva reserva 
export const createReserva = async (reserva) => {
    const { fecha_reserva, usuario_id, salon_id } = reserva; 
    const sql = `
        INSERT INTO reservas (fecha_reserva, usuario_id, salon_id, activo) 
        VALUES (?, ?, ?, 1)
    `;
    const [result] = await pool.query(sql, [fecha_reserva, usuario_id, salon_id]);
    return result.insertId;
};

//Actualizar una reserva existente
export const updateReserva = async (id, reserva) => {
    const { fecha_reserva, usuario_id, salon_id } = reserva;
    const sql = `
        UPDATE reservas 
        SET fecha_reserva = ?, usuario_id = ?, salon_id = ?, modificado = CURRENT_TIMESTAMP
        WHERE reserva_id = ? AND activo = 1
    `; 
    const [result] = await pool.query(sql, [fecha_reserva, usuario_id, salon_id, id]);
    return result.affectedRows;
};

//Soft Delete
export const deleteReserva = async (id) => {
    const sql = `
        UPDATE reservas 
        SET activo = 0 
        WHERE reserva_id = ?
    `;
    const [result] = await pool.query(sql, [id]);
    return result.affectedRows;
};