import pool from './basededatos.js';

// Todos los servicios activos
export const findAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM servicios WHERE activo = 1 ORDER BY creado DESC'
  );
  return rows;
};

// Servicio por ID
export const findById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM servicios WHERE servicio_id = ? AND activo = 1',
    [Number(id)]
  );
  return rows[0];
};

// Crear servicio
export const insert = async (servicio) => {
  const { descripcion, importe } = servicio;

  const sql = `
    INSERT INTO servicios (descripcion, importe, activo)
    VALUES (?, ?, 1)
  `;

  const [r] = await pool.query(sql, [
    descripcion,
    importe != null ? Number(importe) : null,
  ]);

  return r.insertId;
};

// Actualizar servicio
export const update = async (id, servicio) => {
  const { descripcion, importe } = servicio;

  const sql = `
    UPDATE servicios
    SET descripcion = ?, importe = ?, modificado = CURRENT_TIMESTAMP
    WHERE servicio_id = ? AND activo = 1
  `;

  const [r] = await pool.query(sql, [
    descripcion,
    importe != null ? Number(importe) : null,
    Number(id),
  ]);
  return r.affectedRows;
};

// Baja lógica
export const softDelete = async (id) => {
  const [r] = await pool.query(
    `UPDATE servicios 
     SET activo = 0, modificado = CURRENT_TIMESTAMP 
     WHERE servicio_id = ?`,
    [Number(id)]
  );
  return r.affectedRows;
};