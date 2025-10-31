import { Router } from 'express';
import { login } from '../controladores/authControlador.js';

const router = Router();

router.post('/login', login);

export default router;
