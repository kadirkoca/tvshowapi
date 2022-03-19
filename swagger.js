const swaggerAutogen = require('swagger-autogen')()

const outputFile = './swagger_output.json'
const endpointsFiles = ['./src/routes/auth-routes.js', './src/routes/super-routes.js']

swaggerAutogen(outputFile, endpointsFiles).then(() => {
    require('./src/index.js')
})