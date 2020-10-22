// Init app
const express = require('express')
const app = express()

// Swagger UI
const YAML = require('yamljs')
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = YAML.load('./swagger.yaml')

// ENV
require('dotenv').config()

// Middlewares
app.use(express.json())

// Routes
app.use('/users', require('./routes/users'))
app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// MONGOOSE CONNECTION
const mongoose = require('mongoose').connect(process.env.DB_CONNECT, { useNewUrlParser: true,  useUnifiedTopology: true,  useFindAndModify: false, useCreateIndex: true}, () => {
    console.log("Mongo ühendus olemas")
})


app.listen(process.env.PORT, () => console.log(`Pank läks käima pordi ${process.env.PORT} peal`))