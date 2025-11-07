import pool from '../datos/basededatos.js';
import PDFDocument from 'pdfkit';
import { Parser } from 'json2csv';
import fs from 'fs';

// Generar PDF de reservas
//generador de reservas pdf
export const generarPDFReservas = async () => {
  const [reservas] = await pool.query(`
    SELECT r.reserva_id, r.fecha_reserva, u.nombre AS cliente, s.titulo AS salon, r.importe_total
    FROM reservas r
    JOIN usuarios u ON r.usuario_id = u.usuario_id
    JOIN salones s ON r.salon_id = s.salon_id
    WHERE r.activo = 1;
  `);

  const doc = new PDFDocument();
  const rutaArchivo = './reportes/reservas.pdf';
  const stream = fs.createWriteStream(rutaArchivo);
  doc.pipe(stream);

  doc.fontSize(18).text('Reporte de Reservas', { align: 'center' });
  doc.moveDown();

  reservas.forEach((r) => {
    doc
      .fontSize(12)
      .text(`ID: ${r.reserva_id}`)
      .text(`Cliente: ${r.cliente}`)
      .text(`Salón: ${r.salon}`)
      .text(`Salon: ${r.salon}`)
      .text(`Fecha: ${r.fecha_reserva}`)
      .text(`Importe Total: $${r.importe_total}`)
      .moveDown();
  });

  doc.end();
  return rutaArchivo;
};

// Generar CSV de reservas
//Generador cvs de reservas
export const generarCSVReservas = async () => {
  const [reservas] = await pool.query(`
    SELECT r.reserva_id, r.fecha_reserva, u.nombre AS cliente, s.titulo AS salon, r.importe_total
    FROM reservas r
    JOIN usuarios u ON r.usuario_id = u.usuario_id
    JOIN salones s ON r.salon_id = s.salon_id
    WHERE r.activo = 1;
  `);

  const parser = new Parser();
  const csv = parser.parse(reservas);
  const rutaArchivo = './reportes/reservas.csv';
  fs.writeFileSync(rutaArchivo, csv);
  return rutaArchivo;
};
