import express from 'express';
import { body, param } from 'express-validator';
import * as serviciosControlador from '../controladores/servicioscontrolador.js';
import { requireAuth, empleadoOAdmin } from '../middlewares/auth.js';

const router = express.Router();


router.get('/', serviciosControlador.getServicios);
router.get('/:id', param('id').isInt().toInt(), serviciosControlador.getServicioById);

router.post('/',
  requireAuth,
  empleadoOAdmin,
  [body('descripcion').notEmpty(), body('importe').isNumeric()],
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
