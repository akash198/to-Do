

const debug = require('debug')('init:server')
const http = require('http')
const express = require('express')
const favicon = require('serve-favicon')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')


require('dotenv').config()

const models = require('./app/models')
const routes = require('./routes/routes')

const app = express()
const port = process.env.PORT 
app.set('port' , port)

const server = http.createServer(app)



app.set('views', path.join(__dirname, './app/views'))
app.set('view engine', 'ejs')

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())




  
module.exports = app;