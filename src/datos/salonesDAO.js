import pool from './basededatos.js';

// Todos los salones activos
export const findAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM salones WHERE activo = 1 ORDER BY creado DESC'
  );
  return rows;
};

// Un salon por ID
export const findById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM salones WHERE salon_id = ? AND activo = 1',
    [Number(id)]
  );
  return rows[0];
};

// Crear salon
export const insert = async (salon) => {
  const { titulo, direccion, latitud, longitud, capacidad, importe } = salon;

  const sql = `
    INSERT INTO salones (titulo, direccion, latitud, longitud, capacidad, importe, activo)
    VALUES (?, ?, ?, ?, ?, ?, 1)
  `;

  const [result] = await pool.query(sql, [
    titulo,
    direccion,
    latitud ?? null,
    longitud ?? null,
    capacidad ?? null,
    importe ?? null,
  ]);

  return result.insertId;
};

// Actualizar salon
export const update = async (id, salon) => {
  const { titulo, direccion, latitud, longitud, capacidad, importe } = salon;

  const sql = `
    UPDATE salones
    SET titulo = ?, direccion = ?, latitud = ?, longitud = ?, capacidad = ?, importe = ?, 
        modificado = CURRENT_TIMESTAMP
    WHERE salon_id = ? AND activo = 1
  `;

  const [result] = await pool.query(sql, [
    titulo,
    direccion,
    latitud ?? null,
    longitud ?? null,
    capacidad ?? null,
    importe ?? null,
    Number(id),
  ]);

  return result.affectedRows;
};

// Baja logica
export const softDelete = async (id) => {
  const [result] = await pool.query(
    `UPDATE salones 
     SET activo = 0, modificado = CURRENT_TIMESTAMP 
     WHERE salon_id = ?`,
    [Number(id)]
  );
  return result.affectedRows;
};