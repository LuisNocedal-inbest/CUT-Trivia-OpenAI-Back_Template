import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API CUT Chat',
      version: '1.0.0',
      description: 'Documentación de la API de CUT Chat',
    },
  },
  apis: ['./src/routes/*.ts'], // Ajusta la ruta si tus rutas están en otro lugar
};

const swaggerSpec = swaggerJSDoc(options);

export default swaggerSpec;