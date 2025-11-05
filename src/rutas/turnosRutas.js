import express from 'express';
import { body, param } from 'express-validator';
import * as turnoscontrolador from '../controladores/turnoscontrolador.js';
import { requireAuth, empleadoOAdmin, soloAdmin } from '../middlewares/auth.js';

const router = express.Router();

router.get('/', turnoscontrolador.getTurnos);
router.get('/:id', param('id').isInt().toInt(), turnoscontrolador.getTurnoById);
router.post('/', requireAuth, empleadoOAdmin, [
  body('hora_desde').notEmpty(),
  body('hora_hasta').notEmpty()
], turnoscontrolador.createTurno);
router.put('/:id', requireAuth, empleadoOAdmin, param('id').isInt().toInt(), turnoscontrolador.updateTurno);
router.delete('/:id', requireAuth, soloAdmin, param('id').isInt().toInt(), turnoscontrolador.deleteTurno);

export default router;
