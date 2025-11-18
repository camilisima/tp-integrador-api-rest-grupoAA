import * as dao from '../datos/reservasDAO.js';
import * as notifDAO from '../datos/notificacionesDAO.js';
import NotificacionesService from './notificacioneservicio.js';

const noti = new NotificacionesService();



export const crearReservaCliente = async (data) => {
  const reservaId = await dao.insertReserva(data);


  const datos = await notifDAO.getDatosNotificacion(reservaId);

  const cliente = datos.cliente;
  const admins = datos.admins;

  try {
    
    await noti.enviarCorreo({
      to: cliente.email_cliente,
      fecha: cliente.fecha_reserva,
      salon: cliente.salon,
      turno: `${cliente.hora_desde} - ${cliente.hora_hasta}`,
      admin: false
    });

    for (const admin of admins) {
      await noti.enviarCorreo({
        to: admin.email_admin,
        fecha: cliente.fecha_reserva,
        salon: cliente.salon,
        turno: `${cliente.hora_desde} - ${cliente.hora_hasta}`,
        admin: true
      });
    }

  } catch (error) {
    console.error('Error al enviar correo:', error.message);
  }

  return reservaId;
};


export const getAllReservas = () => dao.getAllReservas();
export const getReservaById = (id) => dao.getReservaById(id);

export const getReservasByUsuario = (usuario_id) =>
  dao.getReservasByUsuario(usuario_id);


export const updateReserva = (id, data) =>
  dao.updateReserva(id, data);


export const deleteReserva = (id) =>
  dao.deleteReserva(id);