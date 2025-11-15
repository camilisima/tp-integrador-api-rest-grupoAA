import * as dao from '../datos/salonesDAO.js';


export const getAllSalones = async () => {
  return await dao.findAll();
};


export const getSalonById = async (id) => {
  return await dao.findById(id);
};


export const createSalon = async (data) => {
  const id = await dao.insert(data);
  return id;
};


export const updateSalon = async (id, data) => {
  const filas = await dao.update(id, data);
  return filas;  
};


export const deleteSalon = async (id) => {
  const filas = await dao.softDelete(id);
  return filas;  
};