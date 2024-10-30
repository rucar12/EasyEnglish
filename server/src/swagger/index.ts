import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Easy English API Doc',
            version: '0.1.0',
            description: 'API documentation for EasyEnglish application',
        },
    },
    apis: ['./src/routes/*.ts', './src/swagger/schemas/*.ts'],
};
export const swaggerDocs = swaggerJsdoc(swaggerOptions);