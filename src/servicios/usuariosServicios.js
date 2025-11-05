import pool from '../datos/basededatos.js';

//Obtener todos los usuarios activos
//Todo los usuarios disp
export const getAllUsuarios = async () => {
    const sql = `SELECT * FROM usuarios WHERE activo = 1`;
    const [rows] = await pool.query(sql);
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE activo = 1');
    return rows;
};

//Obtener un usuario por ID
//Buscar usuario por ID
export const getUsuarioById = async (id) => {
    const sql = `SELECT * FROM usuarios WHERE usuario_id = ? AND activo = 1`;
    const [rows] = await pool.query(sql, [id]);
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE usuario_id = ? AND activo = 1', [id]);
    return rows[0];
};

//Crear un nuevo usuario 
export const getClientes = async () => {
    const [rows] = await pool.query('SELECT * FROM usuarios WHERE activo = 1 AND tipo_usuario = 3');
    return rows;
};

//Usuario nuevo
export const createUsuario = async (usuario) => {
    const { nombre, nombre_usuario, contrasenia, rol } = usuario; 
    const { nombre, apellido, nombre_usuario, contrasenia_hash, tipo_usuario, celular, foto } = usuario;
    const sql = `
        INSERT INTO usuarios (nombre, nombre_usuario, contrasenia, rol, activo) 
        VALUES (?, ?, ?, ?, 1)
    `;
    const [result] = await pool.query(sql, [nombre, nombre_usuario, contrasenia, rol]);
    INSERT INTO usuarios
      (nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, celular, foto, activo, creado, modificado)
    VALUES (?, ?, ?, ?, ?, ?, ?, 1, NOW(), NOW())
  `;
    const [result] = await pool.query(sql, [
        nombre ?? null,
        apellido ?? null,
        nombre_usuario,
        contrasenia_hash,
        Number(tipo_usuario),
        celular ?? null,
        foto ?? null
    ]);
    return result.insertId;
};

//Actualizar un usuario existente
//Actualizar
export const updateUsuario = async (id, usuario) => {
    const { nombre, nombre_usuario, contrasenia, rol } = usuario;
    let sql = `UPDATE usuarios SET nombre = ?, nombre_usuario = ?, rol = ?, modificado = CURRENT_TIMESTAMP`;
    const params = [nombre, nombre_usuario, rol];
    const { nombre, apellido, nombre_usuario, tipo_usuario, celular, foto, contrasenia_hash } = usuario;

    if (contrasenia) {
        sql += `, contrasenia = ?`;
        params.push(contrasenia);
    }
    
    sql += ` WHERE usuario_id = ? AND activo = 1`;
    params.push(id);
    let sql = `
    UPDATE usuarios
       SET nombre = ?,
           apellido = ?,
           nombre_usuario = ?,
           tipo_usuario = ?,
           celular = ?,
           foto = ?,
           modificado = CURRENT_TIMESTAMP
     WHERE usuario_id = ? AND activo = 1
  `;
    let params = [
        nombre ?? null,
        apellido ?? null,
        nombre_usuario,
        Number(tipo_usuario),
        celular ?? null,
        foto ?? null,
        id
    ];

    if (contrasenia_hash) {
        sql = `
      UPDATE usuarios
         SET nombre = ?,apellido = ?,nombre_usuario = ?,contrasenia = ?,  tipo_usuario = ?, celular = ?,foto = ?, modificado = CURRENT_TIMESTAMP
       WHERE usuario_id = ? AND activo = 1
    `;
        params = [
            nombre ?? null, apellido ?? null, nombre_usuario, contrasenia_hash, Number(tipo_usuario), celular ?? null, foto ?? null, id
        ];
    }
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
    const [r] = await pool.query('UPDATE usuarios SET activo = 0, modificado = CURRENT_TIMESTAMP WHERE usuario_id = ?', [id]);
    return r.affectedRows;
};