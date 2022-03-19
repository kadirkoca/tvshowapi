require("./db/mongoose")
const express = require("express")
const http = require("http")
const cors = require("cors")
const bodyParser = require("body-parser")
//ROUTES
const authroutes = require("./routes/auth-routes")
const superroutes = require("./routes/super-routes")

// SWAGGER

const swaggerUi = require('swagger-ui-express')
const swagger_output = require('../swagger_output.js')

const app = express()
const server = http.createServer(app)

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.use(cors())
app.use("/api/auth", authroutes)
app.use("/api/super", superroutes)
app.use('/', swaggerUi.serve, swaggerUi.setup(swagger_output))


const port = process.env.PORT
server.listen(port, () => console.log(`Example app listening on port >> ${port}!`))
