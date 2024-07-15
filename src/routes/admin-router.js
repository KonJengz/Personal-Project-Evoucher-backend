const express = require('express')
const adminController = require('../controllers/admin-controller')
const authenticateAdmin = require('../middlewares/authenticateAdmin')

const routerAdmin = express.Router()

routerAdmin.post('/register', adminController.createAdmin)
routerAdmin.post('/login', adminController.loginAdmin)
routerAdmin.get('/me',authenticateAdmin, adminController.getAdmin)

routerAdmin.get('/getusers',authenticateAdmin, adminController.getAlluser)
routerAdmin.patch('/updateStatus',authenticateAdmin, adminController.updateStatus)
routerAdmin.get('/getuAllstore',authenticateAdmin, adminController.getAllstore)

module.exports = routerAdmin