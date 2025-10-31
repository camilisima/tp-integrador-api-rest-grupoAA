import pool from '../datos/basededatos.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { nombre_usuario, contrasenia } = req.body;

  try {
    const [rows] = await pool.query(
      'SELECT * FROM usuarios WHERE nombre_usuario = ? AND activo = 1',
      [nombre_usuario]
    );

    if (rows.length === 0) return res.status(401).json({ msg: 'Usuario no encontrado' });

    const usuario = rows[0];

    const validPassword = bcrypt.compareSync(contrasenia, usuario.contrasenia);
    if (!validPassword) return res.status(401).json({ msg: 'Contraseña incorrecta' });

    const token = jwt.sign(
      { usuario_id: usuario.usuario_id, tipo_usuario: usuario.tipo_usuario },
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
