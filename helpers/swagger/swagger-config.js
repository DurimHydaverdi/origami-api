const swaggerJSDoc = require('swagger-jsdoc');
// const YAML = require('yamljs');

const swaggerOptions = {
    apis: ['./routes/*.js'],
    swaggerDefinition: {
        info: {
            title: 'API',
            description: 'API for admin dashboard.',
            contact: {
                name: 'API support',
                email: 'durimhydaverdi@gmail.com'
            },
            license: {
                name: "",
                url: "http://durimhydaverdi.co"
            },
            version: "1.0.0",
            servers: ["http://localhost:4000"]
        },
        schemes: ["http","https"],
        securityDefinitions: {
            bearerAuth: {
                type: "apiKey",
                name: "Authorization",
                in: "header"
            }
        }

    }
};

const swaggerDocs = swaggerJSDoc(swaggerOptions);
// const swaggerDocs = YAML.load('./routes/swaggerdoc.yaml');

module.exports = swaggerDocs;