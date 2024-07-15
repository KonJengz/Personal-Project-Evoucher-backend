const prisma = require('../models/prisma')

const adminService = {}

adminService.findAdim = (username) => {
    return prisma.admin.findFirst({
        where: {
            username
        }
    })
}

adminService.createAdmitAccount = ( username, password ) => {
    return prisma.admin.create({
        data: {
            username,
            password
        }
    })
}

adminService.findAdimById = (id) => {
    return prisma.admin.findFirst({
        where: {
            id
        }
    })
}

adminService.getAllUsers = () => {
    return prisma.user.findMany({
        include: {stores: {
            include: {evoucher: true}
        },
            
        }
    })
}

adminService.updateStatus = (id, data) => {
    // console.log('first', data)
    return prisma.user.update({
        where: {id},
        data: data
    })
}

adminService.getAllstore = () => {
    return prisma.store.findMany({
        include: {evoucher:true}
    })
}



module.exports = adminService