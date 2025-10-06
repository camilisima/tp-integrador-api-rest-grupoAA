import { validationResult } from 'express-validator';
import * as salonesservicios from '../servicios/salonesservicios.js';

export const getSalones = async (req, res) => {
  try {
    const salones = await salonesservicios.getAllSalones();
    res.json(salones);
  } catch (error) {
    console.error('Error al obtener salones:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};

export const getSalonById = async (req, res) => {
  try {
    const salon = await salonesservicios.getSalonById(req.params.id);
    if (!salon) {
      return res.status(404).json({ message: 'Salón no encontrado' });
    }
    res.json(salon);
  } catch (error) {
    console.error('Error al obtener salón:', error);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};


export const createSalon = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newId = await salonesservicios.createSalon(req.body);
    res.status(201).json({ message: 'Salón creado correctamente', id: newId });
  } catch (error) {
    console.error('Error al crear salón:', error);
    res.status(500).json({ message: 'Error al crear salón' });
  }
};


export const updateSalon = async (req, res) => {
  try {
    const updated = await salonesservicios.updateSalon(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ message: 'Salón no encontrado' });
    }
    res.json({ message: 'Salón actualizado correctamente' });
  } catch (error) {
    console.error('Error al actualizar salón:', error);
    res.status(500).json({ message: 'Error al actualizar salón' });
  }
};


export const deleteSalon = async (req, res) => {
  try {
    const deleted = await salonesservicios.deleteSalon(req.params.id);
    if (!deleted) {
      return res.status(404).json({ message: 'Salón no encontrado' });
    }
    res.json({ message: 'Salón eliminado correctamente' });
  } catch (error) {
    console.error('Error al eliminar salón:', error);
    res.status(500).json({ message: 'Error al eliminar salón' });
  }
};
