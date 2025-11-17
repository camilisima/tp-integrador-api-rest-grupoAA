import express from 'express';
import { body, param } from 'express-validator';
import { requireAuth, empleadoOAdmin } from '../middlewares/auth.js';
import * as comentariosCtrl from '../controladores/comentariosControlador.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Comentarios
 *     description: Sistema de comentarios sobre reservas
 */

/**
 * @swagger
 * /comentarios:
 *   get:
 *     summary: Obtener todos los comentarios activos
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de comentarios
 */
router.get(
  '/',
  requireAuth,
  empleadoOAdmin,
  comentariosCtrl.getComentariosActivos
);

/**
 * @swagger
 * /comentarios/reserva/{reserva_id}:
 *   get:
 *     summary: Obtener comentarios por reserva
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reserva_id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de comentarios de la reserva
 */
router.get(
  '/reserva/:reserva_id',
  requireAuth,
  param('reserva_id').isInt({ gt: 0 }).withMessage('ID inválido'),
  comentariosCtrl.getComentariosPorReserva
);

/**
 * @swagger
 * /comentarios:
 *   post:
 *     summary: Crear un comentario sobre una reserva
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               reserva_id:
 *                 type: integer
 *               texto:
 *                 type: string
 *     responses:
 *       201:
 *         description: Comentario creado
 */
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

/**
 * @swagger
 * /comentarios/{id}:
 *   delete:
 *     summary: Borrado lógico de un comentario
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Comentario eliminado
 */
router.delete(
  '/:id',
  requireAuth,
  empleadoOAdmin,
  param('id').isInt({ gt: 0 }),
  comentariosCtrl.deleteComentario
);

export default router;