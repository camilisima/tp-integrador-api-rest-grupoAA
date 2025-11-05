import express from 'express';
import { body, param } from 'express-validator';
import * as reservasControlador from '../controladores/reservascontrolador.js';
import { requireAuth, soloAdmin } from '../middlewares/auth.js';

const router = express.Router();
const validarCreate = [
  body('fecha_reserva').isISO8601().withMessage('fecha_reserva inválida'),
  body('salon_id').isInt().toInt(),
  body('usuario_id').isInt().toInt(),
  body('turno_id').isInt().toInt(),
];


router.get('/', requireAuth, reservasControlador.getReservas);
router.get('/:id', requireAuth, param('id').isInt().toInt(), reservasControlador.getReservaById);
router.post('/', requireAuth, validarCreate, reservasControlador.createReserva);
router.put('/:id', requireAuth, soloAdmin, param('id').isInt().toInt(), reservasControlador.updateReserva);
router.delete('/:id', requireAuth, soloAdmin, param('id').isInt().toInt(), reservasControlador.deleteReserva);

export default router;
