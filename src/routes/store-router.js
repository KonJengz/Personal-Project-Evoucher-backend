const express = require('express')
const upload = require('../middlewares/upload')
const storeController = require('../controllers/store-controller')
const { addstoreValidator } = require('../middlewares/validator')
// const authenticate = require('../middlewares/authenticate')

const storeRouter = express.Router()

storeRouter.post('/addstore',upload.fields([ // single รูปเดียว, array ส่งมาหลายรูป แต่ key เดียวกัน, fields มีได้หลาย key มาด้วย
    { name: 'profileImage', maxCount: 1}
]), addstoreValidator, storeController.addStore)

// storeRouter.get('/getstore', storeController.getStore)
storeRouter.get('/storeId/:storeId', storeController.getStoreByStoreId)

storeRouter.get('/', storeController.getStoreByUserId)
storeRouter.patch('/editStore/:storeId', upload.fields([
    { name: 'profileImage', maxCount: 1}
]) ,storeController.editStore)

storeRouter.patch('/editStoreByid',storeController.editStoreById)

module.exports = storeRouter

