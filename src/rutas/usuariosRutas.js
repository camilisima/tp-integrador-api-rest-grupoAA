import express from 'express';
import { body, param } from 'express-validator';
import * as usuariosControlador from '../controladores/usuarioscontrolador.js';
import { requireAuth, empleadoOAdmin, soloAdmin } from '../middlewares/auth.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Usuarios
 *     description: Gestión de usuarios (solo Admin)- Listado de clientes-Empleado/Admin.
 */

/**
 * @swagger
 * /api/usuarios:
 *   get:
 *     tags: [Usuarios]
 *     summary: Lista todos los usuarios (Solo Admin)
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: OK
 *       401:
 *         description: No autorizado
 */
router.get('/', requireAuth, soloAdmin, usuariosControlador.getUsuarios);

/**
 * @swagger
 * /api/usuarios/clientes:
 *   get:
 *     tags: [Usuarios]
 *     summary: Lista de clientes (Empleado o Admin)
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200: { description: OK }
 *       401: { description: No autorizado }
 */
router.get('/clientes', requireAuth, empleadoOAdmin, usuariosControlador.getClientes);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   get:
 *     tags: [Usuarios]
 *     summary: Obtiene un usuario por ID (Solo Admin)
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 *     responses:
 *       200: { description: OK }
 *       404: { description: No encontrado }
 */
router.get('/:id',
  requireAuth,
  soloAdmin,
  param('id').isInt({ gt: 0 }),
  usuariosControlador.getUsuarioById
);

/**
 * @swagger
 * /api/usuarios:
 *   post:
 *     tags: [Usuarios]
 *     summary: Crea un usuario (Solo Admin)
 *     description: La contraseña se guarda con bcrypt en el servidor.
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             nombre: "Ana"
 *             apellido: "Pérez"
 *             nombre_usuario: "ana.perez@correo.com"
 *             contrasenia: "123456"
 *             tipo_usuario: 2
 *             celular: "345-555-0000"
 *             foto: "uploads/ana.jpg"
 *     responses:
 *       201: { description: Creado }
 *       400: { description: Error de validación }
 *       401: { description: No autorizado }
 */
const validateCreate = [
  body('nombre').optional().isString().isLength({ max: 50 }),
  body('apellido').optional().isString().isLength({ max: 50 }),
  body('nombre_usuario').isEmail().withMessage('nombre_usuario debe ser email'),
  body('contrasenia').isString().isLength({ min: 6 }).withMessage('contrasenia >= 6'),
  body('tipo_usuario').isInt({ min: 1, max: 3 }).withMessage('tipo_usuario 1=admin,2=empleado,3=cliente'),
  body('celular').optional().isString().isLength({ max: 20 }),
  body('foto').optional().isString().isLength({ max: 255 }),
];
router.post('/', requireAuth, soloAdmin, validateCreate, usuariosControlador.createUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   put:
 *     tags: [Usuarios]
 *     summary: Actualiza un usuario (Solo Admin)
 *     description: Si se envía "contrasenia", el servidor la rehashea con bcrypt.
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
 *             nombre: "Ana María"
 *             apellido: "Pérez"
 *             nombre_usuario: "ana.perez@correo.com"
 *             contrasenia: "nueva123"
 *             tipo_usuario: 2
 *             celular: "345-555-9999"
 *             foto: "uploads/ana_new.jpg"
 *     responses:
 *       200: { description: Actualizado }
 *       404: { description: No encontrado }
 */
const validateUpdate = [
  param('id').isInt({ gt: 0 }),
  body('nombre').optional().isString().isLength({ max: 50 }),
  body('apellido').optional().isString().isLength({ max: 50 }),
  body('nombre_usuario').optional().isEmail(),
  body('contrasenia').optional().isString().isLength({ min: 6 }),
  body('tipo_usuario').optional().isInt({ min: 1, max: 3 }),
  body('celular').optional().isString().isLength({ max: 20 }),
  body('foto').optional().isString().isLength({ max: 255 }),
];
router.put('/:id', requireAuth, soloAdmin, validateUpdate, usuariosControlador.updateUsuario);

/**
 * @swagger
 * /api/usuarios/{id}:
 *   delete:
 *     tags: [Usuarios]
 *     summary: Baja lógica de un usuario (Solo Admin)
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
router.delete('/:id',
  requireAuth,
  soloAdmin,
  param('id').isInt({ gt: 0 }),
  usuariosControlador.deleteUsuario
);

export default router;