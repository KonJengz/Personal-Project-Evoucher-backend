const adminService = require('../services/admin-service')
const createError = require('../utils/create-error')
const hashService = require('../services/hash-service')
const jwtService = require('../services/jwt-service')

const adminController = {}

adminController.createAdmin = async (req, res, next) => {
    try {
        const { username, password } = req.body

        const existAdmin = await adminService.findAdim(username)

        if (existAdmin) {
            createError({
                message: 'username already in use',
                statusCode: 400
            })
        }

        const hashPassword = await hashService.hash(password)
        await adminService.createAdmitAccount(username, hashPassword)

        res.status(201).json({ message: 'user created'})

    } catch (err) {
        next(err)
    }
}

adminController.loginAdmin = async ( req, res, next) => {
    try {
        const { username, password } = req.body

        const existAdmin = await adminService.findAdim(username)

        if (!existAdmin) {
            createError({
                message: 'user or password invalid',
                statusCode: 400
            })
        }
        
        const isMatch = await hashService.compare(password, existAdmin.password)

        if (!isMatch) {
            createError({
                message: 'invalid credentials',
                statusCode: 400
            })
        }

        const accessTokenAdmin = jwtService.sign({ id: existAdmin.id})

        res.status(200).json({ accessTokenAdmin })
    } catch (err) {
        next(err)
    }
}

adminController.getAdmin = async (req, res, next) => {
    res.status(200).json({admin: req.admin})
}

adminController.getAlluser = async (req, res, next) => {
    const alluser = await adminService.getAllUsers()
    delete alluser.password
    res.status(200).json(alluser)
}

adminController.updateStatus = async (req, res, next) => {
    // console.log('req.body update status', req.body)
    const  id = req.body.id
    delete req.body.id
    const result = await adminService.updateStatus(id,req.body)
    console.log('result', result)
    res.status(200).json(result)
}

adminController.getAllstore = async (req, res, next) => {
    const result = await adminService.getAllstore()
    res.status(200).json(result)
}

module.exports = adminController