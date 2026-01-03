const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Rider With Stranger API',
      version: '1.0.0',
      description: 'Bike pooling with bargaining pricing'
    },
    servers: [
      { url: 'http://localhost:5000' }
    ]
  },
  apis: ['./src/modules/**/*.js']
};

module.exports = swaggerJsdoc(options);
