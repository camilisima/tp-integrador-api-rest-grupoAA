import express from 'express';
import { body } from 'express-validator';
import * as salonescontrolador from '../controladores/salonescontrolador.js';

const router = express.Router();


const validateSalon = [
  body('titulo').notEmpty().withMessage('El título es obligatorio'),
  body('direccion').notEmpty().withMessage('La dirección es obligatoria'),
  body('importe').isFloat({ gt: 0 }).withMessage('El importe debe ser mayor que 0'),
];

router.get('/', salonescontrolador.getSalones);            
router.get('/:id', salonescontrolador.getSalonById);    
router.post('/', validateSalon, salonescontrolador.createSalon);  
router.put('/:id', salonescontrolador.updateSalon);        
router.delete('/:id', salonescontrolador.deleteSalon);     

export default router;
