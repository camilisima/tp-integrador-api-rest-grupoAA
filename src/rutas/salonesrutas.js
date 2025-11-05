import express from 'express';
import { body } from 'express-validator';
import { body, param, validationResult } from 'express-validator';
import * as salonescontrolador from '../controladores/salonescontrolador.js';
import { requireAuth, empleadoOAdmin, soloAdmin } from '../middlewares/auth.js';

const router = express.Router();


const validateSalon = [
  body('titulo').notEmpty().withMessage('El título es obligatorio'),
  body('direccion').notEmpty().withMessage('La dirección es obligatoria'),
  body('importe').isFloat({ gt: 0 }).withMessage('El importe debe ser mayor que 0'),
];
const validar = (req, res, next) => {
    const e = validationResult(req);
    if (!e.isEmpty()) return res.status(400).json({ errors: e.array() });
    next();
};

router.get('/', salonescontrolador.getSalones);            
router.get('/:id', salonescontrolador.getSalonById);    
router.post('/', validateSalon, salonescontrolador.createSalon);  
router.put('/:id', salonescontrolador.updateSalon);        
router.delete('/:id', salonescontrolador.deleteSalon);     
// GET
router.get('/', salonescontrolador.getSalones);
router.get('/:id', param('id').isInt().toInt(), validar, salonescontrolador.getSalonById);

// POST
router.post('/',
    requireAuth, empleadoOAdmin,
    [
        param('id').isInt().toInt(),
        body('titulo').notEmpty(),
        body('direccion').notEmpty(),
        body('latitud').isFloat().toFloat(),
        body('longitud').isFloat().toFloat(),
        body('capacidad').isInt().toInt(),
        body('importe').isNumeric()
    ],
    validar,
    salonescontrolador.createSalon
);

// PUT
router.put('/:id',
    requireAuth, empleadoOAdmin,
    [
        param('id').isInt().toInt(),
        body('titulo').optional().notEmpty(),
        body('direccion').optional().notEmpty(),
        body('latitud').optional({ nullable: true }).isFloat().toFloat(),
        body('longitud').optional({ nullable: true }).isFloat().toFloat(),
        body('capacidad').optional().isInt().toInt(),
        body('importe').optional().isNumeric()
    ],
    validar,
    salonescontrolador.updateSalon
);

// SOFT DELETE
router.delete('/:id',
    requireAuth, soloAdmin,
    param('id').isInt().toInt(), validar,
    salonescontrolador.deleteSalon
);

export default router;
