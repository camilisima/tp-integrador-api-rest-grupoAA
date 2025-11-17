
import { Router } from 'express';
import * as estadisticasControlador from '../controladores/estadisticasControlador.js';
import { requireAuth, soloAdmin } from '../middlewares/auth.js';

const router = Router();

/**
 * @swagger
 * /api/estadisticas:
 *   get:
 *     summary: Obtener estadísticas mensuales de reservas
 *     tags: [Estadísticas]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de estadísticas

*/
router.get('/', requireAuth, soloAdmin, estadisticasControlador.getEstadisticas);
router.get('/por-salon', requireAuth, soloAdmin, estadisticasControlador.reservasPorSalon);
router.get('/por-dia', requireAuth, soloAdmin, estadisticasControlador.reservasPorDia);
router.get('/ocupacion', requireAuth, soloAdmin, estadisticasControlador.porcentajeOcupacion);


export default router;