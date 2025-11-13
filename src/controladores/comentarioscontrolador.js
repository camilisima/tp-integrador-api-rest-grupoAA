import { validationResult } from 'express-validator';
import * as comentariosSrv from '../servicios/comentariosServicios.js';

export const getComentariosPorReserva = async (req, res) => {
  try {
    const { reserva_id } = req.params;
    const data = await comentariosSrv.getComentariosPorReserva(reserva_id);
    res.json(data);
  } catch {
    res.status(500).json({ message: 'Error al obtener comentarios' });
  }
};

export const crearComentario = async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const usuario_id = req.user.usuario_id;
    const { reserva_id, texto } = req.body;

    const id = await comentariosSrv.crearComentario({ reserva_id, usuario_id, texto });
    res.status(201).json({ id });
  } catch {
    res.status(500).json({ message: 'Error al crear comentario' });
  }
};

export const deleteComentario = async (req, res) => {
  try {
    const { id } = req.params;
    const ok = await comentariosSrv.deleteComentario(id);
    if (!ok) return res.status(404).json({ message: 'Comentario no encontrado' });
    res.json({ deleted: ok });
  } catch {
    res.status(500).json({ message: 'Error al eliminar comentario' });
  }
};

export const getComentariosActivos = async (_req, res) => {
  try {
    const data = await comentariosSrv.getComentariosActivos();
    res.json(data);
  } catch {
    res.status(500).json({ message: 'Error al listar comentarios' });
  }
};
