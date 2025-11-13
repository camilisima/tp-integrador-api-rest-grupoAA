import * as dao from '../datos/usuariosDAO.js';

// Listar todos los usuarios
export const getAllUsuarios = async () => {
  return await dao.findAll();
};

// Usuario por ID
export const getUsuarioById = async (id) => {
  return await dao.findById(id);
};

// Solo clientes (tipo_usuario = 3)
export const getClientes = async () => {
  return await dao.findClientes();
};

// Crear usuario
export const createUsuario = async (usuario) => {
  const id = await dao.insert(usuario);
  return id;
};

// Actualizar usuario
export const updateUsuario = async (id, usuario) => {
  const filas = await dao.update(id, usuario);
  return filas;
};

// Baja lógica
export const deleteUsuario = async (id) => {
  const filas = await dao.softDelete(id);
  return filas;
};

// Para login: buscar por nombre_usuario
export const findByNombreUsuario = async (nombre_usuario) => {
  return await dao.findByNombreUsuario(nombre_usuario);
};