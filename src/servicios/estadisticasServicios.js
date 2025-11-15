import * as dao from '../datos/estadisticasDAO.js';

export const obtenerEstadisticas = async () => {
  return await dao.getEstadisticasMensuales();
};

export const getReservasPorSalon = async () => await estadisticasDao.obtenerReservasPorSalon();
export const getReservasPorDia = async () => await estadisticasDao.obtenerReservasPorDia();
export const getPorcentajeOcupacion = async () => await estadisticasDao.obtenerPorcentajeOcupacion();