const swaggerUi = require('swagger-ui-express');
const swaggerDocument  = require( './swagger.json');

module.exports = {
    run: (app) => {
        app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
    }
}
