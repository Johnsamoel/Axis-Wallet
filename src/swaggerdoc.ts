import swaggerJsDoc from 'swagger-jsdoc';
let Port = process.env.PORT || 3000;

// Swagger definition
export const swaggerOptions = {
    swaggerDefinition: {
      openapi: '3.0.0', 
      info: {
        title: 'Axis Wallet', 
        version: '1.0.0', 
        description: 'API Documentation for Axis wallet application',
      },
      servers: [
        {
          url: `http://localhost:${Port}`, 
        },
      ],
    },
    apis: ['./src/routes/*.ts'], 
};

export const swaggerDocs = swaggerJsDoc(swaggerOptions);