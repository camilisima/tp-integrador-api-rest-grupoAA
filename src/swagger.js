export const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Reservas',
      version: '1.0.0',
      description: 'Documentación de la API REST para reservas de salones y servicios',
    },
    servers: [
      { url: 'http://localhost:3000/api' }
    ],
  },
  apis: ['./src/rutas/*.js'], // 👈 rutas donde están los @swagger
};