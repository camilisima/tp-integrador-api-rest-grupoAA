import pool from '../datos/basededatos.js';

// usuarios activos (sin exponer hash)
//todos los usuariois
export const getAllUsuarios = async () => {
  const [rows] = await pool.query(
    `SELECT usuario_id, nombre, apellido, nombre_usuario, tipo_usuario, celular, foto, activo, creado, modificado
       FROM usuarios
      WHERE activo = 1
      ORDER BY creado DESC`
  );
  return rows;
};

// usuario por ID (activo)
// usuario por ID
export const getUsuarioById = async (id) => {
  const [rows] = await pool.query(
    `SELECT usuario_id, nombre, apellido, nombre_usuario, tipo_usuario, celular, foto, activo, creado, modificado
       FROM usuarios
      WHERE usuario_id = ? AND activo = 1`,
    [id]
  );
  return rows[0];
};

// listar clientes
export const getClientes = async () => {
  const [rows] = await pool.query(
    `SELECT usuario_id, nombre, apellido, nombre_usuario, tipo_usuario, celular, foto, activo, creado, modificado
       FROM usuarios
      WHERE activo = 1 AND tipo_usuario = 3
      ORDER BY creado DESC`
  );
  return rows;
};

// crear usuario (recibe contrasenia_hash YA en bcrypt)
// crear usuario (contrasenia_hash YA en bcrypt)
export const createUsuario = async (usuario) => {
  const {
    nombre = null,
    apellido = null,
    nombre_usuario,
    contrasenia_hash,   
    tipo_usuario,
    celular = null,
    foto = null,
  } = usuario;

  const sql = `
    INSERT INTO usuarios
      (nombre, apellido, nombre_usuario, contrasenia, tipo_usuario, celular, foto, activo, creado, modificado)
    VALUES
      (?, ?, ?, ?, ?, ?, ?, 1, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `;

  const [result] = await pool.query(sql, [
    nombre,
    apellido,
    nombre_usuario,
    contrasenia_hash,       
    Number(tipo_usuario),
    celular,
    foto,
  ]);

  return result.insertId;
};

export const updateUsuario = async (id, usuario) => {
  const fields = [];
  const params = [];

  const push = (col, val) => { fields.push(`${col} = ?`); params.push(val); };

  if (usuario.nombre !== undefined)         push('nombre', usuario.nombre ?? null);
  if (usuario.apellido !== undefined)       push('apellido', usuario.apellido ?? null);
  if (usuario.nombre_usuario !== undefined) push('nombre_usuario', usuario.nombre_usuario);
  if (usuario.tipo_usuario !== undefined)   push('tipo_usuario', Number(usuario.tipo_usuario));
  if (usuario.celular !== undefined)        push('celular', usuario.celular ?? null);
  if (usuario.foto !== undefined)           push('foto', usuario.foto ?? null);

  if (usuario.contrasenia_hash !== undefined) {
    push('contrasenia', usuario.contrasenia_hash); 
  }

  if (fields.length === 0) return 0;

  const sql = `
    UPDATE usuarios
       SET ${fields.join(', ')}, modificado = CURRENT_TIMESTAMP
     WHERE usuario_id = ? AND activo = 1
  `;
  params.push(id);

  const [result] = await pool.query(sql, params);
  return result.affectedRows;
};


export const deleteUsuario = async (id) => {
  const [result] = await pool.query(
    `UPDATE usuarios
        SET activo = 0, modificado = CURRENT_TIMESTAMP
      WHERE usuario_id = ?`,
    [id]
  );
  return result.affectedRows;
};

// Obtener usuario con hash 
export const getByEmailWithHash = async (email) => {
  const [rows] = await pool.query(
    `SELECT usuario_id, nombre, apellido, nombre_usuario, contrasenia, tipo_usuario
       FROM usuarios
      WHERE nombre_usuario = ? AND activo = 1
      LIMIT 1`,
    [email]
  );
  return rows[0];
};
