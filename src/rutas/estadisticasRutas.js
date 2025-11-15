import { Router } from 'express';
import { getEstadisticas } from '../controladores/estadisticasControlador.js';
import { requireAuth, soloAdmin } from '../middlewares/auth.js';

const router = Router();

/**
 * @swagger
 * /estadisticas:
 *   get:
 *     summary: Obtener estadísticas mensuales de reservas
 *     tags: [Estadísticas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de estadísticas
 */
router.get('/', requireAuth, soloAdmin, getEstadisticas);
router.get('/por-salon', requireAuth, soloAdmin, estadisticasCtrl.reservasPorSalon);
router.get('/por-dia', requireAuth, soloAdmin, estadisticasCtrl.reservasPorDia);
router.get('/ocupacion', requireAuth, soloAdmin, estadisticasCtrl.porcentajeOcupacion);

export default router;