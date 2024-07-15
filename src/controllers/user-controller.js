const hashService = require("../services/hash-service")
const userService = require("../services/user-service")
const jwtService = require('../services/jwt-service')
const createError = require('../utils/create-error')

const userController = {}

userController.registerUser = async ( req, res, next) => {
    try {
        const data = req.body
        // console.log('data', data)
        const existUser = await userService.findUser(data)

        if (existUser) {
            createError({
                message: 'email already in use',
                statusCode: 400
            })
        }

        data.password = await hashService.hash(data.password)   
        
        await userService.createUser(data)
        res.status(201).json({ message: 'user created'})

    } catch (err) {
        next(err)
    }
}

userController.loginUser = async ( req, res, next ) => {
    try {
        const data = req.body

        const existUser = await userService.findUser(data)

        if (!existUser) {
            createError({
                message: 'email or password invalid',
                statusCode: 400
            })
        }

        const isMatch = await hashService.compare(data.password, existUser.password)

        if (!isMatch) {
            createError({
                message: 'invalid credentials',
                statusCode: 400
            })
        }

        const accessToken = jwtService.sign({ id: existUser.id})

        res.status(200).json({ accessToken })

    } catch (err) {
        next(err)
    }
}

userController.getUser = async (req, res, next) => {
    res.status(200).json({user: req.user})
}

module.exports = userController