import pool from '../datos/basededatos.js';

// todos los salones activos
//Todos los salones
export const getAllSalones = async () => {
  const [rows] = await pool.query(
    'SELECT * FROM salones WHERE activo = 1 ORDER BY creado DESC'
  );
  return rows;
};

// obtener un salón por ID
//Buscar por ID
export const getSalonById = async (id) => {
  const [rows] = await pool.query(
    'SELECT * FROM salones WHERE salon_id = ? AND activo = 1',
    [id]
  );
  return rows[0];
};

//crear un nuevo salón
//Crear nuevo salon
export const createSalon = async (salon) => {
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


export const updateSalon = async (id, salon) => {
  const { titulo, direccion, latitud, longitud, capacidad, importe } = salon;
  const sql = `
    UPDATE salones
    SET titulo = ?, direccion = ?, latitud = ?, longitud = ?, capacidad = ?, importe = ?, modificado = CURRENT_TIMESTAMP
    WHERE salon_id = ? AND activo = 1
  `;
  const [result] = await pool.query(sql, [
    titulo,
    direccion,
    latitud ?? null,
    longitud ?? null,
    capacidad ?? null,
    importe ?? null,
    id,
  ]);
  return result.affectedRows; // 1 si actualizó, 0 si no encontró
  return result.affectedRows; 
};

export const deleteSalon = async (id) => {
  const [result] = await pool.query(
    'UPDATE salones SET activo = 0, modificado = CURRENT_TIMESTAMP WHERE salon_id = ?',
    [id]
  );
  return result.affectedRows;
};
