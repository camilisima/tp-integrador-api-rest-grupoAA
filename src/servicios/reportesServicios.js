import fs from 'fs';
import path from 'path';
import PDFDocument from 'pdfkit';
import { Parser } from 'json2csv';
import * as dao from '../datos/reportesDAO.js';

const ensureReportFolder = () => {
  const rutaCarpeta = path.join(process.cwd(), 'reportes');

  if (!fs.existsSync(rutaCarpeta)) {
    fs.mkdirSync(rutaCarpeta, { recursive: true });
    console.log('📂 Carpeta /reportes creada automáticamente');
  }

  return rutaCarpeta;
};

export const generarPDFReservas = async () => {
  const reservas = await dao.getReporteReservas(); 
  const carpeta = ensureReportFolder();
  const rutaArchivo = path.join(carpeta, 'reservas.pdf');

  const doc = new PDFDocument();
  const stream = fs.createWriteStream(rutaArchivo);
  doc.pipe(stream);

  doc.fontSize(20).text('Reporte de Reservas', { align: 'center' });
  doc.moveDown(2);

  reservas.forEach(r => {
    doc.fontSize(12)
      .text(`ID Reserva: ${r.reserva_id}`)
      .text(`Fecha: ${r.fecha_reserva}`)
      .text(`Cliente: ${r.cliente} ${r.cliente_apellido}`)
      .text(`Salón: ${r.salon}`)
      .text(`Turno: ${r.hora_desde} - ${r.hora_hasta}`)
      .text(`Importe Total: $${r.importe_total}`)
      .moveDown();
  });

  doc.end();

  return rutaArchivo;
};

export const generarCSVReservas = async () => {
  const reservas = await dao.getReporteReservas();
  const carpeta = ensureReportFolder();
  const rutaArchivo = path.join(carpeta, 'reservas.csv');

  const parser = new Parser();
  const csv = parser.parse(reservas);

  fs.writeFileSync(rutaArchivo, csv);

  return rutaArchivo;
};