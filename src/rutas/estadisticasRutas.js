import express from 'express';
import { requireAuth, soloAdmin } from '../middlewares/auth.js';
import { obtenerEstadisticas } from '../controladores/estadisticasControlador.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Estadísticas
 *     description: Reporte de estadísticas de reservas
 */

/**
 * @swagger
 * /api/estadisticas:
 *   get:
 *     tags: [Estadísticas]
 *     summary: Obtiene las estadísticas mensuales de reservas
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200: { description: OK }
 *       401: { description: No autorizado }
 */
router.get('/', requireAuth, soloAdmin, obtenerEstadisticas);

export default router;
