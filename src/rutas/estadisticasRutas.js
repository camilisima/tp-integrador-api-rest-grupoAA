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

export default router;