const axios = require('axios')
const storeService = require("../services/store-service")
const voucherService = require("../services/voucher-service")
const createError = require('../utils/create-error')

const voucherController = {}

voucherController.createVoucher = async (req, res, next) => {

    try {
        const data = req.body
        console.log('data', data)

        const existVoucher = await voucherService.findVoucher(data.numberVoucher)

        console.log('existVoucher', existVoucher)
        if (existVoucher) {
            const resultupdate = await voucherService.updateStatusVoucher(data,existVoucher.id)
            res.status(201).json(resultupdate)
        } else {
            const result = await voucherService.createVoucher(data)
            res.status(201).json(result)
        }
        // console.log('conlroller',data)
        
    } catch (error) {
        next(error)
    }
}

voucherController.getVoucher = async (req,res,next) => {
    // console.log('============= req.params.storeId',!req.params.storeId)
    if (req.params.storeId === "undefined") {
        return res.status(200).json({message: "not voucher"})
    }
    const storeId = +req.params.storeId
    console.log('storeId', storeId)
    
    const result = await voucherService.getVoucher(storeId)

    res.status(201).json(result)
}

voucherController.updateVoucher = async (req,res,next) => {
    try {
        const data = req.body

        if (data.startDate && data.endDate) {
            data.startDate = new Date(data.startDate)
            data.endDate = new Date(data.endDate)
        }

        console.log('data', data)

        const result = await voucherService.updateVoucher(data)

        if (result) {
            result.endDate = result.endDate + "".split('T')[0]
            result.startDate = result.startDate + "".split('T')[0]
        }
        console.log('result', result)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

voucherController.getVoucherApiLine = async (req,res,next) => {
    try {
    if (req.params.storeId === undefined || req.params.storeId === "undefined") {
        createError({
            message: 'not storeId',
            statusCode: 400
        })
    }
    
    const storeId = +req.params.storeId
    console.log('storeId', typeof(req.params.storeId))
    console.log('storeId', req.params.storeId)
    const getStore = await storeService.getStoreUniqueById(storeId)
    console.log('getStore.ApiKey', getStore.ApiKey)
    
        if (getStore.ApiKey === '' || getStore.ApiKey === null) {
            createError({
                message: 'not Api Key',
                statusCode: 400
            })
        }
        const result = await axios.get('https://developers-oaplus.line.biz/myshop/v1/products',{
        headers: {"x-api-key": getStore.ApiKey,
            "User-Agent" : "Jeng",
            'Content-Type': 'application/json'
        }
    })
    res.status(200).json(result.data.data)
    } catch (error) {
        console.error('Error:', error);
        next(error)
    }

    // console.log('result id', getSotre.id)
    
    

}

module.exports = voucherController