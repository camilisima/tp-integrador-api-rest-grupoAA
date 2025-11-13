export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API Reservas de Salones',
      version: '1.0.0',
      description: 'API REST para gestión de reservas de salones, servicios, turnos y usuarios',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },

  apis: ['./src/rutas/*.js'],
};