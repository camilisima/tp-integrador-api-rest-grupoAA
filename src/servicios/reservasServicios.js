import pool from '../datos/basededatos.js';
import NotificacionesService from './notificacioneservicio.js';
const noti = new NotificacionesService();

export const crearReservaCliente = async (data) => {
  const { usuario_id, salon_id, turno_id, fecha_reserva, tematica, importe_salon, importe_total, foto_cumpleaniero } = data;

  //  Insert
  const sql = `
    INSERT INTO reservas
      (fecha_reserva, salon_id, usuario_id, turno_id, tematica, importe_salon, importe_total, foto_cumpleaniero, activo)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 1)
  `;
  const [r] = await pool.query(sql, [
    fecha_reserva, Number(salon_id), Number(usuario_id), Number(turno_id),
    tematica ?? null,
    importe_salon != null ? Number(importe_salon) : null,
    importe_total != null ? Number(importe_total) : null,
    foto_cumpleaniero ?? null
  ]);

  const reservaId = r.insertId;

  // Datos para el correo 
  const [rows] = await pool.query(
    `SELECT u.nombre_usuario AS email, s.titulo AS salon,
            t.hora_desde, t.hora_hasta
     FROM usuarios u
     JOIN salones s ON s.salon_id = ?
     JOIN turnos  t ON t.turno_id  = ?
     WHERE u.usuario_id = ?`,
    [Number(salon_id), Number(turno_id), Number(usuario_id)]
  );
  const row = rows[0];

  // Enviar mail 
  try {
    await noti.enviarCorreo({
      to: row.email,                         
      fecha: fecha_reserva,
      salon: row.salon,
      turno: `${row.hora_desde} - ${row.hora_hasta}`
    });

    // notificar admin opcional
    if (process.env.ADMIN_EMAIL) {
      await noti.enviarCorreo({
        to: process.env.ADMIN_EMAIL,
        fecha: fecha_reserva,
        salon: row.salon,
        turno: `${row.hora_desde} - ${row.hora_hasta}`
      });
    }
  } catch (err) {
    console.error('⚠️ Falló el envío de notificación:', err.message);
  }

  return reservaId;
};