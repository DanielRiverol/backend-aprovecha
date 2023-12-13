const swaggerJSDoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Aprovecha Aquí',
      version: '1.0.0',
    },
  },
  apis: ['routes/*.js'], // Archivos que contienen comentarios Swagger
};

module.exports = swaggerJSDoc(options);
