import * as svc from '../servicios/estadisticasServicios.js';

export const getEstadisticas = async (_req, res) => {
  try {
    const stats = await svc.obtenerEstadisticas();
    res.json(stats);
  } catch (error) {
    console.error("Error estadísticas:", error);
    res.status(500).json({message: "Error al obtener estadisticas" });
  }
};

export const reservasPorSalon = async (_req, res) => {
  try {
    const data = await svc.getReservasPorSalon();
    res.json(data);
  } catch (error) {
    console.error("Error reservasPorSalon:", error);
    res.status(500).json({ message: 'Error al obtener reservas por salon' });
  }
};

export const reservasPorDia = async (_req, res) => {
  try {
    const data = await svc.getReservasPorDia();
    res.json(data);
  } catch (error) {
    console.error("Error reservasPorDia:", error);
    res.status(500).json({message: 'Error al obtener reservas por dia'});
  }
};

export const porcentajeOcupacion = async (_req, res) => {
  try {
    const data = await svc.getPorcentajeOcupacion();
    res.json(data);
  } catch (error) {
    console.error("Error porcentajeOcupacion:", error);
    res.status(500).json({message:'Error al obtener porcentaje de ocupacion'});
  }
};

