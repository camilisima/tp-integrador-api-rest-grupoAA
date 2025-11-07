import jwt from 'jsonwebtoken';

export const requireAuth = (req, res, next) => {
  const header = req.headers.authorization || '';
  const [scheme, token] = header.split(' ');
  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Token requerido' });
  }
  try {
    console.log('🔍 Token recibido:', token);
    console.log('🔑 Clave usada:', process.env.JWT_SECRET);
    console.log('Token recibido:', token);
    console.log('Clave usada:', process.env.JWT_SECRET);
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = payload;
    next();
  } catch (e) {
    return res.status(401).json({ message: 'Token inválido' });
  }
};

export const soloAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'No autenticado' });
  if (Number(req.user.tipo_usuario) !== 1) {
    return res.status(403).json({ message: 'Solo admin' });
  }
  next();
};

export const empleadoOAdmin = (req, res, next) => {
  if (!req.user) return res.status(401).json({ message: 'No autenticado' });
  const tipo = Number(req.user.tipo_usuario);
  if (tipo !== 1 && tipo !== 2) {
    return res.status(403).json({ message: 'Solo empleados o admin' });
  }
  next();
};
