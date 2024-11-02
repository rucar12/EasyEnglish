import swaggerJsdoc from 'swagger-jsdoc';

const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Easy English API Doc',
            version: '0.1.0',
            description: 'API documentation for EasyEnglish application',
        },
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        security: [{
            bearerAuth: []
        }]
    },
    apis: ['./src/routes/*.ts', './src/config/swagger/schemas/*.ts'],
};
export const swaggerDocs = swaggerJsdoc(swaggerOptions);