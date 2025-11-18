import * as service from '../servicios/reportesServicios.js';

export const generarReportePDF = async (_req, res) => {
  try {
    const ruta = await service.generarPDFReservas();
    res.json({mensaje:'Reporte PDF generado', archivo: ruta});
  } catch (err) {
    res.status(500).json({mensaje:'Error al generar PDF'});
  }
};

export const generarReporteCSV = async (_req, res) => {
  try {
    const ruta = await service.generarCSVReservas();
    res.json({ mensaje: 'Reporte CSV generado', archivo: ruta });
  } catch (err) {
    res.status(500).json({mensaje:'Error al generar CSV'});
  }
};