import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import salonesRutas from './rutas/salonesrutas.js'; 


dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());


app.get('/api/ping', (req, res) => {
  res.json({ ok: true, message: 'pong 🏓' });
});


app.use('/api/salones', salonesRutas);


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Servidor corriendo en http://localhost:${PORT}`);
});

