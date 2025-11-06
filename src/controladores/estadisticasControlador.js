import * as estadisticasServicios from '../servicios/estadisticasServicios.js';

export const obtenerEstadisticas = async (_req, res) => {
  try {
    const data = await estadisticasServicios.getEstadisticas();
    res.json(data);
  } catch (error) {
    console.error('Error al obtener estadísticas:', error);
    res.status(500).json({ message: 'Error al obtener estadísticas' });
  }
};
