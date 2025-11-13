import { validationResult } from 'express-validator';
import * as serviciosServicios from '../servicios/serviciosServicios.js';

// GET
export const getServicios = async (req, res) => {
  try {
    const rows = await serviciosServicios.getAllServicios();
    res.json(rows);
  } catch (e) {
    console.error('Error al buscar servicios:', e);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// GET
export const getServicioById = async (req, res) => {
  try {
    const row = await serviciosServicios.getServicioById(req.params.id);
    if (!row) return res.status(404).json({ message: 'Servicio no encontrado' });
    res.json(row);
  } catch (e) {
    console.error('Error al buscar servicio:', e);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

// POST
export const createServicio = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { descripcion, importe } = req.body;
  try {
    const id = await serviciosServicios.createServicio({ descripcion, importe });
    res.status(201).json({ id });
  } catch (e) {
    console.error('Error al crear servicio:', e);
    res.status(500).json({ message: 'Error al crear servicio' });
  }
};

// PUT
export const updateServicio = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

  const { descripcion, importe } = req.body;
  try {
    const ok = await serviciosServicios.updateServicio(req.params.id, { descripcion, importe });
    if (!ok) return res.status(404).json({ message: 'Servicio no encontrado' });
    res.json({ message: 'Servicio actualizado' });
  } catch (e) {
    console.error('Error al actualizar servicio:', e);
    res.status(500).json({ message: 'Error al actualizar servicio' });
  }
};

// SOFT DELETE
export const deleteServicio = async (req, res) => {
  try {
    const ok = await serviciosServicios.deleteServicio(req.params.id);
    if (!ok) return res.status(404).json({ message: 'Servicio no encontrado' });
    res.json({ message: 'Servicio eliminado' });
  } catch (e) {
    console.error('Error al eliminar servicio:', e);
    res.status(500).json({ message: 'Error al eliminar servicio' });
  }
};
