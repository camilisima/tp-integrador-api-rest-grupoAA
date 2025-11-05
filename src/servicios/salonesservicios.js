import pool from '../datos/basededatos.js'; 
// 🔍 Listar todos los salones
// Todo los salones
export const getAllSalones = async () => {
  const [rows] = await pool.query('SELECT * FROM salones WHERE activo = 1');
  return rows;
};


// Obtener un salón por ID 
// Obtener salon por ID 
export const getSalonById = async (id) => {
  const [rows] = await pool.query ('SELECT * FROM salones WHERE salon_id = ? AND activo = 1', [id]);
  return rows[0];
};


// ➕ Crear un nuevo salón 
//  Crear un nuevo salon 
export const createSalon = async (salon) => {
  const { titulo, direccion, latitud, longitud, capacidad, importe } = salon;
  const sql = `
    INSERT INTO salones (titulo, direccion, latitud, longitud, capacidad, importe, activo)
    VALUES (?, ?, ?, ?, ?, ?, 1)
  `;
  const [result] = await pool.query(sql, [titulo, direccion, latitud, longitud, capacidad, importe]);
  return result.insertId;
};

//  Actualizar un salón 
//  Actualizar un salon 
export const updateSalon = async (id, salon) => {
  const { titulo, direccion, latitud, longitud, capacidad, importe } = salon;
  const sql = `
    UPDATE salones
    SET titulo = ?, direccion = ?, latitud = ?, longitud = ?, capacidad = ?, importe = ?, modificado = CURRENT_TIMESTAMP
    WHERE salon_id = ? AND activo = 1
  `;
  const [result] = await pool.query(sql, [titulo, direccion, latitud, longitud, capacidad, importe, id]);
  const [result] = await pool.query(sql, [titulo, direccion, latitud, longitud, Number(capacidad), Number(importe), id]);
  return result.affectedRows;
};


export const deleteSalon = async (id) => {
  const [result] = await pool.query('UPDATE salones SET activo = 0 WHERE salon_id = ?', [id]);
  return result.affectedRows;
};
