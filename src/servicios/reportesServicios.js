import pool from '../datos/basededatos.js';
import PDFDocument from 'pdfkit';
import { Parser } from 'json2csv';
import fs from 'fs';
import path from 'path';

export const generarPDFReservas = async () => {
  // Consultar reservas activas
  const [reservas] = await pool.query(`
    SELECT r.reserva_id, r.fecha_reserva, u.nombre AS cliente, s.titulo AS salon, r.importe_total
    FROM reservas r
    JOIN usuarios u ON r.usuario_id = u.usuario_id
    JOIN salones s ON r.salon_id = s.salon_id
    WHERE r.activo = 1;
  `);

  // Rutas de carpeta y archivo
  const rutaCarpeta = path.resolve('./reportes');
  const rutaArchivo = path.join(rutaCarpeta, 'reservas.pdf');

  // ✅ Crear carpeta si no existe
  if (!fs.existsSync(rutaCarpeta)) {
    fs.mkdirSync(rutaCarpeta, { recursive: true });
  }

  // Crear documento PDF
  const doc = new PDFDocument({ margin: 40 });
  const stream = fs.createWriteStream(rutaArchivo);
  doc.pipe(stream);

  // Encabezado
  doc.fontSize(18).text('Reporte de Reservas', { align: 'center' });
  doc.moveDown();
  doc.fontSize(12).text(`Generado el: ${new Date().toLocaleString()}`);
  doc.moveDown();

  // Contenido
  reservas.forEach((r) => {
    doc
      .fontSize(12)
      .text(`ID: ${r.reserva_id}`)
      .text(`Cliente: ${r.cliente}`)
      .text(`Salón: ${r.salon}`)
      .text(`Fecha: ${r.fecha_reserva}`)
      .text(`Importe Total: $${r.importe_total}`)
      .moveDown();
  });

  // Cerrar documento
  doc.end();

  // Esperar a que el PDF termine de generarse
  return new Promise((resolve, reject) => {
    stream.on('finish', () => resolve(rutaArchivo));
    stream.on('error', (err) => reject(err));
  });
};

export const generarCSVReservas = async () => {
  // Consultar reservas activas
  const [reservas] = await pool.query(`
    SELECT r.reserva_id, r.fecha_reserva, u.nombre AS cliente, s.titulo AS salon, r.importe_total
    FROM reservas r
    JOIN usuarios u ON r.usuario_id = u.usuario_id
    JOIN salones s ON r.salon_id = s.salon_id
    WHERE r.activo = 1;
  `);

  // Rutas de carpeta y archivo
  const rutaCarpeta = path.resolve('./reportes');
  const rutaArchivo = path.join(rutaCarpeta, 'reservas.csv');

  if (!fs.existsSync(rutaCarpeta)) {
    fs.mkdirSync(rutaCarpeta, { recursive: true });
  }

  // Crear CSV
  const parser = new Parser();
  const csv = parser.parse(reservas);

  // Guardar archivo
  fs.writeFileSync(rutaArchivo, csv);

  return rutaArchivo;
};