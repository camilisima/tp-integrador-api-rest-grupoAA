import fs from 'fs';
import PDFDocument from 'pdfkit';
import { Parser } from 'json2csv';
import * as dao from '../datos/reportesDAO.js';
import * as daoServicios from '../datos/reservasServiciosDAO.js';



export const generarPDFReservas = async () => {
  
  const reservas = await dao.getReporteReservas();
  const rutaArchivo = './reportes/reservas.pdf';

  const doc = new PDFDocument({ margin: 40 });
  const stream = fs.createWriteStream(rutaArchivo);
  doc.pipe(stream);
  doc.fontSize(22).text('Reporte de Reservas', { align: 'center' });
  doc.moveDown(2);

  
  for (const r of reservas) {
    doc.fontSize(14).text(`Reserva #${r.reserva_id}`, { underline: true });
    doc.fontSize(12)
      .text(`Fecha: ${r.fecha_reserva}`)
      .text(`Cliente: ${r.cliente} ${r.cliente_apellido}`)
      .text(`Salón: ${r.salon}`)
      .text(`Turno: ${r.hora_desde} - ${r.hora_hasta}`)
      .text(`Importe Total: $${r.importe_total}`);

    doc.moveDown(0.5);

  
    const servicios = await daoServicios.findByReserva(r.reserva_id);

    doc.fontSize(12).text("Servicios:");

    if (servicios.length === 0) {
      doc.text("- (Ninguno)");
    } else {
      servicios.forEach(s => {
        doc.text(`- ${s.descripcion} ($${s.importe})`);
      });
    }

    doc.moveDown(2);
  }

  doc.end();
  return rutaArchivo;
};

export const generarCSVReservas = async () => {
  const reservas = await dao.getReporteReservas();

  const parser = new Parser();
  const csv = parser.parse(reservas);

  const rutaArchivo = './reportes/reservas.csv';
  fs.writeFileSync(rutaArchivo, csv);

  return rutaArchivo;
};