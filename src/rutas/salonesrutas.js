
import express from 'express';
import { body, param } from 'express-validator';
import apicache from 'apicache'
import * as salonescontrolador from '../controladores/salonescontrolador.js';
import {requireAuth, empleadoOAdmin, soloAdmin} from '../middlewares/auth.js';

const router = express.Router();
const cache = apicache.middleware;

/**
 * @swagger
 * tags:
 *   - name: Salones
 *     description: Endpoints para gestionar salones
 */

/**
 * @swagger
 * /api/salones:
 *   get:
 *     tags: [Salones]
 *     summary: Listar todos los salones activos (público, con cache)
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Salon'
 *
 *   post:
 *     tags: [Salones]
 *     summary: Crear un nuevo salón (empleado o admin)
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SalonCreate'
 *           example:
 *             titulo: "Salón Premium"
 *             direccion: "San Martín 123"
 *             latitud: -31.39273
 *             longitud: -58.01656
 *             capacidad: 120
 *             importe: 180000
 *     responses:
 *       201:
 *         description: Salón creado correctamente
 *       400:
 *         description: Error de validación
 */

/**
 * @swagger
 * /api/salones/{id}:
 *   get:
 *     tags: [Salones]
 *     summary: Obtener un salón por ID
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200: { description: OK }
 *       404: { description: No encontrado }
 *
 *   put:
 *     tags: [Salones]
 *     summary: Actualizar un salón existente (empleado o admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SalonCreate'
 *           example:
 *             titulo: "Salón Premium Actualizado"
 *             direccion: "9 de Julio 456"
 *             capacidad: 150
 *             importe: 210000
 *     responses:
 *       200: { description: Actualizado correctamente }
 *       404: { description: No encontrado }
 *
 *   delete:
 *     tags: [Salones]
 *     summary: Eliminar (baja lógica) un salón (solo admin)
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200: { description: Eliminado correctamente }
 *       404: { description: No encontrado }
 */

// Validaciones
const validateSalon = [
  body('titulo').notEmpty().withMessage('El título es obligatorio'),
  body('direccion').notEmpty().withMessage('La dirección es obligatoria'),
  body('importe').isFloat({ gt: 0 }).withMessage('El importe debe ser mayor que 0'),
];

router.get('/', cache('2 minutos'), salonescontrolador.getSalones);
router.get('/:id',cache('2 minutos'), param('id').isInt({ gt: 0 }), salonescontrolador.getSalonById);

router.post('/', requireAuth, empleadoOAdmin, validateSalon, salonescontrolador.createSalon); 
router.put('/:id', requireAuth, empleadoOAdmin, param('id').isInt({ gt: 0 }), salonescontrolador.updateSalon);

router.delete('/:id',requireAuth, soloAdmin, param('id').isInt({ gt: 0 }), salonescontrolador.deleteSalon);

export default router;

