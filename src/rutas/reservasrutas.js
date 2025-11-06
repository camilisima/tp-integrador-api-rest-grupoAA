import express from 'express';
import { body, param } from 'express-validator';
import * as reservasControlador from '../controladores/reservascontrolador.js';
import { requireAuth, empleadoOAdmin, soloAdmin } from '../middlewares/auth.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Reservas
 *     description: Endpoints para gestionar reservas (Cliente / Empleado / Admin)
 */

/**
 * @swagger
 * /api/reservas/mias:
 *   get:
 *     tags: [Reservas]
 *     summary: Lista las reservas del usuario autenticado (Cliente)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items: { $ref: '#/components/schemas/Reserva' }
 *       401:
 *         description: No autorizado
 */

/**
 * @swagger
 * /api/reservas:
 *   post:
 *     tags: [Reservas]
 *     summary: Crea una reserva (Cliente)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ReservaCreate' }
 *           example:
 *             fecha_reserva: "2025-10-08"
 *             salon_id: 1
 *             turno_id: 2
 *             tematica: "Cumple temático"
 *             importe_salon: 150000
 *             importe_total: 220000
 *             foto_cumpleaniero: "uploads/fotos/juanito.jpg"
 *     responses:
 *       201: { description: Creada }
 *       400: { description: Error de validación }
 *       401: { description: No autorizado }
 */

/**
 * @swagger
 * /api/reservas:
 *   get:
 *     tags: [Reservas]
 *     summary: Lista todas las reservas (Empleado / Admin)
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200: { description: OK }
 *       401: { description: No autorizado }
 */

/**
 * @swagger
 * /api/reservas/{id}:
 *   get:
 *     tags: [Reservas]
 *     summary: Obtiene una reserva por ID (Empleado / Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 *       404: { description: No encontrada }
 *
 *   put:
 *     tags: [Reservas]
 *     summary: Actualiza una reserva (Solo Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema: { $ref: '#/components/schemas/ReservaCreate' }
 *           example:
 *             fecha_reserva: "2025-10-09"
 *             salon_id: 2
 *             turno_id: 3
 *             tematica: "Actualizado"
 *             importe_salon: 180000
 *             importe_total: 260000
 *             foto_cumpleaniero: "uploads/fotos/actualizado.jpg"
 *     responses:
 *       200: { description: Actualizada }
 *       404: { description: No encontrada }
 *
 *   delete:
 *     tags: [Reservas]
 *     summary: Baja lógica de una reserva (Solo Admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Eliminada }
 *       404: { description: No encontrada }
 */

const validateCreate = [
  body('fecha_reserva').isISO8601().withMessage('fecha_reserva inválida'),
  body('salon_id').isInt({ gt: 0 }).withMessage('salon_id inválido'),
  body('turno_id').isInt({ gt: 0 }).withMessage('turno_id inválido'),
  body('tematica').optional().isString().isLength({ max: 255 }),
  body('importe_salon').optional().isFloat({ gt: 0 }),
  body('importe_total').optional().isFloat({ gt: 0 }),
  body('foto_cumpleaniero').optional().isString().isLength({ max: 255 }),
];

const validateUpdate = [
  param('id').isInt({ gt: 0 }).withMessage('ID inválido'),
  body('fecha_reserva').optional().isISO8601(),
  body('salon_id').optional().isInt({ gt: 0 }),
  body('turno_id').optional().isInt({ gt: 0 }),
  body('tematica').optional().isString().isLength({ max: 255 }),
  body('importe_salon').optional().isFloat({ gt: 0 }),
  body('importe_total').optional().isFloat({ gt: 0 }),
  body('foto_cumpleaniero').optional().isString().isLength({ max: 255 }),
];

// Cliente
router.get('/mias', requireAuth, reservasControlador.listarMias);
router.post('/', requireAuth, validateCreate, reservasControlador.crearReservaCliente);

// Empleado/Admin
router.get('/', requireAuth, empleadoOAdmin, reservasControlador.getReservas);
router.get('/:id', requireAuth, empleadoOAdmin, param('id').isInt({ gt: 0 }), reservasControlador.getReservaById);

// Admin
router.put('/:id', requireAuth, soloAdmin, validateUpdate, reservasControlador.updateReserva);
router.delete('/:id', requireAuth, soloAdmin, param('id').isInt({ gt: 0 }), reservasControlador.deleteReserva);

export default router;