/* eslint no-use-before-define:0 */
/* eslint no-restricted-globals:0 */

const debug = require('debug')('init:server')
const http = require('http')
const express = require('express')
const path = require('path')
const favicon = require('serve-favicon')
const logger = require('morgan')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')

require('dotenv').config()

const models = require('./app/models')
const routes = require('./routes/routes')

const app = express()

// const u = require('./app/helpers/UsersHelper')

// console.log(u.hashPassword('no-or-666-admin'))

const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

const server = http.createServer(app)

// sync() will create all table if they doesn't exist in database
models.sequelize.sync().then(() => {
  server.listen(port)
  server.on('error', onError)
  server.on('listening', onListening)
})

// view engine setup
app.set('views', path.join(__dirname, './app/views'))
app.set('view engine', 'ejs')

// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))
app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
// app.use('/static', express.static('dist'))
app.use(express.static('public'))

let session = require('express-session')
var MySQLStore = require('express-mysql-session')(session)

var options = {
  host: process.env.DB_HOST,
  port: 3306,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
}

var sessionStore = new MySQLStore(options)

app.use(session({
  key: 'session_cookie_name',
  secret: 'session_cookie_secret',
  store: sessionStore,
  resave: false,
  saveUninitialized: false
}))

app.use('/', routes)

// catch 404 and forward to error handler
app.use((req, res, next) => {
  const err = new Error('Invalid Route')
  err.status = 404
  next(err)
})

// error handler
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  // res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  const message = process.env.NODE_ENV === 'development' ? err.message : 'Requested Resource could not be loaded!'
  res.status(err.status || 500).json({ message })
})

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
  const p = parseInt(val, 10)

  if (isNaN(p)) {
    // named pipe
    return val
  }

  if (p >= 0) {
    // port number
    return p
  }

  return false
}

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = typeof port === 'string'
    ? `Pipe ${port}`
    : `Port ${port}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string'
    ? `pipe ${addr}`
    : `port ${addr.port}`
  debug(`Listening on ${bind}`)
  if (process.env.NODE_ENV === 'production') {
    console.log('Production')
  } else {
    console.log('Development')
  }
}

module.exports = app
