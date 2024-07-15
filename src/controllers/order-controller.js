const orderService = require("../services/order-service")
const QRCode = require('qrcode')
const uploadService = require("../services/upload-service")
const voucherService = require("../services/voucher-service")
const createError = require("../utils/create-error")
const fs = require('fs/promises')

const orderController = {}

orderController.createorderAndSendEmail = async ( req, res, next ) =>{
    try {
        const dataOrderLine = req.body
        const data = {
            voucherId: +dataOrderLine.voucherId,
            nameEnduser: dataOrderLine.nameEnduser,
            emailEnduser: dataOrderLine.emailEnduser,
            idLineUser: dataOrderLine.idLineUser,
            orderNumber: dataOrderLine.orderNumber + ""
        }

        console.log('dataOrderLine', dataOrderLine)

        const createOrder = await orderService.createOrder(data)
        console.log('createOrder', createOrder)

        const [existUser] = await voucherService.findUser(data.voucherId)
        console.log('existUser========', existUser.store.user.statusSendEmail)

        if (!existUser.store.user.statusSendEmail) {
            createError({
                message: 'status not send email',
                statusCode: 400
            })
        }

        // เพิ่มจำนวนส่ง email
        const getcountSendEmailCurrent = await voucherService.getcountSendEmailCurrent(createOrder.voucherId)
        getcountSendEmailCurrent.countSendVoucher = getcountSendEmailCurrent.countSendVoucher + 1
        await voucherService.updateCountSendEmail(createOrder.voucherId,getcountSendEmailCurrent.countSendVoucher)

        //สร้าง qr code
        const url = `http://localhost:5173/voucher/${createOrder.id}`; // เอาค่า URL จาก query parameter ที่ชื่อว่า url
        if (!url) {
            return res.status(400).json({ message: 'Missing URL parameter' });
        }
        const filename = new Date().getTime() + '' + Math.round(Math.random()* 1000)
        const path = `public/qrcode/${filename}.png`
 
        const qrCode = await QRCode.toFile(path, url);

        const pathUrl = await uploadService.upload(path)
        await fs.unlink(path) //ลบรูปภาพ

        const dataVoucherSendEmail = {
            nameVoucher: existUser.nameVoucher,
            numberVoucher: existUser.numberVoucher,
            detailVoucher: existUser.detailVoucher,
            startDate: existUser.startDate,
            endDate: existUser.endDate,
            imageVoucher: existUser.imageVoucher,
            qrCode: pathUrl
        }
        
        //ส่ง email
        await orderService.sendEmail(createOrder, dataVoucherSendEmail)

        res.status(201).json(existUser)
    } catch (error) {
        next(error)
    }
}

orderController.getVoucherByStoreId = async ( req, res, next ) => {
    try {
        const storeId = +req.params.storeId
        // console.log('req.storeId', storeId)
        const result = await orderService.getVoucherByStoreId(storeId)
        res.status(200).json(result)
        
    } catch (error) {
        next(error)
    }
}

orderController.getOrderByStoreId = async ( req, res, next ) => {
    try {
        const numberVoucher = +req.params.numberVoucher
        console.log('req.numberVoucher', numberVoucher)
        const result = await orderService.getorderByStoreId(numberVoucher)
        res.status(200).json(result)
        
    } catch (error) {
        next(error)
    }
}

orderController.getDataOrderById = async ( req, res, next ) => {
    try {
        const orderId = +req.params.orderId
        // console.log('req.orderId orderId', orderId)
        const result = await orderService.getDataOrderById(orderId)
        // console.log('result getDataOrderById', result)
        res.status(200).json(result)
        
    } catch (error) {
        next(error)
    }
}

orderController.updateStatusVoucher = async (req, res, next) => {
    try {
        const orderId = req.body.voucherId
        // console.log('orderId-------', orderId)
        await orderService.updateStatusVoucher(orderId)
        res.status(200).json({message: "update success"})
    } catch (error) {
        next(error)
    }
}


module.exports = orderController