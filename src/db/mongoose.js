const mongoose = require('mongoose')
const path = require("path")
require("dotenv").config({ path: path.resolve(__dirname, '../../.env') })

const dbURL = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`

mongoose.connect(dbURL,{})
module.exports = mongoose