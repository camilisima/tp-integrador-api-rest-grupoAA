import { validationResult } from 'express-validator';
import * as reservasservicios from '../servicios/reservasServicios.js';

export const getReservas = async (req, res) => {
  try {
    const rs = await reservasservicios.getAllReservas();
    res.json(rs);
  } catch (e) {
    console.error('Error al buscar reservas:', e);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getReservaById = async (req, res) => {
  try {
    const r = await reservasservicios.getReservaById(req.params.id);
    if (!r) return res.status(404).json({ message: 'Reserva no encontrada' });
    res.json(r);
  } catch (e) {
    console.error('Error al buscar reserva:', e);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const createReserva = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { fecha_reserva, salon_id, usuario_id, turno_id, tematica, importe_salon, importe_total } = req.body;

  try {
    if (reservasservicios.estaDisponible) {
      const libre = await reservasservicios.estaDisponible({ fecha_reserva, salon_id, turno_id });
      if (!libre) return res.status(409).json({ message: 'El salon esta ocupado en ese turno' });
    }
    const id = await reservasservicios.createReserva({
      fecha_reserva, salon_id, usuario_id, turno_id,
      tematica: tematica ?? null,
      importe_salon: importe_salon ?? null,
      importe_total: importe_total ?? null
    });
    res.status(201).json({ id });
  } catch (e) {
    console.error('Error al crear reserva:', e);
    res.status(500).json({ message: 'Error al crear reserva' });
  }
};


export const updateReserva = async (req, res) => {
  try {
    const ok = await reservasservicios.updateReserva(req.params.id, req.body);
    if (!ok) return res.status(404).json({ message: 'Reserva no encontrada' });
    res.json({ message: 'Reserva actualizada' });
  } catch (e) {
    console.error('Error al actualizar reserva:', e);
    res.status(500).json({ message: 'Error al actualizar reserva' });
  }
};


export const deleteReserva = async (req, res) => {
  try {
    const ok = await reservasservicios.deleteReserva(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Reserva no encontrada' });
    res.json({ message: 'Reserva eliminada' });
  } catch (e) {
    console.error('Error al eliminar reserva:', e);
    res.status(500).json({ message: 'Error al eliminar reserva' });
  }
};
