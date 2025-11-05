import express from 'express';
import { body, param, validationResult } from 'express-validator';
import * as usuariosctrl from '../controladores/usuarioscontrolador.js';
import { requireAuth, soloAdmin, empleadoOAdmin } from '../middlewares/auth.js';

const router = express.Router();
const validar = (req, res, next) => {
  const e = validationResult(req);
  if (!e.isEmpty()) return res.status(400).json({ errors: e.array() });
  next();
};

router.get('/clientes', requireAuth, empleadoOAdmin, usuariosctrl.getClientes);
router.get('/',        requireAuth, soloAdmin, usuariosctrl.getUsuarios);
router.get('/:id',     requireAuth, soloAdmin, param('id').isInt().toInt(), validar, usuariosctrl.getUsuarioById);

router.post('/',
  requireAuth, soloAdmin,
  [
    body('nombre_usuario').notEmpty(),
    body('contrasenia').isLength({ min: 6 }),
    body('tipo_usuario').isInt().toInt()
  ],
  validar,
  usuariosctrl.createUsuario
);

router.put('/:id',
  requireAuth, soloAdmin,
  [
    param('id').isInt().toInt(),
    body('nombre').optional().notEmpty(),
    body('apellido').optional().notEmpty(),
    body('nombre_usuario').notEmpty(),
    body('tipo_usuario').isInt().toInt(),
    body('celular').optional().notEmpty(),
    body('foto').optional().notEmpty()
  ],
  validar,
  usuariosctrl.updateUsuario
);

router.delete('/:id',
  requireAuth,
  soloAdmin,
  param('id').isInt().toInt(),
  validar,
  usuariosctrl.deleteUsuario
);

export default router;
