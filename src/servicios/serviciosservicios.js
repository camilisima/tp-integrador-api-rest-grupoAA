import pool from '../datos/basededatos.js';

export const getAllServicios = async () => {
  const [rows] = await pool.query('SELECT * FROM servicios WHERE activo = 1');
  return rows;
};

export const getServicioById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM servicios WHERE servicio_id = ? AND activo = 1',
    [id]
  );
  return rows[0];
};


export const createServicio = async (servicio) => {
  const { titulo, importe } = servicio;
  const sql = `
    INSERT INTO servicios (descripcion, importe, activo)
    VALUES (?, ?, 1)
  `;
  const [result] = await pool.query(sql, [titulo, Number(importe)]);
  return result.insertId;
};

export const updateServicio = async (id, servicio) => {
  const { titulo, importe } = servicio;
  const [result] = await pool.query(
    'UPDATE servicios SET descripcion = ?, importe = ? WHERE servicio_id = ? AND activo = 1',
    [titulo, Number(importe), id]
  );
  return result.affectedRows > 0;
};



export const deleteServicio = async (id) => {
  const [result] = await pool.query(
    'UPDATE servicios SET activo = 0 WHERE servicio_id = ? AND activo = 1',
    [id]
  );
  return result.affectedRows > 0;
};
