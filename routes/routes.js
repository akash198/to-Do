const express = require('express')
const router = express.Router()



const UserMiddleware = require('../app/middlewares/UserMiddleware')
const UserController = require('../app/controllers/UserController')
const SessionController = require('../app/controllers/SessionController')

router.use('/student', UserMiddleware.verify)



router.get('/', SessionController.loginUser)
router.get('/user', SessionController.userInterface)
router.post('/login', SessionController.loginPost)
router.post('/register', UserController.registerUser)
router.post('/logout', SessionController.userLogout)
router.post('/add', UserController.addTodo)
router.get('/delete/:id', UserController.deleteItem)

router.get('*' , UserController.notFound)

module.exports = router