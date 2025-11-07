import express from 'express';
import { requireAuth, soloAdmin } from '../middlewares/auth.js';
import { generarReportePDF, generarReporteCSV } from '../controladores/reportesControlador.js';

const router = express.Router();

/**
 * @swagger
 * tags:
 *   - name: Reportes
 *     description: Generación de reportes de reservas
 */

/**
 * @swagger
 * /api/reportes/pdf:
 *   get:
 *     tags: [Reportes]
 *     summary: Genera un archivo PDF con las reservas
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200: { description: OK }
 *       401: { description: No autorizado }
 */
router.get('/pdf', requireAuth, soloAdmin, generarReportePDF);

/**
 * @swagger
 * /api/reportes/csv:
 *   get:
 *     tags: [Reportes]
 *     summary: Genera un archivo CSV con las reservas
 *     security: [ { bearerAuth: [] } ]
 *     responses:
 *       200: { description: OK }
 *       401: { description: No autorizado }
 */
router.get('/csv', requireAuth, soloAdmin, generarReporteCSV);

export default router;
