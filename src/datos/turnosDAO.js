import pool from './basededatos.js';

//Todos los turnos activos
export const findAll = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM turnos WHERE activo = 1 ORDER BY orden ASC'
  );
  return rows;
};

//Turno por ID
export const findById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM turnos WHERE turno_id = ? AND activo = 1',
    [Number(id)]
  );
  return rows[0];
};

//Crear turno
export const insert = async (turno) => {
  const { orden, hora_desde, hora_hasta } = turno;

  const sql = `
    INSERT INTO turnos (orden, hora_desde, hora_hasta, activo)
    VALUES (?, ?, ?, 1)
  `;

  const [r] = await pool.query(sql, [
    Number(orden),
    hora_desde,
    hora_hasta,
  ]);

  return r.insertId;
};

//Actualizar turno
export const update = async (id, turno) => {
  const { orden, hora_desde, hora_hasta } = turno;

  const sql = `
    UPDATE turnos
    SET orden = ?, hora_desde = ?, hora_hasta = ?, modificado = CURRENT_TIMESTAMP
    WHERE turno_id = ? AND activo = 1
  `;

  const [r] = await pool.query(sql, [
    Number(orden),
    hora_desde,
    hora_hasta,
    Number(id),
  ]);
  return r.affectedRows;
};

//Baja logica
export const softDelete = async (id) => {
  const [r] = await pool.query(
    `UPDATE turnos 
     SET activo = 0, modificado = CURRENT_TIMESTAMP 
     WHERE turno_id = ?`,
    [Number(id)]
  );
  return r.affectedRows;
};