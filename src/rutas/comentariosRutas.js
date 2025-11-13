import express from 'express';
import { body, param } from 'express-validator';
import { requireAuth, empleadoOAdmin } from '../middlewares/auth.js';
import * as comentariosCtrl from '../controladores/comentariosControlador.js';

const router = express.Router();

// Obtener comentarios de una reserva
router.get(
  '/reserva/:reserva_id',
  requireAuth,
  param('reserva_id').isInt({ gt: 0 }),
  comentariosCtrl.getComentariosPorReserva
);

// Crear comentario
router.post(
  '/',
  requireAuth,
  empleadoOAdmin,
  [
    body('reserva_id').isInt({ gt: 0 }),
    body('texto').isString().isLength({ min: 3 }),
  ],
  comentariosCtrl.crearComentario
);

// Eliminar comentario
router.delete(
  '/:id',
  requireAuth,
  empleadoOAdmin,
  param('id').isInt({ gt: 0 }),
  comentariosCtrl.deleteComentario
);

// Listar todos los comentarios activos
router.get(
  '/',
  requireAuth,
  empleadoOAdmin,
  comentariosCtrl.getComentariosActivos
);

export default router;
