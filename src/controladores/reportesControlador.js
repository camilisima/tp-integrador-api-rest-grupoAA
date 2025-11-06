import * as reportesServicios from '../servicios/reportesServicios.js';

export const generarReportePDF = async (_req, res) => {
  try {
    const ruta = await reportesServicios.generarPDFReservas();
    res.json({ mensaje: 'Reporte PDF generado correctamente', archivo: ruta });
  } catch (error) {
    console.error('Error al generar PDF:', error);
    res.status(500).json({ mensaje: 'Error al generar PDF' });
  }
};

export const generarReporteCSV = async (_req, res) => {
  try {
    const ruta = await reportesServicios.generarCSVReservas();
    res.json({ mensaje: 'Reporte CSV generado correctamente', archivo: ruta });
  } catch (error) {
    console.error('Error al generar CSV:', error);
    res.status(500).json({ mensaje: 'Error al generar CSV' });
  }
};
