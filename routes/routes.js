const express = require('express')
const router = express.Router()



const UserMiddleware = require('../app/middlewares/UserMiddleware')
const UserController = require('../app/controllers/UserController')

router.use('/student', UserMiddleware.verify)



router.get('/', UserController.loginUser)
router.post('/register', UserController.registerUser)
router.post('/login', UserController.loginPost)
router.post('/logout', UserController.userLogout)



module.exports = router