import pool from '../datos/basededatos.js';

//Obtener todos los servicios activos

//Todo los servicios
export const getAllServicios = async () => {
    const sql = `SELECT * FROM servicios WHERE activo = 1`;
    const [rows] = await pool.query(sql);
    return rows;
};

//Obtener un servicio por ID
//Buuscar por ID

//Buscar por ID
export const getServicioById = async (id) => {
    const sql = `SELECT * FROM servicios WHERE servicio_id = ? AND activo = 1`;
    const [rows] = await pool.query(sql, [id]);
    return rows[0];
};

//Crear un nuevo servicio

//Crear nuevo servicio
export const createServicio = async (servicio) => {
    const {descripcion, importe } = servicio;
    const sql = `
        INSERT INTO servicios (descripcion, importe, activo) 
        VALUES (?, ?, ?, 1)
    `;
    const [result] = await pool.query(sql, [descripcion, importe]);
    return result.insertId;
};

//Actualizar un servicio existente

//Actualizar servicio
export const updateServicio = async (id, servicio) => {
    const {descripcion, importe } = servicio;
    const sql = `
        UPDATE servicios 
        SET  descripcion = ?, importe = ? 
        WHERE servicio_id = ? AND activo = 1
    `; 
    const [result] = await pool.query(sql, [descripcion, importe, id]);
    return result.affectedRows;
};

//Soft Delete
export const deleteServicio = async (id) => {
    const sql = `
        UPDATE servicios 
        SET activo = 0 
        WHERE servicio_id = ?
    `;
    const [result] = await pool.query(sql, [id]);
    return result.affectedRows;
};