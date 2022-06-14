const swaggerAutogen = require('swagger-autogen')({openapi: '3.0.0'})

const doc = {
    info: {
        title: 'Hotels API',
        description: 'Hotel booking service',
    },
    schemes: ['http'],
}

const outputFile = `${__dirname}/../run/swagger.json`
const indexFile = `${__dirname}/routes/v1/index.ts`

swaggerAutogen(outputFile, [indexFile], doc)
