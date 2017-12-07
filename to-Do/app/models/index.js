const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

require('dotenv').config()

const env = process.env.NODE_ENV || 'development'

const config = require(path.join(__dirname, '../../', 'config', 'config.js'))[env]
