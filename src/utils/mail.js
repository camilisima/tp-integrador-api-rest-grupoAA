import nodemailer from 'nodemailer';


export const mailer = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: false, 
  auth: {
    user: process.env.CORREO,
    pass: process.env.CLAVE,
  }
});

export async function verifyMailer() {
  try {
    await mailer.verify();
    console.log('📧 SMTP listo para enviar emails');
  } catch (e) {
    console.error('❌ Error verificando SMTP:', e.message);
  }
  
}

