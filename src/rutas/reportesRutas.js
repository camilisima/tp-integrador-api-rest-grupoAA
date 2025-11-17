import { Router } from 'express';
import {
  generarReportePDF,
  generarReporteCSV
} from '../controladores/reportesControlador.js';

import { requireAuth, soloAdmin } from '../middlewares/auth.js';

const router = Router();

/**
 * @swagger
 * /api/reportes/pdf:
 *   get:
 *     tags: [Reportes]
 *     summary: Genera un archivo PDF con las reservas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: PDF generado correctamente
 */
router.get('/pdf', requireAuth, soloAdmin, generarReportePDF);

/**
 * @swagger
 * /api/reportes/csv:
 *   get:
 *     tags: [Reportes]
 *     summary: Genera un archivo CSV con las reservas
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: CSV generado correctamente
 */
router.get('/csv', requireAuth, soloAdmin, generarReporteCSV);

export default router;