import express from 'express';
import { body, param, validationResult } from 'express-validator';
import * as usuariosControlador from '../controladores/usuarioscontrolador.js';
import { requireAuth, empleadoOAdmin, soloAdmin } from '../middlewares/auth.js';

const router = express.Router();

//validacion
const validar = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(422).json({ errors: errors.array() });
  }
  next();
};

//validacion
const validateId = [
  param('id')
    .isInt({ gt: 0 })
    .withMessage('ID inválido'),
  validar
];

const validateCreate = [
  body('nombre')
    .notEmpty().withMessage('El nombre es obligatorio')
    .isString().isLength({ max: 50 }),
  body('apellido')
    .notEmpty().withMessage('El apellido es obligatorio')
    .isString().isLength({ max: 50 }),
  body('nombre_usuario')
    .isEmail().withMessage('nombre_usuario debe ser un email válido'),
  body('contrasenia')
    .isString()
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('tipo_usuario')
    .isInt({ min: 1, max: 3 })
    .withMessage('tipo_usuario debe ser 1=admin, 2=empleado, 3=cliente'),
  body('celular')
    .optional()
    .isString()
    .isLength({ max: 20 }),
  body('foto')
    .optional()
    .isString()
    .isLength({ max: 255 }),
  validar
];

const validateUpdate = [
  body('nombre').optional().isString().isLength({ max: 50 }),
  body('apellido').optional().isString().isLength({ max: 50 }),
  body('nombre_usuario').optional().isEmail(),
  body('contrasenia')
    .optional()
    .isString()
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener al menos 6 caracteres'),
  body('tipo_usuario').optional().isInt({ min: 1, max: 3 }),
  body('celular').optional().isString().isLength({ max: 20 }),
  body('foto').optional().isString().isLength({ max: 255 }),
  validar
];



/**
 * @swagger
 * tags:
 *   - name: Usuarios
 *     description: Gestión de usuarios (Admin) + listado de clientes (Empleado/Admin)
 */

/**
 * @swagger
 * /usuarios:
 *   get:
 *     tags: [Usuarios]
 *     summary: Obtiene todos los usuarios (solo Admin)
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: Lista de usuarios
 */

/**
 * @swagger
 * /usuarios/clientes:
 *   get:
 *     tags: [Usuarios]
 *     summary: Lista de clientes (Admin o Empleado)
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200:
 *         description: Lista de clientes
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   get:
 *     tags: [Usuarios]
 *     summary: Obtiene un usuario por ID (solo Admin)
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario encontrado
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @swagger
 * /usuarios:
 *   post:
 *     tags: [Usuarios]
 *     summary: Crea un nuevo usuario (solo Admin)
 *     security: [ { bearerAuth: [] } ]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [nombre, apellido, nombre_usuario, contrasenia, tipo_usuario]
 *             properties:
 *               nombre:
 *                 type: string
 *               apellido:
 *                 type: string
 *               nombre_usuario:
 *                 type: string
 *               contrasenia:
 *                 type: string
 *               tipo_usuario:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Usuario creado
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   put:
 *     tags: [Usuarios]
 *     summary: Modifica un usuario existente (solo Admin)
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario actualizado
 *       404:
 *         description: Usuario no encontrado
 */

/**
 * @swagger
 * /usuarios/{id}:
 *   delete:
 *     tags: [Usuarios]
 *     summary: Baja lógica de un usuario (solo Admin)
 *     security: [ { bearerAuth: [] } ]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Usuario eliminado
 */

//endpoints

// obtener TODOS los usuarios – SOLO ADMIN
router.get('/', requireAuth, soloAdmin, usuariosControlador.getUsuarios);

// obtener lista de CLIENTES – ADMIN o EMPLEADO
router.get('/clientes', requireAuth, empleadoOAdmin, usuariosControlador.getClientes);

// obtener usuario por ID – SOLO ADMIN
router.get('/:id', requireAuth, soloAdmin, validateId, usuariosControlador.getUsuarioById);

// Crear usuario – SOLO ADMIN
router.post('/', requireAuth, soloAdmin, validateCreate, usuariosControlador.createUsuario);

// Modificar usuario – SOLO ADMIN
router.put('/:id', requireAuth, soloAdmin, validateId, validateUpdate, usuariosControlador.updateUsuario);

//Baja lógica usuario – SOLO ADMIN
router.delete('/:id', requireAuth, soloAdmin, validateId, usuariosControlador.deleteUsuario);

export default router;