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

/**
 * @swagger
 * components:
 *   schemas:
 *     Comentario:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           example: 1
 *         reserva_id:
 *           type: integer
 *           example: 12
 *         usuario_id:
 *           type: integer
 *           example: 4
 *         texto:
 *           type: string
 *           example: "El cliente llegó puntual y todo estuvo en orden."
 *         activo:
 *           type: boolean
 *           example: true
 *         fecha_creacion:
 *           type: string
 *           format: date-time
 *           example: "2025-11-07T15:30:00Z"
 */

/**
 * @swagger
 * /api/comentarios/reserva/{reserva_id}:
 *   get:
 *     summary: Obtener todos los comentarios de una reserva
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: reserva_id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 5
 *         description: ID de la reserva cuyos comentarios se desean listar
 *     responses:
 *       200:
 *         description: Lista de comentarios asociados a la reserva
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comentario'
 *       400:
 *         description: ID de reserva inválido
 *       401:
 *         description: No autorizado (token no válido o inexistente)
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/comentarios:
 *   post:
 *     summary: Crear un nuevo comentario sobre una reserva
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - reserva_id
 *               - texto
 *             properties:
 *               reserva_id:
 *                 type: integer
 *                 example: 5
 *               texto:
 *                 type: string
 *                 example: "Excelente atención y limpieza del salón."
 *     responses:
 *       201:
 *         description: Comentario creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Comentario'
 *       400:
 *         description: Datos inválidos (reserva inexistente o texto faltante)
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Solo empleados o administradores pueden crear comentarios
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/comentarios/{id}:
 *   delete:
 *     summary: Borrado lógico de un comentario existente
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *           example: 3
 *         description: ID del comentario a eliminar
 *     responses:
 *       200:
 *         description: Comentario marcado como inactivo correctamente
 *       400:
 *         description: ID inválido
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Solo empleados o administradores pueden borrar comentarios
 *       404:
 *         description: Comentario no encontrado
 *       500:
 *         description: Error interno del servidor
 */

/**
 * @swagger
 * /api/comentarios:
 *   get:
 *     summary: Listar todos los comentarios activos
 *     tags: [Comentarios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos los comentarios activos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comentario'
 *       401:
 *         description: No autorizado
 *       403:
 *         description: Solo empleados o administradores pueden acceder
 *       500:
 *         description: Error interno del servidor
 */

router.get(
  '/reserva/:reserva_id',
  requireAuth,
  param('reserva_id').isInt({ gt: 0 }).withMessage('ID de reserva inválido'),
  comentariosCtrl.getComentariosPorReserva
);


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


//Borrar comentario
router.delete(
  '/:id',
  requireAuth,
  empleadoOAdmin,
  param('id').isInt({ gt: 0 }).withMessage('ID inválido'),
  comentariosCtrl.deleteComentario
);

export default router;

//Todos los comentarios activos
router.get('/', requireAuth, empleadoOAdmin, comentariosCtrl.getComentariosActivos);
