import pool from '../datos/basededatos.js';

//Obtener todos los turnos activos
export const getAllTurnos = async () => {
    const sql = `SELECT * FROM turnos WHERE activo = 1`;
    const [rows] = await pool.query(sql);
    return rows;
};

//Obtener un turno por ID
export const getTurnoById = async (id) => {
    const sql = `SELECT * FROM turnos WHERE turno_id = ? AND activo = 1`;
    const [rows] = await pool.query(sql, [id]);
    return rows[0];
};

//Crear un nuevo turno
export const createTurno = async (turno) => {
    const { hora_desde, hora_hasta } = turno;
    const sql = `
        INSERT INTO turnos (hora_desde, hora_hasta, activo) 
        VALUES (?, ?, 1)
    `;
    const [result] = await pool.query(sql, [hora_desde, hora_hasta]);
    return result.insertId;
};

//Actualizar un turno existente
export const updateTurno = async (id, turno) => {
    const { hora_desde, hora_hasta } = turno;
    const sql = `
        UPDATE turnos 
        SET hora_desde = ?, hora_hasta = ? 
        WHERE turno_id = ? AND activo = 1
    `; 
    const [result] = await pool.query(sql, [hora_desde, hora_hasta, id]);
    return result.affectedRows;
};

//Soft Delete
export const deleteTurno = async (id) => {
    const sql = `
        UPDATE turnos 
        SET activo = 0 
        WHERE turno_id = ?
    `;
    const [result] = await pool.query(sql, [id]);
    return result.affectedRows;
};