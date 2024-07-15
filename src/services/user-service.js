const prisma = require("../models/prisma")

const userService = {}

userService.findUser = (data) => {
    return prisma.user.findFirst({
        where: {
            email: data.email
            // OR: [{email: data.email}, { phone: data.phone}]
        }
    })
}

userService.findUserById = (id) => {
    return prisma.user.findFirst({
        where: {
            id
            // OR: [{email: data.email}, { phone: data.phone}]
        }
    })
}

userService.createUser = (data) => {
    return prisma.user.create({data})
}

module.exports = userService