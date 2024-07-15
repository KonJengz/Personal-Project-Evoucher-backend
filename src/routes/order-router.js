const express = require('express')
const orderController = require('../controllers/order-controller')

const orderRouter = express.Router()

orderRouter.post('/create', orderController.createorderAndSendEmail)
orderRouter.get('/getvoucher/:storeId', orderController.getVoucherByStoreId)
orderRouter.get('/getallorder/:numberVoucher', orderController.getOrderByStoreId)
orderRouter.get('/dataOrder/:orderId', orderController.getDataOrderById)
orderRouter.patch('/updateStatusOrder', orderController.updateStatusVoucher)

module.exports = orderRouter