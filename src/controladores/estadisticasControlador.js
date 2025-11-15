import * as svc from '../servicios/estadisticasServicios.js';

export const getEstadisticas = async (_req, res) => {
  try {
    const stats = await svc.obtenerEstadisticas();
    res.json(stats);
  } catch (error) {
    console.error("Error estadísticas:", error);
    res.status(500).json({ message: "Error al obtener estadísticas" });
  }
};

export const reservasPorSalon = async (_req, res) => {
  try {
    const data = await estadisticasSrv.getReservasPorSalon();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener reservas por salón' });
  }
};

export const reservasPorDia = async (_req, res) => {
  try {
    const data = await estadisticasSrv.getReservasPorDia();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener reservas por día' });
  }
};

export const porcentajeOcupacion = async (_req, res) => {
  try {
    const data = await estadisticasSrv.getPorcentajeOcupacion();
    res.json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener porcentaje de ocupación' });
  }
};

