import fs from 'fs';
import PDFDocument from 'pdfkit';
import { Parser } from 'json2csv';
import * as dao from '../datos/reportesDAO.js';


//     PDF DE RESERVAS

export const generarPDFReservas = async () => {
  // Datos desde el stored procedure
  const reservas = await dao.getReporteReservas();

  // Archivo destino
  const rutaArchivo = './reportes/reservas.pdf';

  // Crear PDF
  const doc = new PDFDocument();
  const stream = fs.createWriteStream(rutaArchivo);
  doc.pipe(stream);

  // Título
  doc.fontSize(20).text('Reporte de Reservas', { align: 'center' });
  doc.moveDown(2);

  // Cuerpo
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


//     CSV DE RESERVAS

export const generarCSVReservas = async () => {
  // Datos desde stored procedure
  const reservas = await dao.getReporteReservas();

  const parser = new Parser();
  const csv = parser.parse(reservas);

  const rutaArchivo = './reportes/reservas.csv';
  fs.writeFileSync(rutaArchivo, csv);

  return rutaArchivo;
};