import * as dao from '../datos/estadisticasDAO.js';

export const obtenerEstadisticas = async () => {
  return await dao.getEstadisticasMensuales();
};

export const getReservasPorSalon = async () => {
  return await dao.obtenerReservasPorSalon();
};

export const getReservasPorDia = async () => {
  return await dao.obtenerReservasPorDia();
};

export const getPorcentajeOcupacion = async () => {
  return await dao.obtenerPorcentajeOcupacion();
};
