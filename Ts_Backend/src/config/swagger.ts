import swaggerJSDoc from 'swagger-jsdoc';

export const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Rider With Stranger API',
      version: '1.0.0',
      description: 'Bike pooling backend with bargaining pricing'
    },
    servers: [
      {
        url: 'http://localhost:5000',
      },
    ],
  },
  apis: ['src/modules/**/*.ts'], // 🔴 VERY IMPORTANT
});
