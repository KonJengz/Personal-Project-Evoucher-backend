const storeService = require("../services/store-service")
const uploadService = require("../services/upload-service")
const createError = require("../utils/create-error")
const fs = require('fs/promises')

const storeController = {}

storeController.addStore = async ( req, res, next ) => {
    try {
        const data = req.body
        // console.log(data)
        const existUser = await storeService.findStore(data)

        if (existUser) {
            createError({
                message: 'store already in use',
                statusCode: 400
            })
        }

        const promises = [] // เพิ่มรูป

        if (req.files.profileImage) {
            const result = uploadService
                .upload(req.files.profileImage[0].path)
                .then((url) => ({url, key: 'profileImage'})) // เพิ่มเข้าไปเลย
            promises.push(result)
        }

        const reesultAll = await Promise.all(promises)
        const dataImage = reesultAll.reduce((acc, el) => {
            acc[el.key] = el.url
            return acc
        }, {})

        // console.log(dataImage)
    //    console.log('req.files', req.files)

        data.profileImage = dataImage.profileImage
        data.userId = req.user.id
        
        await storeService.addStore(data)
        res.status(201).json({ message: 'store created'})

    } catch (err) {
        next(err)
    } finally {
        await fs.unlink(req.files.profileImage[0].path)
    }
}

// storeController.getStore = async (req, res, next) => {
//     try {
//         const id = req.user.id
//         // const storeId = +req.params.storeId
        
//         const existUser = await storeService.findStoreById(id)

//         if (!existUser) {
//             createError({
//                 message: 'invalid credentials',
//                 statusCode: 400
//             })
//         }
        
//         res.status(200).json({store: existUser})

//     } catch (err) {
//         next(err)
//     }
// }

storeController.getStoreByUserId = async (req, res, next) => {
    try {
        const userId = req.user.id

            const existStordList = await storeService.findStoreByUserId(userId)
            res.status(200).json({store: existStordList})
        
    } catch (err) {
        next(err)
    }
}

storeController.editStore = async (req, res, next) => {
    try {
        const storeId = +req.params.storeId
        const data = req.body
        const userId = req.user.id

        const promises = []

        if (req.files.profileImage !== undefined) {
            const result = uploadService
                .upload(req.files.profileImage[0].path)
                .then((url) => ({url, key: 'profileImage'})) // เพิ่มเข้าไปเลย
            promises.push(result)
        }
        const reesultAll = await Promise.all(promises)
        const dataImage = reesultAll.reduce((acc, el) => {
            acc[el.key] = el.url
            return acc
        }, {})

        data.profileImage = dataImage.profileImage
        data.profileImage ==='null' && delete data.profileImage

        data.userId = userId

        console.log('data', data)

        const updateStore = await storeService.updateStoreById(userId, storeId, data)
        console.log('result', updateStore)
        res.status(200).json(updateStore)
    } catch (err) {
        next(err)
    } finally {
        if (req.files.profileImage !== undefined) {
            await fs.unlink(req.files.profileImage[0].path)
        }
    }
}

storeController.editStoreById = async (req, res, next) => {
    try {
        const data = req.body
        console.log('data', data)
        const result = await storeService.editStoreById(data)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

storeController.getStoreByStoreId = async (req, res, next) => {
    try {
        const storeId = +req.params.storeId
        const userId = +req.user.id
        if (isNaN(storeId)) {
            createError({
                message: "path not storeId",
                statusCode: 400
            })
        }
        const result = await storeService.findStoreByStoreId(storeId, userId)
        res.status(200).json(result)
    } catch (error) {
        next(error)
    }
}

module.exports = storeController