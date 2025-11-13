import { validationResult } from 'express-validator';
import * as reservasSrv from '../servicios/reservasServicios.js';


// Cliente: Listar MIS reservas

export const listarMias = async (req, res) => {
  try {
    const reservas = await reservasSrv.getReservasByUsuario(req.user.usuario_id);
    res.json(reservas);
  } catch (e) {
    console.error('Error listarMias:', e);
    res.status(500).json({ message: 'Error al listar mis reservas' });
  }
};

// Cliente: Crear reserva

export const crearReservaCliente = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const payload = {
      ...req.body,
      usuario_id: req.user.usuario_id,
    };

    const id = await reservasSrv.crearReservaCliente(payload);

    res.status(201).json({ id, message: 'Reserva creada correctamente' });
  } catch (e) {
    console.error('Error crearReservaCliente:', e);
    res.status(500).json({ message: 'Error al crear reserva' });
  }
};


// Empleado/Admin: Listar todas las reservas

export const getReservas = async (_req, res) => {
  try {
    const reservas = await reservasSrv.getAllReservas();
    res.json(reservas);
  } catch (e) {
    console.error('Error getReservas:', e);
    res.status(500).json({ message: 'Error al obtener reservas' });
  }
};


//  Empleado/Admin: Obtener reserva por ID

export const getReservaById = async (req, res) => {
  try {
    const reserva = await reservasSrv.getReservaById(req.params.id);

    if (!reserva)
      return res.status(404).json({ message: 'Reserva no encontrada' });

    res.json(reserva);
  } catch (e) {
    console.error('Error getReservaById:', e);
    res.status(500).json({ message: 'Error al buscar reserva' });
  }
};


// Admin: Actualizar reserva

export const updateReserva = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  try {
    const updated = await reservasSrv.updateReserva(req.params.id, req.body);

    if (!updated)
      return res.status(404).json({ message: 'Reserva no encontrada' });

    res.json({ message: 'Reserva actualizada correctamente' });
  } catch (e) {
    console.error('Error updateReserva:', e);
    res.status(500).json({ message: 'Error al actualizar reserva' });
  }
};


// Admin: Eliminar (baja lógica)

export const deleteReserva = async (req, res) => {
  try {
    const deleted = await reservasSrv.deleteReserva(req.params.id);

    if (!deleted)
      return res.status(404).json({ message: 'Reserva no encontrada' });

    res.json({ message: 'Reserva eliminada correctamente' });
  } catch (e) {
    console.error('Error deleteReserva:', e);
    res.status(500).json({ message: 'Error al eliminar reserva' });
  }
};