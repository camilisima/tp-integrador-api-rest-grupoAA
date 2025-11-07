import express from 'express';
import { body, param } from 'express-validator';
import apicache from 'apicache'
import * as serviciosControlador from '../controladores/servicioscontrolador.js';
import { requireAuth, empleadoOAdmin } from '../middlewares/auth.js';

const router = express.Router();
const cache = apicache.middleware;

/**
 * @swagger
 * tags:
 *   - name: Servicios
 *     description: Endpoints para gestionar servicios
 */

/**
 * @swagger
 * /api/servicios:
 *   get:
 *     tags: [Servicios]
 *     summary: Lista servicios activos (público, con cache)
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
 *                   servicio_id: { type: integer }
 *                   descripcion: { type: string }
 *                   importe: { type: number }
 *                   activo: { type: integer }
 */

/**
 * @swagger
 * /api/servicios/{id}:
 *   get:
 *     tags: [Servicios]
 *     summary: Obtiene un servicio por ID (público)
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
 * /api/servicios:
 *   post:
 *     tags: [Servicios]
 *     summary: Crea un servicio (empleado o admin)
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             descripcion: "Maquillaje infantil"
 *             importe: 25000
 *     responses:
 *       201: { description: Creado }
 *       400: { description: Error de validación }
 *       401: { description: No autorizado }
 */

/**
 * @swagger
 * /api/servicios/{id}:
 *   put:
 *     tags: [Servicios]
 *     summary: Actualiza un servicio (empleado o admin)
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
 *             descripcion: "Maquillaje infantil PRO"
 *             importe: 30000
 *     responses:
 *       200: { description: Actualizado }
 *       404: { description: No encontrado }
 */

/**
 * @swagger
 * /api/servicios/{id}:
 *   delete:
 *     tags: [Servicios]
 *     summary: Baja lógica de un servicio (solo admin)
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: Eliminado }
 *       404: { description: No encontrado }
 */


router.get('/',cache('2 minutos'), serviciosControlador.getServicios);
router.get('/:id',cache('2 minutos'), param('id').isInt().toInt(), serviciosControlador.getServicioById);

router.post('/', requireAuth, empleadoOAdmin, [body('descripcion').notEmpty(), body('importe').isNumeric()],
  serviciosControlador.createServicio
);

router.put('/:id',
  requireAuth,
  empleadoOAdmin,
  [param('id').isInt().toInt(), body('descripcion').notEmpty(), body('importe').isNumeric()],
  serviciosControlador.updateServicio
);

router.delete('/:id',
  requireAuth,
  empleadoOAdmin,
  param('id').isInt().toInt(),
  serviciosControlador.deleteServicio
);

export default router;
