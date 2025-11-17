import express from 'express';
import { body, param } from 'express-validator';
import * as reservasControlador from '../controladores/reservascontrolador.js';
import { requireAuth, empleadoOAdmin, soloAdmin } from '../middlewares/auth.js';

const router = express.Router();

// Validaciones
const validateId = [
  param('id')
    .isInt({ gt: 0 })
    .withMessage('El ID debe ser un entero mayor a 0'),
];

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
  ...validateId,
  body('fecha_reserva').optional().isISO8601(),
  body('salon_id').optional().isInt({ gt: 0 }),
  body('turno_id').optional().isInt({ gt: 0 }),
  body('tematica').optional().isString().isLength({ max: 255 }),
  body('importe_salon').optional().isFloat({ gt: 0 }),
  body('importe_total').optional().isFloat({ gt: 0 }),
  body('foto_cumpleaniero').optional().isString().isLength({ max: 255 }),
];


/**
 * @swagger
 * tags:
 *   - name: Reservas
 *     description: Gestión de reservas (Cliente, Empleado, Administrador)
 */

/**
 * @swagger
 * /api/reservas/mias:
 *   get:
 *     tags: [Reservas]
 *     summary: Obtiene las reservas del usuario autenticado
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: Lista de reservas del cliente
 */
router.get('/mias', requireAuth, reservasControlador.listarMias);

/**
 * @swagger
 * /api/reservas:
 *   post:
 *     tags: [Reservas]
 *     summary: Crea una nueva reserva (Cliente)
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             fecha_reserva: "2025-12-10"
 *             salon_id: 2
 *             turno_id: 1
 *             tematica: "Frozen"
 *     responses:
 *       201:
 *         description: Reserva creada correctamente
 */
router.post('/', requireAuth, validateCreate, reservasControlador.crearReservaCliente);

/**
 * @swagger
 * /api/reservas:
 *   get:
 *     tags: [Reservas]
 *     summary: Lista todas las reservas (Empleado/Admin)
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: Lista completa de reservas
 */
router.get('/', requireAuth, empleadoOAdmin, reservasControlador.getReservas);

/**
 * @swagger
 * /api/reservas/{id}:
 *   get:
 *     tags: [Reservas]
 *     summary: Obtiene una reserva por ID (Empleado/Admin)
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Reserva encontrada
 *       404:
 *         description: No encontrada
 */
router.get('/:id', requireAuth, empleadoOAdmin, validateId, reservasControlador.getReservaById);

/**
 * @swagger
 * /api/reservas/{id}:
 *   put:
 *     tags: [Reservas]
 *     summary: Actualiza una reserva (Administrador)
 *     security: [ { bearerAuth: [] } ]
 */
router.put('/:id', requireAuth, soloAdmin, validateUpdate, reservasControlador.updateReserva);

/**
 * @swagger
 * /api/reservas/{id}:
 *   delete:
 *     tags: [Reservas]
 *     summary: Elimina lógicamente una reserva (Administrador)
 *     security: [ { bearerAuth: [] } ]
 */
router.delete('/:id', requireAuth, soloAdmin, validateId, reservasControlador.deleteReserva);

export default router;