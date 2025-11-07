import { validationResult } from 'express-validator';
import * as svc from '../servicios/reservasservicios.js';
import * as svc from '../servicios/reservasServicios.js';


// Cliente: /api/reservas/mias
export const listarMias = async (req, res) => {
  try {
    const reservas = await svc.getReservasByUsuario(req.user.usuario_id);
    res.json(reservas);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error al listar mis reservas' });
  }
};

// Cliente: POST /api/reservas

export const crearReservaCliente = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const payload = {
      ...req.body,
      usuario_id: req.user.usuario_id, // viene del JWT
      usuario_id: req.user.usuario_id, 
    };
    const id = await svc.crearReservaCliente(payload);
    res.status(201).json({ message: 'Reserva creada', id });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error al crear reserva' });
  }
};

// Empleado/Admin: GET /api/reservas

export const getReservas = async (_req, res) => {
  try {
    const r = await svc.getAllReservas();
    res.json(r);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error al obtener reservas' });
    res.status(500).json({ message: 'Error al buscar reservas' });
  }
};

// Empleado/Admin: GET /api/reservas/:id

export const getReservaById = async (req, res) => {
  try {
    const r = await svc.getReservaById(req.params.id);
    if (!r) return res.status(404).json({ message: 'Reserva no encontrada' });
    if (!r) return res.status(404).json({ message: 'No se encontro reservas' });
    res.json(r);
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error al buscar reserva' });
  }
};

// Admin: PUT /api/reservas/:id

export const updateReserva = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
  try {
    const ok = await svc.updateReserva(req.params.id, req.body);
    if (!ok) return res.status(404).json({ message: 'Reserva no encontrada' });
    if (!ok) return res.status(404).json({ message: 'No se encontro reservas' });
    res.json({ message: 'Reserva actualizada' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error al actualizar reserva' });
  }
};

// Admin: DELETE /api/reservas/:id

export const deleteReserva = async (req, res) => {
  try {
    const ok = await svc.deleteReserva(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Reserva no encontrada' });
    if (!ok) return res.status(404).json({ message: 'No se encontro reservas' });
    res.json({ message: 'Reserva eliminada' });
  } catch (e) {
    console.error(e);
    res.status(500).json({ message: 'Error al eliminar reserva' });
  }
};