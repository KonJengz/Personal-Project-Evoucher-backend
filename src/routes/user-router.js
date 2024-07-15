const express = require('express')
const userController = require('../controllers/user-controller')
const { registerValidator, loginValidator, addstoreValidator } = require('../middlewares/validator')
const authenticate = require('../middlewares/authenticate')

const routerUser = express.Router()

routerUser.post('/register', registerValidator, userController.registerUser)
routerUser.post('/login', loginValidator, userController.loginUser)
routerUser.get('/me', authenticate, userController.getUser)

module.exports = routerUser