import * as dao from '../datos/salonesDAO.js';

// Listar todos los salones
export const getAllSalones = async () => {
  return await dao.findAll();
};

// Obtener un salón por ID
export const getSalonById = async (id) => {
  return await dao.findById(id);
};

// Crear un nuevo salón
export const createSalon = async (data) => {
  const id = await dao.insert(data);
  return id;
};

// Actualizar un salón
export const updateSalon = async (id, data) => {
  const filas = await dao.update(id, data);
  return filas;  // 1 si actualizó, 0 si no existe
};

// Baja lógica de un salón
export const deleteSalon = async (id) => {
  const filas = await dao.softDelete(id);
  return filas;  // 1 si lo "borró", 0 si no existe
};