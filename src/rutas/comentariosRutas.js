import express from 'express';
import { body, param } from 'express-validator';
import { requireAuth, empleadoOAdmin } from '../middlewares/auth.js';
import * as comentariosCtrl from '../controladores/comentarioscontrolador.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Comentarios
 *     description: Sistema de comentarios sobre reservas
 */

// 🔹 Obtener todos los comentarios de una reserva
//Todos los comentarios de uan reserva
router.get(
  '/reserva/:reserva_id',
  requireAuth,
  param('reserva_id').isInt({ gt: 0 }).withMessage('ID de reserva inválido'),
  comentariosCtrl.getComentariosPorReserva
);

// 🔹 Crear un comentario (solo empleado o admin)
//Nuevo comentario(empleado o admin)
router.post(
  '/',
  requireAuth,
  empleadoOAdmin,
  [
    body('reserva_id').isInt({ gt: 0 }).withMessage('Debe indicar una reserva válida'),
    body('texto').isString().isLength({ min: 3 }).withMessage('El texto del comentario es obligatorio'),
  ],
  comentariosCtrl.crearComentario
);

// 🔹 Borrado lógico del comentario
//Borrar comentario
router.delete(
  '/:id',
  requireAuth,
  empleadoOAdmin,
  param('id').isInt({ gt: 0 }).withMessage('ID inválido'),
  comentariosCtrl.deleteComentario
);

export default router;

// 🔹 Listar todos los comentarios activos
//Todos los comentarios activos
router.get('/', requireAuth, empleadoOAdmin, comentariosCtrl.getComentariosActivos);
