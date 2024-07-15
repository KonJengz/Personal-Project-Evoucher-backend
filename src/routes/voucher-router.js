const express = require('express')
const voucherController = require('../controllers/voucher-controller')

const voucherRouter = express.Router()

voucherRouter.post('/create', voucherController.createVoucher)
voucherRouter.get('/:storeId', voucherController.getVoucher)
voucherRouter.patch('/update', voucherController.updateVoucher)

voucherRouter.get('/line/:storeId', voucherController.getVoucherApiLine)

module.exports = voucherRouter