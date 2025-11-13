import * as dao from '../datos/estadisticasDAO.js';

export const obtenerEstadisticas = async () => {
  return await dao.getEstadisticasMensuales();
};