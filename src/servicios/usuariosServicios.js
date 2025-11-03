import pool from '../datos/basededatos.js';

//Obtener todos los usuarios activos
export const getAllUsuarios = async () => {
    const sql = `SELECT * FROM usuarios WHERE activo = 1`;
    const [rows] = await pool.query(sql);
    return rows;
};

//Obtener un usuario por ID
export const getUsuarioById = async (id) => {
    const sql = `SELECT * FROM usuarios WHERE usuario_id = ? AND activo = 1`;
    const [rows] = await pool.query(sql, [id]);
    return rows[0];
};

//Crear un nuevo usuario 
export const createUsuario = async (usuario) => {
    const { nombre, nombre_usuario, contrasenia, rol } = usuario; 
    const sql = `
        INSERT INTO usuarios (nombre, nombre_usuario, contrasenia, rol, activo) 
        VALUES (?, ?, ?, ?, 1)
    `;
    const [result] = await pool.query(sql, [nombre, nombre_usuario, contrasenia, rol]);
    return result.insertId;
};

//Actualizar un usuario existente
export const updateUsuario = async (id, usuario) => {
    const { nombre, nombre_usuario, contrasenia, rol } = usuario;
    let sql = `UPDATE usuarios SET nombre = ?, nombre_usuario = ?, rol = ?, modificado = CURRENT_TIMESTAMP`;
    const params = [nombre, nombre_usuario, rol];

    if (contrasenia) {
        sql += `, contrasenia = ?`;
        params.push(contrasenia);
    }
    
    sql += ` WHERE usuario_id = ? AND activo = 1`;
    params.push(id);

    const [result] = await pool.query(sql, params);
    return result.affectedRows;
};

//Soft Delete
export const deleteUsuario = async (id) => {
    const sql = `
        UPDATE usuarios 
        SET activo = 0 
        WHERE usuario_id = ?
    `;
    const [result] = await pool.query(sql, [id]);
    return result.affectedRows;
};