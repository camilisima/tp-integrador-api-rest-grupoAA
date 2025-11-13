import * as dao from '../datos/comentariosDAO.js';

export const getComentariosPorReserva = async (reserva_id) => {
  return await dao.findByReserva(reserva_id);
};

export const crearComentario = async ({ reserva_id, usuario_id, texto }) => {
  return await dao.insert({ reserva_id, usuario_id, texto });
};

export const deleteComentario = async (id) => {
  return await dao.softDelete(id);
};

export const getComentariosActivos = async () => {
  return await dao.findAllActivos();
};