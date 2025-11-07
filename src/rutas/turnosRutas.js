import express from 'express';
import { body, param } from 'express-validator';
import apicache from 'apicache'
import * as turnoscontrolador from '../controladores/turnoscontrolador.js';
import { requireAuth, empleadoOAdmin, soloAdmin } from '../middlewares/auth.js';

const router = express.Router();
const cache = apicache.middleware;

/**
 * @swagger
 * tags:
 *   - name: Turnos
 *     description: Endpoints para gestionar turnos
 */

/**
 * @swagger
 * /api/turnos:
 *   get:
 *     tags: [Turnos]
 *     summary: Lista todos los turnos activos (público, con cache)
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   turno_id: { type: integer }
 *                   descripcion: { type: string }
 *                   hora_inicio: { type: string }
 *                   hora_fin: { type: string }
 *                   activo: { type: integer }
 */

/**
 * @swagger
 * /api/turnos/{id}:
 *   get:
 *     tags: [Turnos]
 *     summary: Obtiene un turno por ID (público)
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 *       404: { description: No encontrado }
 */

/**
 * @swagger
 * /api/turnos:
 *   post:
 *     tags: [Turnos]
 *     summary: Crea un nuevo turno (empleado o admin)
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             descripcion: "Turno tarde"
 *             hora_inicio: "14:00:00"
 *             hora_fin: "19:00:00"
 *     responses:
 *       201: { description: Creado correctamente }
 *       400: { description: Error de validación }
 *       401: { description: No autorizado }
 */

/**
 * @swagger
 * /api/turnos/{id}:
 *   put:
 *     tags: [Turnos]
 *     summary: Actualiza un turno existente (empleado o admin)
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             descripcion: "Turno vespertino"
 *             hora_inicio: "15:00:00"
 *             hora_fin: "20:00:00"
 *     responses:
 *       200: { description: Actualizado correctamente }
 *       404: { description: No encontrado }
 */

/**
 * @swagger
 * /api/turnos/{id}:
 *   delete:
 *     tags: [Turnos]
 *     summary: Baja lógica de un turno (solo admin)
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Eliminado correctamente }
 *       404: { description: No encontrado }
 */

router.get('/',cache('2 minutos'), turnoscontrolador.getTurnos);
router.get('/:id',cache('2 minutos'), param('id').isInt().toInt(), turnoscontrolador.getTurnoById);
router.post('/', requireAuth, empleadoOAdmin, [
  body('hora_desde').notEmpty(),
  body('hora_hasta').notEmpty()
], turnoscontrolador.createTurno);
router.put('/:id', requireAuth, empleadoOAdmin, param('id').isInt().toInt(), turnoscontrolador.updateTurno);
router.delete('/:id', requireAuth, soloAdmin, param('id').isInt().toInt(), turnoscontrolador.deleteTurno);

export default router;
