import nodemailer from 'nodemailer';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import handlebars from 'handlebars';

export default class NotificacionesService {
  constructor() {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);

    const plantillaPath = path.join(__dirname, '../utils/handlebars/plantilla.hbs');
    const plantillaSrc = fs.readFileSync(plantillaPath, 'utf-8');

    this.template = handlebars.compile(plantillaSrc);

    this.transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || 'smtp.gmail.com',
      port: Number(process.env.SMTP_PORT || 587),
      secure: false,
      auth: {
        user: process.env.CORREO,
        pass: process.env.CLAVE
      }
    });
  }

  async enviarCorreo({ to, fecha, salon, turno, admin = false }) {
    if (!to) {
      console.warn("No se envió correo porque 'to' está vacío.");
      return;
    }

    const html = this.template({ fecha, salon, turno, admin });

    const subject = admin
      ? 'Nueva reserva registrada'
      : 'Confirmación de reserva';

    const info = await this.transporter.sendMail({
      from: process.env.MAIL_FROM,
      to,
      subject,
      html
    });

    console.log(` Email enviado a ${to} | ID: ${info.messageId}`);
    return info;
  }
}